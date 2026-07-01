/*
 * POST /api/waitlist — capture a pre-launch waitlist email.
 *
 * Flow: parse JSON → honeypot check → per-IP rate limit → validate email →
 * persist via the `saveWaitlistEmail` seam. No secrets live here or reach the
 * client; the store provider is swappable behind that single function.
 *
 * Spam guards (AC): a hidden honeypot field (drops bots silently) AND a per-IP
 * fixed-window rate limit (rejects rapid bursts with 429).
 */
import {
  HONEYPOT_FIELD,
  isValidEmail,
  normalizeEmail,
  type WaitlistResponse,
} from "../../lib/waitlist";
import { rateLimit } from "../../lib/rate-limit";
import { saveWaitlistEmail } from "../../lib/waitlist-store";

// The placeholder store uses node:fs, so pin the Node runtime.
export const runtime = "nodejs";

const RATE_LIMIT = 5; // submissions…
const RATE_WINDOW_MS = 60_000; // …per minute, per IP.

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function json(body: WaitlistResponse, init?: ResponseInit): Response {
  return Response.json(body, init);
}

export async function POST(request: Request): Promise<Response> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json(
      { ok: false, message: "Invalid request.", error: "bad_request" },
      { status: 400 },
    );
  }

  const data = (raw ?? {}) as Record<string, unknown>;
  const email = typeof data.email === "string" ? data.email : "";
  const honeypot =
    typeof data[HONEYPOT_FIELD] === "string"
      ? (data[HONEYPOT_FIELD] as string)
      : "";

  // Honeypot: a filled hidden field means a bot. Return success so we don't
  // tip it off, but never persist the submission.
  if (honeypot.trim() !== "") {
    return json({ ok: true, message: "You're on the list." });
  }

  // Per-IP rate limit — rejects rapid/bot bursts from one source.
  const limit = rateLimit(clientIp(request), RATE_LIMIT, RATE_WINDOW_MS, Date.now());
  if (!limit.allowed) {
    return json(
      {
        ok: false,
        message: "Too many tries. Give it a minute, then try again.",
        error: "rate_limited",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  if (!isValidEmail(email)) {
    return json(
      {
        ok: false,
        message: "Enter a valid email address.",
        error: "invalid_email",
      },
      { status: 400 },
    );
  }

  try {
    await saveWaitlistEmail({
      email: normalizeEmail(email),
      source: "waitlist-section",
      createdAt: new Date().toISOString(),
    });
  } catch {
    return json(
      {
        ok: false,
        message: "Something went wrong on our end. Please try again.",
        error: "server_error",
      },
      { status: 500 },
    );
  }

  return json({
    ok: true,
    message: "You're on the list — we'll email you the moment Wishmax launches.",
  });
}

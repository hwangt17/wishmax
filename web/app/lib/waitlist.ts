/*
 * Waitlist — shared types + validation used by BOTH the client form
 * (components/Waitlist.tsx) and the server route handler (api/waitlist/route.ts),
 * so the two can never disagree on what a valid submission looks like.
 *
 * No server-only imports here — this module is safe to bundle to the client.
 */

/**
 * Hidden honeypot field name. A real person never sees or fills it; naive bots
 * auto-fill every field, so a non-empty value is a strong bot signal. Kept in
 * one place so the form and the route agree on the field name.
 */
export const HONEYPOT_FIELD = "company";

/** Machine-readable error codes the route returns for inline field handling. */
export type WaitlistError =
  | "invalid_email"
  | "rate_limited"
  | "server_error"
  | "bad_request";

export interface WaitlistResponse {
  ok: boolean;
  /** Human-facing message safe to render directly in the UI. */
  message: string;
  error?: WaitlistError;
}

// Pragmatic email shape check — mirrors the browser's type="email" heuristic
// without the false-negatives of an over-strict RFC 5322 regex. The route is
// the authority; the client uses this only for instant pre-submit feedback.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidEmail(raw: string): boolean {
  const email = normalizeEmail(raw);
  return email.length >= 3 && email.length <= 254 && EMAIL_RE.test(email);
}

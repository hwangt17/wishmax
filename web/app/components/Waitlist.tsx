"use client";

/*
 * Waitlist section (US-010) — the closing conversion moment.
 *
 * The primary CTA captures an email for the pre-launch waitlist. It POSTs to
 * /api/waitlist, which persists behind the swappable `saveWaitlistEmail` seam.
 * The CTA target is centralized in lib/cta.ts so it can flip to an App Store /
 * TestFlight link at launch without touching this component.
 *
 * States: idle → submitting → success | error. Validation runs client-side for
 * instant feedback and is re-checked authoritatively on the server. A hidden
 * honeypot field pairs with the route's per-IP rate limit as the spam guard.
 *
 * Token-only: every color/size/space/radius/shadow comes from var(--…) via
 * ./waitlist.css and the ported Badge/Button — no visual literals here. Sits on
 * the periwinkle wash to continue the alternating rhythm (FAQ above is white).
 */
import { useId, useState, type FormEvent } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import {
  HONEYPOT_FIELD,
  isValidEmail,
  type WaitlistResponse,
} from "../lib/waitlist";

type Status = "idle" | "submitting" | "success" | "error";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);

  const baseId = useId();
  const inputId = `${baseId}-email`;
  const feedbackId = `${baseId}-feedback`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Instant client-side validation — no round trip for an obvious miss.
    if (!isValidEmail(email)) {
      setInvalid(true);
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setInvalid(false);
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, [HONEYPOT_FIELD]: honeypot }),
      });
      const data = (await res.json()) as WaitlistResponse;

      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setInvalid(data.error === "invalid_email");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  const submitting = status === "submitting";
  const succeeded = status === "success";

  return (
    <section id="waitlist" className="wm-waitlist" aria-labelledby="wm-waitlist-title">
      <div className="wm-waitlist__inner">
        <div className="wm-waitlist__card">
          <span className="wm-waitlist__eyebrow">
            <Badge>Early access</Badge>
          </span>

          <h2 id="wm-waitlist-title" className="wm-waitlist__title">
            Be first in line when Wishmax launches.
          </h2>
          <p className="wm-waitlist__lede">
            Join the waitlist and we&rsquo;ll email you the moment your
            profile-ready photos are ready to claim &mdash; plus early-access
            pricing before doors open.
          </p>

          {succeeded ? (
            <div
              className="wm-waitlist__success"
              role="status"
              aria-live="polite"
            >
              <CheckIcon />
              <p className="wm-waitlist__success-text">{message}</p>
            </div>
          ) : (
            <form className="wm-waitlist__form" onSubmit={handleSubmit} noValidate>
              <div className="wm-waitlist__row">
                <div className="wm-waitlist__field">
                  <label className="wm-waitlist__label" htmlFor={inputId}>
                    Email address
                  </label>
                  <input
                    id={inputId}
                    className="wm-waitlist__input"
                    type="email"
                    name="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (invalid) setInvalid(false);
                    }}
                    aria-invalid={invalid || undefined}
                    aria-describedby={message ? feedbackId : undefined}
                    disabled={submitting}
                    required
                  />
                </div>

                {/* Honeypot — hidden from users; bots that auto-fill it get
                    silently dropped by the route. */}
                <div className="wm-waitlist__hp" aria-hidden="true">
                  <label htmlFor={`${baseId}-${HONEYPOT_FIELD}`}>
                    Company (leave blank)
                  </label>
                  <input
                    id={`${baseId}-${HONEYPOT_FIELD}`}
                    type="text"
                    name={HONEYPOT_FIELD}
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="wm-waitlist__submit"
                  loading={submitting}
                >
                  Join the waitlist
                </Button>
              </div>

              {message && (
                <p
                  id={feedbackId}
                  className={`wm-waitlist__message${
                    status === "error" ? " wm-waitlist__message--error" : ""
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {message}
                </p>
              )}

              <p className="wm-waitlist__microcopy">
                No spam. Your email is used only to notify you at launch, and you
                can unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/** Filled mono-weight ink check — success confirmation glyph. */
function CheckIcon() {
  return (
    <svg
      className="wm-waitlist__check"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9.55 17.05 4.5 12l1.4-1.4 3.65 3.6 8.15-8.15L19.1 7.5 9.55 17.05z" />
    </svg>
  );
}

"use client";

/*
 * WaitlistForm — the shared, instrumented email-capture form.
 *
 * Used in two places (the hero and the closing waitlist section), so the form
 * logic lives here once: client-side validation for instant feedback, a hidden
 * honeypot paired with the route's per-IP rate limit, the idle → submitting →
 * success | error state machine, and the `waitlistSignup` conversion event
 * (fired only after the server accepts, tagged with the `source` prop so we can
 * tell hero signups from footer signups).
 *
 * `useId` keeps every instance's input / feedback / honeypot ids unique, so two
 * forms on one page never collide. Token-only styling via ./waitlist.css.
 */
import { useId, useState, type FormEvent } from "react";
import { Button } from "./Button";
import {
  HONEYPOT_FIELD,
  isValidEmail,
  type WaitlistResponse,
} from "../lib/waitlist";
import { EVENTS, track } from "../lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export interface WaitlistFormProps {
  /** Attribution label for the conversion event (e.g. "hero", "waitlist-section"). */
  source: string;
  /** Submit button label. */
  cta?: string;
}

export function WaitlistForm({
  source,
  cta = "Join the waitlist",
}: WaitlistFormProps) {
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
        // Fire the conversion only after the server accepts the signup —
        // honeypot/rate-limited/invalid submissions never reach here.
        track(EVENTS.waitlistSignup, { source });
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

  if (status === "success") {
    return (
      <div className="wm-waitlist__success" role="status" aria-live="polite">
        <CheckIcon />
        <p className="wm-waitlist__success-text">{message}</p>
      </div>
    );
  }

  return (
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

        {/* Honeypot — hidden from users; bots that auto-fill it get silently
            dropped by the route. */}
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
          {cta}
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
        No spam — just one email the moment Wishmax launches. Unsubscribe anytime.
      </p>
    </form>
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

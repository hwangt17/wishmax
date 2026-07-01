/*
 * Analytics seam (US-012) — the single place the site fires product events.
 *
 * Privacy-conscious by design:
 *  - Provider is Plausible Analytics: cookieless, collects no PII, no
 *    cross-site tracking, GDPR/CCPA-friendly (no consent banner required). It
 *    is loaded ONLY in production and ONLY when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is
 *    set (see components/Analytics.tsx), so dev/preview never phone home.
 *  - `track()` honors Do Not Track / Global Privacy Control — a basic consent
 *    signal — and no-ops when the user has opted out.
 *  - In development (or when Plausible isn't configured) `track()` logs the
 *    event + payload to the console for verification instead of hitting the
 *    network, so there is NO analytics noise in dev and no polluted dashboard.
 *
 * Swap seam: to change providers, keep the `EVENTS` names + `track()` signature
 * and re-point the body at the new SDK — callers (CtaLink, Waitlist) don't move.
 * This mirrors the waitlist `saveWaitlistEmail` / `PRIMARY_CTA` seams.
 *
 * Client-safe: no server-only imports; bundles to the browser.
 */

/** Public origin config — read by components/Analytics.tsx to load the script. */
export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "";
export const PLAUSIBLE_SRC =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ??
  "https://plausible.io/js/script.tagged-events.js";

/** Analytics is live only in production with a configured domain. */
export const analyticsEnabled =
  process.env.NODE_ENV === "production" && PLAUSIBLE_DOMAIN !== "";

/**
 * Named conversion events — the ONLY events the site fires. Keep this list
 * small and stable; it is the contract the analytics dashboard reports on.
 */
export const EVENTS = {
  /** A primary "Get my photos" CTA was clicked (header / hero / mobile menu). */
  ctaClick: "CTA Click",
  /** A waitlist email was accepted by the server (a real conversion). */
  waitlistSignup: "Waitlist Signup",
} as const;

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS];

/** Event payloads are flat, non-PII string/number/bool props only. */
export type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: {
      (
        event: string,
        options?: { props?: EventProps; callback?: () => void },
      ): void;
      q?: unknown[];
    };
  }
}

/**
 * Do Not Track / Global Privacy Control check — our basic consent gesture. If
 * the visitor has signalled they don't want tracking, we never record.
 */
function consentDenied(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    globalPrivacyControl?: boolean;
    msDoNotTrack?: string;
  };
  const legacy = (window as Window & { doNotTrack?: string }).doNotTrack;
  const dnt = nav.doNotTrack ?? nav.msDoNotTrack ?? legacy;
  return dnt === "1" || dnt === "yes" || nav.globalPrivacyControl === true;
}

/**
 * Record a product event. Safe to call from any client component; it is a
 * no-op during SSR, when consent is denied, and (silently) in production
 * without Plausible configured. In dev it logs to the console so CTA/waitlist
 * events can be verified without any network request.
 */
export function track(event: AnalyticsEvent, props?: EventProps): void {
  if (typeof window === "undefined") return; // SSR / build — nothing to do.
  if (consentDenied()) return; // Respect DNT / GPC.

  if (typeof window.plausible === "function") {
    window.plausible(event, props ? { props } : undefined);
    return;
  }

  // No provider loaded (dev, or prod-misconfigured): verify via console, never
  // the network — keeps development free of analytics noise.
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, props ?? {});
  }
}

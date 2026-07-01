"use client";

/*
 * Analytics loader (US-012) — injects the privacy-conscious Plausible script.
 *
 * Loads ONLY in production AND only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set, so
 * development and unconfigured previews make zero analytics network requests
 * (the "no noise in dev" requirement). Plausible is cookieless and collects no
 * PII, so it needs no consent banner; `track()` (lib/analytics.ts) additionally
 * honors Do Not Track / GPC before recording anything.
 *
 * The inline stub queues events fired before the deferred script finishes
 * loading, per Plausible's recommended install — `window.plausible(...)` calls
 * from CtaLink / Waitlist are buffered on `.q` and flushed on load.
 */
import Script from "next/script";
import { PLAUSIBLE_DOMAIN, PLAUSIBLE_SRC, analyticsEnabled } from "../lib/analytics";

export function Analytics() {
  if (!analyticsEnabled) return null;

  return (
    <>
      <Script
        defer
        data-domain={PLAUSIBLE_DOMAIN}
        src={PLAUSIBLE_SRC}
        strategy="afterInteractive"
      />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
    </>
  );
}

/*
 * Waitlist section (US-010) — the closing conversion moment.
 *
 * A calm, single-column CTA on the periwinkle wash: eyebrow + headline + lede,
 * then the shared <WaitlistForm> (email capture, honeypot, validation, success
 * state, conversion tracking). The same form appears in the hero; this is the
 * bottom-of-page catch. The CTA target is centralized in lib/cta.ts so it can
 * flip to an App Store / TestFlight link at launch.
 *
 * Token-only: every color/size/space/radius/shadow comes from var(--…) via
 * ./waitlist.css and the ported Badge/Button — no visual literals here.
 */
import { Badge } from "./Badge";
import { WaitlistForm } from "./WaitlistForm";

export function Waitlist() {
  return (
    <section
      id="waitlist"
      className="wm-waitlist"
      aria-labelledby="wm-waitlist-title"
    >
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

          <WaitlistForm source="waitlist-section" />
        </div>
      </div>
    </section>
  );
}

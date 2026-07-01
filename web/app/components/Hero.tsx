/*
 * Hero section (US-003) — the hook + the before/after proof.
 *
 * Leads with the brand hook headline, names the pain (your photos cost you
 * matches) and the promise (pro dating photos from your own face, no
 * photoshoot), keeps the primary CTA above the fold, and proves it with the
 * PRD-01 Before/After card (the primary credibility component). The card's
 * images are the above-the-fold LCP — rendered via next/image with `priority`
 * (preloaded) inside fixed 3:4 tiles, so there's no layout shift on load.
 *
 * Token-only: layout/spacing/type/color come from var(--…) tokens via
 * ./hero.css and the ported components; no hardcoded visual values here.
 */
import { Badge } from "./Badge";
import { BeforeAfterCard } from "./BeforeAfterCard";
import { ButtonLink } from "./Button";
import { PRIMARY_CTA } from "../lib/cta";

export function Hero() {
  return (
    <section className="wm-hero" aria-labelledby="wm-hero-title">
      <div className="wm-hero__inner">
        <div className="wm-hero__copy">
          <span className="wm-hero__eyebrow">
            <Badge>Pro dating photos from your own face</Badge>
          </span>

          <h1 id="wm-hero-title" className="wm-hero__title">
            Anything you wish for, just by changing your profile photo.
          </h1>

          <p className="wm-hero__subhead">
            Your photos are costing you matches. Wishmax turns a few selfies
            into pro dating photos from your own face — no photoshoot, no
            awkward camera guy, no waiting weeks.
          </p>

          <div className="wm-hero__actions">
            <ButtonLink href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonLink>
            <ButtonLink href="#examples" variant="ghost">
              See the transformations
            </ButtonLink>
          </div>

          <p className="wm-hero__microcopy">
            Join the waitlist — be first in line when Wishmax launches.
          </p>
        </div>

        <div className="wm-hero__visual">
          <BeforeAfterCard
            beforeSrc="/hero/before.jpg"
            afterSrc="/hero/after.jpg"
            alt="A Wishmax transformation — a dull phone selfie becomes a bright, professionally styled portrait"
            priority
            sizes="(max-width: 899px) 45vw, 300px"
          />
          <p className="wm-hero__caption">
            Sample transformation — real member results at launch.
          </p>
        </div>
      </div>
    </section>
  );
}

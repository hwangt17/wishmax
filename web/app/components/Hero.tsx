/*
 * Hero section — the hook, the inline email capture, and the before/after proof.
 *
 * Editorial & airy: a centered statement headline (the one place the Space
 * Grotesk display face is licensed to run, ≥ 26px), one tight subhead, the
 * inline <WaitlistForm> as the primary action, and an oversized Before/After
 * card as the credibility anchor. The card's images are the above-the-fold LCP
 * — next/image with `priority` (preloaded) inside fixed 3:4 tiles, so there's no
 * layout shift on load.
 *
 * Token-only: layout/spacing/type/color come from var(--…) tokens via ./hero.css
 * and the ported components; no hardcoded visual values here.
 */
import { Badge } from "./Badge";
import { BeforeAfterCard } from "./BeforeAfterCard";
import { WaitlistForm } from "./WaitlistForm";

export function Hero() {
  return (
    <section className="wm-hero" aria-labelledby="wm-hero-title">
      <div className="wm-hero__inner">
        <div className="wm-hero__copy">
          <span className="wm-hero__eyebrow">
            <Badge>Early access — join the waitlist</Badge>
          </span>

          <h1 id="wm-hero-title" className="wm-hero__title">
            Anything you wish for, just by changing your profile photo.
          </h1>

          <p className="wm-hero__subhead">
            Wishmax turns a few selfies into pro dating photos from your own
            face — no photoshoot required.
          </p>

          <div className="wm-hero__form">
            <WaitlistForm source="hero" />
          </div>
        </div>

        <figure className="wm-hero__visual">
          <BeforeAfterCard
            beforeSrc="/hero/before.jpg"
            afterSrc="/hero/after.jpg"
            alt="A Wishmax transformation — a dull phone selfie becomes a bright, professionally styled portrait"
            priority
            sizes="(max-width: 767px) 44vw, 280px"
          />
          <figcaption className="wm-hero__caption">
            Sample transformation — real member results at launch.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

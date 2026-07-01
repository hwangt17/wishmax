/*
 * Social proof section (US-007) — proof that others got results so a visitor
 * trusts it works.
 *
 * Testimonial cards in the DESIGN.md "Standard Content Card" shape (white
 * surface, --shadow-sm, radius-cards). Each card carries a star rating (filled
 * mono-weight ink stars — the black action system, NOT a colored/gold accent),
 * a brand-voice quote, and a credible attribution row: a real-photography
 * avatar via next/image (circular), a name, and a handle. Two text sizes per
 * card — the quote (heading-sm) + the caption-size name/handle — so the
 * max-two-type-sizes rule holds (stars are icons, not text).
 *
 * The quotes/avatars are honest, clearly-labeled pre-launch previews (see the
 * caption + the gen-avatar-images.mjs stand-ins) — the content STRUCTURE is
 * ready to drop in real member stories/metrics at launch with no code change.
 *
 * Reuses the established section-header pattern (eyebrow Badge + Inter-700 title
 * + slate lede). Sits on the periwinkle→white wash to continue the DESIGN.md
 * alternating white/wash rhythm (Benefits above it is on the white canvas).
 *
 * Token-only: every color/size/space/radius/shadow comes from var(--…) via
 * ./socialproof.css and the ported Badge — no visual literals here.
 */
import Image from "next/image";
import { Badge } from "./Badge";

interface Testimonial {
  quote: string;
  name: string;
  handle: string;
  /** Square avatar served via next/image, shown in a circular frame. */
  avatar: string;
  /** Whole-number star rating out of five. */
  rating: number;
}

/* Filled mono-weight star (currentColor = ink), per DESIGN.md imagery + the
   black/white action system — no gold/colored accent. */
function StarIcon() {
  return (
    <svg
      className="wm-proof__star"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="wm-proof__stars"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: rating }, (_, i) => (
        <StarIcon key={i} />
      ))}
    </span>
  );
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Went from three matches a month to more than I can keep up with. Same me — just photos that finally look like the guy my friends actually know.",
    name: "Jordan M.",
    handle: "@jordan.m",
    avatar: "/testimonials/member-1.jpg",
    rating: 5,
  },
  {
    quote:
      "I used to hate every photo of myself. Uploaded a few selfies, picked the ones I liked, and had a whole profile of shots I'm genuinely proud of.",
    name: "Devin R.",
    handle: "@devinr",
    avatar: "/testimonials/member-2.jpg",
    rating: 5,
  },
  {
    quote:
      "Cheaper than a haircut and I never had to pose for a photographer. My profile went from getting ignored to getting right-swiped.",
    name: "Marcus T.",
    handle: "@marcus.t",
    avatar: "/testimonials/member-3.jpg",
    rating: 5,
  },
];

export function SocialProof() {
  return (
    <section
      id="social-proof"
      className="wm-proof"
      aria-labelledby="wm-proof-title"
    >
      <div className="wm-proof__inner">
        <header className="wm-proof__head">
          <span className="wm-proof__eyebrow">
            <Badge>Real results</Badge>
          </span>
          <h2 id="wm-proof-title" className="wm-proof__title">
            The guys who tried it aren&rsquo;t going back.
          </h2>
          <p className="wm-proof__lede">
            A better profile photo is the fastest upgrade you can make &mdash;
            here&rsquo;s what it looks like when it lands.
          </p>
        </header>

        <ul className="wm-proof__grid">
          {TESTIMONIALS.map((t) => (
            <li key={t.handle} className="wm-proof__card">
              <Stars rating={t.rating} />
              <blockquote className="wm-proof__quote">{t.quote}</blockquote>
              <figcaption className="wm-proof__person">
                <span className="wm-proof__avatar">
                  <Image
                    className="wm-proof__avatar-img"
                    src={t.avatar}
                    alt={`${t.name}, Wishmax member`}
                    fill
                    sizes="40px"
                    style={{ objectFit: "cover" }}
                  />
                </span>
                <span className="wm-proof__meta">
                  <span className="wm-proof__name">{t.name}</span>
                  <span className="wm-proof__handle">{t.handle}</span>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>

        <p className="wm-proof__note">
          Illustrative pre-launch previews &mdash; real member stories replace
          these at launch.
        </p>
      </div>
    </section>
  );
}

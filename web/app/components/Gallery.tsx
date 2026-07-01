/*
 * Transformation gallery / sample feed showcase (US-005).
 *
 * A grid of curated example RESULTS rendered with the same Feed Photo Tile that
 * drives the app's feed, so the marketing gallery mirrors the app's feel. Each
 * tile carries a category chip (travel / gym / professional / night-out) to show
 * the range of looks a visitor can put their face into. Tiles are lazy-loaded
 * via next/image (no `priority`) and sit in fixed 3:4 frames, so images decode
 * on scroll with zero layout shift / no jank.
 *
 * `id="examples"` matches the header + footer "Examples" nav anchor and the
 * hero's "See the transformations" CTA (both target #examples).
 *
 * Token-only: every color/size/space/radius/shadow comes from var(--…) via
 * ./gallery.css and the ported FeedPhotoTile/Badge. Imagery is self-authored
 * raster (web/scripts/gen-gallery-images.mjs) — real .jpg photographic-register
 * stand-ins, swappable to licensed photography at the same paths, never gradient
 * placeholders. See progress.txt "Landing site imagery" for the pattern.
 */
import { Badge } from "./Badge";
import { FeedPhotoTile } from "./FeedPhotoTile";

interface Sample {
  src: string;
  category: string;
  alt: string;
}

/* Curated example results, grouped by category to communicate range. */
const SAMPLES: Sample[] = [
  {
    src: "/gallery/travel-1.jpg",
    category: "Travel",
    alt: "Sample Wishmax result — a warm golden-hour travel portrait in a light shirt",
  },
  {
    src: "/gallery/gym-1.jpg",
    category: "Gym",
    alt: "Sample Wishmax result — a crisp, high-contrast athletic gym portrait",
  },
  {
    src: "/gallery/professional-1.jpg",
    category: "Professional",
    alt: "Sample Wishmax result — a clean neutral-studio professional headshot in a tailored jacket",
  },
  {
    src: "/gallery/night-out-1.jpg",
    category: "Night out",
    alt: "Sample Wishmax result — a moody deep-blue night-out portrait with rim lighting",
  },
  {
    src: "/gallery/travel-2.jpg",
    category: "Travel",
    alt: "Sample Wishmax result — a bright coastal travel portrait in relaxed linen",
  },
  {
    src: "/gallery/gym-2.jpg",
    category: "Gym",
    alt: "Sample Wishmax result — a cool teal gym portrait in a fitted training top",
  },
  {
    src: "/gallery/professional-2.jpg",
    category: "Professional",
    alt: "Sample Wishmax result — a warm-grey studio professional portrait in a charcoal blazer",
  },
  {
    src: "/gallery/night-out-2.jpg",
    category: "Night out",
    alt: "Sample Wishmax result — a violet-lit night-out portrait in a dark shirt",
  },
];

export function Gallery() {
  return (
    <section id="examples" className="wm-gallery" aria-labelledby="wm-gallery-title">
      <div className="wm-gallery__inner">
        <header className="wm-gallery__head">
          <span className="wm-gallery__eyebrow">
            <Badge>Examples</Badge>
          </span>
          <h2 id="wm-gallery-title" className="wm-gallery__title">
            One face, every vibe worth swiping right on.
          </h2>
          <p className="wm-gallery__lede">
            Browse the kind of profile-ready shots Wishmax makes from your own
            selfies — travel, gym, professional, night-out. Pick the looks you
            like; your face goes in every one.
          </p>
        </header>

        <ul className="wm-gallery__grid">
          {SAMPLES.map((sample) => (
            <li key={sample.src} className="wm-gallery__item">
              <FeedPhotoTile
                src={sample.src}
                alt={sample.alt}
                category={sample.category}
                sizes="(max-width: 599px) 45vw, (max-width: 1023px) 30vw, 260px"
              />
            </li>
          ))}
        </ul>

        <p className="wm-gallery__caption">
          Sample transformations — real member results at launch.
        </p>
      </div>
    </section>
  );
}

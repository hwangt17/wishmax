/*
 * Before / After Card — transformation proof (ported from the PRD-01 design
 * system, design/showcase/src/components/BeforeAfterCard.tsx).
 *
 * Two Feed Photo Tiles paired inside a white card (12px radius, --shadow-sm),
 * each labeled with a small "Before" / "After" pill badge. This is the primary
 * credibility component — the landing hero leads with it. Styling is token-only
 * (./showcase.css). Photography flows through next/image via FeedPhotoTile;
 * `priority` marks the pair as the above-the-fold LCP visual.
 */
import { Badge } from "./Badge";
import { FeedPhotoTile } from "./FeedPhotoTile";

export interface BeforeAfterCardProps {
  beforeSrc?: string;
  afterSrc?: string;
  /** Gradient token names standing in for photography (empty state only). */
  beforePlaceholder?: string;
  afterPlaceholder?: string;
  alt?: string;
  /** Above-the-fold LCP pair — preload both tiles (no lazy-load). */
  priority?: boolean;
  /** Responsive sizes hint forwarded to each tile. */
  sizes?: string;
  className?: string;
}

export function BeforeAfterCard({
  beforeSrc,
  afterSrc,
  beforePlaceholder,
  afterPlaceholder,
  alt = "",
  priority = false,
  sizes,
  className,
}: BeforeAfterCardProps) {
  const classes = ["wm-ba-card", className].filter(Boolean).join(" ");
  return (
    <div className={classes}>
      <div className="wm-ba-card__pane">
        <FeedPhotoTile
          src={beforeSrc}
          placeholder={beforePlaceholder}
          alt={alt && `${alt} — before`}
          priority={priority}
          sizes={sizes}
        />
        <span className="wm-ba-card__label">
          <Badge onPhoto>Before</Badge>
        </span>
      </div>
      <div className="wm-ba-card__pane">
        <FeedPhotoTile
          src={afterSrc}
          placeholder={afterPlaceholder}
          alt={alt && `${alt} — after`}
          priority={priority}
          sizes={sizes}
        />
        <span className="wm-ba-card__label">
          <Badge onPhoto>After</Badge>
        </span>
      </div>
    </div>
  );
}

/*
 * Before / After Card — transformation proof (marketing) & result reveal (app).
 *
 * Two Feed Photo Tiles paired inside a white card (12px radius, --shadow-sm),
 * each labeled with a small "Before" / "After" pill badge. This is the primary
 * credibility component. Styling is token-only (../components.css).
 */
import { Badge } from './Badge'
import { FeedPhotoTile } from './FeedPhotoTile'

export interface BeforeAfterCardProps {
  beforeSrc?: string
  afterSrc?: string
  /** Gradient token names standing in for photography (showcase / empty state). */
  beforePlaceholder?: string
  afterPlaceholder?: string
  alt?: string
  /** Selected (picked) — rings both tiles. */
  selected?: boolean
  /** Showcase only: statically render the pressed state. */
  forceState?: 'pressed'
  onClick?: () => void
}

export function BeforeAfterCard({
  beforeSrc,
  afterSrc,
  beforePlaceholder,
  afterPlaceholder,
  alt = '',
  selected = false,
  forceState,
  onClick,
}: BeforeAfterCardProps) {
  return (
    <div className="wm-ba-card">
      <div className="wm-ba-card__pane">
        <FeedPhotoTile
          src={beforeSrc}
          placeholder={beforePlaceholder}
          alt={alt && `${alt} — before`}
          selected={selected}
          forceState={forceState}
          onClick={onClick}
        />
        <span className="wm-ba-card__label">
          <Label>Before</Label>
        </span>
      </div>
      <div className="wm-ba-card__pane">
        <FeedPhotoTile
          src={afterSrc}
          placeholder={afterPlaceholder}
          alt={alt && `${alt} — after`}
          selected={selected}
          forceState={forceState}
          onClick={onClick}
        />
        <span className="wm-ba-card__label">
          <Label>After</Label>
        </span>
      </div>
    </div>
  )
}

/* The Before/After pills are non-interactive labels, so use the on-photo Badge
   directly (a frosted dark pill with white text, legible over the tile). */
function Label({ children }: { children: string }) {
  return <Badge onPhoto>{children}</Badge>
}

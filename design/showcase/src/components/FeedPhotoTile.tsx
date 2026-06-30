/*
 * Feed Photo Tile — THE hero component (curated template tiles + result thumbs).
 *
 * ~3:4 portrait, full-bleed image, 12px radius, no overlaid text label by
 * default. Optional top-corner category chip + lock/Premium badge ride over a
 * legibility scrim. Loading renders a shimmer skeleton at the same radius.
 * Styling is token-only (../components.css); this file composes structure and
 * state. Interactive (pick a photo) → pressed + selected states.
 */
import type { ButtonHTMLAttributes } from 'react'
import { Badge } from './Badge'

/* Mono-weight filled lock glyph (currentColor — no literal color). */
function LockIcon() {
  return (
    <svg className="wm-badge__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 0 1 6 0v3Z" />
    </svg>
  )
}

export interface FeedPhotoTileProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Photo URL — rendered full-bleed (object-fit: cover). */
  src?: string
  alt?: string
  /** Gradient token name standing in for photography (showcase / empty state). */
  placeholder?: string
  /** Top-left category label. */
  category?: string
  /** Top-right Premium / lock badge. */
  premium?: boolean
  /** Shimmer skeleton in place of the photo. */
  loading?: boolean
  /** Selected (picked) — black ring. */
  selected?: boolean
  /** Showcase only: statically render the pressed state. */
  forceState?: 'pressed'
}

export function FeedPhotoTile({
  src,
  alt = '',
  placeholder,
  category,
  premium = false,
  loading = false,
  selected = false,
  forceState,
  className,
  ...rest
}: FeedPhotoTileProps) {
  const classes = [
    'wm-tile',
    loading && 'is-loading',
    selected && 'is-selected',
    forceState && `is-force-${forceState}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const hasOverlay = Boolean(category) || premium

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={selected}
      aria-busy={loading || undefined}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? (
        <span className="wm-tile__shimmer" aria-hidden="true" />
      ) : (
        <>
          {src ? (
            <img className="wm-tile__img" src={src} alt={alt} />
          ) : (
            <span
              className="wm-tile__placeholder"
              style={placeholder ? { backgroundImage: `var(${placeholder})` } : undefined}
              aria-hidden="true"
            />
          )}
          {hasOverlay && (
            <>
              <span className="wm-tile__scrim" aria-hidden="true" />
              <span className="wm-tile__overlay">
                {category ? <Badge onPhoto>{category}</Badge> : <span />}
                {premium && (
                  <Badge onPhoto>
                    <LockIcon />
                    Premium
                  </Badge>
                )}
              </span>
            </>
          )}
        </>
      )}
    </button>
  )
}

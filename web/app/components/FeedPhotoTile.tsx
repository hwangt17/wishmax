/*
 * Feed Photo Tile — THE hero component (ported from the PRD-01 design system,
 * design/showcase/src/components/FeedPhotoTile.tsx).
 *
 * ~3:4 portrait, full-bleed image, 12px radius, no overlaid text label by
 * default. Optional top-corner category chip + Premium badge ride over a
 * legibility scrim. On the marketing site the photo is rendered through
 * `next/image` (optimized + responsive) instead of a raw <img>: `fill` layout
 * inside the position:relative tile, `priority` for above-the-fold LCP images
 * (US-003 hero) and lazy-load by default for gallery tiles (US-005). The
 * gradient `placeholder` branch is kept only for empty states — the landing
 * page ships real photography, never a gradient stand-in as proof. Styling is
 * token-only (./showcase.css); this file composes structure + state.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { Badge } from "./Badge";

/* Mono-weight filled lock glyph (currentColor — no literal color). */
function LockIcon() {
  return (
    <svg
      className="wm-badge__icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 0 1 6 0v3Z" />
    </svg>
  );
}

export interface FeedPhotoTileProps {
  /** Photo URL — rendered full-bleed (object-fit: cover) via next/image. */
  src?: string;
  alt?: string;
  /** Gradient token name standing in for photography (empty state only). */
  placeholder?: string;
  /** Top-left category label. */
  category?: string;
  /** Top-right Premium / lock badge. */
  premium?: boolean;
  /** Selected (picked) — black ring. */
  selected?: boolean;
  /** Above-the-fold LCP image — preload + eager decode (no lazy-load). */
  priority?: boolean;
  /** Responsive sizes hint for next/image (defaults to a portrait column). */
  sizes?: string;
  className?: string;
  /** Optional extra chrome rendered over the tile (e.g. a corner accent). */
  children?: ReactNode;
}

export function FeedPhotoTile({
  src,
  alt = "",
  placeholder,
  category,
  premium = false,
  selected = false,
  priority = false,
  sizes = "(max-width: 767px) 90vw, 320px",
  className,
  children,
}: FeedPhotoTileProps) {
  const classes = ["wm-tile", selected && "is-selected", className]
    .filter(Boolean)
    .join(" ");

  const hasOverlay = Boolean(category) || premium;

  return (
    <div className={classes} aria-pressed={selected || undefined}>
      {src ? (
        <Image
          className="wm-tile__img"
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <span
          className="wm-tile__placeholder"
          style={
            placeholder ? { backgroundImage: `var(${placeholder})` } : undefined
          }
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
      {children}
    </div>
  );
}

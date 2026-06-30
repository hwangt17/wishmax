/*
 * Standard Content Card — feature, testimonial, info tiles.
 *
 * White surface, 12px radius, --shadow-sm, padding 12px 16px 16px. Hierarchy is
 * deliberately just two type sizes: a bold 18px title + 14px slate body (the
 * DESIGN.md "max two type sizes per card" rule). An optional `media` slot holds
 * a photo/tile above the text. Styling is token-only (../components.css).
 */
import type { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Bold title — the first of the two allowed type sizes. */
  title?: ReactNode
  /** Optional media above the text (e.g. a FeedPhotoTile or before/after card). */
  media?: ReactNode
  /** Body copy — the second (and last) allowed type size. */
  children?: ReactNode
}

export function Card({ title, media, className, children, ...rest }: CardProps) {
  const classes = ['wm-card', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      {media && <div className="wm-card__media">{media}</div>}
      {title && <h3 className="wm-card__title">{title}</h3>}
      {children && <p className="wm-card__body">{children}</p>}
    </div>
  )
}

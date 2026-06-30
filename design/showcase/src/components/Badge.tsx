/*
 * Pill badge / tag — category label, "Premium"/lock, credits, generation status.
 *
 * Neutral ink-tint pill (soft or strong). The optional `status` renders a dot in
 * the matching semantic color — the ONLY place Done/Processing/Failed colors
 * appear, and only for generation state. The dot color is read from a
 * --color-status-* token (not a literal), keeping component code token-only.
 */
import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeTone = 'soft' | 'strong'
export type BadgeStatus = 'done' | 'processing' | 'failed'

const STATUS_TOKEN: Record<BadgeStatus, string> = {
  done: '--color-status-done',
  processing: '--color-status-processing',
  failed: '--color-status-failed',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  /** Frosted dark pill with white text — legible over photography (feed tiles). */
  onPhoto?: boolean
  /** Generation state only — renders a semantic-colored status dot. */
  status?: BadgeStatus
  children: ReactNode
}

export function Badge({ tone = 'soft', onPhoto = false, status, className, children, ...rest }: BadgeProps) {
  const classes = ['wm-badge', `wm-badge--${tone}`, onPhoto && 'wm-badge--on-photo', className]
    .filter(Boolean)
    .join(' ')
  return (
    <span className={classes} {...rest}>
      {status && (
        <span
          className="wm-badge__dot"
          style={{ backgroundColor: `var(${STATUS_TOKEN[status]})` }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}

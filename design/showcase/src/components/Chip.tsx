/*
 * Filter chip — the app's primary control (gender selector & category filter).
 *
 * ChipGroup is the rounded pill container; Chip is a selectable segment. Styling
 * is token-only (../components.css); the active chip is a white pill lifted by
 * --shadow-sm. On photo headers the active label takes Warm Sand.
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { ForceState } from './Button'

export interface ChipGroupProps {
  /** Render on a dark/photo header (tint-strong container, warm-sand active). */
  onPhoto?: boolean
  children: ReactNode
}

export function ChipGroup({ onPhoto = false, children }: ChipGroupProps) {
  const classes = ['wm-chip-group', onPhoto && 'wm-chip-group--on-photo']
    .filter(Boolean)
    .join(' ')
  return <div className={classes}>{children}</div>
}

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  /** Showcase only: statically render an interaction state. */
  forceState?: ForceState
}

export function Chip({ active = false, forceState, className, children, ...rest }: ChipProps) {
  const classes = [
    'wm-chip',
    active && 'is-active',
    forceState && `is-force-${forceState}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <button className={classes} aria-pressed={active} {...rest}>
      {children}
    </button>
  )
}

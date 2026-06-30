/*
 * Button — primary filled (black/white) and ghost variants.
 *
 * Styling lives in ../components.css and is 100% token-driven. This file only
 * composes class names and wires behaviour (loading → disabled + spinner).
 * `forceState` is a showcase-only escape hatch to render hover/pressed/disabled
 * appearance statically; product code never sets it.
 */
import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'ghost'
export type ForceState = 'hover' | 'pressed' | 'disabled'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  /** Invert the primary fill to white-on-black for photo/hero surfaces. */
  onPhoto?: boolean
  /** Show the spinner and block interaction without the disabled styling. */
  loading?: boolean
  /** Showcase only: statically render an interaction state. */
  forceState?: ForceState
}

export function Button({
  variant = 'primary',
  onPhoto = false,
  loading = false,
  forceState,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    'wm-btn',
    `wm-btn--${variant}`,
    onPhoto && variant === 'primary' && 'wm-btn--on-photo',
    loading && 'is-loading',
    forceState && `is-force-${forceState}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="wm-btn__spinner" aria-hidden="true" />}
      <span className="wm-btn__label">{children}</span>
    </button>
  )
}

/*
 * Modal / Sheet surface — the on-brand overlay container (paywall, dialogs,
 * bottom sheets). White surface, 16px radius (--radius-modals), --shadow-lg.
 *
 * Two variants share one surface: `modal` (centered card) and `sheet` (bottom
 * sheet with a grab handle, top corners rounded). Content keeps to two type
 * sizes — a bold title + slate body — like the content card.
 *
 * Modes:
 *  - overlay (default): renders a fixed scrim + dialog; click-scrim / Escape /
 *    close-button dismiss via `onClose`. The real product surface.
 *  - `inline`: renders just the panel (no scrim/fixed positioning) so the
 *    showcase can display the surface statically side by side.
 *
 * Styling is token-only (../components.css).
 */
import { useEffect } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'

export type SheetVariant = 'modal' | 'sheet'

export interface SheetProps {
  variant?: SheetVariant
  /** Bold title (first of the two type sizes). */
  title?: ReactNode
  /** Body copy (second type size). */
  children?: ReactNode
  /** Footer actions — typically a primary + ghost Button. */
  actions?: ReactNode
  /** Render only the panel (no fixed scrim) for static showcase display. */
  inline?: boolean
  /** Overlay mode: whether the surface is shown. Ignored when `inline`. */
  open?: boolean
  /** Dismiss handler (scrim click, Escape, close button). */
  onClose?: () => void
  /** Accessible label when there is no visible title. */
  ariaLabel?: string
}

/* Mono-weight filled close (×) glyph — currentColor, no literal color. */
function CloseIcon() {
  return (
    <svg className="wm-sheet__close-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.41 6.29 6.3-6.3 6.29 1.41 1.41 6.3-6.3 6.29 6.3 1.41-1.41-6.3-6.29 6.3-6.3z" />
    </svg>
  )
}

function Panel({
  variant,
  title,
  children,
  actions,
  onClose,
  ariaLabel,
  modal = false,
}: Omit<SheetProps, 'inline' | 'open'> & { modal?: boolean }) {
  const dialogProps = modal
    ? {
        role: 'dialog',
        'aria-modal': true,
        'aria-label': typeof title === 'string' ? title : ariaLabel,
      }
    : {
        role: 'group',
        'aria-label': typeof title === 'string' ? title : ariaLabel,
      }

  return (
    <div
      className={`wm-sheet wm-sheet--${variant}`}
      {...dialogProps}
    >
      {variant === 'sheet' && <span className="wm-sheet__handle" aria-hidden="true" />}
      <div className="wm-sheet__header">
        {title && <h2 className="wm-sheet__title">{title}</h2>}
        {onClose && (
          <button type="button" className="wm-sheet__close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        )}
      </div>
      {children && <div className="wm-sheet__body">{children}</div>}
      {actions && <div className="wm-sheet__actions">{actions}</div>}
    </div>
  )
}

export function Sheet({
  variant = 'modal',
  title,
  children,
  actions,
  inline = false,
  open = false,
  onClose,
  ariaLabel,
}: SheetProps) {
  // Escape-to-close on the overlay (no-op for inline / closed surfaces).
  useEffect(() => {
    if (inline || !open || !onClose) return
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') onClose!()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inline, open, onClose])

  if (inline) {
    return <Panel variant={variant} title={title} actions={actions} onClose={onClose} ariaLabel={ariaLabel}>{children}</Panel>
  }

  if (!open) return null

  function onScrimKey(e: KeyboardEvent<HTMLDivElement>) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) onClose?.()
  }

  return (
    <div
      className={`wm-overlay wm-overlay--${variant}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
      onKeyDown={onScrimKey}
      role="presentation"
    >
      <Panel variant={variant} title={title} actions={actions} onClose={onClose} ariaLabel={ariaLabel} modal>
        {children}
      </Panel>
    </div>
  )
}

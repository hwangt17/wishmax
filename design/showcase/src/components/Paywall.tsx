/*
 * Paywall Surface — subscription / credits (DESIGN.md "Paywall Surface").
 *
 * Built ON TOP of the US-006 Sheet so the overlay/scrim, 16px radius, --shadow-lg
 * surface, Escape/close dismiss are all reused — never reinvented. The paywall
 * adds the selection body + footer:
 *   - selectable plan cards: selected = black border + a black fill accent (the
 *     radio fills ink with a white check),
 *   - price prominent in the DISPLAY-size type scale. DESIGN.md routes numerals
 *     to Inter ("oversized display numerals") and reserves Space Grotesk for
 *     hero headlines, so the price is Inter at --text-heading-lg, not the
 *     display family,
 *   - a "Restore purchases" link,
 *   - one solid-black primary CTA.
 *
 * DESIGN.md: a gradient wash MAY sit behind the surface as a section background
 * (see App.tsx), but NEVER on the CTA or any interactive element — the CTA is
 * solid black. Styling is token-only (../components.css).
 */
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Sheet } from './Sheet'
import type { SheetProps } from './Sheet'
import { Badge } from './Badge'
import { Button } from './Button'

export interface PaywallPlan {
  id: string
  /** Plan name, e.g. "Annual". */
  name: string
  /** Prominent price string, rendered in the display-size scale. */
  price: string
  /** Optional period suffix, e.g. "/yr". */
  period?: string
  /** Supporting line under the name (per-month math, billing note). */
  caption?: string
  /** Optional highlight pill ("Best value"). */
  badge?: string
}

export interface PaywallProps
  extends Pick<SheetProps, 'inline' | 'open' | 'onClose' | 'ariaLabel'> {
  title?: ReactNode
  /** One-line body under the title. */
  subtitle?: ReactNode
  plans: PaywallPlan[]
  /** Controlled selected plan id (falls back to the first plan if omitted). */
  selectedId?: string
  onSelectPlan?: (id: string) => void
  ctaLabel?: string
  onContinue?: () => void
  onRestore?: () => void
}

/* Mono-weight filled check — currentColor (white over the ink-filled radio). */
function CheckIcon() {
  return (
    <svg className="wm-plan__check" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.55 17.3 4.2 11.95l1.42-1.42 3.93 3.94 8.83-8.84 1.42 1.42z" />
    </svg>
  )
}

export function Paywall({
  title = 'Unlock Wishmax Premium',
  subtitle,
  plans,
  selectedId,
  onSelectPlan,
  ctaLabel = 'Continue',
  onContinue,
  onRestore,
  ...sheet
}: PaywallProps) {
  // Uncontrolled fallback so the component works without external state wiring.
  const [internal, setInternal] = useState(() => selectedId ?? plans[0]?.id)
  const selected = selectedId ?? internal
  function select(id: string) {
    setInternal(id)
    onSelectPlan?.(id)
  }

  const body = (
    <div className="wm-paywall">
      <div className="wm-paywall__plans" role="radiogroup" aria-label="Choose a plan">
        {plans.map((plan) => {
          const isSelected = plan.id === selected
          return (
            <button
              key={plan.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={['wm-plan', isSelected && 'is-selected'].filter(Boolean).join(' ')}
              onClick={() => select(plan.id)}
            >
              <span className="wm-plan__radio" aria-hidden="true">
                <CheckIcon />
              </span>
              <span className="wm-plan__info">
                <span className="wm-plan__name">
                  {plan.name}
                  {plan.badge && <Badge tone="strong">{plan.badge}</Badge>}
                </span>
                {plan.caption && <span className="wm-plan__caption">{plan.caption}</span>}
              </span>
              <span className="wm-plan__price">
                {plan.price}
                {plan.period && <span className="wm-plan__period">{plan.period}</span>}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )

  const actions = (
    <div className="wm-paywall__footer">
      <Button className="wm-paywall__cta" onClick={onContinue}>
        {ctaLabel}
      </Button>
      <button type="button" className="wm-paywall__restore" onClick={onRestore}>
        Restore purchases
      </button>
    </div>
  )

  return (
    <Sheet variant="modal" title={title} actions={actions} {...sheet}>
      {subtitle}
      {body}
    </Sheet>
  )
}

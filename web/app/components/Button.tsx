/*
 * Button — primary filled (black/white) and ghost variants.
 *
 * Ported verbatim from the PRD-01 design system
 * (design/showcase/src/components/Button.tsx). Styling lives in ./chrome.css
 * (the ported token-only `.wm-btn` slice of design/showcase/src/components.css)
 * — real :hover/:active/:disabled pseudo-classes that inline styles can't
 * express. This file only composes class names and wires behaviour.
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Invert the primary fill to white-on-black for photo/hero surfaces. */
  onPhoto?: boolean;
  /** Show the spinner and block interaction without the disabled styling. */
  loading?: boolean;
}

export function Button({
  variant = "primary",
  onPhoto = false,
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    "wm-btn",
    `wm-btn--${variant}`,
    onPhoto && variant === "primary" && "wm-btn--on-photo",
    loading && "is-loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

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
  );
}

export interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  /** Invert the primary fill to white-on-black for photo/hero surfaces. */
  onPhoto?: boolean;
}

/**
 * Anchor styled as a Button — for CTAs that navigate (e.g. #waitlist, and
 * later an App Store / TestFlight link) rather than trigger an action. Shares
 * the `.wm-btn` token styling so it is visually identical to <Button>.
 */
export function ButtonLink({
  variant = "primary",
  onPhoto = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = [
    "wm-btn",
    `wm-btn--${variant}`,
    onPhoto && variant === "primary" && "wm-btn--on-photo",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} {...rest}>
      <span className="wm-btn__label">{children}</span>
    </a>
  );
}

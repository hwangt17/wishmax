"use client";

/*
 * CtaLink (US-012) — the primary "Get my photos" CTA, instrumented.
 *
 * Wraps <ButtonLink> so every primary CTA (header, hero, mobile menu) reads its
 * target from the PRIMARY_CTA swap seam AND fires a `CTA Click` analytics event
 * on click. `location` labels where the click came from in the event payload so
 * the dashboard can compare CTA placements. Rendering a client component inside
 * a server component (Hero) is fine — only this interactive leaf ships JS.
 */
import { ButtonLink, type ButtonLinkProps } from "./Button";
import { PRIMARY_CTA } from "../lib/cta";
import { EVENTS, track } from "../lib/analytics";

export interface CtaLinkProps extends Omit<ButtonLinkProps, "href"> {
  /** Where this CTA lives — recorded on the event (e.g. "header", "hero"). */
  location: string;
  /** Override the swap-seam href (defaults to PRIMARY_CTA.href). */
  href?: string;
}

export function CtaLink({
  location,
  href = PRIMARY_CTA.href,
  onClick,
  children,
  ...rest
}: CtaLinkProps) {
  return (
    <ButtonLink
      href={href}
      onClick={(event) => {
        track(EVENTS.ctaClick, { location, mode: PRIMARY_CTA.mode });
        onClick?.(event);
      }}
      {...rest}
    >
      {children ?? PRIMARY_CTA.label}
    </ButtonLink>
  );
}

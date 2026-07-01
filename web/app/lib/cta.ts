/*
 * Primary call-to-action target — the ONE place to swap pre-launch → launch.
 *
 * Pre-launch the CTA points at the in-page waitlist form (`#waitlist`). At
 * launch, flip `mode` to "store" and set `href` to the App Store / TestFlight
 * URL (and update `label`). Every consumer — SiteHeader, Hero, and the Waitlist
 * section — reads from this constant, so the swap is a one-line change with no
 * component re-architecting.
 */
export type CtaMode = "waitlist" | "store";

export interface CtaTarget {
  mode: CtaMode;
  href: string;
  label: string;
}

export const PRIMARY_CTA: CtaTarget = {
  mode: "waitlist",
  href: "#waitlist",
  label: "Get my photos",
  // At launch, replace the three fields above with e.g.:
  //   mode: "store",
  //   href: "https://apps.apple.com/app/wishmax/idXXXXXXXXXX",
  //   label: "Download on the App Store",
};

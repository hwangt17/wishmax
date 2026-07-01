/*
 * Site-level metadata constants (single source for SEO / social cards).
 *
 * Consumed by the root-layout <metadata>, the OG/Twitter share-card renderer,
 * sitemap.ts, and robots.ts so every SEO surface agrees on one title / desc /
 * origin. The public origin is env-driven (NEXT_PUBLIC_SITE_URL) so preview and
 * production deployments emit correct canonical + absolute OG image URLs; the
 * fallback is the intended production domain. Set NEXT_PUBLIC_SITE_URL in the
 * deploy env (documented in AGENTS.md) — trailing slash is stripped so callers
 * can safely template `${SITE_URL}/...`.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wishmax.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Wishmax";
export const SITE_TAGLINE = "Pro dating photos from your own face";
export const SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  "Your photos are costing you matches. Wishmax turns a few selfies into profile-ready, professional dating photos — no photoshoot required.";

/** Search keywords — kept specific to the product, no keyword stuffing. */
export const SITE_KEYWORDS = [
  "AI dating photos",
  "dating profile pictures",
  "professional headshots from selfies",
  "Tinder photos",
  "Hinge photos",
  "AI headshot generator",
  "dating app photos",
];

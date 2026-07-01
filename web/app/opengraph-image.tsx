/*
 * Designed Open Graph / social share card (1200×630).
 *
 * Rendered with next/og (Satori). Satori can't read CSS variables, so — exactly
 * like design/theme.ts (the RN token mirror) and the gen-*.mjs image generators —
 * this baked raster consumes token VALUES from design/theme.ts for every color,
 * radius, spacing, and the brand font FAMILY (Inter), never ad-hoc hex/family
 * literals. Only the raster-scale font sizes are pixel literals (the token scale
 * tops out at 48px, too small for a 1200×630 card); those are baked image pixels,
 * consistent with the established generator carve-out.
 *
 * Face note: the headline uses heavy Inter (ExtraBold), not the Space Grotesk
 * display face. Space Grotesk ships only as a variable TTF, which Satori's font
 * parser can't read (it throws during prerender). The design system uses Inter
 * for every non-hero heading and Inter 825 for oversized display, so heavy Inter
 * on the share card stays in-system.
 *
 * twitter-image.tsx re-exports this module so the OG and Twitter cards stay identical.
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { theme } from "../../design/theme";
import { SITE_NAME, SITE_TAGLINE } from "./lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Self-hosted brand fonts live in design/fonts/ (repo root = one level up from web/).
const FONT_DIR = join(process.cwd(), "..", "design", "fonts");

type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 700 | 800;
  style: "normal";
};

export default async function OpengraphImage() {
  // Load the real display/text faces so the share card matches the site. If the
  // font files can't be read, fall back to Satori's default sans rather than
  // failing the build.
  let fonts: OgFont[] = [];
  try {
    const [sans, sansBold, sansHeavy] = await Promise.all([
      readFile(join(FONT_DIR, "inter", "Inter-Regular.ttf")),
      readFile(join(FONT_DIR, "inter", "Inter-Bold.ttf")),
      readFile(join(FONT_DIR, "inter", "Inter-ExtraBold.ttf")),
    ]);
    fonts = [
      { name: "Inter", data: sans, weight: 400, style: "normal" },
      { name: "Inter", data: sansBold, weight: 700, style: "normal" },
      { name: "Inter", data: sansHeavy, weight: 800, style: "normal" },
    ];
  } catch {
    fonts = [];
  }

  const { color, spacing, radius, gradient } = theme;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: `${spacing[80]}px`,
          // Periwinkle→white surface wash (gradients on surfaces only, never CTAs).
          background: `linear-gradient(120deg, ${gradient.skyPeriwinkle.colors[0]} 0%, ${color.pureCanvas} 62%)`,
          fontFamily: "Inter",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            fontFamily: "Inter",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: -1,
            color: color.midnightInk,
          }}
        >
          {SITE_NAME}
        </div>

        {/* Headline + subhead (left-aligned per DESIGN.md) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 940,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: color.midnightInk,
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: spacing[24],
              fontFamily: "Inter",
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.35,
              letterSpacing: -0.5,
              color: color.slate,
              maxWidth: 860,
            }}
          >
            A few selfies in. Profile-ready, professional photos out — no photoshoot.
          </div>
        </div>

        {/* Footer: black CTA chip (black/white action system) + origin */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              background: color.midnightInk,
              color: color.pureCanvas,
              fontFamily: "Inter",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: -0.5,
              padding: `${spacing[16]}px ${spacing[30]}px`,
              borderRadius: radius.buttons,
            }}
          >
            Get my photos
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontSize: 24,
              fontWeight: 400,
              color: color.ash,
            }}
          >
            wishmax.app
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}

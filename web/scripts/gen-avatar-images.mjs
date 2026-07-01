/*
 * Testimonial avatar generator (US-007).
 *
 * The social-proof section needs credible member avatars (DESIGN.md: real
 * photography via next/image, no generic stock). Same imagery situation as the
 * hero and gallery (see gen-hero-images.mjs / gen-gallery-images.mjs and the
 * progress.txt "imagery ownership" open question): no licensed customer photos
 * exist yet, so these are SELF-AUTHORED raster portrait stand-ins in a genuine
 * photographic register — a studio head-and-shoulders portrait cropped square
 * for a circular avatar, with directional lighting, styled clothing and film
 * grain, varied per person (skin/hair/wardrobe/palette) so the set reads as
 * different faces. They carry no stock/licensing risk and need no facial
 * likeness (the face sits in soft short-light shadow, a real portrait style).
 * Output is real 1:1 .jpg served through next/image, so licensed photography
 * drops in later at the same paths / square dimensions with no code change.
 *
 * Run: node web/scripts/gen-avatar-images.mjs  (regenerates web/public/testimonials/*)
 *
 * Not wired to the build — assets are committed. Palette values here are baked
 * image pixels, NOT UI design tokens, so they intentionally live outside the
 * DESIGN.md token system (same rule as gen-hero-images.mjs / gen-gallery-images.mjs).
 */
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const S = 480; // square avatar
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "testimonials");

function grain(id, freq, opacity) {
  return `
    <filter id="${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" stitchTiles="stitch" result="n" />
      <feColorMatrix in="n" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${opacity} 0" />
    </filter>`;
}

/*
 * A head-and-shoulders portrait sized/framed for a square avatar crop (mirrors
 * the gen-hero/gen-gallery portrait register so the whole site reads as one
 * imagery family). All avatars are "lit" — they're the polished after look.
 */
function portrait({ cx, cy, hair, skinLit, skinMid, skinShad, garment, garmentLo, collar }) {
  const rx = 128;
  const ry = 158;
  const faceGrad = `
    <linearGradient id="face" x1="0.15" y1="0.2" x2="0.95" y2="0.8">
      <stop offset="0%" stop-color="${skinLit}" />
      <stop offset="45%" stop-color="${skinMid}" />
      <stop offset="100%" stop-color="${skinShad}" />
    </linearGradient>`;

  return `
    <defs>${faceGrad}</defs>

    <!-- torso / garment -->
    <path d="M ${cx - 300} ${S}
             L ${cx - 300} ${cy + 250}
             C ${cx - 300} ${cy + 130} ${cx - 150} ${cy + 178} ${cx} ${cy + 178}
             C ${cx + 150} ${cy + 178} ${cx + 300} ${cy + 130} ${cx + 300} ${cy + 250}
             L ${cx + 300} ${S} Z"
          fill="${garment}" />
    <path d="M ${cx - 86} ${S} L ${cx - 86} ${cy + 210}
             C ${cx - 42} ${cy + 176} ${cx + 42} ${cy + 176} ${cx + 86} ${cy + 210}
             L ${cx + 86} ${S} Z"
          fill="${garmentLo}" opacity="0.6" />
    <path d="M ${cx - 56} ${cy + 178} L ${cx} ${cy + 286} L ${cx + 56} ${cy + 178} Z"
          fill="${collar}" />

    <!-- neck -->
    <path d="M ${cx - 48} ${cy + ry - 34}
             L ${cx - 52} ${cy + 200}
             L ${cx + 52} ${cy + 200}
             L ${cx + 48} ${cy + ry - 34} Z"
          fill="${skinShad}" />

    <!-- hair mass (behind head) -->
    <ellipse cx="${cx}" cy="${cy - 28}" rx="${rx + 16}" ry="${ry - 26}" fill="${hair}" />

    <!-- face -->
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#face)" />
    <ellipse cx="${cx}" cy="${cy - 20}" rx="${rx - 16}" ry="28" fill="${skinShad}" opacity="0.28" />
    <ellipse cx="${cx + 56}" cy="${cy + 58}" rx="58" ry="100" fill="${skinShad}" opacity="0.35" />

    <!-- hair fringe over the top of the face -->
    <path d="M ${cx - rx - 6} ${cy - 36}
             C ${cx - 100} ${cy - ry - 10} ${cx + 100} ${cy - ry - 10} ${cx + rx + 6} ${cy - 36}
             C ${cx + 76} ${cy - 100} ${cx - 76} ${cy - 100} ${cx - rx - 6} ${cy - 36} Z"
          fill="${hair}" />`;
}

/*
 * One avatar = a background gradient + a key-light radial + the portrait + a
 * vignette + grain. `person` varies skin/hair/wardrobe so the set reads as
 * different people; `bg`/`key` set the location mood.
 */
function avatar({ bg, key, keyCx, keyCy, keyR, person, cx = 240, cy = 216, tint }) {
  return `
<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="${bg.cx}" cy="${bg.cy}" r="${bg.r}">
      <stop offset="0%" stop-color="${bg.a}" />
      <stop offset="52%" stop-color="${bg.b}" />
      <stop offset="100%" stop-color="${bg.c}" />
    </radialGradient>
    <radialGradient id="key" cx="${keyCx}" cy="${keyCy}" r="${keyR}">
      <stop offset="0%" stop-color="${key}" stop-opacity="0.5" />
      <stop offset="100%" stop-color="${key}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="vig" cx="50%" cy="48%" r="72%">
      <stop offset="58%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.34" />
    </radialGradient>
    ${grain("g", "1.1", "0.05")}
    <filter id="soft"><feGaussianBlur stdDeviation="0.6" /></filter>
  </defs>

  <rect width="${S}" height="${S}" fill="url(#bg)" />
  <g filter="url(#soft)">
    ${portrait({ cx, cy, ...person })}
  </g>
  ${tint ? `<rect width="${S}" height="${S}" fill="${tint.color}" opacity="${tint.opacity}" />` : ""}
  <rect width="${S}" height="${S}" fill="url(#key)" />
  <rect width="${S}" height="${S}" fill="url(#vig)" />
  <rect width="${S}" height="${S}" filter="url(#g)" />
</svg>`;
}

/* Reusable "people" — varied so the testimonials read as different members. */
const people = {
  warmTan: { hair: "#20160f", skinLit: "#eabd8f", skinMid: "#c88b5c", skinShad: "#6f4527" },
  fairCool: { hair: "#3a2a1c", skinLit: "#f0d3b6", skinMid: "#d6a985", skinShad: "#8a6244" },
  deepWarm: { hair: "#140d08", skinLit: "#a86a3f", skinMid: "#7d4a28", skinShad: "#4a2a16" },
  oliveMed: { hair: "#241a12", skinLit: "#d7ab7d", skinMid: "#b07f52", skinShad: "#6a4a2e" },
};

function wardrobe(garment, garmentLo, collar) {
  return { garment, garmentLo, collar };
}

/* --- Member avatars ------------------------------------------------------- */
const AVATARS = {
  "member-1": avatar({
    bg: { cx: "48%", cy: "30%", r: "95%", a: "#f4e8d6", b: "#e0c39a", c: "#b58a5c" },
    key: "#fff3dd", keyCx: "34%", keyCy: "26%", keyR: "56%",
    person: { ...people.warmTan, ...wardrobe("#2b2f36", "#171a20", "#e9ddc9") },
  }),
  "member-2": avatar({
    bg: { cx: "52%", cy: "28%", r: "94%", a: "#dfe6ec", b: "#aeb9c3", c: "#6c757e" },
    key: "#ffffff", keyCx: "62%", keyCy: "26%", keyR: "54%",
    person: { ...people.fairCool, ...wardrobe("#232a38", "#12161f", "#e9ecf2") },
  }),
  "member-3": avatar({
    bg: { cx: "46%", cy: "32%", r: "98%", a: "#4a5a82", b: "#2b3450", c: "#12162a" },
    key: "#a9c4ff", keyCx: "66%", keyCy: "28%", keyR: "56%",
    person: { ...people.deepWarm, ...wardrobe("#14151c", "#08090d", "#2a2d3a") },
    tint: { color: "#3550a0", opacity: 0.12 },
  }),
};

async function render(name, svg) {
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(join(OUT, `${name}.jpg`));
  console.log("wrote", join(OUT, `${name}.jpg`));
}

await mkdir(OUT, { recursive: true });
for (const [name, svg] of Object.entries(AVATARS)) {
  await render(name, svg);
}

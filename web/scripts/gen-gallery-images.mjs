/*
 * Transformation-gallery image generator (US-005).
 *
 * The gallery shows a range of curated example RESULTS — the profile-ready
 * "after" shots Wishmax produces — across four categories (travel, gym,
 * professional, night-out) so a visitor believes the quality and sees the
 * variety. Same imagery situation as the hero (see gen-hero-images.mjs / the
 * progress.txt "imagery ownership" open question): no licensed model photos
 * exist yet, so these are SELF-AUTHORED raster portrait stand-ins in a genuine
 * photographic register — a studio head-and-shoulders portrait with directional
 * lighting, styled clothing, and film grain, tuned per category (environment
 * palette, key light, wardrobe, framing). They carry no stock/licensing risk
 * and need no facial likeness (the face sits in soft short-light shadow, a real
 * portrait style). Output is real .jpg served through next/image, so licensed
 * photography drops in later at the same paths / 3:4 dimensions with no code
 * change.
 *
 * Run: node web/scripts/gen-gallery-images.mjs  (regenerates web/public/gallery/*)
 *
 * Not wired to the build — assets are committed. Palette values here are baked
 * image pixels, NOT UI design tokens, so they intentionally live outside the
 * DESIGN.md token system (same rule as gen-hero-images.mjs).
 */
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const W = 1200;
const H = 1600;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "gallery");

function grain(id, freq, opacity) {
  return `
    <filter id="${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" stitchTiles="stitch" result="n" />
      <feColorMatrix in="n" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${opacity} 0" />
    </filter>`;
}

/*
 * A head-and-shoulders portrait (mirrors gen-hero-images.mjs so the gallery
 * matches the hero's register). Parameterized so each tile reads as a distinct
 * attractive result. All results are "lit" (they're the polished after shots).
 */
function portrait({ cx, cy, hair, skinLit, skinMid, skinShad, garment, garmentLo, collar }) {
  const rx = 150;
  const ry = 188;
  const faceGrad = `
    <linearGradient id="face" x1="0.15" y1="0.2" x2="0.95" y2="0.8">
      <stop offset="0%" stop-color="${skinLit}" />
      <stop offset="45%" stop-color="${skinMid}" />
      <stop offset="100%" stop-color="${skinShad}" />
    </linearGradient>`;

  return `
    <defs>${faceGrad}</defs>

    <!-- torso / garment -->
    <path d="M ${cx - 430} ${H}
             L ${cx - 430} ${cy + 360}
             C ${cx - 430} ${cy + 180} ${cx - 210} ${cy + 250} ${cx} ${cy + 250}
             C ${cx + 210} ${cy + 250} ${cx + 430} ${cy + 180} ${cx + 430} ${cy + 360}
             L ${cx + 430} ${H} Z"
          fill="${garment}" />
    <path d="M ${cx - 120} ${H} L ${cx - 120} ${cy + 300}
             C ${cx - 60} ${cy + 250} ${cx + 60} ${cy + 250} ${cx + 120} ${cy + 300}
             L ${cx + 120} ${H} Z"
          fill="${garmentLo}" opacity="0.6" />
    <path d="M ${cx - 78} ${cy + 250} L ${cx} ${cy + 400} L ${cx + 78} ${cy + 250} Z"
          fill="${collar}" />

    <!-- neck -->
    <path d="M ${cx - 58} ${cy + ry - 40}
             L ${cx - 62} ${cy + 280}
             L ${cx + 62} ${cy + 280}
             L ${cx + 58} ${cy + ry - 40} Z"
          fill="${skinShad}" />

    <!-- hair mass (behind head) -->
    <ellipse cx="${cx}" cy="${cy - 34}" rx="${rx + 18}" ry="${ry - 30}" fill="${hair}" />

    <!-- face -->
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#face)" />
    <ellipse cx="${cx}" cy="${cy - 24}" rx="${rx - 18}" ry="34" fill="${skinShad}" opacity="0.28" />
    <ellipse cx="${cx + 66}" cy="${cy + 70}" rx="70" ry="120" fill="${skinShad}" opacity="0.35" />

    <!-- hair fringe over the top of the face -->
    <path d="M ${cx - rx - 6} ${cy - 44}
             C ${cx - 120} ${cy - ry - 12} ${cx + 120} ${cy - ry - 12} ${cx + rx + 6} ${cy - 44}
             C ${cx + 90} ${cy - 120} ${cx - 90} ${cy - 120} ${cx - rx - 6} ${cy - 44} Z"
          fill="${hair}" />`;
}

/*
 * One tile = a background gradient (the category environment) + a key-light
 * radial + the portrait + a vignette + grain. `person` varies skin/hair/wardrobe
 * so the set reads as different people; `bg`/`key`/`keyPos` set the location mood.
 */
function tile({ bg, key, keyCx, keyCy, keyR, person, cx = 600, cy = 640, tint }) {
  return `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
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
    ${grain("g", "0.9", "0.05")}
    <filter id="soft"><feGaussianBlur stdDeviation="0.8" /></filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)" />
  <g filter="url(#soft)">
    ${portrait({ cx, cy, ...person })}
  </g>
  ${tint ? `<rect width="${W}" height="${H}" fill="${tint.color}" opacity="${tint.opacity}" />` : ""}
  <rect width="${W}" height="${H}" fill="url(#key)" />
  <rect width="${W}" height="${H}" fill="url(#vig)" />
  <rect width="${W}" height="${H}" filter="url(#g)" />
</svg>`;
}

/* Reusable "people" — varied so the gallery communicates range. */
const people = {
  warmTan: { hair: "#20160f", skinLit: "#eabd8f", skinMid: "#c88b5c", skinShad: "#6f4527" },
  fairCool: { hair: "#3a2a1c", skinLit: "#f0d3b6", skinMid: "#d6a985", skinShad: "#8a6244" },
  deepWarm: { hair: "#140d08", skinLit: "#a86a3f", skinMid: "#7d4a28", skinShad: "#4a2a16" },
  oliveMed: { hair: "#241a12", skinLit: "#d7ab7d", skinMid: "#b07f52", skinShad: "#6a4a2e" },
};

function wardrobe(garment, garmentLo, collar) {
  return { garment, garmentLo, collar };
}

/* --- Category tiles ------------------------------------------------------- */
const TILES = {
  /* Travel — golden-hour outdoor / coastal, light warm wardrobe. */
  "travel-1": tile({
    bg: { cx: "48%", cy: "30%", r: "95%", a: "#fbe6c2", b: "#f0c98f", c: "#c78a4e" },
    key: "#fff4dc", keyCx: "36%", keyCy: "26%", keyR: "58%",
    person: { ...people.warmTan, ...wardrobe("#f2ede1", "#d9d0bd", "#c9b78f") },
    cx: 600, cy: 650,
  }),
  "travel-2": tile({
    bg: { cx: "44%", cy: "34%", r: "98%", a: "#cfe6ef", b: "#8fb9cf", c: "#4f7f9c" },
    key: "#fff1d8", keyCx: "62%", keyCy: "28%", keyR: "56%",
    person: { ...people.oliveMed, ...wardrobe("#e7ddc9", "#cbbfa3", "#b8a67e") },
    cx: 640, cy: 640,
  }),

  /* Gym — cool high-contrast athletic, steel/teal. */
  "gym-1": tile({
    bg: { cx: "46%", cy: "28%", r: "94%", a: "#c4ccd2", b: "#8d98a1", c: "#4b555d" },
    key: "#eaffff", keyCx: "34%", keyCy: "24%", keyR: "52%",
    person: { ...people.deepWarm, ...wardrobe("#20262b", "#0f1316", "#3a444b") },
    cx: 600, cy: 640, tint: { color: "#2a6e78", opacity: 0.12 },
  }),
  "gym-2": tile({
    bg: { cx: "52%", cy: "30%", r: "94%", a: "#a9dfe0", b: "#5fa9ac", c: "#2b666a" },
    key: "#f2ffff", keyCx: "64%", keyCy: "26%", keyR: "54%",
    person: { ...people.oliveMed, ...wardrobe("#15302f", "#0a1817", "#2e5150") },
    cx: 620, cy: 650,
  }),

  /* Professional — neutral studio grey, tailored wardrobe. */
  "professional-1": tile({
    bg: { cx: "50%", cy: "30%", r: "92%", a: "#e6e6e6", b: "#b9b9b9", c: "#6f6f6f" },
    key: "#ffffff", keyCx: "36%", keyCy: "26%", keyR: "50%",
    person: { ...people.fairCool, ...wardrobe("#232a38", "#12161f", "#e9ecf2") },
    cx: 600, cy: 640,
  }),
  "professional-2": tile({
    bg: { cx: "48%", cy: "28%", r: "92%", a: "#efe9e0", b: "#c3bbb0", c: "#7c766c" },
    key: "#fff8ee", keyCx: "38%", keyCy: "24%", keyR: "52%",
    person: { ...people.warmTan, ...wardrobe("#2c2c31", "#161619", "#d9d2c6") },
    cx: 620, cy: 650,
  }),

  /* Night-out — moody deep blue / violet ambient, rim light. */
  "night-out-1": tile({
    bg: { cx: "44%", cy: "32%", r: "98%", a: "#3b4a72", b: "#232b47", c: "#0e1120" },
    key: "#a9c4ff", keyCx: "68%", keyCy: "30%", keyR: "56%",
    person: { ...people.deepWarm, ...wardrobe("#14151c", "#08090d", "#2a2d3a") },
    cx: 580, cy: 650, tint: { color: "#3550a0", opacity: 0.16 },
  }),
  "night-out-2": tile({
    bg: { cx: "52%", cy: "30%", r: "98%", a: "#5a3c76", b: "#37244b", c: "#150d21" },
    key: "#ffb8e6", keyCx: "34%", keyCy: "28%", keyR: "56%",
    person: { ...people.fairCool, ...wardrobe("#191420", "#0c0910", "#332a40") },
    cx: 620, cy: 650, tint: { color: "#7a3fa0", opacity: 0.16 },
  }),
};

async function render(name, svg) {
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, `${name}.jpg`));
  console.log("wrote", join(OUT, `${name}.jpg`));
}

await mkdir(OUT, { recursive: true });
for (const [name, svg] of Object.entries(TILES)) {
  await render(name, svg);
}

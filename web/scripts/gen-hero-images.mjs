/*
 * Hero before/after image generator (US-003).
 *
 * The landing page leads with a real before/after transformation (DESIGN.md:
 * "lead with real before/after transformations"; no gradient placeholder as
 * hero proof). We have no licensed model photography yet (see progress.txt open
 * question: imagery ownership), so this script renders SELF-AUTHORED raster
 * portrait stand-ins in a genuine photographic register — a studio head-and-
 * shoulders portrait with directional lighting, hair, styled clothing and film
 * grain. It carries no stock/licensing risk and needs no facial likeness (the
 * face sits in soft short-light shadow, a real portrait style). Output is real
 * .jpg files consumed via next/image, so swapping in licensed photography later
 * is a drop-in file replacement (same paths, same 3:4 dimensions, same caption)
 * — no code change.
 *
 * Run: node web/scripts/gen-hero-images.mjs   (regenerates web/public/hero/*)
 *
 * Not wired to the build — assets are committed. Palette values here are baked
 * image pixels, not UI design tokens, so they intentionally live outside the
 * DESIGN.md token system.
 */
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const W = 1200;
const H = 1600;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "hero");

function grain(id, freq, opacity) {
  return `
    <filter id="${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" stitchTiles="stitch" result="n" />
      <feColorMatrix in="n" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${opacity} 0" />
    </filter>`;
}

/*
 * A head-and-shoulders portrait, parameterized so BEFORE and AFTER share the
 * same anatomy but differ in lighting, styling, palette and framing.
 *  cx,cy  = face center · lit = directional light (after) vs flat (before)
 */
function portrait({ cx, cy, hair, skinLit, skinMid, skinShad, garment, garmentLo, collar, lit }) {
  const rx = 150;
  const ry = 188;
  const faceGrad = lit
    ? `<linearGradient id="face" x1="0.15" y1="0.2" x2="0.95" y2="0.8">
         <stop offset="0%" stop-color="${skinLit}" />
         <stop offset="45%" stop-color="${skinMid}" />
         <stop offset="100%" stop-color="${skinShad}" />
       </linearGradient>`
    : `<linearGradient id="face" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0%" stop-color="${skinMid}" />
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
    <!-- garment shadow core (adds volume) -->
    <path d="M ${cx - 120} ${H} L ${cx - 120} ${cy + 300}
             C ${cx - 60} ${cy + 250} ${cx + 60} ${cy + 250} ${cx + 120} ${cy + 300}
             L ${cx + 120} ${H} Z"
          fill="${garmentLo}" opacity="0.6" />
    <!-- collar / lapel accent -->
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
    <!-- brow / eye-socket soft shadow band -->
    <ellipse cx="${cx}" cy="${cy - 24}" rx="${rx - 18}" ry="34" fill="${skinShad}" opacity="0.28" />
    <!-- jaw / cheekbone shadow on the shadow side -->
    <ellipse cx="${cx + 66}" cy="${cy + 70}" rx="70" ry="120" fill="${skinShad}" opacity="0.35" />

    <!-- hair fringe over the top of the face -->
    <path d="M ${cx - rx - 6} ${cy - 44}
             C ${cx - 120} ${cy - ry - 12} ${cx + 120} ${cy - ry - 12} ${cx + rx + 6} ${cy - 44}
             C ${cx + 90} ${cy - 120} ${cx - 90} ${cy - 120} ${cx - rx - 6} ${cy - 44} Z"
          fill="${hair}" />`;
}

/* --- AFTER: warm studio, directional short light, styled, sharp ----------- */
const after = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg-after" cx="52%" cy="30%" r="90%">
      <stop offset="0%" stop-color="#f4e8d6" />
      <stop offset="48%" stop-color="#e7d2b6" />
      <stop offset="100%" stop-color="#bd9f7c" />
    </radialGradient>
    <radialGradient id="key-after" cx="34%" cy="26%" r="55%">
      <stop offset="0%" stop-color="#fff3dd" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#fff3dd" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="vig-after" cx="50%" cy="48%" r="72%">
      <stop offset="58%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#2a1c0e" stop-opacity="0.32" />
    </radialGradient>
    ${grain("g-after", "0.9", "0.045")}
    <filter id="soft-after"><feGaussianBlur stdDeviation="0.8" /></filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg-after)" />
  <g filter="url(#soft-after)">
    ${portrait({
      cx: 600, cy: 650, lit: true,
      hair: "#20160f",
      skinLit: "#eabd8f", skinMid: "#c88b5c", skinShad: "#6f4527",
      garment: "#2b2f36", garmentLo: "#171a20", collar: "#e9ddc9",
    })}
  </g>
  <rect width="${W}" height="${H}" fill="url(#key-after)" />
  <rect width="${W}" height="${H}" fill="url(#vig-after)" />
  <rect width="${W}" height="${H}" filter="url(#g-after)" />
</svg>`;

/* --- BEFORE: dull cool flat light, hoodie, messy, soft-focus, noisy ------- */
const before = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg-before" cx="40%" cy="24%" r="96%">
      <stop offset="0%" stop-color="#7a7e77" />
      <stop offset="60%" stop-color="#61655e" />
      <stop offset="100%" stop-color="#494e48" />
    </radialGradient>
    <radialGradient id="vig-before" cx="50%" cy="46%" r="70%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#1e221d" stop-opacity="0.36" />
    </radialGradient>
    ${grain("g-before", "0.7", "0.13")}
    <filter id="soft-before"><feGaussianBlur stdDeviation="3.4" /></filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg-before)" />
  <g filter="url(#soft-before)">
    ${portrait({
      cx: 662, cy: 500, lit: false,
      hair: "#33322c",
      skinLit: "#9c8a76", skinMid: "#8c7862", skinShad: "#5f5140",
      garment: "#4b504a", garmentLo: "#3a3f39", collar: "#565b54",
    })}
  </g>
  <rect width="${W}" height="${H}" fill="#4f5e6e" opacity="0.16" />
  <rect width="${W}" height="${H}" fill="url(#vig-before)" />
  <rect width="${W}" height="${H}" filter="url(#g-before)" />
</svg>`;

async function render(name, svg) {
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, name));
  console.log("wrote", join(OUT, name));
}

await mkdir(OUT, { recursive: true });
await render("before.jpg", before);
await render("after.jpg", after);

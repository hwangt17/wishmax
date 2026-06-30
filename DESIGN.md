# Wishmax — Design System (Source of Truth)

> **This file is the single source of truth for all visual design in Wishmax (website + app).**
> Adapted from Partiful's system: a light, white-canvas aesthetic where the page stays quiet and bright while curated photography and gradient washes carry the energy. Every color, type, spacing, radius, and shadow value below is a **token**. Code must consume tokens — never hardcode hex/px/font values. When a value changes, change it here first, then in the token files.

**Theme:** light · **Density:** comfortable · **Action system:** black & white (no colored buttons)

---

## Brand

**Product:** Wishmax — generate dating-profile-worthy photos by putting *your own face* into curated, attractive, professional-looking template photos. Browse a feed, pick photos you love, apply your face, get profile-ready shots.

**Audience:** primarily younger men who want more matches on dating apps. The promise: *anything you wish for comes true just by changing your profile photo.*

**Personality:** confident · aspirational · a little playful · clean and premium without being cold. The "wish" energy is optimistic and light — not dark, not clinical, not try-hard.

**Visual strategy (inherited from Partiful):** a bright white canvas gives way to full-bleed photographic heroes washed in pink-to-periwinkle gradients, then returns to white for feature sections with soft periwinkle-to-white gradient backgrounds. Type pairs a confident display face for statement headlines with a clean grotesk for all UI text. **Black is the primary action color** — filled black buttons, black headings, black borders; no colored accent dilutes the contrast. Photography and before/after transformations are the hero; UI chrome stays minimal.

### Anti-AI-slop guardrails
- No purple→blue SaaS gradients on buttons. Buttons are **black** (or white-on-photo). Gradients are **surfaces/overlays only**.
- No generic centered hero clichés with a stock smile. Lead with **real before/after transformations**.
- No 3+ font sizes cascading in one card. Hierarchy is **title + body**, period.
- No drop shadows on full-bleed sections. Elevation lives only on cards and floating widgets.
- Body copy is **left-aligned**, even in centered sections.

---

## Fonts (Wishmax substitutes for Partiful's proprietary faces)

Partiful's "Partiful Display Medium" and "TWK Lausanne Pan" are proprietary. Wishmax uses their documented open substitutes so we can ship legally on web and bundle in React Native:

| Role | Wishmax font | Replaces | Usage |
|------|--------------|----------|-------|
| Display | **Space Grotesk** (Medium 500) | Partiful Display Medium | Hero headlines & largest section titles **only**, ≥ 26px. Slightly rounded geometric, celebratory but not childish. |
| Text / UI | **Inter** (variable, 400–825) | TWK Lausanne Pan | Everything else: nav, body, labels, buttons, captions, oversized display numerals. One family, full weight axis. |

> The dozen `TWK Lausanne Pan 400/500/550/...` entries in the original extraction are collapsed into the **Inter** variable axis (400 prose · 550–650 UI emphasis · 700 headings · 825 oversized numerals). Letter-spacing: **-0.02em** at regular weights (400–600), **-0.04em** at heavy weights (650–825), **-0.03em** at the 112px display numeral.

---

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Midnight Ink | `#000000` | `--color-midnight-ink` | Primary text, filled CTA buttons, icon fills, card borders. Black on white is the entire contrast system; no colored accent dilutes it. |
| Pure Canvas | `#ffffff` | `--color-pure-canvas` | Page background, card surfaces, button text on dark/photo, nav surfaces. |
| Graphite | `#333333` | `--color-graphite` | Secondary body text, footer links, supporting labels. |
| Slate | `#666666` | `--color-slate` | Tertiary body copy, descriptive paragraphs, helper text. |
| Ash | `#999999` | `--color-ash` | Muted captions, attribution, sub-labels. |
| Fog | `#b3b3b3` | `--color-fog` | Footer section headings, disabled labels. |
| Silver | `#cccccc` | `--color-silver` | Hairline borders, disabled button backgrounds. |
| Warm Sand | `#d9c58b` | `--color-warm-sand` | Active nav/filter highlight text **only** — the single warm accent, reads as a selected-state indicator, not a general accent. |
| Party Pink | `linear-gradient(rgb(248,196,255) 0%, rgb(240,182,224) 100%)` | `--gradient-party-pink` | Hero gradient & announcement banner — soft pink-violet wash over photography. |
| Sky Periwinkle | `linear-gradient(rgba(150,196,255,0.1) 0%, #ffffff 100%)` | `--gradient-sky-periwinkle` | Feature-section background wash — faint blue tint dissolving to white. |
| Spearmint | `linear-gradient(130deg, rgb(133,218,220) 0%, rgb(192,226,226) 100%)` | `--gradient-spearmint` | Decorative content-level gradient inside template/preview imagery. |
| Midnight Blue | `#001666` | `--color-midnight-blue` | Deep brand accent inside decorative template designs. |

**Semantic colors — reserved for generation/job status only** (never decorative): Success/Done `#31c431` · Pending/Processing `#ffae00` · Failed `#ff0000`.

---

## Tokens — Typography

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 11px | 1.2 | -0.22px | `--text-caption` |
| body | 14px | 1.4 | -0.28px | `--text-body` |
| heading-sm | 18px | 1.4 | -0.36px | `--text-heading-sm` |
| heading | 24px | 1.2 | -0.96px | `--text-heading` |
| heading-lg | 36px | 1.2 | -1.44px | `--text-heading-lg` |
| display | 48px | 1.0 | -0.96px | `--text-display` |

Weights: `400` regular · `500` medium · `550` w550 · `600` semibold · `700` bold · `825` w825 (oversized numerals only). Display face (Space Grotesk) used **only** at display/heading-lg for hero statements; all other headings use Inter 700.

### Component text tokens

Two component specs (badge, ghost button) call for sizes outside the core scale. They are tokens too — components must reference them, never the literals:

| Role | Size | Line Height | Token | Used by |
|------|------|-------------|-------|---------|
| label | 12px | 1.2 | `--text-label` / `--leading-label` | pill badges, category/status tags |
| ui-lg | 16px | 1.4 | `--text-ui-lg` / `--leading-ui-lg` | ghost / secondary buttons |

---

## Tokens — Spacing & Shapes

**Spacing scale (px):** 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 30 · 40 · 60 · 80 · 100 · 120 · 160 (tokens `--spacing-{n}`).

**Border radius:** cards 12 · images 12 · inputs 8 · buttons 8 · modals 16 · nav pills 4 · badges/pills **960** (full). Tokens `--radius-{role}`.

**Shadows:** `--shadow-sm: rgba(0,0,0,0.1) 0px 0px 6px 0px` · `--shadow-lg: rgba(0,0,0,0.1) 0px 0px 20px 0px`. Elevated cards may stack the multi-layer `rgba(0,0,0,0.05)` shadow (0.8px → 60px spread).

**Layout:** page max-width `1200px` · section gap `80px` · element gap `10px`.

**Surfaces:** `0` Canvas `#ffffff` · `1` Card `#ffffff` (separated by shadow, not color) · `2` Gradient Wash (periwinkle/pink, the only non-white surface) · `3` Overlay Ink `#000000` (dark gradient over hero photography for legible white text).

**Ink tints** (chip containers & badge fills — a transparent black wash over the canvas, not a new hue): `--surface-tint-soft: rgba(0,0,0,0.05)` · `--surface-tint-strong: rgba(0,0,0,0.2)`.

**Photo scrim** (the concrete form of the Overlay Ink surface — a dark→transparent gradient behind top-corner chips/badges so they stay legible over full-bleed photography): `--gradient-scrim: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 38%)`. Used only on the Feed Photo Tile, never as a brand wash.

---

## Components

> Styling values below are **identical to Partiful's**; only the roles are re-mapped to Wishmax.

### Primary Filled Button — main CTAs ("Get my photos", "Apply my face", "Upload selfie")
Background `#000000`, text `#ffffff`, radius 8px, padding 10px 24px. Inter 700, 14px, -0.04em. On photo/hero sections: white fill, black text. No shadow at rest. Hover: opacity → 0.85.

### Ghost Button — login / secondary header action
Transparent bg, 1px solid `#000000`, text `#000000`, radius 4px, padding 10px 24px. Inter 550, 16px.

### Pill Badge / Tag — category label, "Premium"/lock, credits remaining, generation status
Bg `rgba(0,0,0,0.05)` or `rgba(0,0,0,0.2)`, radius 960px (full), padding 6px 12px, text `#000000` 12px Inter 700. Status variants use the semantic colors (Done/Processing/Failed) — **only** for generation state.

### Filter Chip — gender selector & category filter (the app's primary control)
Pill container `rgba(0,0,0,0.05)`; active chip white bg with `--shadow-sm`; radius 960px; Inter 550, 14px; padding 8px 16px. Active label may use Warm Sand `#d9c58b` on dark/photo headers.

### Standard Content Card — feature, testimonial, info tiles
Bg `#ffffff`, radius 12px, `--shadow-sm`, padding 12px 16px 16px. Title Inter 700 18px; body `#666666` 14px Inter 400. Max two type sizes.

### Feed Photo Tile — THE hero component (curated template tiles + result thumbnails)
~3:4 portrait, radius 12px, **full-bleed image, no overlaid text label** by default. Optional top-corner category chip and lock/Premium badge over a subtle gradient scrim for legibility. Loading: shimmer skeleton at same radius. Displayed in scrolling rows/grids, or scattered at ±10–15° rotation in marketing showcase sections.

### Before/After Card — transformation proof (marketing) & result reveal (app)
Two Feed Tiles paired (or a slider), radius 12px, `--shadow-sm`. Labels "Before"/"After" as small pill badges. This is the primary credibility component — lead with it.

### Paywall Surface — subscription / credits
White modal surface, radius 16px, `--shadow-lg`. Plan options as selectable cards (selected = black border / black fill accent), price prominent in display type, "Restore purchases" present. Black primary CTA. Gradient wash allowed as section background behind it, never on the button.

### Generation Progress / Reveal — signature moment
Tasteful progress (not a raw spinner) over a `#ffffff` or gradient-wash surface; on completion the result reveals via the Before/After card. Status pill reflects Processing → Done/Failed using semantic colors.

### Hero Section (landing) — full-bleed photo + gradient overlay
Full-width, ~420px tall. Full-bleed editorial/result photography with Party Pink overlay (~0.4 opacity) fading left→right. Headline Space Grotesk 48px white; subtext Inter 400 18px white; white ghost CTA. 2px backdrop blur behind text for legibility. **No shadow on this section.**

### Announcement Banner — top promo strip
Full width ~32px, Party Pink gradient bg, text `#000000` Inter 550 14px centered, flanked by emoji. The only place saturated pink appears in chrome rather than imagery.

### App Notification Preview (marketing decoration)
White, radius 16px, `--shadow-lg`, ~240px. App icon 32px (radius 8px), headline semibold 12px, subtext 11px `#666666`, black action button (white text, radius 40px, padding 6px 16px).

---

## Do's and Don'ts

**Do**
- Use `#000000` filled buttons with white text + 8px radius for every primary CTA — no colored accent replaces this.
- Inter at -0.04em for headings ≥ 24px; -0.02em for body 14–18px.
- 960px radius for all pills/badges/filter chips — never a small radius on these.
- Wrap feature sections in periwinkle→white gradient washes, alternating with pure-white sections for rhythm.
- Scatter template tiles at ±10–15° rotation in showcase sections — the tilted stack communicates variety and "pick your vibe."
- Reserve Space Grotesk for hero/large display only; Inter 700 for all other headings.
- Use `#31c431 / #ffae00 / #ff0000` **only** for generation status (Done/Processing/Failed).

**Don't**
- Never use a colored accent (purple/blue/pink) as a button fill — action hierarchy is black & white only.
- No box-shadow on hero/full-bleed sections — elevation is for cards & floating widgets only.
- No Space Grotesk below 26px — use Inter 700.
- Never use Warm Sand `#d9c58b` for anything but the active nav/filter state.
- Don't center body paragraphs in feature sections — keep them left-aligned.
- Max 2 type sizes per card.
- Never apply pink/periwinkle gradients to interactive components (buttons, inputs, chips) — surfaces/overlays only.

---

## Imagery

Three registers: **(1) Result/lifestyle photography** — attractive, profile-worthy shots used full-bleed in the hero with a pink-violet gradient overlay that tints without obscuring. **(2) Template & before/after tiles** — the dominant imagery, portrait 3:4, shown in scrolling rows/grids and scattered at ±10–15° in feature sections. **(3) Product UI screenshots** — clean white app screens in card mockups with realistic shadow to demo features. Icons are filled mono-weight shapes at 16–20px, only `#000000` or `#ffffff`. No abstract geometric SVG decoration. Image density is medium-high — photography occupies most above-fold real estate.

---

## Token Pipeline (how code consumes this)

One source → both platforms. Keep these in sync with the tables above:
- **Web (Next.js + Tailwind):** a Tailwind `@theme` block / `globals.css` with the CSS custom properties below.
- **App (React Native):** a typed `theme.ts` object mirroring the same values (RN can't read CSS vars).
- Components reference tokens (`var(--color-...)` / `theme.color...`), never literal values.

### CSS / Tailwind v4 `@theme`

```css
@theme {
  /* Colors */
  --color-midnight-ink: #000000;
  --color-pure-canvas: #ffffff;
  --color-graphite: #333333;
  --color-slate: #666666;
  --color-ash: #999999;
  --color-fog: #b3b3b3;
  --color-silver: #cccccc;
  --color-warm-sand: #d9c58b;
  --color-party-pink: #f8c4ff;
  --color-sky-periwinkle: #96c4ff;
  --color-spearmint: #85dadc;
  --color-midnight-blue: #001666;
  --color-status-done: #31c431;
  --color-status-processing: #ffae00;
  --color-status-failed: #ff0000;

  /* Gradients (surfaces/overlays only) */
  --gradient-party-pink: linear-gradient(rgb(248,196,255) 0%, rgb(240,182,224) 100%);
  --gradient-sky-periwinkle: linear-gradient(rgba(150,196,255,0.1) 0%, #ffffff 100%);
  --gradient-spearmint: linear-gradient(130deg, rgb(133,218,220) 0%, rgb(192,226,226) 100%);
  /* Photo scrim — Feed Photo Tile legibility overlay (Overlay Ink, concrete form) */
  --gradient-scrim: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 38%);

  /* Fonts */
  --font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;

  /* Type scale */
  --text-caption: 11px;     --leading-caption: 1.2;     --tracking-caption: -0.22px;
  --text-body: 14px;        --leading-body: 1.4;        --tracking-body: -0.28px;
  --text-heading-sm: 18px;  --leading-heading-sm: 1.4;  --tracking-heading-sm: -0.36px;
  --text-heading: 24px;     --leading-heading: 1.2;     --tracking-heading: -0.96px;
  --text-heading-lg: 36px;  --leading-heading-lg: 1.2;  --tracking-heading-lg: -1.44px;
  --text-display: 48px;     --leading-display: 1.0;     --tracking-display: -0.96px;
  /* Component text (badge / ghost button) — outside the core scale */
  --text-label: 12px;       --leading-label: 1.2;
  --text-ui-lg: 16px;       --leading-ui-lg: 1.4;

  /* Weights */
  --font-weight-regular: 400; --font-weight-medium: 500; --font-weight-w550: 550;
  --font-weight-semibold: 600; --font-weight-bold: 700; --font-weight-w825: 825;

  /* Spacing */
  --spacing-4: 4px;   --spacing-6: 6px;   --spacing-8: 8px;   --spacing-10: 10px;
  --spacing-12: 12px; --spacing-16: 16px; --spacing-20: 20px; --spacing-24: 24px;
  --spacing-30: 30px; --spacing-40: 40px; --spacing-60: 60px; --spacing-80: 80px;
  --spacing-100: 100px; --spacing-120: 120px; --spacing-160: 160px;

  /* Radius */
  --radius-navpills: 4px; --radius-buttons: 8px; --radius-inputs: 8px;
  --radius-cards: 12px; --radius-images: 12px; --radius-modals: 16px;
  --radius-badges: 960px; --radius-full: 960px;

  /* Shadows */
  --shadow-sm: rgba(0,0,0,0.1) 0px 0px 6px 0px;
  --shadow-lg: rgba(0,0,0,0.1) 0px 0px 20px 0px;

  /* Layout */
  --page-max-width: 1200px; --section-gap: 80px; --element-gap: 10px;

  /* Surfaces */
  --surface-canvas: #ffffff; --surface-card: #ffffff;
  --surface-gradient-wash: #96c4ff; --surface-overlay-ink: #000000;
  --surface-tint-soft: rgba(0, 0, 0, 0.05); --surface-tint-strong: rgba(0, 0, 0, 0.2);
}
```

### React Native `theme.ts` (shape)

```ts
export const theme = {
  color: {
    midnightInk: '#000000', pureCanvas: '#ffffff', graphite: '#333333',
    slate: '#666666', ash: '#999999', fog: '#b3b3b3', silver: '#cccccc',
    warmSand: '#d9c58b', partyPink: '#f8c4ff', skyPeriwinkle: '#96c4ff',
    spearmint: '#85dadc', midnightBlue: '#001666',
    statusDone: '#31c431', statusProcessing: '#ffae00', statusFailed: '#ff0000',
  },
  font: { display: 'SpaceGrotesk', sans: 'Inter' },
  text: {
    caption: { size: 11, lineHeight: 13, tracking: -0.22 },
    body: { size: 14, lineHeight: 20, tracking: -0.28 },
    headingSm: { size: 18, lineHeight: 25, tracking: -0.36 },
    heading: { size: 24, lineHeight: 29, tracking: -0.96 },
    headingLg: { size: 36, lineHeight: 43, tracking: -1.44 },
    display: { size: 48, lineHeight: 48, tracking: -0.96 },
    label: { size: 12, lineHeight: 14, tracking: -0.24 },
    uiLg: { size: 16, lineHeight: 22, tracking: -0.32 },
  },
  weight: { regular: '400', medium: '500', w550: '550', semibold: '600', bold: '700', w825: '825' },
  spacing: { 4:4, 6:6, 8:8, 10:10, 12:12, 16:16, 20:20, 24:24, 30:30, 40:40, 60:60, 80:80, 100:100, 120:120, 160:160 },
  radius: { navpills: 4, buttons: 8, inputs: 8, cards: 12, images: 12, modals: 16, badges: 960, full: 960 },
  // Gradients: surfaces/overlays only — never on interactive components.
  // RN has no CSS gradient; feed these to <LinearGradient> (expo-linear-gradient).
  gradient: {
    partyPink:     { colors: ['#f8c4ff', '#f0b6e0'], locations: [0, 1], start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
    skyPeriwinkle: { colors: ['rgba(150,196,255,0.1)', '#ffffff'], locations: [0, 1], start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
    spearmint:     { colors: ['#85dadc', '#c0e2e2'], locations: [0, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }, // ~130deg
    // Photo scrim — Feed Photo Tile legibility overlay (top-down dark fade).
    scrim:         { colors: ['rgba(0,0,0,0.45)', 'rgba(0,0,0,0)'], locations: [0, 0.38], start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  },
  // Shadows: RN shadow props (iOS) + elevation (Android). Mirrors --shadow-sm / --shadow-lg.
  shadow: {
    sm: { shadowColor: '#000000', shadowOpacity: 0.1, shadowRadius: 6,  shadowOffset: { width: 0, height: 0 }, elevation: 2 },
    lg: { shadowColor: '#000000', shadowOpacity: 0.1, shadowRadius: 20, shadowOffset: { width: 0, height: 0 }, elevation: 8 },
  },
  layout: { pageMaxWidth: 1200, sectionGap: 80, elementGap: 10 },
  // Surfaces: 0 canvas · 1 card (separated by shadow, not color) · 2 gradient wash · 3 overlay ink.
  surface: {
    canvas: '#ffffff', card: '#ffffff', gradientWash: '#96c4ff', overlayInk: '#000000',
    tintSoft: 'rgba(0,0,0,0.05)', tintStrong: 'rgba(0,0,0,0.2)',
  },
} as const
```

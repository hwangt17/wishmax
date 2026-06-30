# Wishmax Design Tokens (`design/`)

Portable design-system artifacts. **[`../DESIGN.md`](../DESIGN.md) is the single
source of truth** for every visual value. The files here are *generated mirrors*
of those token tables — code consumes these, never the literals.

## Files

| File | Platform | Purpose |
|------|----------|---------|
| `tokens.css` | Web (Next.js + Tailwind v4) | `@theme` block of CSS custom properties. Imported by the showcase harness and, later, by PRD-02's marketing site. |
| `fonts.css` | Web | `@font-face` declarations defining the `"Inter"` and `"Space Grotesk"` families referenced by the `--font-*` tokens. Import it (after `tokens.css`) in any web app that bundles `fonts/`. |
| `fonts/` | Web + RN | Self-hosted brand font binaries + licenses. See **Brand fonts** below. |
| `fonts/expo-font.config.ts` | React Native (Expo) | `expo-font` registration config (variable + static strategies) for PRD-03 to bundle. |
| `theme.ts` | React Native (Expo) | Typed `theme` object mirroring the same values. RN can't read CSS vars, so it imports this. Consumed later by PRD-03's app. |
| `tsconfig.json` | — | Minimal standalone config so `theme.ts` typechecks in isolation. |

## How to keep the two token files in sync

1. **Change `../DESIGN.md` first.** Add/edit the value in the relevant token table.
2. Update the matching token in **both** `tokens.css` and `theme.ts`.
3. Use the same logical name across files: CSS `--color-midnight-ink` ⇄ TS `color.midnightInk`,
   CSS `--radius-cards` ⇄ TS `radius.cards`, etc. (kebab-case ⇄ camelCase).
4. Run the typecheck (below) and the showcase build before committing.

Any platform-portable value (colors, type sizes, radii, spacing) **must be identical**
across `DESIGN.md`, `tokens.css`, and `theme.ts`.

## Intentional React Native adaptations

Some CSS-only constructs cannot be expressed verbatim in RN. These are the only
places `theme.ts` deliberately diverges in *form* (never in value):

- **Gradients** — CSS gradient strings become objects (`{ colors, locations, start, end }`)
  for `expo-linear-gradient`'s `<LinearGradient>`. Gradients remain surfaces/overlays only.
- **Shadows** — CSS `box-shadow` becomes RN shadow props (`shadowColor/Opacity/Radius/Offset`,
  iOS) plus `elevation` (Android). Values mirror `--shadow-sm` / `--shadow-lg`.
- **Type line-height** — CSS uses a unitless multiplier (e.g. `1.2`); RN needs an absolute
  px number, so `theme.text.*.lineHeight` is the pre-computed pixel value (size × multiplier, rounded).
- **Full-pill radius** — the `960px` full radius is kept as the finite number `960`
  (RN has no CSS `9999px`/`50%` pill idiom).
- **Font families** — web ships fallback stacks in `--font-display` / `--font-sans`
  (declared in `fonts.css`); RN registers the family names (`SpaceGrotesk`,
  `Inter`) via `expo-font` using `fonts/expo-font.config.ts` (bundling done in
  PRD-03) with the system font as fallback. See **Brand fonts** below.

## Brand fonts (`design/fonts/`)

Two self-hosted, license-compliant open faces substitute for Partiful's
proprietary type (see `../DESIGN.md` § Fonts):

| Token | Family | Face | Source / License |
|-------|--------|------|------------------|
| `--font-display` / `theme.font.display` | **Space Grotesk** | display / hero only (≥ 26px), Medium 500 | [Google Fonts](https://fonts.google.com/specimen/Space+Grotesk) · SIL OFL 1.1 (`fonts/LICENSE-SpaceGrotesk-OFL.txt`) |
| `--font-sans` / `theme.font.sans` | **Inter** | all UI text/body, weights 400–825 | [rsms/inter v4.1](https://github.com/rsms/inter) · SIL OFL 1.1 (`fonts/LICENSE-Inter-OFL.txt`) |

Layout:

```
fonts/
  inter/            InterVariable.woff2 (web)  InterVariable.ttf (RN)
                    Inter-{Regular,Medium,SemiBold,Bold,ExtraBold}.ttf (RN static)
  space-grotesk/  SpaceGrotesk-Variable.ttf (web + RN variable)
  expo-font.config.ts   RN registration (variable + static strategies)
  LICENSE-Inter-OFL.txt · LICENSE-SpaceGrotesk-OFL.txt
```

**Web** — `fonts.css` declares one variable `@font-face` per family (full weight
axis, `font-display: swap`). Import it after `tokens.css`; its `url()`s resolve to
`fonts/` relative to `design/`, so any web app that bundles `design/fonts/` gets
the faces. The showcase already does this (see below).

**React Native** — bundle the assets in PRD-03 via `fonts/expo-font.config.ts`
(`brandFontsVariable` preferred, `brandFontsStatic` as the portable fallback).
On-device registration/rendering is verified in PRD-03; PRD-01 ships the assets
and config only.

**Fallbacks** — missing glyphs degrade gracefully: web falls back through the
`--font-display` / `--font-sans` stacks (`ui-sans-serif, system-ui, …`); RN falls
back to the system font until the brand faces finish loading.

## Typecheck

`theme.ts` typechecks standalone against `tsconfig.json`:

```sh
cd design
npm run typecheck
```

No errors expected.

## Showcase harness (`design/showcase/`)

A minimal **Vite + React + TypeScript** app wired to **Tailwind v4**. It is the
design-system's own runtime for building and verifying components — **not** a
product app (PRD-02 ships the Next.js marketing site; PRD-03 ships the Expo app).
It consumes the tokens directly: `src/index.css` does
`@import "tailwindcss"; @import "../../tokens.css";`, so the DESIGN.md `@theme`
block is pulled into Tailwind and exposed as both `var(--…)` custom properties and
generated utilities. It also `@import "../../fonts.css"` so the brand `@font-face`
declarations load (the dev server is allowed to serve the parent `design/`
directory via `server.fs.allow: ['..']` in `vite.config.ts`). The sample page
(`src/App.tsx`) renders the fonts specimen, palette, gradients, type scale,
spacing scale, radii, and shadows entirely from tokens — there are no literal
hex/px/font values in component code.

```sh
cd design/showcase
npm install        # one-time
npm run dev        # serves on http://localhost:5181
npm run build      # tsc -b && vite build (production build)
npm run typecheck  # tsc -b --noEmit
npm run lint       # eslint
```

### Components (`design/showcase/src/components/`)

The design-system's reusable React components live here and are styled **100%
from tokens** via `src/components.css` (imported last in `src/index.css`). Export
through `components/index.ts`:

| Component | Props of note | DESIGN.md spec |
|-----------|---------------|----------------|
| `Button` | `variant` (`primary` \| `ghost`), `onPhoto`, `loading`, `forceState` | Primary filled (black/white, white-invert on photo, loading spinner) · Ghost (black hairline, fills black on hover/press) |
| `Chip` / `ChipGroup` | `active`, `onPhoto`, `forceState` | Filter chip — tint-soft pill container; active = white pill + `--shadow-sm`; on-photo active label = Warm Sand |
| `Badge` | `tone` (`soft` \| `strong`), `status` (`done`\|`processing`\|`failed`) | Ink-tint pill (960px radius); `status` renders a semantic-colored dot — generation state only |

Conventions:

- **Pseudo-state styling lives in `components.css`**, not inline styles (which
  can't express `:hover`/`:active`/`:disabled`). Each pseudo rule is paired with
  an `.is-force-*` class, and components accept a `forceState` prop, so the
  showcase can render hover/pressed/disabled appearances statically side by side.
  `forceState` is a showcase-only affordance — product code never sets it.
- **Token-only.** No hex / font-family / font-size literals in component code.
  Verify: `grep -rnE '#[0-9a-fA-F]{3,8}|font-family.*(inter|space|sans-serif)|font-size:.*px' src/components.css src/components/` (only structural `1px`/`2px`
  border & focus-outline widths are expected — border-width isn't a tokenized
  visual value).
- Status colors (`--color-status-*`) appear **only** on the `Badge` status dot,
  applied as an inline `var(--color-status-*)` token reference.

The showcase `Core controls` section in `App.tsx` exercises every component
variant and state (US-008 assembles the full reference page).

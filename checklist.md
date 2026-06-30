# Wishmax Checklist

This checklist covers the active PRD. Add a section after each completed user story.

## Prerequisites

- [ ] Dependencies installed, if the app stack exists.
- [ ] Environment variables are configured, if needed.
- [ ] Dev server is running for UI verification, if UI exists.
- [ ] `prd.json` matches the active markdown PRD.

---

## US-001: Replace placeholder PRD with the first real Wishmax build scope

- [ ] Markdown PRD exists under `tasks/`.
- [ ] `prd.json` validates with `jq`.
- [ ] Every story includes acceptance criteria and verification steps.
- [ ] `PRDS.md` lists the PRD and branch.
- [ ] `progress.txt` includes carried-forward learnings.

---

## PRD-01 / US-001: Materialize design tokens (web + RN sources)

- [x] `design/tokens.css` exists as a Tailwind v4 `@theme` block with every DESIGN.md token (colors, gradients, type scale, weights, spacing, radius, shadows, layout, surfaces).
- [x] `design/theme.ts` mirrors the same values, with RN adaptations (gradient stop objects, shadow/elevation props, 960 finite pill radius, px line-heights).
- [x] `design/README.md` states DESIGN.md is the source of truth, documents how to keep the two token files in sync, and lists intentional RN adaptations.
- [x] Spot-check: token values (colors, type scale, radii, spacing) match DESIGN.md across both files.
- [x] `theme.ts` typechecks standalone: `cd design && npx -y -p typescript@latest tsc -p tsconfig.json` → no errors.

---

## PRD-01 / US-002: Scaffold the design-system showcase harness

- [x] `design/showcase/` is a minimal web app (Vite + React + TS), explicitly not a product app.
- [x] Tailwind v4 consumes `design/tokens.css` (`src/index.css` imports `tailwindcss` then `../../tokens.css`).
- [x] Token swatch/sample page (`src/App.tsx`) renders palette, status, gradients, type scale, spacing, radius, shadows entirely from tokens — no literal hex/px/font in component code.
- [x] `cd design/showcase && npm install` succeeds.
- [x] `npm run dev` serves the harness at http://localhost:5181.
- [x] `npm run build` succeeds (`tsc -b && vite build`).
- [x] `npm run typecheck` and `npm run lint` pass.
- [x] Tokens appear in the built CSS (`grep -- '--color-midnight-ink' dist/assets/*.css`).
- [x] Dev/build/lint commands documented in `design/README.md` and `AGENTS.md` Unknown Stack section.
- [x] Browser-verified: load the page, confirm swatches reflect token values (screenshot captured).

---

## PRD-01 / US-003: Install brand fonts (web loaded; RN assets + config delivered)

- [x] Space Grotesk (display) + Inter (text) self-hosted under `design/fonts/` (`inter/`, `space-grotesk/`) with license files committed.
- [x] `design/fonts.css` declares `@font-face` for `"Inter"` and `"Space Grotesk"`; imported after `tokens.css` in `design/showcase/src/index.css`; faces applied via the `--font-display` / `--font-sans` tokens (no hardcoded family).
- [x] `design/fonts/expo-font.config.ts` exports an `expo-font` registration config (variable + static strategies) for PRD-03 to bundle.
- [x] Web + RN fallback stacks defined (`--font-*` token stacks on web; system font on RN) so missing glyphs degrade gracefully.
- [x] Browser-verified: heading renders in Space Grotesk, body in Inter; `document.fonts.check()` true for both; screenshot captured (`archive/2026-06-30-initial-scaffold/showcase-fonts.png`).
- [x] `npm run typecheck`, `npm run lint`, `npm run build` pass; font assets emitted to `dist/assets/`.
- [x] Fonts documented in `design/README.md` (Brand fonts section) and `AGENTS.md` Unknown Stack.

---

## PRD-01 / US-004: Core control components from tokens

- [x] Primary filled button (black/white) implemented per DESIGN.md; on-photo white-fill invert via `onPhoto`.
- [x] Ghost button (transparent + black hairline, 16px Inter 550, 4px radius) implemented.
- [x] Filter chip + chip group (tint-soft pill container, active = white + `--shadow-sm`, on-photo active label = Warm Sand) implemented.
- [x] Pill badge (soft/strong ink-tint) implemented; full 960px radius.
- [x] All interaction states present: default / hover / pressed / disabled, plus loading (spinner) for the primary button.
- [x] Semantic status variants (Done / Processing / Failed) render as a status dot from `--color-status-*` — generation state only.
- [x] Components reference tokens only — grep `src/components.css` + `src/components/` finds no hex / font-family / font-size px literals (only structural 1px/2px border & focus-outline widths).
- [x] Missing values were added to `DESIGN.md` + `design/tokens.css` + `design/theme.ts` first (`--text-label`, `--text-ui-lg`, `--surface-tint-soft`, `--surface-tint-strong`).
- [x] `npm run typecheck`, `npm run lint`, `npm run build` pass; new tokens + component classes present in built CSS.
- [x] Browser-verified: every button/chip/badge state renders correctly; computed styles resolve to the right tokens; screenshot captured (`archive/2026-06-30-initial-scaffold/showcase-us004-core-controls-section.png`).
- [x] Reviewer: reject any component code that hardcodes a color/type/spacing/radius/shadow value instead of a token.

---

## PRD-01 / US-005: Feed photo tile & before/after card

- [x] `FeedPhotoTile` is ~3:4 portrait (`aspect-ratio: 3/4`), `--radius-images` (12px), full-bleed image (`src` → `<img object-fit:cover>`; showcase uses a gradient `placeholder` token stand-in), `overflow: hidden`.
- [x] Optional top-left category chip + top-right lock/Premium badge render over a `--gradient-scrim` legibility overlay (overlays use the Badge `onPhoto` variant — white text on `--surface-tint-strong`).
- [x] Loading shimmer skeleton renders at the same radius, token-only (tint-strong band sweeping over tint-soft base via `@keyframes`).
- [x] Pressed (`:active` / `forceState`) and selected (2px `--color-midnight-ink` outline ring) states defined.
- [x] `BeforeAfterCard` pairs two tiles in a white card (`--surface-card`, `--radius-cards`, `--shadow-sm`) with "Before"/"After" pill badges; selected rings both tiles.
- [x] Both built from tokens; grep `src/components.css` + `src/components/` finds no hex / font-family / font-size px literals.
- [x] New token added to `DESIGN.md` + `design/tokens.css` + `design/theme.ts` first: `--gradient-scrim` (the concrete form of the Overlay Ink surface).
- [x] `npm run typecheck`, `npm run lint`, `npm run build` pass; `--gradient-scrim` + `.wm-tile` / `.wm-ba-card` / `.wm-badge--on-photo` present in built CSS.
- [x] Browser-verified: aspect ratio, 12px radius, scrim, shimmer, selected ring, and Before/After labels render; computed styles resolve to tokens; screenshots captured (`archive/2026-06-30-initial-scaffold/showcase-us005-feed-tiles-section.png`).
- [x] Reviewer: reject any component code that hardcodes a color/type/spacing/radius/shadow value instead of a token.

---

## PRD-01 / US-006: Content card & modal/sheet surfaces

- [x] `Card` content surface: white `--surface-card`, `--radius-cards` (12px), `--shadow-sm`, padding 12/16/16; exactly two type sizes — title `--text-heading-sm` (18px bold ink) + body `--text-body` (14px regular slate).
- [x] `Card` optional `media` slot bleeds a photo/tile flush to the padded top edge (rounds top corners into the card frame).
- [x] `Sheet` modal variant: `--radius-modals` (16px), `--shadow-lg`, white, centered.
- [x] `Sheet` sheet variant: 16px top corners only, grab handle, bottom-anchored, `--shadow-lg`.
- [x] `Sheet` overlay mode renders a fixed `--surface-tint-strong` scrim + `role="dialog"` panel; dismissed by scrim-click, Escape, and the close (×) button. `inline` mode renders just the panel for the static showcase.
- [x] Both built from tokens; grep `Card.tsx` + `Sheet.tsx` + `src/components.css` finds no hex / font-family / font-size px / literal color values (only structural 1px/2px border & focus-outline widths).
- [x] No invented values — reused existing tokens (`--radius-cards`/`-modals`, `--shadow-sm`/`-lg`, `--surface-card`/`-tint-strong`); modal max-width via `calc(--spacing-160 * 3)`.
- [x] `npm run typecheck`, `npm run lint`, `npm run build` pass; `.wm-card` / `.wm-sheet` / `.wm-overlay` classes present in built CSS.
- [x] Browser-verified: card radius 12px / shadow-sm / two type sizes; modal radius 16px / shadow-lg; sheet top-only 16px radius; overlay scrim + Escape/scrim-click dismiss work; screenshots captured (`archive/2026-06-30-initial-scaffold/showcase-us006-cards-surfaces-section.png`, `-modal-overlay.png`, `-sheet-overlay.png`).
- [x] Reviewer: reject any component code that hardcodes a color/type/spacing/radius/shadow value instead of a token.

---

## PRD-01 / US-007: Paywall surface

- [x] `Paywall` is built ON TOP of `Sheet` (`variant="modal"`) — reuses its overlay/scrim, 16px radius, `--shadow-lg` surface, and Escape/close dismiss (no reinvented overlay).
- [x] Plan options are selectable cards (`<button role="radio">` in a `role="radiogroup"`): selected = black border (`border-color` swap to `--color-midnight-ink`, no reflow) + black fill accent (radio fills ink with a white check); unselected = silver hairline + empty radio.
- [x] Price is prominent in the display-size scale: `--text-heading-lg` (36px) in Inter (`--font-sans`) — numerals stay Inter per DESIGN.md, never the Space Grotesk display face.
- [x] "Restore purchases" link present (quiet underlined text link, token-only).
- [x] Single solid-black primary CTA (full width); gradient wash sits ONLY behind the surface as a section background — verified NOT on the CTA (computed `backgroundImage: none`).
- [x] Built from tokens; grep `Paywall.tsx` + `src/components.css` finds no hex / font-family / font-size px literals (only structural 1px/2px border & outline widths + `text-underline-offset: 2px`).
- [x] No new tokens needed; Sheet body `<p>`→`<div>` so the surface can hold rich plan markup (text bodies render identically).
- [x] `npm run typecheck`, `npm run lint`, `npm run build` pass; `.wm-paywall*` / `.wm-plan*` classes present in built CSS.
- [x] Browser-verified: selected plan black border/radius 12px/shadow-sm + ink radio + visible check; unselected silver border/hidden check; price 36px Inter; restore link present; CTA solid black, no gradient; section wash gradient present; clicking a plan moves selection; overlay scrim rgba(0,0,0,0.2), dialog visible, Escape dismisses. Screenshots captured (`archive/2026-06-30-initial-scaffold/showcase-us007-paywall-section.png`, `-paywall-overlay.png`).
- [x] Reviewer: reject any component code that hardcodes a color/type/spacing/radius/shadow value, or that applies a gradient to the CTA / any interactive element.

---

## PRD-01 / US-008: Reference showcase page (assemble & verify the whole system)

- [x] One page (`design/showcase/src/App.tsx`) renders the full system: palette, status colors, gradients, fonts, type scale, spacing, radius, shadows, plus every component variant/state from US-004 through US-007.
- [x] Page is structured into `Foundations` then `Components` via `GroupHeading` dividers, with a token-only in-page `Nav` (table of contents) whose anchor links jump to each section.
- [x] Every section has a scroll-target `id`; every `Nav` link resolves to an existing section (no dead anchors).
- [x] Everything consumes the exported tokens from `design/` (`var(--…)` + the token-only components) — no hardcoded copies of token values.
- [x] `npm run typecheck`, `npm run lint`, `npm run build` pass.
- [x] Browser-verified: full page renders every section top to bottom; nav anchors resolve and scroll; computed spot-checks resolve to tokens (nav bg `--surface-tint-soft`, h1 Space Grotesk, primary button black). Screenshot captured (`archive/2026-06-30-initial-scaffold/showcase-us008-full-reference.png`).
- [x] Reviewer: reject any new section/component added to the reference page that hardcodes a visual value instead of a token, or that is missing its `id` / `TOC` nav entry.

---

## PRD-01 / US-009: Enforce the system in agent instructions

### Standing reviewer gate (applies to every PR / iteration)

- [x] **Reject any PR/change that hardcodes a visual value** (color, type, spacing, radius, shadow, or font family) instead of consuming a design token.
- [x] **Reject any PR/change that diverges from `DESIGN.md`** — visuals must match the source of truth; new values go into `DESIGN.md` + `design/tokens.css` + `design/theme.ts` first, then get consumed.
- [x] Confirm the author read `DESIGN.md` this iteration before UI work (per CLAUDE.md / AGENTS.md).
- [x] Token-only grep over changed component/page code finds no literal hex / `font-family` / `font-size: …px` (only structural border/outline widths allowed).

### Story acceptance

- [x] `CLAUDE.md` instructs every iteration to read `DESIGN.md` and forbids hardcoded visual values (tokens only) — see the **Design Requirements** section.
- [x] `AGENTS.md` instructs every iteration to read `DESIGN.md`, forbids hardcoded values, and carries the reviewer gate + QA-gate token-only check.
- [x] `progress.txt` `## Codebase Patterns` records: "DESIGN.md is the visual source of truth; consume tokens, never hardcode color/type/spacing/radius."
- [x] A reviewer checklist item exists (above) to reject PRs that hardcode visual values or diverge from `DESIGN.md`.
- [x] Typecheck passes (token sources + showcase) — no code changed, but verified green.

---

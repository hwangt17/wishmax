# PRD: Wishmax Design System — Adopt, Materialize & Enforce

## Introduction

Wishmax's visual language is already defined in [`DESIGN.md`](../DESIGN.md) at the repo root — a light, white-canvas, photo-forward system adapted nearly 1:1 from Partiful (black/white action system, pink/periwinkle gradient surfaces, Space Grotesk display + Inter text). **This PRD does not invent a design system.** `DESIGN.md` is the source of truth.

This PRD's job is to make `DESIGN.md` *real and enforceable*: turn its token tables into importable artifacts both platforms consume (web CSS/Tailwind + React Native `theme.ts`), install the fonts, build the handful of core components against those tokens, ship a reference showcase, and wire the "tokens only, never hardcode" rule into the files the Ralph agent reads every loop. Without this, `DESIGN.md` is just prose the agent will drift away from.

## Goals

- Materialize `DESIGN.md` tokens into a single source that exports to both web (Tailwind/CSS vars) and app (`theme.ts`), with zero divergence.
- Make the Wishmax fonts (Space Grotesk display, Inter text) available to both platforms — loaded/applied on web now, RN assets + registration config delivered for PRD-03 to bundle.
- Build the core components (button, ghost button, chip, badge, content card, feed photo tile, before/after card, paywall surface) strictly from tokens.
- Ship a reference showcase that renders the system so QA can catch drift visually.
- Enforce the system: make `DESIGN.md` and the "no hardcoded visual values" rule part of every Ralph iteration's required reading.

## User Stories

### US-001: Materialize tokens (web + app sources)
**Priority:** P1 — every other story and both downstream PRDs depend on these files.

**Description:** As a developer, I want `DESIGN.md`'s tokens as importable files in `design/` so the design-system showcase and the downstream app PRDs (PRD-02 web, PRD-03 RN) reference tokens instead of literals.

**Acceptance Criteria:**
- [ ] A web token source exists at `design/tokens.css` (Tailwind v4 `@theme` block) containing every color, gradient, type-scale, weight, spacing, radius, shadow, layout, **and surface** token from `DESIGN.md`.
- [ ] A React Native `design/theme.ts` mirrors the same values, adapting CSS-only constructs to RN equivalents (gradients consumed via `expo-linear-gradient` from stops, shadows via RN shadow/elevation props, the full-pill `960px` radius capped to a large finite number).
- [ ] Token values match `DESIGN.md` for every platform-portable value (spot-check colors, type scale, radii, spacing); intentional RN adaptations are listed in `design/README.md`.
- [ ] A short `design/README.md` documents that `DESIGN.md` is the source of truth and how to keep the two token files in sync when it changes.
- [ ] `theme.ts` typechecks standalone via a minimal `tsconfig` in `design/` — no app scaffold required.

### US-002: Scaffold the design-system showcase harness
**Priority:** P1

**Description:** As a developer, I want a minimal design-system-owned web harness wired to the tokens so components have a runtime to build and verify in — explicitly **not** the PRD-02 marketing app or PRD-03 Expo app.

**Acceptance Criteria:**
- [ ] A minimal web app (or Storybook) lives under `design/` (e.g. `design/showcase`) — a design-system surface, not a product app.
- [ ] Tailwind v4 is configured to consume `design/tokens.css`; a token swatch/sample page renders entirely from tokens (no hardcoded values).
- [ ] A dev command serves the harness and a build command succeeds; lint passes.
- [ ] Dev/build commands documented in `design/README.md` and the `AGENTS.md` Unknown Stack section.
- [ ] Typecheck/lint passes.
- [ ] Verify in a browser using the `agent-browser` skill (token swatches render from tokens).

### US-003: Install fonts (web loaded now; RN assets + config delivered)
**Priority:** P2

**Description:** As a developer, I want the brand fonts available so type renders as designed — loaded and verified in the design-system showcase now, with the RN assets and registration config ready for the Expo app (PRD-03) to bundle.

**Acceptance Criteria:**
- [ ] Space Grotesk (display) and Inter (text) self-hosted (or license-compliant source) and applied via the font tokens in the showcase; a sample heading + body render in the correct faces in the browser (evidence captured).
- [ ] The same font files are committed under `design/fonts/` with an RN registration snippet/config (e.g. `expo-font` usage) documented for PRD-03 to bundle. RN runtime registration is verified when the Expo app scaffolds in PRD-03 (its US-001), not here.
- [ ] Fallback stacks defined (web `--font-*` stacks and RN equivalents) so missing glyphs degrade gracefully.

### US-004: Core control components from tokens
**Priority:** P2

**Description:** As a developer, I want buttons, chips, and badges built from tokens so every screen reuses them.

**Acceptance Criteria:**
- [ ] Primary filled button (black/white), ghost button, filter chip, and pill badge implemented per `DESIGN.md` component specs, on the platform(s) needed first.
- [ ] All states present: default/hover/pressed/disabled (+ loading for primary button).
- [ ] Components reference tokens only — no literal hex/px/font values in component code.
- [ ] Semantic status variants (Done/Processing/Failed) wired to the status tokens.
- [ ] Typecheck/lint passes.

### US-005: Feed photo tile & before/after card
**Priority:** P3

**Description:** As a developer, I want the hero photography components since they anchor both the app feed and the marketing gallery.

**Acceptance Criteria:**
- [ ] Feed photo tile: 3:4, 12px radius, full-bleed image, optional category chip + lock/Premium badge over a legibility scrim, shimmer loading state.
- [ ] Before/after card built from two tiles (or a slider) with Before/After pill labels.
- [ ] Both built from tokens; pressed/selected states defined.
- [ ] Typecheck/lint passes.

### US-006: Surfaces — content card & modal/sheet
**Priority:** P3

**Description:** As a developer, I want card and overlay surfaces so cards and modals are on-brand.

**Acceptance Criteria:**
- [ ] Standard content card (white, 12px, `--shadow-sm`, max two type sizes) implemented.
- [ ] Modal/sheet surface (16px radius, `--shadow-lg`) implemented — derived from the `--radius-modals` token and the paywall surface spec in `DESIGN.md` (which defines the modal via tokens rather than as a standalone named component).
- [ ] Built from tokens; typecheck/lint passes.

### US-007: Paywall surface
**Priority:** P3

**Description:** As a developer, I want an on-brand paywall surface so the subscription/credits flow matches the system.

**Acceptance Criteria:**
- [ ] Paywall surface layout per spec (selectable plan cards, prominent price, restore link, black CTA, gradient wash allowed as background only).
- [ ] Gradient wash never applied to the button or other interactive elements.
- [ ] Built from tokens; typecheck/lint passes.
- [ ] Verify in a browser using the `agent-browser` skill.

### US-008: Reference showcase (assemble & verify the whole system)
**Priority:** P4

**Description:** As a reviewer, I want one page rendering the whole system so I can verify intended look and catch drift.

**Acceptance Criteria:**
- [ ] The showcase harness (US-002) renders the palette, gradients, type scale, spacing, and every component variant/state from US-004–US-007.
- [ ] It consumes the exported tokens from `design/` (proving the pipeline), not hardcoded copies.
- [ ] Typecheck/lint passes.
- [ ] Verify in a browser using the `agent-browser` skill; capture a screenshot in `progress.txt`.

### US-009: Enforce the system in agent instructions
**Priority:** P4

**Description:** As the team, I want the design rule baked into the Ralph loop so the agent follows `DESIGN.md` every iteration.

**Acceptance Criteria:**
- [ ] `CLAUDE.md` and `AGENTS.md` instruct every iteration to read `DESIGN.md` and forbid hardcoded visual values (use tokens).
- [ ] `progress.txt` `## Codebase Patterns` records: "DESIGN.md is the visual source of truth; consume tokens, never hardcode color/type/spacing/radius."
- [ ] A reviewer checklist item exists (in `checklist.md`) to reject PRs that hardcode visual values or diverge from `DESIGN.md`.

## Functional Requirements

- FR-1: `DESIGN.md` is the single source of truth; this PRD materializes and enforces it, not redefines it.
- FR-2: Tokens must exist as importable files for both web (Tailwind/CSS vars) and app (`theme.ts`), matching `DESIGN.md` for every platform-portable value; RN adapts CSS-only constructs (gradients, shadows, full-pill radius) without renaming tokens.
- FR-3: Components must reference tokens only — no literal visual values in component code.
- FR-4: Space Grotesk (display) and Inter (text) must be applied on web now and delivered as RN font assets + registration config for PRD-03 to bundle.
- FR-5: A reference showcase must render the system from the exported tokens.
- FR-6: The "read DESIGN.md / tokens-only" rule must be present in `CLAUDE.md`, `AGENTS.md`, and the `progress.txt` patterns section.

## Non-Goals

- Not redefining or re-researching the visual language — that's done in `DESIGN.md`.
- No production website pages (PRD-02) or app screens (PRD-03) beyond the showcase.
- Does **not** scaffold the product apps. PRD-01 ships portable artifacts only; PRD-02 scaffolds the Next.js marketing site and PRD-03 scaffolds the Expo app, each wiring these tokens/fonts/components in via its own US-001.
- No Figma library required to ship this PRD (code tokens are the source of truth; Figma optional later).
- No dark theme — Wishmax is light/white-canvas per the chosen direction.
- No localization/RTL in this phase.

## Design Considerations

- Web and RN can't share component code; the shared layer is **token values**. Each platform implements components against the same tokens.
- Keep the two token files trivially diffable against `DESIGN.md` so drift is obvious in review.
- Some components only need to exist on the platform that consumes them first; build per demand (web-first via the showcase), but the spec stays shared.
- **Artifact-vs-consumer boundary:** this PRD is the design system only. It produces portable artifacts under `design/` (tokens, fonts, component implementations) plus a self-contained showcase harness to view them. It does not own a product app — browser verification runs against the showcase, and RN *runtime* verification (font bundling into Expo) is deferred to PRD-03, which already owns the Expo scaffold.

## Technical Considerations

- Web: Tailwind v4 `@theme` (the block is provided verbatim in `DESIGN.md`).
- App: a typed `theme.ts` `as const` for autocomplete + type safety (shape provided in `DESIGN.md`).
- Fonts: verify Space Grotesk + Inter licensing for self-hosting (web) and bundling (RN) before locking.
- If the two token files start drifting by hand, consider a small generator later (e.g. Style Dictionary) — not required now.
- Showcase: a minimal design-system-owned harness (Storybook or a small app under `design/`) with its own Tailwind pointed at `design/tokens.css`. It is lightweight and independent of the PRD-02/03 app scaffolds, so PRD-01 is verifiable on its own.

## Edge Cases

- **Font licensing blocked:** if Space Grotesk can't be self-hosted/bundled legally, fall back to the nearest open grotesk (see Open Questions) *without renaming the font tokens*, so consumers are unaffected.
- **Web font FOUT/FOIT:** use `font-display: swap` and the fallback stacks so first paint isn't blocked and layout doesn't shift.
- **RN can't represent CSS constructs 1:1:** `theme.ts` exposes gradient color stops for `expo-linear-gradient`, maps `--shadow-*` to RN shadow/elevation props, and caps the `960px` full-pill radius to a large finite value.
- **Non-standard weights/axes:** verify the Inter variable axis actually renders the `550` and `825` weights used in `DESIGN.md`; if a target can't, snap to the nearest supported weight and note it.
- **Token drift:** if `DESIGN.md` changes but only one of the two token files is updated, the showcase will visibly diverge — the `design/README.md` sync step and the US-009 reviewer checklist must catch this.
- **Showcase cheating the pipeline:** a showcase that hardcodes values instead of importing from `design/` would pass a visual check while defeating the token pipeline — US-008 forbids this and the reviewer verifies the imports.

## QA Requirements

- `design/theme.ts` typechecks via its standalone `tsconfig`; the showcase harness typechecks and lints.
- Lint passes on all new component code.
- Showcase renders in a browser with every component variant/state; screenshot captured in `progress.txt` (via the `agent-browser` skill).
- Tokens-only spot-check: no literal hex/`px`/font values in component source (grep component files) — components reference tokens only.
- RN artifacts (`theme.ts`, `design/fonts/`, registration config) are present and typecheck, even though Expo runtime verification is deferred to PRD-03.
- `CLAUDE.md`, `AGENTS.md`, the `progress.txt` patterns section, and `checklist.md` are updated per US-009.

## Success Metrics

- Web and app render from the same tokens with zero divergent hardcoded values (QA spot-check passes).
- A reviewer can open `DESIGN.md` + the showcase and approve/reject any new UI against concrete rules.
- Downstream PRD-02/PRD-03 stories reuse these components instead of inventing styles (observed in diffs).

## Open Questions

- Space Grotesk licensing for self-host + RN bundle — confirm, or pick the nearest free alternative (e.g. another grotesk) if blocked.
- Do we add a token generator (Style Dictionary) now, or keep two hand-maintained files until drift becomes a problem?
- Logo/wordmark for Wishmax — in scope here, or a separate brand-identity task?

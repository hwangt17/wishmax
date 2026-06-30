# QA Audit: PRD-01 Design System

Date: 2026-06-30
Branch: `ralph/prd-01-design-system-implementation`
Commit: `766b5e0`

## Verdict

Pass after QA fixes.

## Findings

- High licensing issue resolved: replaced Cabinet Grotesk with Space Grotesk under SIL OFL 1.1, removed the restrictive Cabinet files/license, updated web and RN font wiring, and reran font/browser checks.
- High mobile overflow resolved: 390px viewport now reports `scrollWidth: 390` and `clientWidth: 390`.
- Medium README command issue resolved: `cd design && npm run typecheck` now works and wraps `npx -y -p typescript@latest tsc -p tsconfig.json`.
- Medium checklist drift resolved: PRD-01 checklist items are marked complete.
- Low inline sheet semantics resolved: inline reference sheets now render as `role="group"`; overlay sheets still render as `role="dialog"` with `aria-modal="true"`.
- Hygiene resolved: `.last-branch` is ignored and not tracked; no `node_modules`, `dist`, `.tsbuildinfo`, or ad hoc QA screenshots are tracked.

## Checks Run

- `cd design && npm run typecheck`
- `cd design/showcase && npm run typecheck`
- `cd design/showcase && npm run lint`
- `cd design/showcase && npm run build`
- `jq empty prd.json`
- Browser smoke via Playwright + Chrome at desktop `1440x1600` and mobile `390x1200`

## Browser Evidence

- Desktop: 12 sections, 0 missing anchors, no horizontal overflow.
- Mobile: 12 sections, 0 missing anchors, no horizontal overflow.
- Fonts: Inter and Space Grotesk load successfully.
- Paywall: CTA background is solid black with `background-image: none`; gradient wash exists only behind the surface.
- Overlay: real overlay surface renders as `role="dialog"` and Escape dismisses it.

---

## Second QA pass — independent re-verification (2026-07-01)

Branch: `ralph/prd-01-design-system-implementation` · Commit: `9391f67`

### Verdict

Pass. All 9 user stories implemented and independently re-verified from a clean `node_modules` install. No new findings; the first-pass fixes hold.

### PRD compliance

- `prd.json` valid (parsed via node); 9 stories, **0 with `passes: false`**, root `status: "qa"`.
- Token-only gate: grep over `src/components.css`, `src/components/`, `src/App.tsx` for hex / `font-family` (inter|space|sans-serif) / `font-size: …px` → **none found**.
- Token values consistent across `DESIGN.md` ⇄ `design/tokens.css` ⇄ `design/theme.ts` (spot-checked midnight-ink `#000000`, warm-sand `#d9c58b`, radius pill `960`).
- US-009 enforcement present in all three layers: CLAUDE.md + AGENTS.md (read-DESIGN.md / tokens-only), the verbatim `progress.txt` Codebase Patterns line, and the checklist.md standing reviewer gate.

### Checks run (clean install)

- `cd design && npx -p typescript@latest tsc -p tsconfig.json` → ok (theme.ts typechecks standalone).
- `cd design/showcase && npm install` → 0 vulnerabilities (node_modules was untracked, as expected).
- `npm run typecheck` (`tsc -b --noEmit`) → clean.
- `npm run lint` (eslint) → No issues found.
- `npm run build` (`tsc -b && vite build`) → built in ~0.7s; CSS 22.28kB; Inter woff2 + Space Grotesk ttf emitted to `dist/`.
- Built CSS contains the tokens (`--color-midnight-ink:#000`, `--radius-modals:16px`, `--gradient-scrim`, `--text-label:12px`, `--surface-tint-strong`) — pipeline proven.

### Browser evidence (Playwright + system Chrome)

- Desktop 1440px: 12 sections, 0 missing anchors, no horizontal overflow.
- Mobile 390px: 12 sections, 0 missing anchors, **no horizontal overflow** (`scrollWidth == clientWidth == 390`) — the first-pass overflow fix holds.
- Fonts: `document.fonts.check()` true for both Inter (14px) and Space Grotesk (36px); h1 resolves to `"Space Grotesk", ui-sans-serif, system-ui, sans-serif`.


# Wishmax PRD Index

| PRD | Status | Branch | Source | Notes |
|---|---|---|---|---|
| PRD-01 Design System | Complete | `ralph/design-system` | `archive/2026-07-01-design-system/prd-design-system.md` | Foundation. `DESIGN.md` (repo root) is the visual source of truth (Partiful-derived, light/playful). Materialized into web + RN tokens, fonts, core components, and enforced in the agent loop. All 9 stories complete; QA passed. Archived to `archive/2026-07-01-design-system/`. |
| PRD-02 Landing Page | In Progress | `ralph/landing-page` | `tasks/prd-landing-page.md` | Marketing site. Next.js + TS + Tailwind, conversion-focused, light/white-canvas per `DESIGN.md`. Decisions locked (2026-07-01): pre-launch waitlist CTA behind a swappable store; pricing teaser (US-008) deferred. Depends on PRD-01. Scaffold live at `web/` (US-001 done) — consumes `design/tokens.css` + `design/fonts.css` via relative `@import` (single source of truth, no copies). US-002 done: sticky header + footer in the root layout with responsive mobile nav, ported PRD-01 Button. US-003 done: hero with hook headline + pain/promise subhead + above-fold CTA + PRD-01 Before/After proof card via next/image (ported Badge/FeedPhotoTile/BeforeAfterCard; self-authored swappable hero imagery in `web/public/hero/`). US-004 done: "How it works" 3-step section (`id="how-it-works"`) — Standard Content Cards with mono icons + numbered Badge + Inter-700 title + one sentence; single column → 3 columns responsive. US-005 done: transformation gallery (`id="examples"`) — 8 sample result tiles via the ported PRD-01 FeedPhotoTile with Travel/Gym/Professional/Night-out category chips, next/image lazy-loaded (no CLS), on the periwinkle wash; grid 2→3→4 columns; self-authored swappable gallery imagery in `web/public/gallery/`. US-006 done: benefits / pain-point section (`id="benefits"`) — four named pain points (bad lighting, no good photos, expensive photographers, low matches) mapped one-to-one to Wishmax outcomes as Standard Content Cards (strong-tone pain Badge + mono icon + Inter-700 outcome title + one brand-voice sentence), on the white canvas; grid 1→2→2 columns. |
| PRD-03 App MVP | Planned | `ralph/app-mvp` | `tasks/prd-app-mvp.md` | Expo React Native (iOS + Android) + backend proxy (auth, paywall, GPT-Image 2 / Nano Banana Pro). Depends on PRD-01. |

## Status Legend

- Planned: PRD is not yet started.
- In Progress: At least one story is being built.
- QA: Build is complete and under audit.
- Complete: QA passed and the work is merged or accepted.

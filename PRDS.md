# Wishmax PRD Index

| PRD | Status | Branch | Source | Notes |
|---|---|---|---|---|
| PRD-01 Design System | Complete | `ralph/design-system` | `archive/2026-07-01-design-system/prd-design-system.md` | Foundation. `DESIGN.md` (repo root) is the visual source of truth (Partiful-derived, light/playful). Materialized into web + RN tokens, fonts, core components, and enforced in the agent loop. All 9 stories complete; QA passed. Archived to `archive/2026-07-01-design-system/`. |
| PRD-02 Landing Page | Planned | `ralph/landing-page` | `tasks/prd-landing-page.md` | Marketing site. Next.js + TS + Tailwind, conversion-focused. Depends on PRD-01. |
| PRD-03 App MVP | Planned | `ralph/app-mvp` | `tasks/prd-app-mvp.md` | Expo React Native (iOS + Android) + backend proxy (auth, paywall, GPT-Image 2 / Nano Banana Pro). Depends on PRD-01. |

## Status Legend

- Planned: PRD is not yet started.
- In Progress: At least one story is being built.
- QA: Build is complete and under audit.
- Complete: QA passed and the work is merged or accepted.

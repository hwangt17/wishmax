# AGENTS.md - wishmax

This repo uses Ralph-loop development: PRD first, one user story per coding iteration, QA gate before done.

## Session Startup

Before coding:

1. Read this file.
2. Read `CLAUDE.md`.
3. Read `prd.json`.
4. Read `progress.txt`, especially `## Codebase Patterns`.
5. Read `DESIGN.md` before any UI work (visual source of truth).
6. Check `git status --short --branch`.

## Operating Rules

- Work from `prd.json`; do not freewheel outside the active PRD.
- Implement exactly one `passes: false` user story per Ralph iteration.
- **Every iteration, read `DESIGN.md` before any UI work.** It is the visual source of truth: consume design tokens (`design/tokens.css` on web, `design/theme.ts` on app), never hardcode color/type/spacing/radius/shadow values. Add missing values to `DESIGN.md` + token files first. This applies on every Ralph loop, not just the first.
- **Reviewer gate:** reject any PR/change that hardcodes a visual value instead of a token, or that diverges from `DESIGN.md`. Token-only is a merge requirement (see `checklist.md`).
- Keep changes focused and minimal.
- Update `progress.txt` after meaningful work.
- Add durable repo patterns to the top `## Codebase Patterns` section.
- Keep `PRDS.md` updated when PRD status changes.
- Keep `checklist.md` updated with manual verification steps for completed stories.
- Never mark a story passed until quality checks run and the acceptance criteria are satisfied.

## Branching

- Use the `branchName` from `prd.json`.
- Ralph branches should use `ralph/<short-feature-name>`.
- If the branch does not exist, create it from the default branch.

## PRD Setup

Each PRD should include:

- Markdown PRD in `tasks/`.
- Machine-readable `prd.json` in repo root.
- Mission-control file in `tasks/`.
- Seeded `progress.txt` context.
- Task board entry in Ralph Dashboard when Ralph is orchestrating the work.

## QA Gate

Before calling work done:

- Build passes, if a build command exists.
- Typecheck/lint/test pass where available.
- UI changes have browser evidence.
- UI code is token-only — no hardcoded color/type/spacing/radius/shadow values; matches `DESIGN.md`.
- Every user story has implementation evidence.
- Critical audit findings are fixed.
- `progress.txt`, `checklist.md`, and `PRDS.md` are updated.

## Unknown Stack Rule

This repo started empty. As the stack becomes real, update this file with:

- Install command.
- Dev server command.
- Build command.
- Test command.
- Environment variable requirements.
- Deployment target.

### Stack — design system (PRD-01)

The first real surface is the design-system **showcase harness** at
`design/showcase/` (Vite + React + TypeScript + Tailwind v4). It is the runtime
for building/verifying design-system components and consumes `design/tokens.css`
directly — it is **not** a product app.

| Concern | Command (run from `design/showcase/`) |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev` → http://localhost:5181 |
| Build | `npm run build` (`tsc -b && vite build`) |
| Typecheck | `npm run typecheck` (`tsc -b --noEmit`) |
| Lint | `npm run lint` (`eslint`) |
| Test | none yet |
| Env vars | none |
| Deploy | n/a (internal harness, not shipped) |

Brand fonts are self-hosted under `design/fonts/` (Space Grotesk display +
Inter text). Web loads them via `design/fonts.css` (`@font-face`, imported after
`tokens.css` in the showcase); the dev server allows the parent `design/` dir
(`server.fs.allow: ['..']`). RN bundling is delivered as `design/fonts/expo-font.config.ts`
for PRD-03. Never hardcode font families — use the `--font-display` / `--font-sans`
tokens (web) or `theme.font.*` (RN).

The token sources themselves (`design/theme.ts`) typecheck standalone via
`cd design && npx -y -p typescript@latest tsc -p tsconfig.json`.

### Stack — marketing website (Wishmax landing)

The product marketing website lives at `web/` (Next.js App Router + React +
TypeScript). The first screen intentionally mirrors the zigzag waitlist landing
page structure: full-viewport hero, rotated moving collage, email capture, and
success/share state. The collage uses blank white media tiles until real
before/after assets are ready.

| Concern | Command (run from `web/`) |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev -- --port 3017` or `./node_modules/.bin/next dev --port 3017` |
| Build | `npm run build` |
| Typecheck | `npm run typecheck` |
| Lint | `npm run lint` (`eslint .`) |
| Test | none yet |
| Env vars | none for local waitlist prototype |
| Deploy | likely Vercel, not configured yet |

Local waitlist submissions are stored in `web/.data/waitlist.json`, which is
gitignored. Replace that route with production persistence before launch.

Node v25 / npm 11; no global `tsc` (use the local devDependency or `npx`).

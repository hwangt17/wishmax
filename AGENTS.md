# AGENTS.md - wishmax

This repo uses Ralph-loop development: PRD first, one user story per coding iteration, QA gate before done.

## Session Startup

Before coding:

1. Read this file.
2. Read `CLAUDE.md`.
3. Read `prd.json`.
4. Read `progress.txt`, especially `## Codebase Patterns`.
5. Check `git status --short --branch`.

## Operating Rules

- Work from `prd.json`; do not freewheel outside the active PRD.
- Implement exactly one `passes: false` user story per Ralph iteration.
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

# wishmax

Ralph-loop-ready workspace for building Wishmax from PRDs.

## Ralph Loop

This repo is set up to run the same PRD-driven Ralph workflow used for SwarmPost:

1. Write or update a PRD in `tasks/`.
2. Convert the PRD into `prd.json`.
3. Seed `progress.txt` with useful carried-forward learnings.
4. Run one user story at a time with `./ralph.sh --tool claude`.
5. Run QA audit before marking work complete.

```bash
./ralph.sh --tool claude 10
./ralph.sh --tool claude --stop-at US-001
```

## Key Files

- `AGENTS.md` contains the repo operating rules for agents.
- `CLAUDE.md` is the per-iteration coding prompt used by `ralph.sh`.
- `prd.json` is the active machine-readable PRD.
- `progress.txt` is the persistent project memory and iteration log.
- `tasks/templates/` contains PRD, mission-control, and QA report templates.
- `skills/prd/`, `skills/ralph/`, and `skills/qa-audit/` document the repo-local skills.

## First Real PRD

Before implementation work starts, replace the placeholder `prd.json` with a real PRD payload and create the matching markdown PRD under `tasks/`.

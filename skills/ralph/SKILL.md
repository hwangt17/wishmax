# Wishmax Ralph Loop Skill

Use this skill to run or prepare the Ralph build loop in Wishmax.

## Loop Contract

- One invocation implements exactly one incomplete user story.
- `prd.json` is execution state.
- `progress.txt` is persistent memory.
- `checklist.md` is manual verification coverage.
- `PRDS.md` is PRD status.

## Command

```bash
./ralph.sh --tool claude 10
./ralph.sh --tool claude --stop-at US-001
```

## Before Running

1. Confirm `prd.json` is real, not the placeholder scaffold.
2. Confirm branch name is correct.
3. Confirm `progress.txt` has relevant carried-forward learnings.
4. Confirm required env vars are present, if the PRD needs them.

## During The Loop

- Watch for repeated failures.
- Stop if the agent expands scope beyond one story.
- Stop if checks fail and the fix is not obvious.
- Stop if secrets or destructive operations are involved.

## Done

- Every story has `passes: true`.
- Checks pass.
- Browser evidence exists for UI.
- QA audit has no blockers.
- `progress.txt`, `checklist.md`, and `PRDS.md` are current.

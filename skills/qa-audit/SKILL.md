# Wishmax QA Audit Skill

Use this skill after Ralph implements a PRD or high-risk change.

## Prime Directive

Do not call work done until the implemented behavior is verified against the PRD.

## Audit Inputs

- `prd.json`
- Markdown PRD under `tasks/`
- Diff from the feature branch
- `progress.txt`
- `checklist.md`
- Build/test/browser output

## Audit Steps

1. Map every user story to implementation evidence.
2. Run available checks: build, typecheck, lint, tests.
3. Browser-test UI changes.
4. Inspect data/security behavior for secrets, unsafe writes, missing auth, and cleanup gaps.
5. Classify findings as Blocker, High, Medium, or Low.
6. Write a QA report using `tasks/templates/qa-audit-template.md`.

## Finding Severity

- Blocker: cannot ship.
- High: should fix before merge unless Arthur explicitly accepts the risk.
- Medium: fix if cheap, otherwise track.
- Low: polish or documentation.

## Pass Criteria

- No blockers.
- No unaccepted high findings.
- Required checks pass.
- UI evidence exists when UI changed.
- `progress.txt` and `checklist.md` are updated.

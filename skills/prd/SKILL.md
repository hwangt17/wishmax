# Wishmax PRD Skill

Use this skill when turning Arthur's Wishmax direction into a build-ready PRD.

## Inputs

- Arthur's product direction.
- Existing `progress.txt` patterns and prior PRDs.
- Current repo state.

## Output

- Markdown PRD in `tasks/`.
- Matching `prd.json` in repo root.
- Mission-control file in `tasks/`.
- Updated `PRDS.md`.
- Seeded `progress.txt` context.

## Method

1. Clarify the outcome, user, and business reason.
2. Split work into small user stories that can each fit one Ralph loop iteration.
3. Write acceptance criteria as observable requirements.
4. Include verification steps for each story.
5. Explicitly list non-goals and edge cases.
6. Convert to `prd.json` with every story starting at `passes: false`.
7. Choose a branch name in the form `ralph/<feature>`.

## Quality Bar

- No vague stories like "make it better."
- No hidden dependencies.
- Every story has testable acceptance criteria.
- UI stories include browser verification.
- Data-writing stories include cleanup expectations.

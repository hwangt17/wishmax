# PRD: Wishmax Initial Scaffold

## Goal

Prepare the empty Wishmax repo for PRD-driven Ralph-loop development.

## Non-Goals

- This PRD does not define the product, app stack, schema, or launch scope.
- This PRD does not implement user-facing Wishmax functionality.

## User Stories

### US-001: Replace placeholder PRD with the first real Wishmax build scope

As Arthur and Ralph, we need a concrete Wishmax PRD before code generation starts, so the build loop has clear acceptance criteria and QA targets.

Acceptance criteria:

- A markdown PRD exists in `tasks/` with goals, non-goals, user stories, acceptance criteria, edge cases, and QA requirements.
- `prd.json` is updated to match the PRD.
- `progress.txt` includes any carried-forward product or codebase learnings.
- `PRDS.md` lists the new PRD.

Verification:

- Review the markdown PRD for completeness.
- Validate `prd.json` with `jq`.
- Confirm every story has `passes: false` before build starts.

## QA Requirements

- Validate JSON syntax.
- Confirm workflow files are executable/readable.
- Confirm the first real PRD is not ambiguous before running Ralph.

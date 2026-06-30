# Ralph Agent Instructions

**CRITICAL: Implement exactly ONE user story per invocation, then stop. Do not continue to the next story.**

You are an autonomous coding agent working in the Wishmax repo.

## Your Task

1. Read `prd.json`.
2. Read `progress.txt`, starting with `## Codebase Patterns`.
3. Read `AGENTS.md`.
3a. Read `DESIGN.md` (the visual source of truth) before any UI work.
4. Check that you are on `prd.json.branchName`. If not, check it out or create it from the default branch.
5. Pick the highest-priority user story where `passes: false`.
6. Implement that single user story.
7. Run the repo quality checks that exist.
8. If UI changed, verify in a browser and capture the result in `progress.txt`.
9. Update nearby docs if you discover reusable repo patterns.
10. Commit all changes with message `feat: [Story ID] - [Story Title]`.
11. Set that story's `passes` field to `true` in `prd.json`.
12. Append your work log to `progress.txt`.
13. Add checklist items for that story to `checklist.md`.
14. Update `PRDS.md` if the active PRD status changed.
15. End your response. If every story is complete, include `<promise>COMPLETE</promise>`.

## PRD Format

Expected root fields:

- `title`
- `branchName`
- `status`
- `userStories`

Each story should include:

- `id`
- `title`
- `priority`
- `description`
- `acceptanceCriteria`
- `verification`
- `passes`

## Progress Log Format

Append to `progress.txt`:

```md
## [YYYY-MM-DD HH:MM] - [Story ID]
- Implemented:
- Files changed:
- Checks run:
- Browser evidence:
- Learnings for future iterations:
  - ...
---
```

## Codebase Patterns

If you discover durable patterns, add them to the top section:

```md
## Codebase Patterns
- Use ...
- When changing ..., also update ...
```

Add only reusable patterns. Keep story-specific notes in the dated entry.

## Design Requirements

- `DESIGN.md` (repo root) is the single source of truth for all visual design. Read it before any UI work.
- Consume design **tokens** (CSS vars / Tailwind `@theme` on web, `theme.ts` on app). **Never hardcode** color, type, spacing, radius, or shadow values.
- If a needed value is missing, add it to `DESIGN.md` first, then to the token files — do not invent ad-hoc values in components.
- Follow the `DESIGN.md` Do's/Don'ts (e.g. black/white action system, gradients on surfaces only, max two type sizes per card).

## Quality Requirements

- Do not commit broken code.
- Do not silently skip checks. If no checks exist yet, say that in `progress.txt`.
- Keep secrets out of commits and logs.
- Prefer existing project patterns once the stack exists.
- For UI work, build the real usable product surface, not a static mock, unless the PRD explicitly asks for a mock.

## QA Audit

After implementation, a separate QA pass should review:

- PRD compliance.
- Build/typecheck/test output.
- UI behavior if applicable.
- Security and data handling.
- Missing edge cases.
- Documentation and checklist completeness.

# Wishmax — Manual Verification Checklist

Manual/QA steps for completed user stories. Automated checks (typecheck, lint,
build) are listed per story; browser evidence lives in `progress.txt`.

**Design gate (applies to every UI story):** UI code is token-only — no
hardcoded color/type/spacing/radius/shadow values; matches `DESIGN.md`. Run the
token-literal audit before marking any UI story done:
`grep -rnE '#[0-9a-fA-F]{3,8}|font-family.*(inter|space|sans-serif)|font-size:.*[0-9]+px' web/app web/components` — only 1px/2px border/outline widths, opacity, transforms, and transition timing may be literals.

## PRD-02 Landing Page (`ralph/landing-page`, `web/`)

### US-001 — Next.js + Tailwind scaffold with design tokens

- [x] Next.js App Router + TypeScript project exists at `web/` (clear web dir).
- [x] Tailwind v4 consumes PRD-01 tokens: `web/app/globals.css` `@import`s
      `../../design/tokens.css` (the `@theme` block) — no token values copied,
      single source of truth preserved.
- [x] Brand fonts loaded: `@import "../../design/fonts.css"` (self-hosted Inter +
      Space Grotesk); Turbopack bundles the `../design/fonts/*` url()s. Verified
      programmatically: `document.fonts.check('14px Inter')` and
      `document.fonts.check('36px "Space Grotesk"')` both true; both faces report
      `loaded`.
- [x] Base layout renders a tokenized white-canvas page per `DESIGN.md` with no
      default-framework boilerplate (no Next starter template/styles).
- [x] Token-only: token-literal audit returns no hardcoded visual values.
- [x] Typecheck passes: `cd web && npm run typecheck`.
- [x] Lint passes: `cd web && npm run lint`.
- [x] Build passes: `cd web && npm run build`.
- [x] Browser-verified (Playwright + system Chrome): white body background,
      Space Grotesk 48px black H1, black CTA with `backgroundImage: none`
      (design invariant: no gradient on buttons), white CTA text, 8px radius.

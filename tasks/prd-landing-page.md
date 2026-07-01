# PRD: Wishmax Landing Page (Marketing Website)

## Introduction

Wishmax lets people generate dating-profile-worthy photos by applying their own face into curated, attractive template photos. The landing page is the top of the funnel: its only job is to communicate the hook, prove the result with real before/after stills, and convert visitors into app users (or, pre-launch, into a waitlist).

The site is built with **Next.js + TypeScript + Tailwind**, consuming the shared design tokens from PRD-01 (Design System). It must be fast, beautiful, mobile-first, and obviously not AI slop. Keep the architecture simple — this is a marketing page, not an application.

## Goals

- Communicate the core hook in under 5 seconds: better dating photos, no photoshoot, using your own face.
- Show, don't tell: lead with high-quality before/after transformations.
- Drive a single primary conversion action (App Store / TestFlight install, with a waitlist fallback pre-launch).
- Hit excellent performance and SEO (fast LCP, strong Lighthouse, shareable OG previews).
- Stay visually consistent with the app via shared design tokens.

## User Stories

### US-001: Next.js + Tailwind project scaffold with design tokens
**Description:** As a developer, I want the web project scaffolded and wired to the design system so all pages start on-brand.

**Acceptance Criteria:**
- [ ] Next.js (App Router) + TypeScript project created in a clear web directory.
- [ ] Tailwind configured to consume the exported design tokens from PRD-01 (colors, type, spacing, radius).
- [ ] Brand fonts loaded and applied.
- [ ] Base layout renders a tokenized page (light / white-canvas per `DESIGN.md`) with no default-framework styling left over.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-002: Global layout, nav & footer
**Description:** As a visitor, I want consistent header/footer navigation so I can orient and find the CTA anywhere.

**Acceptance Criteria:**
- [ ] Sticky header with logo/wordmark and a primary CTA button; header uses design tokens (no hardcoded values) and stays pinned on scroll.
- [ ] Footer with secondary links (privacy, terms, contact, social) — placeholder hrefs allowed but present.
- [ ] Fully responsive (mobile, tablet, desktop); mobile nav works.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-003: Hero section with hook + before/after visual
**Description:** As a visitor, I want to instantly understand the value via a strong headline and a real transformation visual.

**Acceptance Criteria:**
- [ ] Headline communicates the core hook and a supporting subhead naming the pain (your photos cost you matches) and the promise (pro dating photos from your own face, no photoshoot).
- [ ] Primary CTA above the fold.
- [ ] A before/after transformation visual (using the PRD-01 before/after pattern), not generic stock.
- [ ] Looks great on mobile first; no layout shift on load.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-004: "How it works" section (3 steps)
**Description:** As a visitor, I want to see how simple it is so I trust I can get a result fast.

**Acceptance Criteria:**
- [ ] Three clear steps (e.g. 1. Upload a few selfies, 2. Pick photos you love, 3. Get profile-ready shots).
- [ ] Each step has an icon/visual and one tight sentence.
- [ ] Responsive layout.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-005: Transformation gallery / sample feed showcase
**Description:** As a visitor, I want to browse example results so I believe the quality and see the variety.

**Acceptance Criteria:**
- [ ] A gallery of curated example transformations using the feed-tile component, mirroring the app's feed feel.
- [ ] Optional category framing (e.g. travel, gym, professional, night-out) to show range.
- [ ] Images are optimized (next/image) and lazy-loaded; no jank on scroll.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-006: Benefits / pain-point section
**Description:** As a visitor, I want the value spelled out against my real frustrations so I feel understood.

**Acceptance Criteria:**
- [ ] A benefits section that maps concrete pain points (bad lighting, no good photos, expensive photographers, low matches) to Wishmax outcomes.
- [ ] Copy is specific and confident, aligned to the brand voice from PRD-01; no lorem ipsum or placeholder filler text, and each benefit maps to one of the named pain points (bad lighting, no good photos, expensive photographers, low matches).
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-007: Social proof section
**Description:** As a visitor, I want proof others got results so I trust it works.

**Acceptance Criteria:**
- [ ] A testimonial/social-proof section with a content structure ready for real quotes/metrics (clearly-labeled placeholders allowed pre-launch).
- [ ] Visually credible (avatars, names/handles, optional star/metric) using real photography via next/image and design tokens; no lorem ipsum and no generic stock imagery.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-008: Pricing / offer teaser — DEFERRED (out of scope for v1)
**Status:** Deferred by product decision (2026-07-01). No pricing teaser ships in v1 — the page converts on value alone. Kept here (not renumbered) for traceability; revisit once pricing is finalized.

**Description:** As a visitor, I want to understand what it costs so I can decide to convert.

**Acceptance Criteria (deferred — do not build in v1):**
- [ ] A pricing teaser communicating the offer model (subscription/credits) at a high level, consistent with the app paywall direction.
- [ ] Clear CTA from this section.
- [ ] Copy avoids committing to exact numbers if not finalized (uses a documented placeholder).
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-009: FAQ section
**Description:** As a visitor, I want common objections answered so I feel safe converting.

**Acceptance Criteria:**
- [ ] Accessible accordion FAQ covering: is it really my face, photo privacy/data handling, how long it takes, platforms (iOS/Android), and cost/cancellation.
- [ ] Keyboard accessible and responsive.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-010: Primary CTA + waitlist email capture
**Description:** As a visitor, I want one obvious next step so I can install or get notified.

**Acceptance Criteria:**
- [ ] Pre-launch (current state), the primary CTA captures an email for the waitlist; the CTA target is structured so it can later be swapped to an App Store / TestFlight link without re-architecting.
- [ ] Waitlist submissions persist via a Next.js route handler behind a thin store abstraction (single `saveWaitlistEmail` seam). v1 may use a documented placeholder store; the real provider (email list vs hosted DB) is wired before launch without touching callers.
- [ ] Validation and success/error states handled.
- [ ] No secrets exposed client-side; submission has a concrete spam guard (per-IP rate limit on the route handler and/or a hidden honeypot field), verified to reject rapid/bot submissions.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-011: SEO, metadata & Open Graph
**Description:** As a growth owner, I want strong SEO and share previews so the page ranks and looks good when shared.

**Acceptance Criteria:**
- [ ] Title, meta description, canonical, and OG/Twitter card metadata set.
- [ ] A designed OG image renders for link shares.
- [ ] `sitemap.xml` and `robots.txt` present.
- [ ] Semantic headings and alt text on imagery.
- [ ] Metadata and OG image verified to render (via view-source and an OG/Twitter card preview/debugger).
- [ ] Typecheck/lint passes.

### US-012: Analytics & conversion tracking
**Description:** As a growth owner, I want to measure traffic and conversions so I can improve the page.

**Acceptance Criteria:**
- [ ] A privacy-conscious analytics tool integrated.
- [ ] Primary CTA clicks and waitlist submissions fire tracked events, verified in the browser network/console (or the analytics debug view) to confirm the event payload.
- [ ] No analytics in development noise / respects basic consent expectations.
- [ ] Typecheck/lint passes.

### US-013: Responsive & performance pass
**Description:** As a visitor on any device, I want a fast, polished page so I don't bounce.

**Acceptance Criteria:**
- [ ] Mobile, tablet, desktop layouts verified; no overflow or broken sections.
- [ ] Images optimized; good LCP and minimal layout shift.
- [ ] Lighthouse performance and best-practices scores recorded in `progress.txt` with target ≥ 90 on mobile (or documented gap).
- [ ] Verify in browser using dev-browser skill across breakpoints.

## Functional Requirements

- FR-1: Built with Next.js (App Router) + TypeScript + Tailwind, consuming PRD-01 tokens.
- FR-2: One primary conversion action site-wide (install or waitlist), repeated at natural scroll points.
- FR-3: Lead with real before/after transformation visuals, not generic stock.
- FR-4: Waitlist capture must persist submissions server-side with validation and no exposed secrets.
- FR-5: Full SEO metadata, OG image, sitemap, and robots present.
- FR-6: Analytics tracks CTA clicks and waitlist conversions.
- FR-7: Mobile-first responsive; performance targets documented.

## Non-Goals

- No blog, CMS, or content marketing system in this phase.
- No user accounts/login on the website (accounts live in the app).
- No in-browser photo generation or app functionality — the site markets the app.
- No multi-language/localization in this phase.
- No A/B testing framework (single best-effort page first).
- No pricing teaser / pricing section in v1 (US-008 deferred until pricing is finalized).

## Design Considerations

- Reuse PRD-01 tokens and the feed-tile / before-after components so the site previews the app's actual look.
- Light / white-canvas (per `DESIGN.md`), photo-forward, generous whitespace; the page stays quiet and bright while curated photography and gradient washes carry the energy. Restraint over decoration to read premium.
- Copy carries the brand voice from PRD-01 — confident, specific, a little edgy, never generic.

## Technical Considerations

- Prefer static generation for speed; use route handlers only where needed (waitlist submit, OG image).
- Use next/image for all photography; preload hero LCP image.
- Choose a lightweight waitlist persistence (e.g. a hosted DB or email provider list) and keep keys server-side.
- Deploy target likely Vercel; document build/dev/deploy commands in AGENTS.md as the stack solidifies.

## Success Metrics

**Build-time acceptance (verifiable at ship):**
- Lighthouse mobile performance ≥ 90 (or a documented, justified gap).
- Analytics events for CTA clicks and waitlist submissions are wired and confirmed firing.
- Page communicates the hook in a 5-second test (informal review passes).

**Post-launch KPIs (measured on live traffic, not a build gate):**
- Visitor-to-CTA-click rate is tracked from day one.
- CTA-to-conversion (install/waitlist) rate is tracked from day one.

## Resolved Decisions (2026-07-01)

- **CTA path:** Pre-launch **waitlist** is the build-time conversion action; CTA is structured to swap to an App Store / TestFlight link at launch. (US-010)
- **Waitlist persistence:** Decided later — build US-010 behind a thin `saveWaitlistEmail` store abstraction with a documented placeholder store; wire the real provider (email list vs hosted DB) before launch. (US-010)
- **Pricing:** No pricing teaser in v1 — **US-008 deferred**; page converts on value alone. (US-008, Non-Goals)

## Open Questions

- Domain, legal pages (privacy/terms) ownership and content — who provides copy?
- Do we want a short product demo video in the hero, or stills only for v1?
- Which concrete waitlist provider (and is it an email list or hosted DB) do we commit to before launch? — deferred, not blocking v1 build.

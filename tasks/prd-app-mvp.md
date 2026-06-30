# PRD: Wishmax App MVP (iOS & Android)

## Introduction

Wishmax is a mobile app that lets people create dating-profile-worthy photos by applying their own face into curated, attractive, professional-looking template photos. The experience mirrors Regen: a browsable feed of high-quality template photos, filterable by category and gender; the user uploads selfies once, taps a template they like, and the app generates a version with their face in it — ready to use on dating apps and Instagram.

The app is built with **React Native (Expo)** for iOS and Android, consuming the shared design tokens from PRD-01. AI image generation runs through **our own backend proxy** — the app never holds model API keys. The primary model is **GPT-Image 2**, with **Nano Banana Pro (Gemini image)** as a secondary/fallback. The MVP includes accounts, a subscription/credits paywall, the curated feed, selfie upload, face-swap generation, a results gallery, and onboarding.

This is a large PRD; stories are grouped into **Foundation → Feed → Generation → Gallery → Monetization → Polish**. Ralph implements one story per iteration.

## Goals

- Deliver the core Regen-style loop: browse curated templates → apply your face → get a usable profile photo.
- Keep all model API keys and billing logic server-side; the app is a secure client.
- Make generation feel trustworthy and premium: clear progress, strong likeness, tasteful reveal.
- Ship onboarding + a paywall that gates generation behind subscription/credits.
- Support both iOS and Android from one codebase.
- Give users a gallery to revisit, save, and share results.

## User Stories

### Foundation

### US-001: Expo app scaffold with design tokens & navigation
**Description:** As a developer, I want the app scaffolded and wired to the design system so all screens start on-brand.

**Acceptance Criteria:**
- [ ] Expo (React Native + TypeScript) project created in a clear app directory.
- [ ] Shared design tokens from PRD-01 imported as the RN theme; fonts bundled and applied.
- [ ] Navigation set up (tab + stack) with placeholder screens: Feed, My Photos, Profile/Settings.
- [ ] App runs on iOS simulator and Android emulator.
- [ ] Typecheck/lint passes.
- [ ] Browser/simulator evidence captured in `progress.txt`.

### US-002: Backend scaffold (API, database, storage, secrets)
**Description:** As a developer, I want a backend so the app can authenticate, store data, and proxy AI safely.

**Acceptance Criteria:**
- [ ] Backend service stood up (e.g. Supabase or a Node API + Postgres) with a documented local/dev run.
- [ ] Database schema for: users, templates, generations (jobs), and entitlements/credits.
- [ ] Object storage configured for user uploads and generated outputs, with signed/expiring access URLs.
- [ ] Model API keys stored as server-side secrets only; none shipped in the app bundle.
- [ ] Health check endpoint and basic request auth in place.
- [ ] Typecheck/lint/tests (where present) pass.

### US-003: Authentication
**Description:** As a user, I want to sign in so my photos and entitlements are tied to my account.

**Acceptance Criteria:**
- [ ] Sign-in supports Apple and Google (Apple required for iOS), with an email fallback option.
- [ ] Authenticated sessions persist across app restarts; sign-out works.
- [ ] Backend validates auth on every protected endpoint.
- [ ] Basic account/profile screen shows signed-in state.
- [ ] Typecheck/lint passes; simulator evidence captured.

### Feed

### US-004: Template content model & curated seed set
**Description:** As a developer, I want a template catalog so the feed has real, attractive content to show.

**Acceptance Criteria:**
- [ ] Template records include: image, category, gender tag(s), title, ordering/feature flags, and premium flag.
- [ ] An initial curated set is seeded (following PRD-01 photography art direction).
- [ ] Templates are served via an authenticated, paginated endpoint.
- [ ] Image sourcing/licensing for seeded templates is documented (see Open Questions).
- [ ] Typecheck/lint passes.

### US-005: Feed UI (template grid)
**Description:** As a user, I want a beautiful scrollable feed so I can browse attractive photos to recreate.

**Acceptance Criteria:**
- [ ] Performant grid/feed of template tiles using the PRD-01 feed-tile component.
- [ ] Lazy image loading, skeleton/shimmer placeholders, and smooth scrolling.
- [ ] Pagination/infinite scroll backed by the templates endpoint.
- [ ] Premium templates show a lock/premium badge.
- [ ] Typecheck/lint passes; simulator evidence captured.

### US-006: Category & gender filters
**Description:** As a user, I want to filter by gender and category so I see relevant photos fast.

**Acceptance Criteria:**
- [ ] A gender selector and category filter chips (using the PRD-01 chip spec).
- [ ] Filters update the feed query and reflect selected state.
- [ ] Selection persists during the session; empty-state shown when no matches.
- [ ] Typecheck/lint passes; simulator evidence captured.

### US-007: Template detail / preview
**Description:** As a user, I want to preview a template up close so I can decide before generating.

**Acceptance Criteria:**
- [ ] Tapping a tile opens a detail view with the full image and a clear "Use this photo" / generate action.
- [ ] Premium templates route to the paywall if the user lacks entitlement.
- [ ] Back/dismiss interaction is smooth and on-brand.
- [ ] Typecheck/lint passes; simulator evidence captured.

### Generation

### US-008: Selfie upload & capture flow
**Description:** As a user, I want to provide my face so the app can generate photos that look like me.

**Acceptance Criteria:**
- [ ] User can capture and/or pick multiple selfies (multi-photo improves likeness); guidance shown on good inputs.
- [ ] Uploads go to secure storage via signed URLs; progress and errors handled.
- [ ] Selfies are associated with the user and reusable across generations.
- [ ] Camera/photo-library permissions handled gracefully on iOS and Android.
- [ ] A consent acknowledgement (it's your own face, you have rights to use it) is captured before upload.
- [ ] Typecheck/lint passes; simulator evidence captured.

### US-009: Face-swap generation backend (GPT-Image 2 primary, Nano Banana Pro fallback)
**Description:** As a developer, I want a generation service so the app can turn (selfies + template) into a result.

**Acceptance Criteria:**
- [ ] An authenticated endpoint accepts a generation request (selfie set + template) and creates a job.
- [ ] The service calls GPT-Image 2 as primary; on failure/timeout it falls back to Nano Banana Pro, with the chosen prompt/params documented.
- [ ] Jobs are processed asynchronously with status tracking (queued → processing → done/failed); the app can poll/subscribe for status.
- [ ] Outputs are stored and returned via signed URLs; failures return actionable errors.
- [ ] An entitlement/credit check gates job creation (one generation consumes one credit or requires active subscription).
- [ ] Content-safety guardrails applied (reject disallowed inputs/outputs); no keys leak to client.
- [ ] Typecheck/lint/tests (where present) pass.

### US-010: Generation UI (progress & result reveal)
**Description:** As a user, I want clear feedback while my photo generates and a satisfying reveal so it feels premium.

**Acceptance Criteria:**
- [ ] Initiating generation shows tasteful progress (the PRD-01 signature reveal motion), not a raw spinner.
- [ ] The app reflects job status changes and handles long-running jobs without blocking the UI.
- [ ] On success, the result reveals with a before/after or full-screen presentation.
- [ ] On failure, a clear retry path is shown and no credit is silently lost (or it's refunded/handled).
- [ ] Typecheck/lint passes; simulator evidence captured.

### US-011: Result actions (save, share, regenerate)
**Description:** As a user, I want to save and share my result so I can use it on dating apps.

**Acceptance Criteria:**
- [ ] Save to camera roll works on iOS and Android (with permission handling).
- [ ] Native share sheet shares the image.
- [ ] Regenerate option re-runs against the same template/selfies (subject to credits).
- [ ] Typecheck/lint passes; simulator evidence captured.

### Gallery

### US-012: My generations gallery & history
**Description:** As a user, I want a gallery of everything I've made so I can revisit and reuse results.

**Acceptance Criteria:**
- [ ] A "My Photos" tab lists the user's generations (grid), newest first, backed by the generations table.
- [ ] Tapping an item opens it full-screen with save/share/regenerate actions.
- [ ] Empty state guides first-time users to the feed.
- [ ] In-progress and failed generations are represented clearly.
- [ ] Typecheck/lint passes; simulator evidence captured.

### Monetization & Onboarding

### US-013: Onboarding flow
**Description:** As a new user, I want a short onboarding so I understand the value and grant needed permissions.

**Acceptance Criteria:**
- [ ] A first-run onboarding carousel communicates the value prop and sets expectations (your face → great photos).
- [ ] Onboarding requests/explains permissions at the right moment (not all upfront).
- [ ] Onboarding shows once; it can lead into sign-in and/or the paywall.
- [ ] Typecheck/lint passes; simulator evidence captured.

### US-014: Paywall & subscription/credits (RevenueCat)
**Description:** As the business, I want a paywall so generation is monetized.

**Acceptance Criteria:**
- [ ] In-app purchases integrated (RevenueCat recommended) for iOS and Android with at least one subscription and/or a credit pack.
- [ ] Paywall screen uses the PRD-01 paywall surface spec; plans, price, and restore-purchases are present.
- [ ] Purchases unlock entitlement/credits reflected on the backend.
- [ ] Restore purchases and basic error states handled.
- [ ] Typecheck/lint passes; simulator/sandbox evidence captured.

### US-015: Entitlement & credit gating
**Description:** As the business, I want generation gated by entitlement so only paying users (or granted free credits) can generate.

**Acceptance Criteria:**
- [ ] Backend is the source of truth for entitlements/credits; the app reflects remaining balance.
- [ ] Generation requests are rejected server-side when the user lacks entitlement, routing the app to the paywall.
- [ ] Optional intro free credit(s) configurable for new users.
- [ ] Credit consumption is atomic and consistent with job outcomes (no double-spend, failure handling defined).
- [ ] Typecheck/lint/tests (where present) pass.

### Polish & Operations

### US-016: States, safety & moderation
**Description:** As a user, I want graceful states and a safe product so the app feels trustworthy.

**Acceptance Criteria:**
- [ ] Consistent loading, empty, and error states across feed, generation, and gallery.
- [ ] Content moderation/safety on inputs and outputs (block disallowed content; enforce face-consent).
- [ ] A clear path to delete uploaded selfies and generated photos (privacy).
- [ ] Network-failure and offline handling are graceful.
- [ ] Typecheck/lint passes; simulator evidence captured.

### US-017: Analytics & crash reporting
**Description:** As the team, I want telemetry so we can measure funnel and fix crashes.

**Acceptance Criteria:**
- [ ] Analytics integrated for key events: onboarding complete, selfie uploaded, generation started/succeeded/failed, paywall viewed, purchase completed.
- [ ] Crash reporting integrated for iOS and Android.
- [ ] No PII or image content leaked to analytics; respects privacy expectations.
- [ ] Typecheck/lint passes.

## Functional Requirements

- FR-1: Built with Expo React Native + TypeScript for iOS and Android, consuming PRD-01 tokens.
- FR-2: All AI model calls route through a backend proxy; no model keys in the app bundle.
- FR-3: Primary model is GPT-Image 2; Nano Banana Pro is the fallback, selected server-side.
- FR-4: Users authenticate (Apple/Google/email) and all protected endpoints validate auth.
- FR-5: The feed serves curated templates filterable by gender and category.
- FR-6: Users upload reusable selfies (with consent) stored via signed URLs.
- FR-7: Generation runs as async jobs with status tracking and stored, signed-URL outputs.
- FR-8: A paywall gates generation; the backend is the source of truth for entitlements/credits.
- FR-9: Users can save, share, and regenerate results, and view a gallery/history.
- FR-10: Content safety, privacy/deletion, analytics, and crash reporting are in place.

## Non-Goals

- No in-app social feed, following, or sharing-to-other-users (results are private).
- No web app version (covered separately; this PRD is mobile).
- No advanced editing (manual retouching, background swap, custom prompts) in the MVP.
- No video generation.
- No multi-language localization in this phase.
- No admin dashboard for template curation in this phase (seed via scripts/manual process).

## Design Considerations

- Implement RN components against PRD-01 token specs (feed tile, chips, paywall surface, reveal motion).
- Dark-first, photo-forward UI so templates and results are the star.
- Generation progress and reveal are signature moments — invest in feel, avoid raw spinners.
- Permission and consent prompts must feel trustworthy, not scary.

## Technical Considerations

- Recommended backend: Supabase (auth + Postgres + storage) plus an edge/server function for the AI proxy and job orchestration; or a Node API + Postgres + object storage. Decide in US-002.
- Async generation needs a job/queue mechanism and status the app can poll or subscribe to.
- IAP via RevenueCat simplifies cross-platform subscriptions/credits and restore.
- Respect Apple/Google review requirements: Sign in with Apple, IAP for digital goods, privacy nutrition labels, content moderation for user-generated/AI imagery.
- Likeness quality depends on prompt/params and number of selfies — plan for iteration.

## Success Metrics

- Time-to-first-result (onboarding → first generated photo) is short and reliable.
- Generation success rate (incl. fallback) is high; failures rarely consume credits unfairly.
- Onboarding → paywall → purchase conversion is tracked from launch.
- Users save/share results (engagement signal that quality is good enough to use).

## Open Questions

- Template image sourcing/licensing: stock licenses, commissioned shoots, or AI-generated base templates? This has legal weight and must be settled before scaling the seed set.
- Likeness/legal: handling of biometric/face data, consent wording, and regional rules (e.g. BIPA/GDPR) — needs review.
- Pricing/packaging: subscription tiers vs. credit packs vs. both; intro free credits count.
- Exact GPT-Image 2 / Nano Banana Pro prompt + parameter strategy for best likeness and the fallback trigger thresholds.
- Backend choice (Supabase vs. custom Node) and queue/runtime for long generations.
- Moderation provider/approach for input and output safety.

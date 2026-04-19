# Task: Expand Landing Page — Pillars, Spotlights, Pricing, Trust & Footer

## Task ID
task_002_landing_sections_expansion

## Parent Features
- `features/feature_value_pillars.md` *(new)*
- `features/feature_feature_spotlights.md` *(new)*
- `features/feature_pricing_preview.md` *(new)*
- `features/feature_security_compliance.md` *(new — satisfies `product_spec.md` Landing Feature #5)*
- `features/feature_testimonials.md` *(new)*
- `features/feature_dark_cta_band.md` *(new)*
- `features/feature_footer.md` *(new — satisfies `product_spec.md` Landing Feature #9)*

> This is an **orchestrator task** covering the seven features added to close the gap between `task_001`'s shipped surface and the richer composition in `sdd/html_examples/landing-preview.html`. Copy / layout revisions to the existing Hero + Navbar are **out of scope here** and are tracked as Open Questions below for owner triage.

## Objective
Extend `paywithtin.com` beyond the core ecosystem/payment-methods surface with the additional editorial bands — value pillars, two feature spotlights, pricing preview, security & compliance, testimonials, dark closing CTA, and a production-grade footer — implemented in strict adherence to the TIN Sovereign Design System established in `task_001`.

## Final Page Composition (target, after this task)

```
<Navbar />                       // from task_001 (copy revisions deferred — see Open Questions)
<main>
  <Hero />                       // from task_001 (copy revisions deferred — see Open Questions)
  <ValuePillars />               // NEW — section id="value-pillars"
  <ProductsEcosystem />          // from task_001
  <PaymentMethods />             // from task_001
  <FeatureSpotlights />          // NEW — renders spotlight-checkout + spotlight-visibility
  <PricingPreview />             // NEW — section id="pricing"
  <SecurityCompliance />         // NEW — section id="security"
  <Testimonials />               // NEW — section id="testimonials"
  <DarkCtaBand />                // NEW — section id="final-cta"
</main>
<Footer />                       // NEW — role="contentinfo"
```

Navbar anchor links are extended to include: `#pricing`, `#security`, `#contact-sales` (Contact Sales form is built in `task_003_contact_sales_form` — anchor CTA remains a safe no-op until then).

## Requirements

### R1 — Value Pillars section (`feature_value_pillars.md`)
1. Create `src/components/sections/ValuePillars.tsx` + `ValuePillars.module.scss`.
2. Create `src/constants/value-pillars.ts` exporting the three-pillar array with `lucide-react` icon references.
3. Non-interactive cards using existing `Card` atom (`elevation="raised"`).
4. Grid: 1 / 2 / 3 columns at `< 768px / 768–1279px / ≥ 1280px`.
5. Mount in `App.tsx` immediately after `<Hero />`.

### R2 — Feature Spotlights section (`feature_feature_spotlights.md`)
1. Create `src/components/sections/FeatureSpotlights.tsx` + module SCSS.
2. Create `src/constants/spotlights.ts` with the `Spotlight` interface from the feature spec and the two V1 entries (`spotlight-checkout` JSON, `spotlight-visibility` image).
3. Alternate `mediaSide` on desktop; single-column stack on mobile (copy first).
4. **Resolve the typography delta** flagged in the feature spec before coding. Default proposal: **option (A)** — amend `design_system.md` § 2 to permit a monospace stack **only** inside code containers. This unlocks the JSON panel without breaking Inter-everywhere-else.
5. Add one scoped new token `--font-family-mono` to `src/styles/_tokens.scss`: `'JetBrains Mono', 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace` (only if option A is accepted).
6. Image spotlight: supply a temporary placeholder asset under `src/assets/spotlights/dashboard-visibility.svg` (neutral monogram SVG is acceptable). Real asset swap is a content ticket, not a code change.
7. Mount in `App.tsx` immediately after `<PaymentMethods />`.

### R3 — Pricing Preview section (`feature_pricing_preview.md`)
1. Create `src/components/sections/PricingPreview.tsx` + module SCSS.
2. Create `src/constants/pricing.ts` exporting the three tiers with surface + CTA config.
3. Reuse `Card` + `Button`. Enterprise card uses `--color-primary-container` surface and inverted text; no `Button` fork — add a `theme: 'light' | 'dark'` prop to `Button` (see R7).
4. Starter CTA uses `buildSignupUrl()`; Growth / Enterprise CTAs smooth-scroll to `#contact-sales`.
5. Fire `trackEvent('cta_click', { location: 'pricing_preview', tier })` via `src/lib/analytics.ts`. Extend the analytics event type union to include `tier`.
6. Mount in `App.tsx` after `<FeatureSpotlights />`.

### R4 — Security & Compliance section (`feature_security_compliance.md`)
1. Create `src/components/sections/SecurityCompliance.tsx` + module SCSS.
2. Create `src/constants/security.ts` with the three trust pillars and four compliance badges.
3. `tokenization` + `soft-precision` badges render as `<a href="#products">`; the other two render as `<span>`.
4. Heading follows single-h1-rule (`<h2>` here); section id is `#security`.
5. Mount in `App.tsx` after `<PricingPreview />`.

### R5 — Testimonials section (`feature_testimonials.md`)
1. Create `src/components/sections/Testimonials.tsx` + module SCSS.
2. Create `src/constants/testimonials.ts` with two `isPlaceholder: true` entries.
3. Each card is a semantic `<blockquote>` with an inner `<cite>`.
4. Section renders **only** when the array length > 0.
5. Coding agent calls out `isPlaceholder: true` entries in the PR description.
6. Mount in `App.tsx` after `<SecurityCompliance />`.

### R6 — Dark CTA Band section (`feature_dark_cta_band.md`)
1. Create `src/components/sections/DarkCtaBand.tsx` + module SCSS.
2. Extend `Button` (R7) with a `theme: 'light' | 'dark'` prop. Primary / Ghost variants must compose with both themes.
3. Surface is a contained panel (not full-bleed) using `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-gradient-stop) 100%)`.
4. Add the new token `--color-primary-gradient-stop: #1e315f` to `src/styles/_tokens.scss`. No other hex introduced.
5. CTAs honor `buildSignupUrl()` + UTM forwarding for Primary and smooth-scroll to `#contact-sales` for Ghost.
6. Fire `trackEvent('cta_click', { location: 'dark_cta_band' })` and (for Primary) `trackEvent('signup_redirect')`.
7. Mount in `App.tsx` after `<Testimonials />`.

### R7 — Shared UI extensions
1. **`Button` atom** — add `theme: 'light' | 'dark'` (default `light`). On `dark`:
   - Primary: `background: var(--color-on-primary)`, text `var(--color-primary)`.
   - Ghost: transparent, ghost border at `rgba(198,198,205,0.24)`, text `var(--color-on-primary)`.
   - Focus ring remains `var(--color-secondary)`.
2. **`Card` atom** — no change required.
3. **`Pulse` atom** — no change required.
4. **(Optional) new `Pill` atom** in `src/components/ui/Pill.tsx` for reusable compliance/trust chips. Inline in `SecurityCompliance` is acceptable in V1 if the chip shape does not need reuse elsewhere — flag the decision in PR.

### R8 — Footer (`feature_footer.md`)
1. Create `src/components/layout/Footer.tsx` + module SCSS.
2. Create `src/constants/footer.ts` owning all column labels, link URLs, sandbox UTM config, and compliance micro-text. No inline JSX text.
3. Render as `<footer role="contentinfo">` with the 4-column desktop grid / 2-column tablet / `<details>` accordion mobile layout.
4. Sandbox link uses `buildSignupUrl({ utmSource: 'footer', utmMedium: 'footer', utmCampaign: 'sandbox' })`.
5. External links use `target="_blank" rel="noopener noreferrer"` and render a trailing `lucide-react` `ExternalLink` icon.
6. Placeholder URLs (`href="#"`) render with `aria-disabled="true"` and at 60% opacity; coding agent logs each to the PR description.
7. Mount in `App.tsx` as a sibling **after** `</main>` — footer is outside the landmark-main.

### R9 — Navigation revisions (scope-limited)
1. Extend the section-anchor list in `src/components/layout/Navbar.tsx` to include `#pricing` and `#security` in addition to the existing `#hero`, `#products`, `#payment-methods`. Labels: `Pricing`, `Seguridad`.
2. Extend the `IntersectionObserver` target set to include the new section ids.
3. **Do NOT** change the Navbar CTA copy (`Start Building` / `Contact Sales`) in this task. The HTML example's `Activar sandbox` / `Ir al merchant panel` copy is an **open question** (see below).

### R10 — Analytics schema extension
1. In `src/lib/analytics.ts`, extend the `trackEvent` discriminated union to support:
   - `{ name: 'cta_click', params: { location: CtaLocation; tier?: 'starter' | 'growth' | 'enterprise' } }`
   - Where `CtaLocation = 'hero' | 'navbar' | 'pricing_preview' | 'dark_cta_band' | 'footer'`.
2. Keep the stub a no-op; GA4 wiring remains deferred to `task_004_seo_analytics_foundation`.

### R11 — Responsive, A11y, and Design-System Guarantees
1. All new sections render cleanly at `320 / 768 / 1024 / 1280 / 1920` with zero horizontal scroll.
2. Single `<h1>` on the page (unchanged — still in the Hero). Every new `<section>` carries `aria-labelledby` pointing at its `<h2>` id.
3. `prefers-reduced-motion: reduce` disables entrance staggers, the Enterprise card lift, Testimonial card lift, and the Dark CTA Band reveal animations.
4. No `border: 1px solid` used for sectioning anywhere in the new files (grep verified in acceptance).
5. No `box-shadow` uses pure black `rgba(0,0,0,X)` or `#000`. Always `rgba(25,28,30,X)` derived from `on_surface`.
6. No hardcoded hex values in new components — all colors flow through `var(--color-*)`. The sole exceptions are the two tokens introduced in `_tokens.scss`: `--color-primary-gradient-stop: #1e315f` and (conditional on option A) `--font-family-mono: …`.
7. Keyboard tab order follows visual order through new sections: Pillars (skipped, non-interactive) → Spotlights (skipped) → Pricing cards' three CTAs → Security badge links (2) → Testimonials (skipped) → Dark CTA Band (Primary → Ghost) → Footer (wordmark skipped → column links → socials).
8. Visible `2px solid var(--color-secondary)` focus ring everywhere.
9. Color contrast — dark surfaces (Dark CTA Band, Enterprise pricing card) verified against WCAG AA on body (4.5:1) and AAA on heading (7:1).

## Spec References
- `specs/product_spec.md` → Landing Page Features #5 (Security), #9 (Footer), Core Products, Primary Users, Design System Constraints, Acceptance Criteria. Proposed additions for Value Pillars (#11), Pricing (#12), Dark CTA Band (#13), Testimonials (#14) flagged in Open Questions.
- `specs/architecture_spec.md` → Tech Stack, Project Structure, SEO Strategy, Performance Budget (new sections must not regress LCP / CLS).
- `specs/design_system.md` → § 1 Color Tokens + No-Line Rule, § 2 Typography, § 3 Elevation & Depth, § 4 Radius (especially nesting rule), § 5 Spacing, § 6 Component Specs, § 7 Motion, § 8 Asymmetric Layout, § 9 SCSS Token Map. Proposed amendment to § 2 flagged in Open Questions.
- `specs/business_rules.md` → Floating Nav Visibility; Active Section Highlighting; Dual CTA Prominence; CTA Destination; Pre-fill UTM Parameters; No Border Lines; Shadow Specification; Typography Exclusivity; Glassmorphism Application; Corner Radius Nesting; Asymmetric Layout; Single H1 Per Page; Reduced Motion; Keyboard Navigation; Color Contrast; Above-the-Fold Priority; Brand Voice.
- `specs/api_spec.md` → Sign Up / Developer Provisioning Flow (CTA + UTM forwarding); GA4 event schema (stubbed only in this task).

## Implementation Notes
- **Ordering matters for IntersectionObserver:** `Navbar` needs to register `#pricing` and `#security` in the same data structure it already uses for the task_001 section ids. Verify that only one link is `active` at a time.
- **Spotlight image:** use a simple SVG placeholder under `src/assets/spotlights/dashboard-visibility.svg`. Do **not** pull remote images (no Unsplash CDN dependency — the HTML example's Unsplash URLs are illustrative only).
- **Spotlight code panel:** render a static JSON string inside a `<pre><code>` block. No syntax highlighting library in V1. If syntax colors become a launch requirement, spin up a follow-up task rather than in-line Shiki/Prism here.
- **Testimonials copy** is a placeholder. The coding agent must not change the two V1 entries; flag them in the PR description with `isPlaceholder: true` callouts.
- **Pricing numbers are intentionally absent**. Do not invent `$` figures or basis-point rates. Owner of pricing content is Sales.
- **Footer placeholder URLs** must be logged one-line-each in the PR description for backlog triage, e.g.:
  `- [ ] Footer/Legal/Términos → destination TBD`
- **No backend calls** in this task. CRM and real GA4 wiring remain deferred to `task_003_contact_sales_form` and `task_004_seo_analytics_foundation` respectively.
- **Testing:** this task does not introduce a test suite. Acceptance is verified via `npm run build`, `npm run dev`, and a manual viewport walk plus the grep checks in the Acceptance Criteria section. A future task will introduce component testing.
- **Performance:** keep the image spotlight's asset under 40 KB (SVG placeholder easily meets this). No new fonts added (unless option A in Open Questions is accepted and monospace is self-hosted — in which case add `@fontsource/jetbrains-mono` with only the weights actually used).

## Open Questions (owner decisions required BEFORE coding starts)

1. **Typography spec delta — monospace inside code panels.**
   `sdd/html_examples/landing-preview.html` uses `IBM Plex Mono` + `JetBrains Mono` as primary/brand/technical fonts. `design_system.md` § 2 mandates **Inter exclusively**. The feature spec `feature_feature_spotlights.md` proposes a narrow amendment:
   - **Option A (proposed default):** amend `design_system.md` § 2 to read: *"Inter is the page typeface. A monospace stack is permitted exclusively inside code containers (e.g., spotlight JSON panels, developer surfaces), never for headings, body copy, labels, or UI chrome."* Add `--font-family-mono` token.
   - **Option B:** reject monospace entirely — render code in Inter 500-weight, sacrificing visual code clarity.
   **Owner must pick A or B before this task is implemented.**

2. **Navbar + Hero copy revisions.**
   The HTML example uses different nav CTA labels (`Activar sandbox` / `Ir al merchant panel`), a different Hero headline (`Integras la API, cobras y... Tin.`), and introduces a hero trust-chip strip (`Banco / eCommerce / SaaS / Retail`). These are **not in this task**. Owner options:
   - **(i)** Leave as shipped in `task_001` (status quo) — fastest.
   - **(ii)** Open `task_002a_hero_nav_copy_revision` to implement the HTML example's copy with explicit spec ownership.
   If owner picks (ii), create that task as a sibling to this one.

3. **`product_spec.md` Landing Page Features list — missing sections.**
   Propose appending to `specs/product_spec.md` § "Landing Page Features":
   - **#11 Value Pillars** — 3-up differentiators band.
   - **#12 Pricing Preview** — three-tier preview with CTAs routed to Sign Up / Contact Sales.
   - **#13 Final Conversion Band** — dark closing CTA above the footer.
   - **#14 Testimonials** — two-card social-proof band.
   Until this amendment lands, the features above exist in `/sdd/features/` but are not traced back to `product_spec.md`. The SDD agent recommends this amendment be accepted in the same PR as this task.

4. **Testimonials content ownership.** V1 ships with `isPlaceholder: true` stock quotes. Marketing must supply real quotes, author names (with consent), and company references before production launch. Blocking for a V1 staging deploy is acceptable.

5. **Footer link destinations.** Most V1 footer links do not yet have canonical URLs (Dev Portal, Status Page, Legal pages). The coding agent will render them as `aria-disabled` placeholders and surface the full list in the PR. Owner is responsible for routing.

## Acceptance Criteria

**File creation & wiring**
- [ ] Seven new feature specs exist under `/sdd/features/` (enumerated above) — satisfied by this SDD delivery.
- [ ] Seven new section/layout components exist under `src/components/sections/` and `src/components/layout/` per the final page composition.
- [ ] Seven new constants files exist under `src/constants/` (`value-pillars.ts`, `spotlights.ts`, `pricing.ts`, `security.ts`, `testimonials.ts`, `footer.ts`, plus any necessary shared enums).
- [ ] `App.tsx` renders the final page composition in the specified order.

**Design system compliance**
- [ ] `grep -rE "border:\s*1px\s+solid" src/components/sections src/components/layout/Footer*` returns **zero** matches that are used for sectioning. Ghost borders on atoms are allowed.
- [ ] `grep -rE "rgba\(0\s*,\s*0\s*,\s*0" src/` returns **zero** matches (no pure-black shadows).
- [ ] `grep -rE "#[0-9a-fA-F]{3,6}" src/components/ src/constants/` returns only intentional exceptions (and they must be documented in PR).
- [ ] Only two new tokens are added to `_tokens.scss`: `--color-primary-gradient-stop` and (conditional on Option A) `--font-family-mono`.

**Accessibility & a11y**
- [ ] Still exactly one `<h1>` on the page (in the Hero).
- [ ] Every new `<section>` uses `aria-labelledby` pointing at an `<h2>` id (visually-hidden where the design hides the heading).
- [ ] `<footer>` uses `role="contentinfo"` and is outside `<main>`.
- [ ] Testimonials render as `<blockquote>` + `<cite>`.
- [ ] Focus ring `2px solid var(--color-secondary)` visible on every new interactive element.
- [ ] Keyboard tab order matches R11.7.
- [ ] `prefers-reduced-motion: reduce` disables all non-essential animations in new sections.

**Feature-level**
- [ ] ValuePillars: three `Card` instances, responsive 1/2/3-col, non-interactive.
- [ ] FeatureSpotlights: both V1 spotlights render; `mediaSide` alternation on desktop; mobile stacks copy above media; code panel is horizontally scrollable.
- [ ] PricingPreview: three cards; Enterprise on `--color-primary-container`; Starter CTA forwards UTMs via `buildSignupUrl`; `cta_click` event fires with `tier`.
- [ ] SecurityCompliance: three pillar cards + four compliance pills; `tokenization` + `soft-precision` deep-link to `#products`.
- [ ] Testimonials: two `<blockquote>`s; section hidden when array is empty; `isPlaceholder` flags surfaced in PR description.
- [ ] DarkCtaBand: dual CTAs; dark `Button` theme works without forking; both events fire correctly; focus ring still `--color-secondary`.
- [ ] Footer: 4-col desktop / 2-col tablet / `<details>` accordion mobile; sandbox link carries footer UTMs; all external links have `target="_blank" rel="noopener noreferrer"`.
- [ ] Navbar extended with `#pricing` and `#security` anchors; `IntersectionObserver` still highlights at most one link.

**Analytics**
- [ ] `trackEvent` discriminated union includes the extended `cta_click` schema (`location` + optional `tier`).
- [ ] All new CTAs call `trackEvent` with correct `location` values.

**Build & runtime**
- [ ] `npm run build` succeeds with zero TypeScript errors and zero SCSS warnings.
- [ ] `npm run dev` serves the page; manual walk at 320 / 768 / 1024 / 1280 / 1920 shows no horizontal scroll and no layout breakage.
- [ ] Lighthouse performance delta vs `task_001` baseline: no regression beyond −3 points on mobile (measured locally against `npm run build` + `npm run preview`).

**Content & content-ops**
- [ ] Every testimonial with `isPlaceholder: true` is listed in the PR description.
- [ ] Every footer link with `href="#"` is listed in the PR description with the column it belongs to.
- [ ] Hero + Navbar copy remain unchanged (HTML example copy drift is tracked under Open Question #2, not this task).

## Output Artifacts

**New files — components**
- `src/components/sections/ValuePillars.tsx` + `ValuePillars.module.scss`
- `src/components/sections/FeatureSpotlights.tsx` + `FeatureSpotlights.module.scss`
- `src/components/sections/PricingPreview.tsx` + `PricingPreview.module.scss`
- `src/components/sections/SecurityCompliance.tsx` + `SecurityCompliance.module.scss`
- `src/components/sections/Testimonials.tsx` + `Testimonials.module.scss`
- `src/components/sections/DarkCtaBand.tsx` + `DarkCtaBand.module.scss`
- `src/components/layout/Footer.tsx` + `Footer.module.scss`
- *(optional)* `src/components/ui/Pill.tsx` + `Pill.module.scss`

**New files — data**
- `src/constants/value-pillars.ts`
- `src/constants/spotlights.ts`
- `src/constants/pricing.ts`
- `src/constants/security.ts`
- `src/constants/testimonials.ts`
- `src/constants/footer.ts`

**New files — assets**
- `src/assets/spotlights/dashboard-visibility.svg` (neutral SVG placeholder)

**Modified files**
- `src/App.tsx` — add 7 new sections + Footer to the composition.
- `src/components/layout/Navbar.tsx` — extend anchor list + IntersectionObserver targets; no CTA copy changes.
- `src/components/ui/Button.tsx` + `Button.module.scss` — add `theme: 'light' | 'dark'` prop.
- `src/lib/analytics.ts` — extend `trackEvent` union with `location` + optional `tier`.
- `src/styles/_tokens.scss` — add `--color-primary-gradient-stop` and (conditional on Option A) `--font-family-mono`.
- `specs/design_system.md` — conditional amendment to § 2 Typography (Option A only).
- `specs/product_spec.md` — conditional amendment to append landing features #11–#14 (Open Question #3).

## Deferred (remains out of scope)
- `task_002a_hero_nav_copy_revision` — optional, only if Open Question #2 resolves to option (ii).
- `task_003_contact_sales_form` — implements `features/feature_contact_sales_form.md`.
- `task_004_seo_analytics_foundation` — implements `features/feature_seo_foundation.md` and full GA4 wiring per `api_spec.md` § 4.
- `task_005_developer_focus_section` — implements `features/feature_developer_section.md` (note: reordered from task_001's original numbering since security + footer are now merged here).
- Real testimonial content load + footer URL finalization — content-ops, not engineering.

# Task: Build Marketing Landing Page — Value Proposition, Ecosystem & Design System

## Task ID
task_001_build_marketing_landing_core

## Parent Features
- `features/feature_navigation.md`
- `features/feature_hero_section.md`
- `features/feature_products_ecosystem.md`
- `features/feature_payment_methods.md`

> This task is intentionally scoped as an **orchestrator epic** covering the four features above plus the Design System foundation. Contact Sales form, Developer Focus section, Security & Compliance, Footer, and full SEO/Analytics wiring are **out of scope** here and will be delivered in subsequent tasks (`task_002_*` onward).

## Objective
Ship the first production-ready slice of `paywithtin.com`: a responsive, Design-System-compliant landing page that delivers TIN's core value proposition (Hero), the full seven-engine ecosystem (Products), and all supported payment methods (Payment Methods), framed by a floating glassmorphic Navbar, and grounded in the TIN Sovereign Design System token layer.

## Requirements

### R1 — Design System Foundation (prerequisite for all visual work)
1. Install runtime dependencies required by this scope: `@fontsource/inter`, `framer-motion`, `lucide-react`.
2. Create the SCSS foundation exactly as specified in `design_system.md` § 9:
   - `src/styles/_tokens.scss` — all CSS custom properties (colors, typography, radius, shadows, spacing, glassmorphism, motion).
   - `src/styles/_typography.scss` — all type-scale mixins (`display-lg`, `display-md`, `headline-lg`, `headline-md`, `headline-sm`, `body-lg`, `body-md`, `body-sm`, `label-md`, `label-sm`). Labels must force `text-transform: uppercase`.
   - `src/styles/_mixins.scss` — reusable mixins: `glass-surface`, `ambient-shadow`, `ambient-shadow-lg`, `ghost-border`, `section-container` (responsive max-width + asymmetric vertical padding).
   - `src/styles/_reset.scss` — minimal CSS reset (box-sizing, margin/padding zeroing, media default block, focus-visible outline baseline).
   - `src/styles/main.scss` — `@use` entry point that composes the above and applies the body base typography (`body-md` on `--color-surface`).
3. Import `@fontsource/inter/400.css`, `.../500.css`, `.../600.css`, `.../700.css` and `./styles/main.scss` from `src/main.tsx`. Remove the CRA-style `App.css`/`index.css` left by the Vite template.
4. Replace `<html lang>` with `lang="es"` in `index.html` and add a single hardcoded `<title>`, `<meta name="description">`, and canonical link pointing to `https://paywithtin.com` (minimum viable SEO; full SEO is a later task).

### R2 — App Shell & Layout
1. Rewrite `src/App.tsx` to render the page skeleton with the following ordered, semantic structure:
   ```
   <Navbar />
   <main>
     <Hero />                    // <section id="hero">
     <ProductsEcosystem />       // <section id="products">
     <PaymentMethods />          // <section id="payment-methods">
   </main>
   ```
2. Use the tonal-stacking pattern from `design_system.md` § 1 to delineate sections — **never** via borders. Alternate `surface` ↔ `surface_container_low` between adjacent sections.
3. Provide a `section-container` layout mixin that centers content at a max-width (`1200px` desktop), applies responsive gutter padding (`--space-6` mobile, `--space-16` desktop), and enforces asymmetric vertical padding (more top than bottom on Hero, even `--space-20` on sections).

### R3 — Floating Glassmorphic Navbar (`features/feature_navigation.md`)
1. Create `src/components/layout/Navbar.tsx` + `Navbar.module.scss`.
2. Layout: logo left, section anchor links center (desktop only), dual CTAs right. Mobile (`< 768px`): logo left, compact "Contact Sales" + hamburger right.
3. Scroll behavior: transparent at `scrollY === 0`; at `scrollY > 50`, apply `var(--glass-bg)` + `backdrop-filter: var(--glass-blur)` with a 200ms ease background transition. Provide the `@supports not (backdrop-filter: blur(20px))` fallback to solid `--color-surface-container-lowest`.
4. Active section highlighting via `IntersectionObserver` (only one link active at a time, `--color-secondary`).
5. Section anchor links: `#hero`, `#products`, `#payment-methods`. Smooth scroll via CSS `scroll-behavior: smooth` on `html`.
6. CTAs:
   - **Start Building** (primary) — reads `import.meta.env.VITE_SIGNUP_URL`, appends current `window.location.search` UTM params, navigates same tab. If env is undefined, `console.warn` and fall back to `#`.
   - **Contact Sales** (ghost) — smooth-scrolls to `#contact-sales`. The target section is out of scope of this task; ensure the CTA is non-breaking (scroll to `#contact-sales` can yield "no-op" if the anchor is missing — acceptable).
7. Mobile drawer: slides in from the right, traps focus, closes on link click / Escape / resize ≥ 768px.
8. Bottom separator: `box-shadow: 0 1px 0 rgba(25, 28, 30, 0.08)` — **not** a border.

### R4 — Hero Section (`features/feature_hero_section.md`)
1. Create `src/components/sections/Hero.tsx` + `Hero.module.scss`.
2. Semantic: `<section id="hero" aria-labelledby="hero-title">` containing the page's single `<h1 id="hero-title">` using the `display-lg` mixin (falls back to `display-md` ≤ 480px).
3. Layout: two-column desktop (copy left, visual placeholder right), stacked single-column on mobile. Minimum height `100vh` (use `min-block-size: 100svh` for iOS safe-area correctness).
4. Copy (Spanish, TIN-colloquialism mandatory):
   - `<h1>`: `Pagos para toda Latinoamérica. TIN.`
   - Subtitle (`body-lg`, `--color-on-surface-variant`): `Payins, Payouts, Suscripciones, Antifraude y Conciliación. Todo en una plataforma, conectada a Pix, PSE, SPEI, tarjetas y wallets.`
5. Dual CTAs (shared `Button` component — see R7): "Start Building" (primary, gradient) and "Contact Sales" (ghost). Both visible at every viewport.
6. Visual placeholder right column: a stylized composition using stacked surface layers, a TIN Pulse dot (`design_system.md` § 6), and one decorative `lucide-react` icon. **No raster image** in V1; this keeps LCP deterministic. If a hero image is later added, it must use `loading="eager"` and `fetchpriority="high"`.
7. Framer Motion entrance animation: `fadeInUp` for headline, subtitle, CTA stack (staggered 0.08s). Wrap the entire section's animations under `useReducedMotion()`.
8. Asymmetric vertical padding: `--space-24` top, `--space-16` bottom on desktop.

### R5 — Products Ecosystem Section (`features/feature_products_ecosystem.md`)
1. Create `src/components/sections/ProductsEcosystem.tsx` + `ProductsEcosystem.module.scss`.
2. Create `src/constants/products.ts` exporting a typed array of all **seven** engines (Payins, Payouts, Recurrence, Soft Precision, Fees & Tax, Tokenization, Ledger) per the table in `feature_products_ecosystem.md`, each with: `id`, `name`, `tagline`, `description` (Spanish, benefit-led), `Icon` (imported from `lucide-react`).
3. Section background: `--color-surface-container-low`. Section headline uses TIN colloquialism: `Todo lo que necesitas. TIN.`
4. Grid layout:
   - Desktop (`≥ 1280px`): **asymmetric 4 + 3** — first row 4 columns, second row 3 columns centered (not 4+4). Optionally translate the middle card of the second row `translateY(-8px)`.
   - Tablet (`≥ 768px`): 2 columns.
   - Mobile: 1 column.
   - Use `grid-auto-rows: 1fr` so card heights remain aligned regardless of copy length.
5. Card (`ui/Card` — see R7):
   - Background `--color-surface-container-lowest`, radius `--radius-2xl`, padding `--space-8`. No borders.
   - Icon container inset uses `--radius-lg` (nesting rule). Icon tinted `--color-secondary`.
   - Title `headline-sm`, description `body-sm`.
   - Hover (desktop only): `translateY(-2px)` + `box-shadow: var(--shadow-ambient)`. Disable hover transform when `prefers-reduced-motion: reduce`.
6. Framer Motion: `whileInView` container with `staggerChildren: 0.08`; each card uses the `fadeInUp` variant.
7. On SVG icon load failure: render a 48×48 `--color-secondary` at 10% opacity circle placeholder. Text must never disappear.

### R6 — Payment Methods Section (`features/feature_payment_methods.md`)
1. Create `src/components/sections/PaymentMethods.tsx` + `PaymentMethods.module.scss`.
2. Create `src/constants/payment-methods.ts` with the `PaymentMethod` interface exactly as defined in `feature_payment_methods.md`, containing all 11 entries: Pix (BR), PSE (CO), SPEI (MX), OXXO (MX), Efecty (CO), PagoEfectivo (PE), Visa, Mastercard, American Express, Apple Pay, Google Pay.
3. Create `src/assets/payment-methods/` and add SVG logo placeholders for each method (a neutral monogram `<svg>` pill is acceptable for V1 — the data file must make swapping the real asset a one-line change).
4. Section background: `--color-surface-container-low` (alternates with adjacent sections).
5. Render three logical groups — `apm`, `card`, `wallet` — each preceded by a `label-sm` uppercase category header (`--color-on-surface-variant`).
6. Logo grid: desktop 5–6 per row, tablet 4 per row, mobile 3 per row. Each logo sits on a `--color-surface-container-lowest` pill card: radius `--radius-xl`, bounding box 80×56px (desktop) / 64×44px (mobile). Zero borders.
7. Resting visual state: `filter: grayscale(100%) opacity(.7)`. Hover (desktop): full color (`grayscale(0%) opacity(1)`) with `var(--duration-base) var(--ease-standard)`.
8. Every `<img>` has explicit `width`, `height`, descriptive `alt` (e.g., `alt="Pix — Pago instantáneo de Brasil"`), and `loading="lazy"` (section is below the fold).
9. Framer Motion staggered `fadeInUp` per card (stagger 0.05s), gated by `useReducedMotion()`.
10. Fallback: if `logoPath` 404s, render a text pill using `label-md` and `--color-surface-container-high` background.

### R7 — Shared UI Atoms
Create the minimum reusable atoms under `src/components/ui/`:
1. `Button.tsx` + `Button.module.scss` — variants `primary` (gradient per § 6), `ghost` (ghost border per § 6). Props: `variant`, `as` (`button` | `a`), `onClick`, `href`. Focus ring: `2px solid var(--color-secondary)` with `2px` offset. Active scale `0.97`. Disabled 40% opacity + no pointer events.
2. `Card.tsx` + `Card.module.scss` — base surface card used by ProductsEcosystem and future sections. Forwards `ref`. Accepts `elevation` (`flat` default, `raised` for hover-ready).
3. `Pulse.tsx` + `Pulse.module.scss` — the TIN Pulse component per `design_system.md` § 6. Animation disabled under `prefers-reduced-motion`.

### R8 — Responsive & Accessibility Guarantees
1. All three breakpoints render cleanly with zero horizontal scroll, tested at **320px / 768px / 1280px / 1920px**.
2. Single `<h1>` on the page (the Hero headline). All other section headings are `<h2>`. Each `<section>` uses `aria-labelledby` pointing at its heading's `id`.
3. All interactive elements are keyboard-operable; focus ring always visible (never `outline: none` without replacement).
4. Respect `prefers-reduced-motion` globally via Framer Motion's `useReducedMotion()`: TIN Pulse goes static, staggers collapse to 0, hover transforms are skipped (shadow-only hover).
5. Color contrast: body text on light surfaces ≥ WCAG AA (4.5:1); headings ≥ AAA (7:1). Do not introduce any new tones.

### R9 — Brand Voice Enforcement
Every section headline and every primary benefit sentence **must** include the TIN colloquialism (e.g., "…TIN.", "TIN.", or "…en un TIN."). This is a launch-blocking rule traced from `product_spec.md` → Acceptance Criteria and `design_system.md` → tone principles. The coding agent must not invent English-only copy in V1.

## Spec References
- `specs/product_spec.md` → Landing Page Features #1, #2, #3, #8; Core Products (7 engines); Supported Payment Methods; Acceptance Criteria; Design System Constraints; Primary Users.
- `specs/architecture_spec.md` → Tech Stack; Project Structure; SEO Strategy (minimum viable static meta in `index.html`); Performance Budget.
- `specs/design_system.md` → § 1 Color Tokens + No-Line Rule; § 2 Typography; § 3 Elevation & Depth; § 4 Radius; § 5 Spacing; § 6 Component Specs (Primary/Ghost Button, Card, Nav, TIN Pulse); § 7 Motion; § 8 Asymmetric Layout; § 9 SCSS Token Map.
- `specs/business_rules.md` → Floating Nav Visibility; Active Section Highlighting; Dual CTA Prominence; CTA Destination; Pre-fill UTM Parameters; No Border Lines; Shadow Specification; Typography Exclusivity; Glassmorphism Application; Corner Radius Nesting; Asymmetric Layout; Single H1 Per Page; Reduced Motion; Keyboard Navigation; Color Contrast; Above-the-Fold Priority.
- `specs/api_spec.md` → Sign Up / Developer Provisioning Flow (CTA redirect + UTM forwarding). Full GA4 wiring is deferred to a later task; this task only stubs `src/lib/analytics.ts` with a no-op `trackEvent` typed wrapper so CTAs can wire to a stable interface today.

## Implementation Notes
- **Project path note (flagged inconsistency):** `architecture_spec.md` describes the Vite project as living under `tin-landing/tin-landing/`, but the workspace only contains a single-level `tin-landing/` Vite project. Implement against the actual path (`<workspace>/tin-landing/`). **Propose to the SDD owner** that `architecture_spec.md` § "Actual Project Location" be corrected to reflect the single-level layout before future tasks rely on the doubled path.
- **Deps not yet installed** that this task must add: `@fontsource/inter`, `framer-motion`, `lucide-react`. Do **not** add `react-hook-form`, `zod`, `react-helmet-async`, or `react-syntax-highlighter` — those belong to future tasks (Contact Sales, SEO, Developer sections).
- **CSS Modules over BEM:** every section and atom ships with a co-located `*.module.scss` file using camelCase class names. Consume design tokens via `var(--token)`; never hardcode hex values in components.
- **Env vars:** Only `VITE_SIGNUP_URL` is consumed in this task. Read through `import.meta.env.VITE_SIGNUP_URL` with a safe fallback. Commit an updated `.env.example` listing `VITE_SIGNUP_URL`, `VITE_CRM_API_URL`, `VITE_CRM_API_KEY`, `VITE_GA4_MEASUREMENT_ID` so the surface is ready for future tasks.
- **No backend calls** in this task. CRM and Analytics integration are deferred.
- **Images:** absolutely no pure black (`#000`) in shadows. Use `rgba(25, 28, 30, X)`. Verified via code review grep.
- **Typography fallback chain:** `'Inter', system-ui, sans-serif`. Applied via `--font-family-base` on `body`.
- **Testing:** This task does not introduce an automated test suite (no Jest/Vitest installed). Acceptance is verified via `npm run build` + `npm run dev` + manual viewport walk (R8.1). A later task will introduce component testing.

## Acceptance Criteria
- [ ] `src/styles/` contains `_tokens.scss`, `_typography.scss`, `_mixins.scss`, `_reset.scss`, `main.scss` and all tokens in § 9 are present verbatim.
- [ ] `main.scss` is imported once from `src/main.tsx`; `App.css` and the template `index.css` are deleted.
- [ ] `@fontsource/inter` weights 400/500/600/700 are imported in `src/main.tsx` and Inter renders network-free.
- [ ] `App.tsx` renders `Navbar`, `Hero`, `ProductsEcosystem`, `PaymentMethods` inside a semantic `<main>` with the section IDs `#hero`, `#products`, `#payment-methods`.
- [ ] The page has **exactly one** `<h1>` (in the Hero) and every `<section>` carries `aria-labelledby`.
- [ ] Navbar is transparent at `scrollY === 0` and glassmorphic (`rgba(255,255,255,0.80)` + `blur(20px)`) after 50px of scroll; `@supports not (backdrop-filter: blur(20px))` fallback renders solid.
- [ ] Navbar highlights the active section via IntersectionObserver with at most one active link; links smooth-scroll to anchors; mobile hamburger opens a focus-trapped drawer that closes on link click / Escape / resize ≥ 768px.
- [ ] "Start Building" CTA reads from `VITE_SIGNUP_URL`, forwards current UTM params, and logs a warning when the env is undefined (no crash).
- [ ] Hero headline uses `display-lg` (auto-reduces to `display-md` ≤ 480px), includes the TIN colloquialism, and both CTAs are visible at 320 / 768 / 1280 / 1920.
- [ ] All **seven** engines render as cards in a 4+3 asymmetric grid on desktop, 2-col tablet, 1-col mobile; hover lifts `-2px` with ambient shadow; icons from `lucide-react`; icon-fail fallback circle present.
- [ ] All **eleven** payment methods render grouped by category with `label-sm` uppercase headers; rest state grayscale, hover full-color; each logo has explicit width/height/alt + `loading="lazy"`; missing-logo fallback pill renders.
- [ ] No file in `src/components/**` contains a `border: 1px solid` used for sectioning (grep-verified). Ghost borders on individual atoms are allowed per `design_system.md`.
- [ ] No `box-shadow` in the project uses pure black (`#000` / `rgba(0,0,0,…)`); all use `rgba(25, 28, 30, X)`.
- [ ] No component hardcodes hex color values — all colors flow through `var(--color-*)`.
- [ ] `prefers-reduced-motion: reduce` disables stagger, disables Pulse animation, and disables hover transforms (shadow-only hover remains).
- [ ] Keyboard tab order flows: skip link (if added) → Navbar logo → Nav links → Nav CTAs → Hero CTAs → Products cards (non-interactive, skipped) → Payment Methods (non-interactive, skipped). Visible `2px solid var(--color-secondary)` focus ring everywhere.
- [ ] `npm run build` succeeds with zero TypeScript errors and zero SCSS compilation warnings.
- [ ] `npm run dev` serves the page; manual test at 320 / 768 / 1280 / 1920 shows no horizontal scroll and no layout breakage.
- [ ] `index.html` sets `lang="es"`, a `<title>`, a meta description, and a canonical link to `https://paywithtin.com`.
- [ ] `.env.example` is updated with `VITE_SIGNUP_URL`, `VITE_CRM_API_URL`, `VITE_CRM_API_KEY`, `VITE_GA4_MEASUREMENT_ID`.

## Output Artifacts

**New files**
- `src/styles/_tokens.scss`
- `src/styles/_typography.scss`
- `src/styles/_mixins.scss`
- `src/styles/_reset.scss`
- `src/styles/main.scss`
- `src/components/layout/Navbar.tsx` + `Navbar.module.scss`
- `src/components/sections/Hero.tsx` + `Hero.module.scss`
- `src/components/sections/ProductsEcosystem.tsx` + `ProductsEcosystem.module.scss`
- `src/components/sections/PaymentMethods.tsx` + `PaymentMethods.module.scss`
- `src/components/ui/Button.tsx` + `Button.module.scss`
- `src/components/ui/Card.tsx` + `Card.module.scss`
- `src/components/ui/Pulse.tsx` + `Pulse.module.scss`
- `src/constants/products.ts`
- `src/constants/payment-methods.ts`
- `src/assets/payment-methods/*.svg` (11 placeholder or final SVGs)
- `src/lib/analytics.ts` (typed `trackEvent` stub — no-op in V1)
- `.env.example` (at Vite project root)

**Modified files**
- `src/main.tsx` (font + styles imports; no `App.css`/`index.css`)
- `src/App.tsx` (new layout shell)
- `index.html` (`lang`, title, description, canonical)
- `package.json` (new deps: `@fontsource/inter`, `framer-motion`, `lucide-react`)

**Deleted files**
- `src/App.css`
- `src/index.css`

## Deferred (creates follow-up tasks)
- `task_002_contact_sales_form` — implements `features/feature_contact_sales_form.md`.
- `task_003_developer_focus_section` — implements `features/feature_developer_section.md`.
- `task_004_seo_analytics_foundation` — implements `features/feature_seo_foundation.md` and full GA4 wiring per `api_spec.md` § 4.
- `task_005_security_compliance_and_footer` — implements the remaining two sections from `product_spec.md` Landing Page Features #5, #9.
- `task_006_architecture_spec_path_fix` — correct the `tin-landing/tin-landing/` doubled path in `architecture_spec.md` (see Implementation Notes).

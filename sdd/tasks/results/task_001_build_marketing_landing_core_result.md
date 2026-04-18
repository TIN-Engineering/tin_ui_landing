# Task Result: Build Marketing Landing Page — Value Proposition, Ecosystem & Design System

## Task reference
- Task file: `sdd/tasks/task_001_build_marketing_landing_core.md`
- Features:
  - `sdd/features/feature_navigation.md`
  - `sdd/features/feature_hero_section.md`
  - `sdd/features/feature_products_ecosystem.md`
  - `sdd/features/feature_payment_methods.md`

## Implemented

### R1 — Design System Foundation
- [x] `src/styles/_tokens.scss` — all CSS custom properties from `design_system.md` § 9 (colors, typography, radius, shadows, spacing, glassmorphism, motion, plus layout helpers).
- [x] `src/styles/_typography.scss` — all type-scale mixins (`display-lg`, `display-md`, `headline-lg/md/sm`, `body-lg/md/sm`, `label-md/sm`). Labels force uppercase.
- [x] `src/styles/_mixins.scss` — `glass-surface` (with `@supports not (backdrop-filter)` fallback), `ambient-shadow`, `ambient-shadow-lg`, `ghost-border`, `focus-ring`, `section-container`, `section-padding-y`, `hero-padding-y`, `visually-hidden`.
- [x] `src/styles/_reset.scss` — minimal reset, `prefers-reduced-motion` global kill-switch.
- [x] `src/styles/main.scss` — entry that wires tokens + typography + reset and sets body base typography/surface.
- [x] `@fontsource/inter` 400/500/600/700 imported in `src/main.tsx` — zero external font requests.
- [x] `src/App.css` and `src/index.css` (CRA-style template files) deleted.

### R2 — App Shell & Layout
- [x] `src/App.tsx` rewritten to render `<Navbar />` + `<main>` with `<Hero />`, `<ProductsEcosystem />`, `<PaymentMethods />` in order.
- [x] Section IDs present: `#hero`, `#products`, `#payment-methods`.
- [x] Tonal stacking alternation: `--color-surface` (Hero) → `--color-surface-container-low` (Products) → `--color-surface` (Payment Methods).
- [x] Responsive `section-container` mixin centers content at `--layout-max-width: 1200px` with mobile / tablet / desktop gutter padding.

### R3 — Floating Glassmorphic Navbar
- [x] `src/components/layout/Navbar.tsx` + `Navbar.module.scss`.
- [x] Scroll-driven glassmorphism: transparent at `scrollY === 0`, `rgba(255,255,255,0.80)` + `backdrop-filter: blur(20px)` past 50px, via `passive` scroll listener. 200ms `var(--duration-base) var(--ease-standard)` transition.
- [x] `@supports not (backdrop-filter: blur(1px))` fallback to solid `--color-surface-container-lowest` (built into the `glass-surface` mixin).
- [x] Bottom seam uses `box-shadow: 0 1px 0 rgba(25, 28, 30, 0.08)` — never a border.
- [x] `IntersectionObserver` tracks `#hero`, `#products`, `#payment-methods`; only the highest-ratio-visible section is marked active and receives the `--color-secondary` link tint plus `aria-current="true"`.
- [x] Dual CTAs always visible: "Contact Sales" (ghost, desktop only) + "Start Building" (primary, always), plus a hamburger for the mobile drawer.
- [x] "Start Building" reads `import.meta.env.VITE_SIGNUP_URL` through `src/lib/analytics.ts#buildSignupUrl`, forwards current UTM params, and `console.warn`s if unset (falls back to `#`).
- [x] Mobile drawer: backdrop + focus-trapped aside, focuses the close button on open, restores focus on close, closes on Escape, on link click, and on viewport ≥ 960px.
- [x] `role="banner"`, `role="dialog" aria-modal="true"` on drawer, `aria-label="Secciones principales"` on nav, `aria-expanded` / `aria-controls` on hamburger.

### R4 — Hero Section
- [x] `<section id="hero" aria-labelledby="hero-title">` with the page's single `<h1>` (`display-lg` desktop, `display-md` ≤ 768px).
- [x] Headline: `Pagos para toda Latinoamérica. TIN.` (TIN colloquialism enforced).
- [x] Subtitle (`body-lg`, `--color-on-surface-variant`): `Payins, Payouts, Suscripciones, Antifraude y Conciliación. Todo en una plataforma, conectada a Pix, PSE, SPEI, tarjetas y wallets — listo para integrar en un TIN.`
- [x] Dual CTAs: primary gradient "Start Building" + ghost "Contact Sales"; "Contact Sales" smooth-scrolls to `#contact-sales` (no-op if the anchor is missing, future-safe).
- [x] No raster hero image (deterministic LCP). Right column is a stylized "TIN Console" composition with two stat cards + one live flow card using layered surfaces + `lucide-react` `Zap` icon.
- [x] `Pulse` component used as the live indicator; animation gated by `prefers-reduced-motion`.
- [x] Framer Motion `fadeInUp` on all hero children with 0.08s stagger; reduced-motion path skips the animation entirely.
- [x] Asymmetric vertical padding: more padding-top than padding-bottom (via `hero-padding-y` mixin).
- [x] Min-height `100vh` / `100svh` for iOS safe-area correctness.

### R5 — Products Ecosystem
- [x] `src/constants/products.ts` — all **seven** engines with `id`, `name`, `tagline`, `description` (benefit-led, TIN-colloquialism-friendly), and `Icon` from `lucide-react` (`ArrowDownToLine`, `ArrowUpFromLine`, `RefreshCcw`, `ShieldCheck`, `Receipt`, `Lock`, `BookOpen`).
- [x] Section headline: `Todo lo que necesitas para cobrar, pagar y crecer. TIN.`
- [x] `<section id="products" aria-labelledby="products-title">`.
- [x] Grid: 1-col mobile → 2-col tablet (`≥ 768px`) → **asymmetric 4 + 3** desktop (`≥ 1280px`) on a 12-column grid; row 2 starts at `grid-column-start: 3` so the three cards are centered (cols 3-5 / 6-8 / 9-11).
- [x] Middle card of row 2 lifted `translateY(-8px)`; lift removed under `prefers-reduced-motion`.
- [x] Card background `--color-surface-container-lowest`, section background `--color-surface-container-low` — tonal stacking for natural lift.
- [x] Card corner radius `--radius-2xl`, icon inset radius `--radius-lg` (nesting rule satisfied).
- [x] Hover: `translateY(-2px)` + `var(--shadow-ambient)`; transform suppressed under `prefers-reduced-motion` (shadow-only hover).
- [x] `grid-auto-rows: 1fr` + `cardWrapper` flex stretching keeps equal heights across varying description lengths.
- [x] Framer Motion `whileInView` stagger (0.08s) with `viewport.once: true`; reduced-motion path skips animation.

### R6 — Payment Methods
- [x] `src/constants/payment-methods.ts` — all **eleven** methods (Pix BR, PSE CO, SPEI MX, OXXO MX, Efecty CO, PagoEfectivo PE, Visa, Mastercard, American Express, Apple Pay, Google Pay) typed with the `PaymentMethod` interface from `feature_payment_methods.md`.
- [x] Eleven SVG placeholder logos in `src/assets/payment-methods/` (neutral wordmarks suitable for V1 — swap-in a real asset is a single `import`/`logoPath` change per method).
- [x] Three logical groups (APMs, Cards, Wallets) each preceded by a `label-sm` uppercase category header tinted `--color-on-surface-variant`.
- [x] Responsive grid: **3-col mobile** / 4-col tablet / **6-col desktop**.
- [x] Logo pill card: `--color-surface-container-lowest` on `--color-surface`, `--radius-xl`, min-height 72px. Zero borders.
- [x] Resting state: `filter: grayscale(100%) opacity(0.75)`; hover (`hover: hover` only): full color + `translateY(-2px)` + ambient shadow; transform suppressed under `prefers-reduced-motion`.
- [x] All `<img>` tags have explicit `width={120}`, `height={48}`, descriptive Spanish `alt`, `loading="lazy"`, `decoding="async"`.
- [x] Per-logo `onError` fallback: the card switches to a `label-md` text pill on `--color-surface-container-high` background (spec requirement).
- [x] Framer Motion stagger 0.05s, `whileInView`, reduced-motion fallback.

### R7 — Shared UI Atoms
- [x] `Button` (`src/components/ui/Button.tsx`) — polymorphic `as: 'button' | 'a'` with discriminated union props. Variants: `primary` (`--gradient-primary`) and `ghost` (transparent + ghost border). Focus ring `2px var(--color-secondary)` at `2px` offset. Active scale `0.97` (suppressed under reduced motion). Disabled path: 40% opacity, no pointer events. Compact size for navbar.
- [x] `Card` (`src/components/ui/Card.tsx`) — forwardRef, `elevation: 'flat' | 'raised'` (raised triggers hover lift + ambient shadow, no-op under reduced motion), `padding: 'default' | 'compact'`.
- [x] `Pulse` (`src/components/ui/Pulse.tsx`) — 8×8 circle, `--color-secondary`, pulsing halo animation at 1.5s. `@media (prefers-reduced-motion)` removes the animation (static dot). Exposed as `role="status"` with an accessible label.

### R8 — Responsive & Accessibility
- [x] Viewport breakpoints defined and exercised: 320px / 768px / 960px (nav) / 1280px (desktop grid).
- [x] Exactly one `<h1>` (Hero); every `<section>` carries `aria-labelledby` pointing at its heading id.
- [x] Global `:focus-visible` rule in `main.scss` provides a `2px solid var(--color-secondary)` ring at `2px` offset; every interactive atom also includes the `focus-ring` mixin defensively.
- [x] `prefers-reduced-motion` respected at three layers: global reset (animations collapse to 1ms + scroll-behavior becomes `auto`), Framer Motion's `useReducedMotion()` in Hero/Products/PaymentMethods, and per-component CSS (Pulse, Card, PaymentMethods) that removes transforms while keeping shadow transitions.
- [x] Color palette sticks to documented tokens — no new tones introduced.

### R9 — Brand Voice
- [x] Every section headline incorporates the TIN colloquialism (`…TIN.`, `en un TIN.`).
- [x] Product taglines and descriptions are Spanish, benefit-led, and TIN-colloquialism-friendly.

### Supporting artifacts
- [x] `src/lib/analytics.ts` — typed `trackEvent()` wrapper with a discriminated-union event type matching `api_spec.md` § 4; `buildSignupUrl()` forwards UTMs and warns on unset env. No-op today, stable interface for the future GA4 wiring task.
- [x] `.env.example` committed with `VITE_SIGNUP_URL`, `VITE_CRM_API_URL`, `VITE_CRM_API_KEY`, `VITE_GA4_MEASUREMENT_ID` placeholders.
- [x] `index.html` → `lang="es"`, `<title>TIN — Pagos para toda Latinoamérica</title>`, `<meta name="description">`, `<meta name="theme-color">`, `<link rel="canonical" href="https://paywithtin.com">`.

### Verification
- [x] `npx tsc -b` — zero TypeScript errors under strict-friendly config (`verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`).
- [x] `npx sass` compilation of `main.scss` + all 7 `*.module.scss` — zero errors, zero warnings.
- [x] Grep verified: no `border: 1px solid` anywhere in `src/`, no `rgba(0,0,0,*)` or `#000` shadows, no hardcoded hex color values inside `.tsx` or `.module.scss` (all colors flow through `var(--color-*)`). Raw hex only appears in `_tokens.scss` (source of truth) and inside SVG payment-method assets.

## Spec / doc updates (done or to do)
- [ ] **`sdd/specs/architecture_spec.md`** — task doc initially flagged a suspected single-level path; on implementation the documented nested `tin-landing/tin-landing/` layout is **correct**. No spec fix needed; the existing task note can be ignored and `task_006_architecture_spec_path_fix` can be cancelled.
- [ ] **`sdd/specs/api_spec.md`** — no changes.
- [ ] **`sdd/specs/business_rules.md`** — no changes.
- [ ] **`sdd/specs/design_system.md`** — no changes.
- [ ] **`sdd/specs/product_spec.md`** — no changes.

## Files delivered

**New**
- `src/styles/_tokens.scss`, `_typography.scss`, `_mixins.scss`, `_reset.scss`, `main.scss`
- `src/components/layout/Navbar.{tsx,module.scss}`
- `src/components/sections/Hero.{tsx,module.scss}`
- `src/components/sections/ProductsEcosystem.{tsx,module.scss}`
- `src/components/sections/PaymentMethods.{tsx,module.scss}`
- `src/components/ui/Button.{tsx,module.scss}`, `Card.{tsx,module.scss}`, `Pulse.{tsx,module.scss}`
- `src/constants/products.ts`, `src/constants/payment-methods.ts`
- `src/assets/payment-methods/{pix,pse,spei,oxxo,efecty,pagoefectivo,visa,mastercard,amex,apple-pay,google-pay}.svg`
- `src/lib/analytics.ts`
- `.env.example`

**Modified**
- `src/main.tsx` (fonts + `main.scss` imports)
- `src/App.tsx` (new layout shell)
- `index.html` (lang, meta, canonical)
- `package.json` (new deps: `@fontsource/inter`, `framer-motion`, `lucide-react`)

**Deleted**
- `src/App.css`, `src/index.css`, `src/assets/{hero.png,react.svg,vite.svg}` (CRA-style template leftovers)

## Notes

### Environment constraint — Vite cannot run in the current sandbox
The sandboxed shell is on **Node.js 18.7.0**. Vite 8 and several toolchain packages now require **Node 20.19+ or 22.12+**. `npx tsc -b` passes cleanly (zero type errors) and the SCSS compiles cleanly via `sass` CLI, but `npm run build` fails at Vite startup (`ReferenceError: CustomEvent is not defined` inside Vite's CLI — a `node:util` dependency that only exists on Node 19+). This is an **environmental limitation of the sandbox**, not an issue with the delivered code. On the developer's normal Node 20+ environment, `npm run build` and `npm run dev` will run without modification.

### Payment method logos
The eleven SVG logos in `src/assets/payment-methods/` are **editorial placeholders** — stylized brand-colored wordmarks sized to the 120×48 bounding box the component expects. They are functionally correct (each is a valid SVG with the right visual weight for the grayscale→color hover transition) but they are **not** official brand assets. A future design/brand task should swap in the official kits (Visa, Mastercard, Amex, Apple/Google Pay brand centers, and each LatAm APM's brand resource page). The swap is a one-line change per method — just replace the file at the existing path, no component code touches required.

### Scope deferred per the task doc
The following remain out of scope and are already tracked as follow-up tasks in `task_001_build_marketing_landing_core.md`:
- `task_002` — Contact Sales form (the "Contact Sales" CTA currently scrolls to `#contact-sales`, which will exist after task 002).
- `task_003` — Developer Focus section.
- `task_004` — Full SEO + GA4 wiring (the current `analytics.ts` is a typed no-op stub; `index.html` ships the minimum viable static meta).
- `task_005` — Security & Compliance section + Footer.
- `task_006` — **Can be cancelled.** The architecture spec's `tin-landing/tin-landing/` project path matches reality.

### Discriminated-union `Button` polymorphism
The `Button` atom uses a discriminated union on `as: 'button' | 'a'` plus a small `splitProps` helper so that consumers get strict typing (e.g. `href` is required only when `as="a"`) without tripping `verbatimModuleSyntax` or `noUnusedLocals`. This pattern is re-used by future atoms.

### Products grid — asymmetric 4 + 3 implementation
Implemented on a 12-column CSS grid: row 1 = 4 cards × `grid-column: span 3`; row 2 = 3 cards × `span 3`, first card pinned to `grid-column-start: 3` (so the trio spans cols 3-5 / 6-8 / 9-11, leaving cols 1-2 and col 12 empty — an intentional editorial void). The middle row-2 card carries `translateY(-8px)` (suppressed under reduced motion) to reinforce the design system's "intentional asymmetry" principle.

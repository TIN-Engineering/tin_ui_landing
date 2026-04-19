# Feature: Pricing Preview

## Description
A three-tier pricing **preview** band — `Starter`, `Growth`, `Enterprise` — rendered as a row of cards. This is a *preview*, not a full pricing page: each card shows the tier name, a one-line audience, and a non-interactive label. There is no per-transaction rate, no feature matrix, no calculator in V1. The band's role is to signal that TIN has a tiered commercial structure and to route interested visitors to the next conversion step (Contact Sales for Growth / Enterprise, Sign Up for Starter).

## Motivation
Finance and executive buyers (Segments 2 & 3 in `product_spec.md`) need a **price signal** early in the evaluation — even an abstract one — to decide whether TIN is in their buying band. Developers (Segment 1) expect a "Starter" tier as permission to self-serve. Omitting pricing entirely causes unqualified lead submissions and scares away self-service users.

The final tier ("Enterprise") is rendered on dark brand surface (`primary_container`) to visually anchor it as the flagship option without writing "RECOMMENDED" copy.

## Spec References
- `product_spec.md` → Landing Page Features (proposed new #12 — flagged in `task_002`), Primary Users (all segments).
- `design_system.md` → § 1 Color Tokens (dark-tier uses `primary_container` + `on_primary`), § 2 Typography, § 4 Radius (`2xl`), § 5 Spacing, § 6 Card Component.
- `business_rules.md` → No Border Lines, Shadow Specification, CTA Destination (tiers link to the correct conversion surface).

## Tiers (V1 — Spanish, TIN-voice in at least one line per card)
| # | Tier | One-liner | Surface | CTA (V1) |
|---|---|---|---|---|
| 1 | `Starter` | Para equipos que empiezan. Activas sandbox y sales. Tin. | `--color-surface-container-lowest` | Ghost button → scrolls/links to Hero CTA "Start Building" (`VITE_SIGNUP_URL`). |
| 2 | `Growth` | Para escalar volumen sin fricción operativa. | `--color-surface-container-lowest` | Ghost button → smooth-scrolls to `#contact-sales`. |
| 3 | `Enterprise` | Arquitectura y soporte dedicado. Integración en un Tin. | `--color-primary-container` on dark surface | Primary button (inverted: `on_primary` text on transparent) → smooth-scrolls to `#contact-sales`. |

No numeric pricing in V1. That must be owned by Sales and the Pricing page (out of scope).

## User Flow
1. Visitor scrolls past the Feature Spotlights.
2. A three-card row appears with a section heading `<h2>` "Precios simples. Crecimiento sin sorpresas. Tin."
3. Each card shows tier name (`headline-sm`), the one-liner (`body-md`), and one CTA at the bottom.
4. Starter CTA → signup (UTM forwarded). Growth / Enterprise CTAs → smooth-scroll to `#contact-sales`.
5. `cta_click` GA4 event fires per card with `location: 'pricing_preview'` and `tier` set to `starter | growth | enterprise` (stub in V1 via `src/lib/analytics.ts`).

## Visual Design
- **Section wrapper:** `<section id="pricing" aria-labelledby="pricing-title">`.
- **Section heading:** `<h2 id="pricing-title">` using `headline-lg` and the TIN voice.
- **Background:** `--color-surface-container-low` (alternates with surrounding sections).
- **Grid:**
  - Desktop `≥ 1024px`: `grid-template-columns: repeat(3, minmax(0, 1fr))`, `gap: var(--space-5)`.
  - Tablet `≥ 640px`: `repeat(2, …)` — Enterprise card spans both columns on the second row.
  - Mobile: single column; order = Starter → Growth → Enterprise.
- **Tier card (Starter, Growth):** `Card` atom, `elevation="flat"`, radius `--radius-2xl`, padding `--space-8`, internal vertical stack at `gap: var(--space-5)`.
- **Tier card (Enterprise):** same layout, but background `--color-primary-container`; text colors shift to `--color-on-primary` and `--color-on-primary` at 80% for the body paragraph. No borders.
- **Hover (desktop only):** `translateY(-2px)` + `var(--shadow-ambient)` on all three cards. Disabled under `prefers-reduced-motion`.
- **Asymmetric accent:** Enterprise card may be translated `translateY(-8px)` on desktop `≥ 1024px` to lift it as the flagship — matches the § 8 asymmetric-layout principle from `design_system.md`.

## Business Rules
- No 1px solid borders. Dark tier uses a tonal surface, not a border, to pop.
- Primary CTA gradient is reserved for the Enterprise card in V1, keeping the Hero's "Start Building" as the dominant primary on the page.
- UTM params forwarded by the Starter CTA exactly as specified in `business_rules.md` → Pre-fill UTM Parameters.

## Edge Cases
| Case | Expected Behavior |
|---|---|
| `VITE_SIGNUP_URL` is undefined | Starter CTA renders, logs a console warning, links to `#`. Never crashes. |
| `#contact-sales` section is not present (pre-task_003) | Growth / Enterprise CTAs smooth-scroll to `#`. No crash; the copy still communicates tiering. |
| Viewport `< 480px` | Cards stack in a single column with full width. Enterprise card retains its dark surface but loses the `-8px` lift. |
| `prefers-reduced-motion: reduce` | No hover translate, no `-8px` flagship lift, no entrance stagger. Shadow-on-hover remains. |
| GA4 is not wired yet | `trackEvent('cta_click', { location: 'pricing_preview', tier })` is a no-op via the stub `src/lib/analytics.ts`. Safe. |

## Success Criteria
- [ ] `<section id="pricing">` renders three cards in the documented order with an `<h2>` carrying the TIN voice.
- [ ] Enterprise card renders on `--color-primary-container` with `--color-on-primary` text and zero borders.
- [ ] Starter CTA builds a signup URL via `buildSignupUrl()` from `src/lib/analytics.ts`, forwarding UTMs.
- [ ] Growth & Enterprise CTAs smooth-scroll to `#contact-sales` with no console errors if the target doesn't exist.
- [ ] Each CTA click fires `trackEvent('cta_click', { location: 'pricing_preview', tier })`.
- [ ] Grid behaves as specified at `< 640px / 640–1023px / ≥ 1024px`.
- [ ] `prefers-reduced-motion: reduce` disables all non-essential animation.
- [ ] No hardcoded hex values in the component (grep-verified).

## Dependencies
- `Button` atom (primary + ghost variants) from task_001.
- `Card` atom from task_001.
- `src/lib/analytics.ts` (stub exists; add `tier` to the GA4 `cta_click` schema in the same task).
- `VITE_SIGNUP_URL` env var.

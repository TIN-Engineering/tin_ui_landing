# Feature: Dark CTA Band

## Description
A full-width, high-contrast conversion band placed near the end of the landing page. It presents a closing headline in TIN voice ("¿Listo para cobrar sin enredos?"), a one-sentence support line, and the same dual CTAs that appear in the Hero — **Start Building** (primary) and **Contact Sales** (ghost). The surface uses the brand dark gradient (`primary` → a lighter navy) to create an editorial "pause before the footer" and anchor the final conversion decision.

## Motivation
By the time a visitor has scrolled past ecosystem, payment methods, spotlights, and pricing, they have either decided to act or are about to leave. A dedicated closing CTA band reduces decision friction by resurfacing both conversion paths without requiring scroll-up. It is the mirror of the Hero — opening prompt at the top, closing prompt near the bottom.

## Spec References
- `product_spec.md` → Landing Page Features (proposed new #13 — flagged in `task_002`), Primary Users (all segments), Acceptance Criteria (both conversion funnels functional end-to-end).
- `design_system.md` → § 1 Color Tokens (dark surface + `on_primary` text), § 2 Typography, § 3 Elevation (ambient shadow), § 4 Radius (`2xl`), § 6 Component Specs (Primary / Ghost buttons, inverted variants), § 8 Asymmetric Layout.
- `api_spec.md` → Sign Up / Developer Provisioning Flow (CTA + UTM forwarding).
- `business_rules.md` → CTA Destination, Pre-fill UTM Parameters, Dual CTA Prominence, No Border Lines, Shadow Specification, Typography Exclusivity.

## User Flow
1. Visitor reaches the band after Testimonials.
2. The band fills the viewport width with a dark gradient surface; the copy is centered-left on desktop.
3. Visitor reads the TIN-voice headline + support line in ≤ 3 seconds.
4. Visitor clicks either:
   - **Start Building** → `buildSignupUrl()` with UTM forwarding → navigates to `VITE_SIGNUP_URL`. `trackEvent('cta_click', { location: 'dark_cta_band' })` + `trackEvent('signup_redirect')`.
   - **Contact Sales** → smooth-scrolls **up** to `#contact-sales`. `trackEvent('cta_click', { location: 'dark_cta_band' })`.
5. Keyboard users can reach both buttons in tab order immediately after the Testimonials section.

## Copy (V1 — Spanish, TIN-voice mandatory)
| Slot | Copy |
|---|---|
| `<h2>` (mixin `headline-lg`, fallback `headline-md` on mobile) | `¿Listo para cobrar sin enredos? Tin.` |
| Support `<p>` (mixin `body-lg`) | `Crea tu cuenta, integra y activa pagos con velocidad de ejecución real.` |
| Primary CTA label | `Empezar ahora` |
| Ghost CTA label | `Hablar con ventas` |

## Visual Design
- **Section wrapper:** `<section id="final-cta" aria-labelledby="final-cta-title">`.
- **Surface:** a dark navy gradient panel placed inside the `section-container` (not full-viewport bleed).
  ```
  background: linear-gradient(135deg, var(--color-primary) 0%, #1e315f 100%);
  color:      var(--color-on-primary);
  radius:     var(--radius-2xl);
  padding:    var(--space-16) (desktop) / var(--space-10) (mobile);
  box-shadow: var(--shadow-ambient);
  ```
  The single `#1e315f` literal is introduced as a new token `--color-primary-gradient-stop` in `src/styles/_tokens.scss`. No pure-black gradients, no borders.
- **Layout:**
  - Desktop `≥ 1024px`: headline + paragraph left-aligned, CTA stack right-aligned on a `grid-template-columns: 1fr auto` row. Vertically centered.
  - Mobile: single column; CTAs full-width, primary on top.
- **Typography:** headline uses `headline-lg` on dark, drops to `headline-md` ≤ 768px. Paragraph uses `body-lg` at 90% opacity of `on_primary` to preserve hierarchy.
- **Buttons:** existing `Button` atom with a new `theme="dark"` modifier. On dark theme:
  - Primary: background `--color-on-primary` (white), text `--color-primary`; hover shifts to `rgba(255,255,255,0.92)`.
  - Ghost: transparent; ghost border at 24% `outline_variant`; text `--color-on-primary`; hover surface `rgba(255,255,255,0.08)`.
  - Focus ring remains `--color-secondary` with 2px offset — keep consistency with the Hero buttons.
- **Motion:** band fades in with `whileInView` (`once: true`); paragraph and CTA stack stagger 0.08s. Gated by `useReducedMotion()`.

## Business Rules
- CTAs honor the documented destinations and UTM forwarding.
- "Start Building" is always visually dominant (contrast + position).
- No 1px solid borders for the band itself. The ghost CTA's border is a permitted ghost border on an atom.
- No pure black: the gradient uses `--color-primary` (`#131b2e`) → `#1e315f`. Both map to `rgba(25, 28, 30, …)` shadow math — any shadow used must stay within the documented ambient-shadow family.

## Edge Cases
| Case | Expected Behavior |
|---|---|
| `VITE_SIGNUP_URL` is undefined | Primary CTA logs a console warning; `href` falls back to `#`. Click still fires `trackEvent`. |
| `#contact-sales` section is absent (pre-task_003) | Ghost CTA smooth-scrolls to the page top or to `#` — acceptable no-op in V1. Same behavior as the Nav ghost CTA. |
| Visitor on `< 480px` screen | Headline drops to `headline-md`; both CTAs stack full-width; paragraph shortens via CSS `text-wrap: balance` (progressive enhancement). |
| `prefers-reduced-motion: reduce` | No stagger, no `whileInView` translate; opacity fade ≤ 150ms or disabled entirely. |
| Visitor uses Windows High Contrast | Gradient falls back to solid `--color-primary`; ghost border becomes visible at full opacity via `forced-colors: active` media query. |

## Success Criteria
- [ ] `<section id="final-cta">` renders a dark surface with TIN-voice headline and dual CTAs.
- [ ] Primary CTA uses `buildSignupUrl()` with current UTM params.
- [ ] Ghost CTA smooth-scrolls to `#contact-sales` without crashing if the target is absent.
- [ ] GA4 `cta_click` stub fires with `location: 'dark_cta_band'`; `signup_redirect` fires on primary click.
- [ ] The dark `Button` theme is added without forking the atom — variant + theme compose.
- [ ] New token `--color-primary-gradient-stop` is declared in `_tokens.scss`. No raw hex in component files.
- [ ] `prefers-reduced-motion: reduce` disables entrance motion.
- [ ] Layout behaves as specified at 320 / 768 / 1024 / 1280 / 1920.

## Dependencies
- `Button` atom from task_001 — requires a `theme: 'light' | 'dark'` extension.
- `src/lib/analytics.ts` stub.
- `VITE_SIGNUP_URL` env var.

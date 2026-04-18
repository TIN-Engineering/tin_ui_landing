# Feature: Hero Section

## Description
The first full-viewport section users see upon arriving at `paywithtin.com`. It delivers TIN's core value proposition with maximum visual impact and presents both acquisition CTAs simultaneously, routing each of the three visitor segments toward their respective conversion funnel.

## Motivation
The hero section is the highest-value real estate on the site. It must capture attention, communicate differentiation within 3 seconds, and give each user segment (developers, finance managers, founders) a clear, immediate call to action. Without a compelling hero, bounce rates will eliminate conversion potential before the user sees any other content.

## Spec References
- `product_spec.md` → Landing Page Features #1 (Hero Section), Primary Users (all 3 segments), Design System Constraints, Acceptance Criteria
- `design_system.md` → Typography Scale (display-lg, body-lg), Color Tokens, Component Specs (Primary Button, Secondary Button), Motion & Animation
- `api_spec.md` → Sign Up / Start Building Flow, GA4 Events (`cta_click`)
- `business_rules.md` → Dual CTA Prominence, CTA Destination, Pre-fill UTM Parameters, Above-the-Fold Priority, Single H1 Per Page, No Border Lines, Reduced Motion

## User Flow
1. User arrives at `paywithtin.com` (any source).
2. The hero section renders immediately above the fold with zero layout shift.
3. User reads the primary headline (`<h1>`, `display-lg`) and subtitle (`body-lg`) communicating TIN's value proposition.
4. User sees two CTAs: "Start Building" (primary gradient button) and "Contact Sales" (ghost button).
5. Developer user clicks "Start Building" → UTM params are appended → user is redirected to `import.meta.env.VITE_SIGNUP_URL`.
6. Enterprise user clicks "Contact Sales" → page smooth-scrolls to `#contact-sales`.
7. `cta_click` GA4 event fires for either interaction with `location: 'hero'`.

## Visual Design
- **Layout:** Full viewport height (`100vh` minimum). Two-column on desktop (copy left, visual right), single-column stacked on mobile (copy above, visual below or hidden).
- **Background:** `surface` (#f7f9fb) base with a subtle ambient gradient accent using `primary` (#131b2e) tones at low opacity.
- **Headline:** `display-lg` (64px, bold, -2% letter spacing). Uses `on_primary_fixed` (#0a0f1e) color.
- **Subheadline:** `body-lg` (18px) in `on_surface_variant` (#45464d). 1-2 lines communicating the speed and reliability of TIN.
- **Primary CTA:** Gradient button per `design_system.md` → Primary Button (`linear-gradient(45deg, #131b2e, #1a2f52)`, corner `xl` 12px, padding 12px 24px). Label: "Start Building".
- **Secondary CTA:** Ghost button per `design_system.md` → Secondary Button (transparent bg, `secondary` #0058be text, Ghost Border). Label: "Contact Sales". On click: smooth scroll to `#contact-sales`.
- **Visual Element:** Right column features a high-quality illustration, product mockup, or animated composition. Uses Framer Motion for entrance animation.
- **Asymmetry:** More padding-top than padding-bottom to create editorial tension (see `design_system.md` → Asymmetric Layout Principles).

## Copy Direction
Headline MUST use "TIN" as a colloquial interjection — e.g.:
> "Pagos para toda Latinoamérica. TIN."
> or
> "TIN. Tu infraestructura de pagos, lista."

Subtitle expands on the value proposition in a precise, technical-yet-accessible tone. Examples:
> "Payins, Payouts, Suscripciones, Antifraude, Conciliación. Todo en una plataforma."
> "Conecta con Pix, PSE, SPEI, tarjetas y wallets. Sin fricciones."

## API
No direct API calls. The "Start Building" CTA performs a client-side redirect with UTM parameter propagation (see `api_spec.md` → Sign Up / Developer Provisioning Flow).

## Business Rules
- Both CTAs must be visible simultaneously at all times (see `business_rules.md` → Dual CTA Prominence).
- "Start Building" CTA reads destination URL from `import.meta.env.VITE_SIGNUP_URL` (see `business_rules.md` → CTA Destination).
- UTM params from the landing URL are appended to the sign-up redirect (see `business_rules.md` → Pre-fill UTM Parameters).
- Hero image must have `loading="eager"` and `fetchpriority="high"` (see `business_rules.md` → Above-the-Fold Priority).
- Single `<h1>` on the page, located here (see `business_rules.md` → Single H1 Per Page).
- No border lines for any visual separation (see `business_rules.md` → No Border Lines).

## Edge Cases

| Case | Expected Behavior |
|---|---|
| `VITE_SIGNUP_URL` is not set | CTA renders but logs a console warning. Does not throw. Links to `#` as fallback. |
| User has no UTM parameters in URL | Sign-up redirect is made without any additional query params. |
| Viewport is 320px wide (smallest mobile) | Both CTAs stack vertically. Neither is hidden. Headline scales to `display-md` (48px). |
| User prefers reduced motion (`prefers-reduced-motion: reduce`) | Entrance animations are disabled. Content is displayed statically. |
| Hero visual asset fails to load | Section remains fully functional. Visual column shows a colored placeholder block (`surface_container_high`), not a broken image icon. |

## Success Criteria
- [ ] Hero section renders above the fold (no scrolling required) on all target viewports.
- [ ] Both CTAs are visible and functional on mobile (320px), tablet (768px), and desktop (1280px).
- [ ] Clicking "Start Building" navigates to `VITE_SIGNUP_URL` with UTM params appended.
- [ ] Clicking "Contact Sales" smooth-scrolls to the Contact Sales section.
- [ ] `cta_click` GA4 event fires correctly for both CTAs.
- [ ] LCP element (hero image or headline) loads within 2.5 seconds on 4G mobile.
- [ ] No layout shift (CLS = 0) during hero section load.
- [ ] Reduced motion preference disables animations.
- [ ] `<h1>` is the page's only H1. Uses `display-lg` type scale.
- [ ] Headline incorporates TIN colloquialism.
- [ ] Primary CTA uses gradient per design system. Secondary CTA uses ghost style.

## Dependencies
- `src/styles/_tokens.scss` CSS custom properties.
- `src/styles/_typography.scss` mixins for `display-lg`, `body-lg`.
- `VITE_SIGNUP_URL` environment variable.
- `VITE_GA4_MEASUREMENT_ID` and GA4 `cta_click` event helper in `src/lib/analytics.ts`.
- The floating Navbar feature (which also contains the CTAs) should be implemented in parallel.

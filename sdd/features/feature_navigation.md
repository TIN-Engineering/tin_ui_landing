# Feature: Floating Navigation Bar

## Description
A persistent, glassmorphic navigation bar that floats above all page content. It provides quick access to all major page sections via smooth-scroll anchor links and exposes both primary CTAs ("Start Building" and "Contact Sales") at all times. It adapts to scroll position and collapses into a mobile hamburger menu on small viewports.

## Motivation
On a long-form landing page, users must always be able to orient themselves and take action without scrolling back to the top. The floating nav eliminates friction for all three visitor segments (developers, finance managers, founders) and reinforces TIN's brand identity through its distinctive glassmorphism aesthetic.

## Spec References
- `product_spec.md` → Landing Page Features #8 (Navigation), Design System Constraints (Glassmorphism)
- `design_system.md` → Navigation Bar (Floating Glassmorphic) spec, Glassmorphism tokens, Color Tokens
- `business_rules.md` → Floating Nav Visibility, Active Section Highlighting, Dual CTA Prominence, Glassmorphism Application, Typography Exclusivity

## User Flow
1. Page loads. Nav renders at the top with transparent/low-opacity glass background.
2. User scrolls past 50px. Nav background opacity increases to 90% + 20px blur effect activates.
3. As user scrolls through sections, the nav highlights the corresponding section link.
4. User clicks a section link → page smooth-scrolls to that section anchor.
5. User clicks "Start Building" → redirected to sign-up URL with UTM params (same as hero CTA).
6. User clicks "Contact Sales" → smooth-scrolls to `#contact-sales` section.
7. On mobile (<768px): the section links collapse into a hamburger menu icon. CTAs remain visible.
8. User clicks hamburger → mobile menu drawer slides in with all section links.

## Visual Design
- **Desktop:** Full-width, fixed to top of viewport. Logo left, nav links center, CTAs right.
- **Mobile:** Logo left, CTAs right (compact), hamburger icon far right. Section links hidden behind hamburger.
- **Glassmorphism:** `backdrop-filter: blur(20px)`, `background: rgba(255, 255, 255, 0.80)` (`surface_container_lowest` at 80%). Border-bottom: none (no-line rule). Bottom separator: `box-shadow: 0 1px 0 rgba(25, 28, 30, 0.08)`.
- **Scroll transition:** `transition: background var(--duration-base) var(--ease-standard)`.
- **Height:** 64px desktop, 56px mobile. Padding: `0 var(--space-8)` desktop, `0 var(--space-4)` mobile.
- **Active link:** `secondary` (#0058be) color highlight. No bold font weight change (to avoid layout shift).

## Business Rules
- Nav background is transparent at scroll position 0, transitions to 90% opacity on scroll past 50px (see `business_rules.md` → Floating Nav Visibility).
- Active section highlight uses IntersectionObserver; only one link active at a time (see `business_rules.md` → Active Section Highlighting).
- Both CTAs must remain visible simultaneously (see `business_rules.md` → Dual CTA Prominence).
- Glassmorphism: `backdrop-filter: blur(20px)`, no solid backgrounds (see `business_rules.md` → Glassmorphism Application).
- Zero border lines for visual separation (see `business_rules.md` → No Border Lines).

## Edge Cases

| Case | Expected Behavior |
|---|---|
| `backdrop-filter` not supported (older browsers) | Fall back to solid `surface_container_lowest` (#ffffff). No transparency. |
| User is at the very top of the page | Nav shows transparent state. No active section link highlighted. |
| Mobile menu is open and user rotates device to landscape | Menu closes automatically. Desktop nav layout takes over at 768px+. |
| User clicks a nav link while mobile menu is open | Menu closes after the section link is activated and scroll begins. |
| Page has only one section visible at a time (narrow viewport) | IntersectionObserver highlights the section with the highest intersection ratio. |

## Success Criteria
- [ ] Nav is fixed to the top of the viewport and never scrolls out of view.
- [ ] Glassmorphism effect activates correctly on scroll past 50px threshold.
- [ ] Active section link highlights correctly as user scrolls through each section.
- [ ] Both CTAs ("Start Building" and "Contact Sales") are visible on desktop and mobile.
- [ ] Mobile hamburger menu opens and closes correctly, with all section links accessible.
- [ ] Smooth scroll occurs for all anchor links (CSS `scroll-behavior: smooth` or Framer Motion).
- [ ] `backdrop-filter` fallback renders gracefully on unsupported browsers.
- [ ] Keyboard-navigable: all links and buttons reachable via Tab, activated via Enter/Space.
- [ ] No layout shift when nav transitions between scroll states.

## Dependencies
- `src/styles/_tokens.scss` CSS custom properties (glassmorphism, shadow, color tokens).
- `VITE_SIGNUP_URL` environment variable for CTA.
- `src/lib/analytics.ts` GA4 `cta_click` event helper.
- All section IDs must be agreed upon before implementation: `#hero`, `#products`, `#payment-methods`, `#developers`, `#security`, `#contact-sales`.

# Business Rules

> For the complete design token reference (hex values, type scale, component specs, Tailwind config), see `design_system.md`.

---

## Navigation

### Rule: Floating Nav Visibility
- **Condition:** On initial page load (scroll position = 0)
- **Constraint:** The navbar renders with `background: rgba(255, 255, 255, 0.00)` — fully transparent. On scroll past 50px, background transitions to `rgba(255, 255, 255, 0.80)` with `backdrop-filter: blur(20px)`. Transition duration: 200ms ease.
- **Error:** Navbar must never be fully opaque solid (`surface_container_lowest` #ffffff) or have zero blur at scroll > 50px.

### Rule: Active Section Highlighting
- **Condition:** User scrolls through the page
- **Constraint:** The nav item corresponding to the currently visible section must be visually highlighted using `secondary` (#0058be). Uses IntersectionObserver to detect the dominant section.
- **Error:** No more than one nav item can be highlighted at a time.

### Rule: Dual CTA Prominence
- **Condition:** Always (hero section and navbar)
- **Constraint:** Both "Start Building" (primary CTA, `primary_container` #131b2e background) and "Contact Sales" (secondary ghost button, `secondary` #0058be label) must be visible simultaneously.
- **Error:** CTAs must not be hidden, collapsed, or reduced to text links at any viewport.

---

## Contact Sales Form

### Rule: Required Fields
- **Condition:** User submits the Contact Sales form
- **Constraint:** The following fields are mandatory: Full Name, Company Name, Business Email, Country, Monthly Transaction Volume (dropdown). Phone is optional.
- **Error:** Submission is blocked with inline validation messages if any required field is empty. Error text uses `error` (#ba1a1a) color. Error container background uses `error_container` (#ffdad6).

### Rule: Business Email Validation
- **Condition:** User enters an email in the Contact Sales form
- **Constraint:** Must be a valid email format. Free consumer domains (gmail.com, hotmail.com, yahoo.com, outlook.com) are rejected with a friendly message: "Please use your business email."
- **Error:** Display inline error. Do not submit. Do not clear the field.

### Rule: Duplicate Submission Prevention
- **Condition:** User clicks the submit button
- **Constraint:** The submit button becomes disabled and shows a loading state immediately upon click. It remains disabled until the API response is received (success or error).
- **Error:** If a network error occurs after 10 seconds, re-enable the button and show an error toast: "Something went wrong. Please try again."

### Rule: Successful Form Submission
- **Condition:** CRM API returns a 200/201 success response
- **Constraint:** Display a full-panel success state replacing the form with a thank-you message and next steps. Fire the `form_submit_success` GA4 event with `{ form_type: 'contact_sales' }`.
- **Error:** Never redirect to an external URL on success. State change is in-place.

### Rule: Country Dropdown
- **Condition:** Contact Sales form rendering
- **Constraint:** Country list must include at minimum: Colombia, Mexico, Brazil, Peru, Chile, Argentina, United States, Other. Rendered as a native `<select>` or accessible combobox.
- **Error:** The field cannot be a free-text input.

---

## Sign Up / Start Building CTA

### Rule: CTA Destination
- **Condition:** User clicks "Start Building" or "Sign Up" CTA
- **Constraint:** User is navigated to the TIN Auth/Provisioning sign-up URL. This URL is configured via the `VITE_SIGNUP_URL` environment variable. Navigation opens in the same tab.
- **Error:** Never hardcode the sign-up URL in component code. Always read from `import.meta.env.VITE_SIGNUP_URL`.

### Rule: Pre-fill UTM Parameters
- **Condition:** The page URL contains UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, etc.)
- **Constraint:** When the user clicks any CTA that navigates to the sign-up URL, append the current page's UTM parameters to the destination URL as query parameters.
- **Error:** If no UTM parameters are present, do not append any empty parameters.

---

## Design System Enforcement

### Rule: No Border Lines
- **Condition:** Any component that visually separates content areas
- **Constraint:** Section boundaries must be created exclusively via background color token shifts (e.g., `surface_container_low` #f2f4f6 → `surface_container_lowest` #ffffff) or vertical spacing. Zero `border: 1px solid` declarations for section dividers.
- **Permitted exception:** The "Ghost Border" (`outline: 1px solid rgba(198, 198, 205, 0.15)`) may be used on individual components when contrast is genuinely insufficient. See `design_system.md` → Ghost Border Fallback.
- **Error:** Any `border` used for visual section separation is a design violation.

### Rule: Shadow Specification
- **Condition:** Any component that uses a drop shadow (cards, modals, floating nav)
- **Constraint:** Shadows must use the ambient shadow tokens from `design_system.md`: `box-shadow: 0 8px 24px rgba(25, 28, 30, 0.10)` (standard) or `0 8px 40px rgba(25, 28, 30, 0.12)` (elevated). Pure black (`rgba(0,0,0,X)` or `#000`) is forbidden.
- **Error:** Pure black box shadows are a design system violation and will be rejected in code review.

### Rule: Typography Exclusivity
- **Condition:** All text rendering across the site
- **Constraint:** Only Inter is permitted. Loaded via `@fontsource/inter`. All type sizes and weights must follow the scale defined in `design_system.md` → Typography. Labels (`label-md`, `label-sm`) must always be rendered uppercase.
- **Error:** Any other font family is a design system violation.

### Rule: Glassmorphism Application
- **Condition:** Floating navbar and any modal/overlay components
- **Constraint:** Must apply `backdrop-filter: blur(20px)` and `background: rgba(255, 255, 255, 0.80)` (`surface_container_lowest` at 80%). Cannot use `filter: blur()`.
- **Error:** If `backdrop-filter` is unsupported, fall back to solid `surface_container_lowest` (#ffffff), not transparent.

### Rule: Corner Radius Nesting
- **Condition:** Any component that contains nested elements with rounded corners
- **Constraint:** Parent containers use `xl` (12px) or `2xl` (16px). Nested inner elements use `lg` (8px) or `md` (6px). Never use the same radius for parent and child.
- **Error:** Identical radius on parent/child destroys visual layering depth.

### Rule: Asymmetric Layout
- **Condition:** Desktop layouts (≥ 1280px) for section content
- **Constraint:** Avoid perfectly symmetrical or fully centered layouts for body text and data. Use deliberate left/right alignment tension. Center-align is permitted for hero headlines and CTAs only.
- **Error:** Generic centered grids on desktop violate the Editorial Architect principle.

---

## SEO & Metadata

### Rule: Single H1 Per Page
- **Condition:** Every page
- **Constraint:** Each page must have exactly one `<h1>` element. All other headings follow a strict descending hierarchy (H1 → H2 → H3).
- **Error:** Multiple H1 tags on a single page is an SEO violation.

### Rule: Open Graph Tags
- **Condition:** Homepage (and all future pages)
- **Constraint:** Every page must include `og:title`, `og:description`, `og:image`, `og:url`, and `og:type` meta tags. The OG image must be a static asset sized 1200×630px at `public/og-image.jpg`.
- **Error:** Missing OG tags will cause social share previews to be broken. This is a launch blocker.

### Rule: Canonical URLs
- **Condition:** All pages
- **Constraint:** Each page must include a `<link rel="canonical" href="..." />` tag pointing to `https://paywithtin.com` (no `www`). Hardcoded in `index.html`.
- **Error:** Missing canonical tags risk duplicate content indexing.

### Rule: Image Optimization
- **Condition:** All images on the site
- **Constraint:** All `<img>` tags must have explicit `width`, `height`, and `alt` attributes. Use `loading="lazy"` on all below-the-fold images. Use `loading="eager"` + `fetchpriority="high"` on the hero LCP image. WebP format for all raster images. SVG preferred for logos and icons.
- **Error:** Missing `width`/`height` causes CLS violations. Missing `alt` on meaningful images fails Accessibility targets.

---

## Performance

### Rule: Third-Party Script Loading
- **Condition:** Any third-party JavaScript (Google Analytics, etc.)
- **Constraint:** All third-party scripts must be placed in `index.html` using the `async` attribute. No third-party scripts may be added inside React components. No synchronous blocking scripts in `<head>`.
- **Error:** Render-blocking scripts in `<head>` will break the Performance Lighthouse target.

### Rule: Above-the-Fold Priority
- **Condition:** Hero section images and the primary heading
- **Constraint:** The Hero section's primary image (if any) must have `loading="eager"` and `fetchpriority="high"`. The Inter font is loaded via `@fontsource/inter` — zero external network requests at runtime.
- **Error:** Default lazy-loaded or CDN-fetched hero images directly harm LCP scores.

---

## Accessibility

### Rule: Keyboard Navigation
- **Condition:** All interactive elements (buttons, links, form fields, modals)
- **Constraint:** All interactive elements must be focusable and operable via keyboard. Focus ring must be `2px solid #0058be` (secondary) with `2px outline-offset`. Do not remove browser default outline without providing this replacement.
- **Error:** `outline: none` or `outline: 0` without the custom focus indicator is prohibited.

### Rule: ARIA Roles for Custom Components
- **Condition:** Any custom interactive component (animated cards, tabs, mobile menu)
- **Constraint:** Must include appropriate ARIA roles, states (`aria-selected`, `aria-expanded`), and labels (`aria-label` or `aria-labelledby`).
- **Error:** Missing ARIA attributes will lower the Accessibility Lighthouse score below 90.

### Rule: Color Contrast
- **Condition:** All text on any background
- **Constraint:** Body text (`on_surface` #191c1e on `surface_container_lowest` #ffffff) must meet WCAG AA (4.5:1). Heading text (`on_primary_fixed` #0a0f1e) must meet WCAG AAA (7:1).
- **Error:** Contrast failures are both Accessibility Lighthouse violations and design system violations.

### Rule: Reduced Motion
- **Condition:** User has `prefers-reduced-motion: reduce` set in OS settings
- **Constraint:** All Framer Motion animations must be disabled via `useReducedMotion()`. The TIN Pulse animation must render as a static dot. Hover transform effects are skipped (shadow transitions only are acceptable).
- **Error:** Animated content that cannot be disabled is a WCAG 2.1 AAA violation and an accessibility regression.

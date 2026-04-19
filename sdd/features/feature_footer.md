# Feature: Footer

## Description
The site-wide footer anchoring `paywithtin.com`. It provides secondary navigation (Product, Developers, Company, Legal columns), legal + compliance text (copyright, PCI-DSS Level 1 mention, privacy / terms links), social media links, and the TIN wordmark. It is the last impression of the page and the final chance to route a visitor to Legal or Developer resources.

## Motivation
A complete footer is a trust signal on its own. Enterprise procurement will check for a visible Privacy Policy, Terms of Service, and company information before engaging Sales. Developers will look for Docs, Status Page, and Changelog in the footer. Omitting or stubbing the footer undermines the entire design system's "editorial architect" posture.

## Spec References
- `product_spec.md` → Landing Page Features #9 (Footer), Primary Users (all segments), Design System Constraints.
- `design_system.md` → § 1 Color Tokens (`surface_container_low` background), § 2 Typography (`label-md`, `body-sm`), § 4 Radius, § 5 Spacing (large vertical padding).
- `business_rules.md` → No Border Lines, Shadow Specification, Typography Exclusivity, Keyboard Navigation.

## Link Inventory (V1 — Spanish)
Four columns, each with an uppercase `label-md` header and a vertical stack of `body-sm` links. Links are `<a href="#">` placeholders where destinations are not yet defined — **the coding agent must add each missing destination to `task_002`'s Open Questions** rather than invent URLs.

### Column 1 — Producto
- Payins
- Payouts
- Suscripciones
- Antifraude (Soft Precision)
- Tokenización
- Ledger & Conciliación

### Column 2 — Developers
- Documentación de API *(external — awaiting canonical Dev Portal URL)*
- SDKs *(external)*
- Sandbox *(external — uses `VITE_SIGNUP_URL` with UTM `utm_source=footer&utm_medium=footer&utm_campaign=sandbox`)*
- Changelog *(external)*
- Status Page *(external — awaiting URL)*

### Column 3 — Compañía
- Sobre TIN
- Contacto (smooth-scrolls to `#contact-sales`)
- Prensa
- Trabaja con nosotros

### Column 4 — Legal
- Términos de servicio *(placeholder — route TBD)*
- Política de privacidad *(placeholder)*
- Política de cookies *(placeholder)*
- Aviso legal *(placeholder)*

### Below-columns strip
- TIN wordmark (left).
- Social icons (right) — LinkedIn, X/Twitter, GitHub. Each icon is `lucide-react`, 20px, `--color-on-surface-variant`, hover `--color-secondary`.
- Copyright line (below both) — `© 2026 TIN Payments. Todos los derechos reservados.`
- Compliance micro-line — `PCI-DSS Level 1 · Cifrado end-to-end · Operamos en LatAm.`

## User Flow
1. Visitor reaches the bottom of the page after the Dark CTA Band.
2. Footer renders in four columns (desktop) or stacked accordions (mobile) — see Visual Design.
3. Visitor clicks a link → external (new tab) or anchor (same tab).
4. Screen-reader users navigate via the `<footer role="contentinfo">` landmark.

## Visual Design
- **Semantic wrapper:** `<footer id="footer" role="contentinfo">`.
- **Background:** `--color-surface-container-low` (creates a terminal tonal pause against the dark CTA band immediately above it).
- **Padding:** desktop `var(--space-16) var(--space-10)`; mobile `var(--space-10) var(--space-6)`.
- **Column grid:**
  - Desktop `≥ 1024px`: `grid-template-columns: 1.2fr repeat(4, 1fr)` — first cell is the TIN wordmark + brand tagline block, followed by the four link columns. `gap: var(--space-10)`.
  - Tablet `768–1023px`: 2 columns of link groups; wordmark block spans full width above them.
  - Mobile: each link group becomes a collapsible `<details><summary>` accordion (closed by default). Wordmark block renders at the top.
- **Column headers:** `label-md`, uppercase, `--color-on-surface-variant`, `margin-bottom: var(--space-4)`.
- **Links:** `body-sm`, `--color-on-surface-variant`, hover `--color-secondary`, `transition: color var(--duration-base) var(--ease-standard)`. External links get a trailing 12px `ExternalLink` icon from `lucide-react`.
- **Brand block:** TIN wordmark (text) in `font-weight: 700`, `letter-spacing: +0.08em`, `--color-on-surface`; followed by a two-line brand tagline in `body-sm`.
- **Below-columns strip:**
  - Renders on its own row separated from the columns by `margin-top: var(--space-12)` and a **tonal seam** (background shift on a thin wrapper, never a border).
  - Flex row; copyright left, socials right. Wraps on mobile.
- **No borders anywhere**. The "seam" between columns and the below-strip is tonal (e.g., a 1px `box-shadow: 0 1px 0 rgba(25, 28, 30, 0.08)` if a visual break is needed — identical to the Navbar pattern).

## Business Rules
- **No 1px solid borders** — see `business_rules.md` → No Border Lines.
- **No pure black shadows** — any seam shadow uses `rgba(25, 28, 30, X)`.
- **External links** open in a new tab with `rel="noopener noreferrer"`.
- **Sandbox link** in Column 2 runs through `buildSignupUrl({ utmSource: 'footer', utmMedium: 'footer', utmCampaign: 'sandbox' })` from `src/lib/analytics.ts`.
- **Keyboard order** preserves visual order across all breakpoints (including in the mobile `<details>` accordion where it is a native-keyboard-accessible pattern).
- **i18n readiness**: all link labels are imported from `src/constants/footer.ts`; none are inline in JSX. This enables the future English translation without touching the component.

## Edge Cases
| Case | Expected Behavior |
|---|---|
| A destination URL is not yet defined | Link renders as `<a href="#">` with an `aria-disabled="true"` attribute and subtle `--color-on-surface-variant` at 60% opacity. Coding agent logs the missing URL to PR description. |
| Visitor is on mobile with `<details>` closed | Tab order still includes the `<summary>` elements. Opening requires Enter/Space as per HTML spec. |
| `prefers-reduced-motion: reduce` | Accordion open/close respects system reduced motion (no JS animation; rely on native `<details>` behavior). |
| Visitor resizes from mobile → desktop mid-session | Accordions collapse to open columns; state is reset. |
| External link icon fails to load | Link text remains legible; reserve icon space to avoid shift. |

## Success Criteria
- [ ] `<footer role="contentinfo">` renders as a single landmark.
- [ ] Four link columns render at `≥ 1024px`; 2 columns at `768–1023px`; accordions on `< 768px`.
- [ ] TIN wordmark, compliance line, copyright, and social icons all present.
- [ ] Sandbox link forwards UTM params via `buildSignupUrl`.
- [ ] Every external link uses `target="_blank" rel="noopener noreferrer"`.
- [ ] All labels imported from `src/constants/footer.ts` (no inline JSX text).
- [ ] No 1px solid borders; no hardcoded hex; no pure-black shadow.
- [ ] Keyboard order preserved across breakpoints.
- [ ] Placeholder URLs are flagged in the coding agent's PR description.

## Dependencies
- `lucide-react` icons (already installed).
- `src/lib/analytics.ts` for `buildSignupUrl`.
- `VITE_SIGNUP_URL` env var.
- A new content module `src/constants/footer.ts` to own labels + URLs.

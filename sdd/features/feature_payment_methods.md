# Feature: Payment Methods Showcase

## Description
A dedicated section displaying TIN's local and global payment method coverage as a visual grid of logos. It communicates geographic reach and payment method breadth at a glance, reinforcing trust and reducing evaluation friction for merchants and developers assessing integration scope.

## Motivation
Payment method coverage is a primary evaluation criterion for any payment gateway prospect. Finance managers need to confirm their local methods are supported (PSE for Colombia, Pix for Brazil, SPEI/OXXO for Mexico, PagoEfectivo for Peru). Developers need to know what methods they can build against. Founders need confidence in LatAm reach. A visual logo grid communicates this faster than any text paragraph.

## Spec References
- `product_spec.md` → Supported Payment Methods (complete list), Landing Page Features #3, Acceptance Criteria
- `design_system.md` → Color Tokens, Typography Scale (label-sm), Corner Radius, Surface Stacking
- `business_rules.md` → No Border Lines, Image Optimization, Typography Exclusivity, Reduced Motion

## Payment Methods to Display

| Category | Methods |
|---|---|
| **LatAm APMs** | Pix (BR), PSE (CO), SPEI (MX), OXXO (MX), Efecty (CO), PagoEfectivo (PE) |
| **Credit & Debit Cards** | Visa, Mastercard, American Express |
| **Digital Wallets** | Apple Pay, Google Pay |

## Data Structure

All payment methods are driven by a single data file for easy extension:

```typescript
// src/constants/payment-methods.ts
export interface PaymentMethod {
  id: string;
  name: string;
  category: 'apm' | 'card' | 'wallet';
  country?: string;       // ISO 3166-1 alpha-2
  logoPath: string;       // relative path to SVG in /src/assets/payment-methods/
  alt: string;            // descriptive alt text
}
```

## User Flow
1. User scrolls into the Payment Methods section.
2. Section headline communicates geographic reach (e.g., "Pagos locales. Escala global. TIN.").
3. A responsive logo grid animates into view (Framer Motion `fadeIn` stagger).
4. Logos are organized by category with `label-sm` uppercase category headers.
5. Hovering a logo card (desktop) transitions it from grayscale to full color.

## Visual Design
- **Layout:** Responsive logo grid. Desktop: 5-6 logos per row. Tablet: 4 per row. Mobile: 3 per row.
- **Logo treatment:** Each logo on a uniform pill card with `surface_container_lowest` (#ffffff) background on the `surface_container_low` (#f2f4f6) section background. Consistent bounding box (80×56px). Logos are desaturated (`filter: grayscale(100%)`) at rest, full-color on hover (`filter: grayscale(0%)`). Transition: `var(--duration-base) var(--ease-standard)`.
- **Section background:** `surface_container_low` (#f2f4f6) — alternating tonal shift with adjacent sections.
- **Category labels:** `label-sm` mixin — 11px, uppercase, +5% letter spacing, `on_surface_variant` (#45464d).
- **No 1px borders** around logo cards. Use padding + background + corner radius `xl` (12px) only.
- **Entrance animation:** Staggered Framer Motion `fadeInUp` per logo card (0.05s stagger), triggered via `whileInView`.

## Business Rules
- No `border: 1px solid` for logo card separation (see `business_rules.md` → No Border Lines).
- All payment method logos must use `<img>` with explicit `width`, `height`, and descriptive `alt` text (e.g., `alt="Pix — Pago instantáneo de Brasil"`). Below-the-fold logos use `loading="lazy"` (see `business_rules.md` → Image Optimization).
- Logos must be SVG format where available (preferred over PNG for sharpness at all resolutions).
- Reduced motion: stagger animation disabled, all logos visible immediately (see `business_rules.md` → Reduced Motion).

## Edge Cases

| Case | Expected Behavior |
|---|---|
| A payment method logo asset is missing | A text-only fallback pill showing the payment method name renders in its place. Background uses `surface_container_high` (#e6e8ea) to indicate placeholder state. |
| New payment method is added in the future | Developer adds a new entry to `src/constants/payment-methods.ts` and drops the SVG into `src/assets/payment-methods/`. No component change required. |
| User is on a high-DPI (Retina) display | SVG logos render crisp natively. No 2x variant needed. |
| `prefers-reduced-motion` is enabled | Stagger animation disabled. All logos visible immediately. |
| Viewport is 320px (smallest mobile) | 3 logos per row. Logo cards reduce to 64×44px bounding box. |

## Success Criteria
- [ ] All **11** payment methods listed in the spec are displayed with their correct logo and name.
- [ ] PagoEfectivo (Peru) is included alongside the other LatAm APMs.
- [ ] Logos are organized by category (APMs, Cards, Wallets) with `label-sm` uppercase headers.
- [ ] Responsive grid renders correctly at mobile (320px, 3-col), tablet (768px, 4-col), and desktop (1280px, 5-6-col).
- [ ] Hover state (grayscale → color transition) works on desktop.
- [ ] All logos have descriptive `alt` text.
- [ ] No 1px borders used.
- [ ] Section has `<section id="payment-methods">`, an `<h2>` heading with an `id`, and `aria-labelledby`.
- [ ] Stagger animation triggers on scroll, with reduced-motion fallback.
- [ ] Section headline incorporates TIN colloquialism.

## Dependencies
- Payment method logo assets (SVG preferred) — from design team or official brand asset kits.
- `src/constants/payment-methods.ts` data file.
- `src/styles/_tokens.scss` and `src/styles/_typography.scss`.
- Framer Motion.

# Feature: Products Ecosystem Section

## Description
A visually rich section that presents TIN's seven core product engines as individual, interactive cards. Each engine is named, illustrated, and described in one to two sentences. The section communicates the full breadth of TIN's platform to all three visitor segments: developers, finance managers, and founders/CEOs.

## Motivation
No visitor segment will convert without understanding what TIN actually does. This section bridges the gap between the abstract value proposition in the hero and the specific technical capabilities that make TIN the right choice. It must be scannable in seconds and invite deeper engagement. The seven-engine display communicates that TIN is a complete platform, not a single-product vendor.

## Spec References
- `product_spec.md` → Core Products (all 7 engines), Landing Page Features #2 (Products Ecosystem Showcase), Acceptance Criteria
- `design_system.md` → Card Component spec, Typography Scale, Elevation & Depth, Motion & Animation, Asymmetric Layout Principles
- `business_rules.md` → No Border Lines, Shadow Specification, Typography Exclusivity, Corner Radius Nesting, Asymmetric Layout, Reduced Motion

## Products to Showcase

| # | Engine | Name | One-line Description | Audience Resonance |
|---|---|---|---|---|
| 1 | **Payins** | Payins | High-conversion payment processing across local and global methods. | Founders (conversion rates), Developers (integration) |
| 2 | **Payouts** | Payouts | Fast, automated mass disbursements to bank accounts and wallets across LatAm. | Finance Managers (operations), Developers (API) |
| 3 | **Recurrence** | Subscriptions | Automated recurring billing, dunning management, and plan creation. | Finance Managers (revenue predictability), Developers (webhooks) |
| 4 | **Soft Precision** | Fraud & Routing | Intelligent routing engine and AI-driven fraud scoring. | Founders (security posture), Finance Managers (loss reduction) |
| 5 | **Fees & Tax** | Tax Management | Granular control over transaction costs, local taxes, and merchant fees. | Finance Managers (fiscal compliance), Founders (cost visibility) |
| 6 | **Tokenization** | Tokenization | PCI-compliant secure vault for card-on-file and one-click transactions. | Founders (PCI compliance), Developers (secure integration) |
| 7 | **Ledger** | Conciliation | Immutable balance tracking and automated settlement reconciliation. | Finance Managers (audit trail), Founders (financial clarity) |

## User Flow
1. User scrolls down from the Hero section.
2. Section animates into view (Framer Motion staggered card reveals).
3. User sees a section `<h2>` headline (e.g., "El ecosistema completo. TIN.") and subtitle.
4. Seven product cards are displayed in a responsive grid.
5. Each card has: an icon/illustration, the product name (`headline-sm`), and a 1-2 sentence description (`body-sm`).
6. Hovering a card (desktop) reveals a subtle depth effect (`translateY(-2px)` + ambient shadow).
7. Cards may link to a dedicated product page in a future iteration (V1: no link, visual only).

## Visual Design
- **Layout:** Responsive CSS grid. Desktop: 4 columns top row + 3 columns bottom row (asymmetric per design system). Tablet: 2 columns. Mobile: 1 column.
- **Cards:** `surface_container_lowest` (#ffffff) background on a `surface_container_low` (#f2f4f6) section background — tonal stacking for natural lift. Corner radius: `2xl` (16px). Inner padding: `space-8` (32px). No borders.
- **Card hover:** `translateY(-2px)` + `box-shadow: var(--shadow-ambient)`. Transition: `200ms var(--ease-standard)`.
- **Icons/Illustrations:** Custom SVG icon per engine using `secondary` (#0058be) or `primary` (#131b2e) tone. Consistent 48×48px bounding box.
- **Section background:** `surface_container_low` (#f2f4f6).
- **Entrance animation:** Staggered Framer Motion `fadeInUp` per card (0.08s stagger), triggered via `whileInView`.
- **Headline:** `headline-lg` on desktop, `headline-md` on mobile. Color: `on_primary_fixed`.
- **Category labels** (optional): `label-sm`, uppercase, `on_surface_variant` above related card groups.

## Copy Direction
Section headline must use TIN colloquialism: e.g., "Todo lo que necesitas. TIN." or "Un ecosistema, cero fricciones. TIN."

Card descriptions must be concise (max 2 lines) and speak to the benefit, not just the feature. Example:
- Payins: "Acepta pagos por cualquier método local o global. Con las mejores tasas de conversión."
- Ledger: "Reconciliación automatizada y balances inmutables. Cero sorpresas al cierre."

## Business Rules
- No `border: 1px solid` for card edges (see `business_rules.md` → No Border Lines). Cards sit on `surface_container_low` background for natural contrast.
- Card shadows use ambient tinted color only (see `business_rules.md` → Shadow Specification).
- Card corner radius `2xl` (16px), inner element radius `lg` (8px) — nesting logic (see `business_rules.md` → Corner Radius Nesting).
- Desktop layout uses intentional asymmetry: 4+3 grid, not a uniform 4+4 (see `business_rules.md` → Asymmetric Layout).
- Reduced motion: all animations disabled if `prefers-reduced-motion: reduce` is set (see `business_rules.md` → Reduced Motion).

## Edge Cases

| Case | Expected Behavior |
|---|---|
| User has `prefers-reduced-motion` enabled | Cards render immediately without stagger. All content visible. |
| Card description text is longer than expected | Card height expands. Grid maintains alignment via CSS `grid-auto-rows: 1fr` or `align-items: stretch`. |
| Viewport is exactly 768px (tablet breakpoint) | 2-column layout activates. No content overlap or truncation. |
| SVG icon fails to load | A colored circle placeholder (48×48px, `secondary` at 10% opacity) appears. Product name and description remain visible. |
| Viewport is 320px (smallest mobile) | 1 column. Cards have reduced padding (`space-6` / 24px). `headline-sm` for card titles. |

## Success Criteria
- [ ] All **seven** product engines are displayed with name, icon, and description.
- [ ] Grid is 4+3 on desktop (asymmetric), 2-col on tablet, 1-col on mobile.
- [ ] No 1px border lines used for card separation.
- [ ] Card hover effect (`translateY(-2px)` + ambient shadow) works on desktop. No hover states on mobile.
- [ ] Stagger animation triggers when section scrolls into view.
- [ ] Animation disabled when `prefers-reduced-motion: reduce` is detected.
- [ ] Section has `<section id="products">`, an `<h2>` heading with an `id`, and `aria-labelledby` pointing to it.
- [ ] Section headline incorporates TIN colloquialism.
- [ ] Card descriptions speak to benefits, not just feature names.

## Dependencies
- `src/styles/_tokens.scss` CSS custom properties (colors, radius, shadows, spacing).
- `src/styles/_typography.scss` mixins for `headline-lg`, `headline-sm`, `body-sm`, `label-sm`.
- Seven custom SVG icons (one per engine) — from design team or created by developer.
- Framer Motion installed and configured.
- `src/constants/products.ts` data file for product metadata (name, description, icon path).

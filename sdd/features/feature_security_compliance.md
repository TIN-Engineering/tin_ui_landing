# Feature: Security & Compliance

## Description
A dedicated section that establishes TIN's trust posture at the infrastructure and operational levels. It surfaces three primary trust pillars — **KYC/KYB controls**, **role-based access**, and **transaction traceability** — and reinforces them with four compliance badges (PCI-DSS Level 1, Tokenization, End-to-end encryption, Soft Precision fraud prevention). Enterprise buyers cannot evaluate a payments platform without a visible compliance story; this section is the Landing's answer.

## Motivation
Finance Managers and Founders/CEOs (Segments 2 & 3 in `product_spec.md`) explicitly evaluate security posture before engaging Sales. Missing or vague security signaling blocks the conversion funnel regardless of product quality. This section transforms trust from implicit to explicit without turning the Landing into a compliance brochure.

## Spec References
- `product_spec.md` → Landing Page Features #5 (Security & Compliance), Primary Users (Segments 2, 3), Core Products (#6 Tokenization, #4 Soft Precision), Acceptance Criteria.
- `design_system.md` → § 1 Color Tokens, § 2 Typography (`headline-md`, `label-md`, `body-sm`), § 3 Elevation (tonal stacking), § 4 Radius, § 6 Component Specs (Card).
- `business_rules.md` → No Border Lines, Typography Exclusivity, Color Contrast, Keyboard Navigation, ARIA Roles.

## Trust Pillars (V1 — Spanish, TIN-voice where natural)
| # | Pillar | `lucide-react` icon | One-liner |
|---|---|---|---|
| 1 | `Controles KYC/KYB` | `ShieldCheck` | Onboarding de merchants con verificación regulatoria integrada desde el inicio. |
| 2 | `Gestión de roles` | `Users` / `UserCog` | Permisos granulares por usuario y equipo. Tu panel, con las reglas de tu compañía. |
| 3 | `Trazabilidad` | `FileBarChart` / `Activity` | Cada transacción, auditable. Ledger inmutable con exportación a la medida. |

## Compliance Badges (V1)
Rendered as an accompanying row of chips/labels:

| Badge | Display label | Icon | Source of truth |
|---|---|---|---|
| `pci-dss` | `PCI-DSS Level 1` | `Lock` | External audit certificate (out of scope to render the cert itself). |
| `tokenization` | `Tokenización PCI` | `KeyRound` | Links to `#products` Tokenization card. |
| `encryption` | `Cifrado end-to-end` | `ShieldAlert` | — |
| `soft-precision` | `Antifraude Soft Precision` | `Radar` | Links to `#products` Soft Precision card. |

Badges are **visual reassurance only** in V1 — non-interactive except where noted (`tokenization` + `soft-precision` deep-link to their ecosystem cards). No external links in V1.

## User Flow
1. Visitor scrolls past Pricing.
2. Section appears with an `<h2>` using the TIN voice, e.g. "Seguridad y cumplimiento desde el diseño. Tin."
3. A short `<p>` introduces the section (one sentence).
4. Three trust-pillar cards render in a responsive grid.
5. Below the cards, the compliance badges row renders as a horizontal pill strip.
6. Visitor reads + validates in under 10 seconds, then continues to the Dark CTA Band.

## Visual Design
- **Section wrapper:** `<section id="security" aria-labelledby="security-title">`.
- **Background:** `--color-surface` (alternates with Pricing on `--color-surface-container-low`).
- **Heading block:** left-aligned `<h2>` (`headline-lg`) + short intro paragraph (`body-md`, `--color-on-surface-variant`). Max-width `640px`.
- **Trust-pillar grid:**
  - Desktop `≥ 1024px`: 3 columns, `gap: var(--space-5)`.
  - Tablet: 2 columns; third card spans both.
  - Mobile: single column.
- **Pillar card:** existing `Card` atom (`elevation="flat"`), radius `--radius-2xl`, padding `--space-6`. Stack: 24px `lucide-react` icon tinted `--color-secondary` → `<h3>` (`headline-sm`) → `<p>` (`body-sm`, `--color-on-surface-variant`).
- **Compliance badge strip:**
  - Renders below the pillars with `margin-top: var(--space-10)`.
  - Each badge is a pill: background `--color-surface-container-low`, radius `--radius-full`, padding `var(--space-2) var(--space-4)`, icon 14px + `label-md` text.
  - Flex row with `gap: var(--space-3)`, wraps naturally; aligns left on desktop, centers on mobile.
  - `tokenization` and `soft-precision` pills wrap their content in an `<a href="#products">`; remaining pills are `<span>`.
- **Motion:** pillar grid fades in with staggered `whileInView` (0.08s). Badges fade in as a group. Gated by `useReducedMotion()`.

## Business Rules
- No 1px solid borders. Badge delineation uses tonal stacking.
- Headings follow the single-h1-per-page rule (`<h2>` here).
- Colors via `var(--color-*)` only — grep verifiable.
- `tokenization` / `soft-precision` anchor links use the existing `#products` section id (no deep-linking to individual cards in V1 — scroll to the section is acceptable).

## Edge Cases
| Case | Expected Behavior |
|---|---|
| A badge icon fails to load | Pill still renders with the label; reserve the 14×14 box to avoid layout shift. |
| Visitor uses Windows High Contrast | Pills retain visibility via `forced-colors: active` — pill border becomes visible at full opacity. |
| `prefers-reduced-motion: reduce` | Entrance stagger disabled; pillar cards render statically. |
| Section has no products section to deep-link to (unlikely — it exists from task_001) | Anchor links still render; clicking scrolls to top/nowhere. No JS error. |
| Copy translation edits change the badge label length | Pill flex-wraps; never truncates. |

## Success Criteria
- [ ] `<section id="security">` renders with a TIN-voice `<h2>` and one-sentence intro.
- [ ] Three trust-pillar cards render in the specified responsive grid with `lucide-react` icons.
- [ ] Four compliance badges render as pills using tonal stacking (no borders).
- [ ] `tokenization` and `soft-precision` badges deep-link via `<a href="#products">`.
- [ ] No hardcoded hex in the component (grep-verified).
- [ ] Entrance animation respects `prefers-reduced-motion`.
- [ ] Keyboard order: section heading → pillar cards skipped (non-interactive) → the two badge links → continues.
- [ ] Section contrast ≥ WCAG AA on body text; AAA on heading.

## Dependencies
- `Card` atom from task_001.
- `lucide-react` icons already installed.
- No new data constants file required; trust-pillar and badge arrays may live inline or in `src/constants/security.ts` (preferred for future CMS migration).

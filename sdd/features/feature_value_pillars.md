# Feature: Value Pillars (3-Up Differentiators)

## Description
A compact three-card band immediately below the Hero that communicates TIN's three top-level differentiators at a glance: **Integración Tin (Cards & APMs)**, **Operación local (foco LatAm)**, and **Operación confiable (Seguridad)**. Each pillar is a small editorial card with an uppercase eyebrow, an `<h3>` title, and one supporting sentence.

Unlike the deeper 7-engine `ProductsEcosystem`, this band is a **fast-read** layer aimed at visitors still deciding whether to keep scrolling. It is not a replacement for the ecosystem — it precedes it.

## Motivation
The current landing jumps straight from Hero → full 7-engine grid, which is high cognitive load for a visitor 3 seconds in. Finance Managers and CEOs (Segments 2 & 3 in `product_spec.md`) need a one-line reassurance that TIN covers the three things they care about most — **breadth of methods, LatAm depth, and trust** — before they commit to reading about each engine.

## Spec References
- `product_spec.md` → Landing Page Features (proposed new #11 — flagged in `task_002`), Primary Users (all three segments), Design System Constraints.
- `design_system.md` → § 1 Color Tokens (No-Line rule), § 2 Typography (`label-md`, `headline-sm`, `body-sm`), § 3 Elevation (tonal stacking, ambient shadow on hover), § 4 Corner Radius (`2xl` card), § 5 Spacing, § 6 Card Component.
- `business_rules.md` → No Border Lines, Shadow Specification, Typography Exclusivity, Above-the-Fold Priority (this band sits immediately below the fold).

## User Flow
1. Visitor finishes reading the Hero headline and scrolls once.
2. Three cards come into view in a single horizontal row (desktop) or stack (mobile).
3. Each card shows: an uppercase eyebrow (e.g. `CARDS & APMS`), an `<h3>` heading, and one sentence.
4. Visitor reads all three in under 6 seconds and continues scrolling to the ecosystem.
5. Cards are **non-interactive** in V1 — no click target, no CTA. They signal; they do not route.

## Visual Design
- **Section wrapper:** `<section id="value-pillars" aria-labelledby="value-pillars-title">` with a visually-hidden `<h2 id="value-pillars-title">` for screen readers (since the band has no visible overall heading in the HTML reference).
- **Section background:** `--color-surface` (inherits page base; the pillars rely on their cards' `--color-surface-container-lowest` for contrast — tonal stacking, no borders).
- **Grid:** desktop `≥ 1280px` → `grid-template-columns: repeat(3, minmax(0, 1fr))` with `gap: var(--space-5)`; tablet `≥ 768px` → `repeat(2, …)`; mobile → single column.
- **Card:** `Card` component (`elevation="raised"`), radius `--radius-2xl`, padding `--space-6`.
  - Inside the card, order top → bottom: `(1)` eyebrow row with a 16px `lucide-react` icon + `label-md` label tinted `--color-secondary`; `(2)` `<h3>` using `headline-sm`; `(3)` `<p>` using `body-sm`.
- **Hover (desktop only):** standard Card hover — `translateY(-2px)` + `var(--shadow-ambient)`. Suppressed under `prefers-reduced-motion: reduce`.
- **Asymmetric placement:** none in V1 — pillars are deliberately symmetric to act as a "resting row" between the intentionally asymmetric Hero and the 4+3 asymmetric ecosystem.

## Content (V1 — Spanish, TIN-voice mandatory)
| Pillar | Eyebrow | `<h3>` | Description |
|---|---|---|---|
| 1 | `CARDS & APMS` | `Integración Tin` | SDKs y una API clara para salir a producción rápido. Procesa tarjetas y métodos alternativos en una sola integración. |
| 2 | `OPERACIÓN LOCAL` | `Enfocados en LatAm` | Pagos locales con conocimiento profundo de cada mercado. Integración nativa con métodos y regulaciones regionales. |
| 3 | `SEGURIDAD` | `Operación confiable` | Monitoreo, antifraude y controles KYC/KYB integrados desde el inicio. Escala sin fricción. |

Every headline carries the TIN voice (see `business_rules.md` → Brand Voice).

## Business Rules
- **No border lines** — cards delimit via `--color-surface-container-lowest` on `--color-surface`.
- **No pure-black shadows** — hover elevation uses `var(--shadow-ambient)`.
- **Cards are not links** in V1. If this changes, each card must become a single `<a>` wrapping all content to preserve keyboard semantics.

## Edge Cases
| Case | Expected Behavior |
|---|---|
| `lucide-react` icon fails to load | Card renders without the icon (eyebrow label remains). No broken image, no layout shift — reserve the 16×16 box via CSS. |
| Copy overflows on mobile at 320px | `<p>` wraps normally; card never forces horizontal scroll. |
| `prefers-reduced-motion: reduce` | Entrance stagger + hover transform disabled. Shadow-on-hover remains. |

## Success Criteria
- [ ] `<section id="value-pillars">` renders three non-interactive cards, grouped as `<h3>` + eyebrow + body copy.
- [ ] Grid is `1 → 2 → 3` columns at `< 768px / 768–1279px / ≥ 1280px`.
- [ ] Every pillar headline uses the TIN voice and `headline-sm` mixin.
- [ ] Icons come from `lucide-react`; colors flow through `var(--color-*)` only (grep-verified — no hex).
- [ ] Hover elevation matches `design_system.md` § 6 Card Component; disabled under `prefers-reduced-motion`.
- [ ] Section is keyboard-skippable (no interactive elements).

## Dependencies
- Existing `Card` atom (`src/components/ui/Card.tsx`).
- `lucide-react` icons (already installed in task_001).
- `src/styles/_tokens.scss` (no new tokens required).

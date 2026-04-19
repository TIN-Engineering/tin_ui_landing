# Feature: Testimonials

## Description
A two-card testimonial band between the Security & Compliance section and the Dark CTA Band. Each card displays one quote (short, benefit-led, TIN voice when possible), the author's first name + initial, their role, and their company type. V1 contains **two** placeholder testimonials marked as such in `src/constants/testimonials.ts`; real quotes require owner approval before shipping.

## Motivation
Social proof is a known conversion lever for B2B payments. Enterprise buyers look for peers; developers look for credible technical voices. A small two-card band — not a carousel — keeps the page rhythm editorial and avoids the common "testimonial wall" anti-pattern that signals padding.

## Spec References
- `product_spec.md` → Landing Page Features (proposed new #14 — flagged in `task_002`), Primary Users (all segments), Acceptance Criteria.
- `design_system.md` → § 1 Color Tokens, § 2 Typography (`body-lg` for quote, `label-md` for attribution), § 3 Elevation (tonal stacking, flat cards), § 4 Radius (`2xl`), § 6 Card Component.
- `business_rules.md` → No Border Lines, Typography Exclusivity, Color Contrast.

## Data Contract
`src/constants/testimonials.ts` exports a typed array:

```typescript
interface Testimonial {
  id: string
  quote: string                      // Spanish, <= 220 chars, TIN voice preferred
  authorInitial: string              // e.g. "Camila R."
  role: string                       // e.g. "Head of Payments"
  companyType: 'banco' | 'ecommerce' | 'saas' | 'retail' | 'other'
  isPlaceholder: boolean             // true for V1 stock quotes
}
```

## V1 Content (placeholder — replace before production launch)
| id | quote | author | role | company |
|---|---|---|---|---|
| `payments-lead` | Pasamos de integración lenta a cobros operando en días. Tin, y listo. | Camila R. | Head of Payments | `banco` |
| `cto-integration` | Redujimos fricción operativa y mejoramos conversión desde la primera semana. | Javier M. | CTO | `saas` |

Both entries carry `isPlaceholder: true`. The coding agent must surface these in PR description so the owner can swap.

## User Flow
1. Visitor scrolls past Security & Compliance.
2. Two testimonial cards render side-by-side (desktop) or stacked (mobile).
3. Visitor reads one or both in ~5 seconds.
4. Cards are **non-interactive** in V1 — no "read more", no external links.
5. Visitor continues to the Dark CTA Band.

## Visual Design
- **Section wrapper:** `<section id="testimonials" aria-labelledby="testimonials-title">`. Visually-hidden `<h2 id="testimonials-title">` for a11y; the cards carry the rhetorical weight.
- **Background:** `--color-surface-container-low`.
- **Grid:**
  - Desktop `≥ 900px`: `grid-template-columns: 1fr 1fr`, `gap: var(--space-5)`.
  - Below `900px`: single column.
- **Card:** `Card` atom, `elevation="flat"`, radius `--radius-2xl`, padding `--space-8`. Stack:
  1. Quote — `body-lg`, weight 500 (medium), `--color-on-surface`. Open with a typographic `"` as decorative pseudo-element (`::before` with `content: '\201C'`, larger size, tinted `--color-secondary`).
  2. Attribution row — `label-md` uppercase, `--color-on-surface-variant`, format `AUTHOR · ROLE · COMPANY TYPE` (company type mapped to Spanish label via a small lookup, e.g. `banco` → `BANCO`).
- **Asymmetric accent:** the second card may be translated `translateY(-12px)` on desktop `≥ 1280px` for editorial rhythm, per § 8.
- **Motion:** staggered `whileInView` fade-in (0.12s gap between the two). Disabled under `prefers-reduced-motion`.

## Business Rules
- No 1px solid borders. Cards float on the tonal-stacked section background.
- Quote punctuation uses curly quotes rendered as CSS content, not as in-copy characters, to avoid copy-paste drift.
- `isPlaceholder: true` entries must be callable from a lint script or at minimum surfaced in the PR description (docs-only requirement).

## Edge Cases
| Case | Expected Behavior |
|---|---|
| Quote exceeds 220 characters | Renders normally (no truncation); content review flagged in PR. |
| Section has only one testimonial in the data array | Grid collapses to single-column naturally. |
| Section has zero testimonials | Entire `<section>` does **not** render. No empty band. |
| `prefers-reduced-motion: reduce` | Entrance stagger disabled; cards render statically. |
| Visitor uses a screen reader | Cards are announced with their `<blockquote>` semantics; attribution row uses `<cite>`. |

## Success Criteria
- [ ] `src/constants/testimonials.ts` exists with a typed, length-safe array and `isPlaceholder` flags.
- [ ] Each card is a semantic `<blockquote>` with an inner `<cite>` for attribution.
- [ ] Section renders only when `testimonials.length > 0`.
- [ ] Grid is `1 → 2` columns at `< 900px / ≥ 900px`.
- [ ] Visually-hidden `<h2>` provides a11y landmark.
- [ ] `prefers-reduced-motion: reduce` disables entrance animation.
- [ ] No hardcoded hex in the component (grep-verified).
- [ ] V1 placeholders are called out in PR description.

## Dependencies
- `Card` atom from task_001.
- No external data source in V1.

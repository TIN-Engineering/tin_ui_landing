# Feature: Feature Spotlights (Two-Column Media Highlights)

## Description
A reusable section pattern that renders a **two-column editorial spotlight**: copy on one side (eyebrow + `<h3>` + one supporting paragraph) and a media panel on the other (an image, a syntax-highlighted code/JSON preview, or another static visual). Multiple spotlight instances render sequentially down the page, each with its own id and optional copy/media swap of sides.

This feature replaces the ad-hoc "feature blocks" seen in `sdd/html_examples/landing-preview.html` with a single structured component that accepts data.

## Motivation
Between the dense ecosystem grid and the pricing/CTA sections, the landing needs **breathing room that sells specific capabilities**. Spotlights let us showcase one capability at a time (e.g., *"Checkout y links para cobrar de una"* with a JSON snippet) without recreating the full Developer Focus section. They are the editorial equivalent of a magazine's full-bleed pull quote — a single idea, given space.

## Spec References
- `product_spec.md` → Landing Page Features (proposed new section pattern — flagged in `task_002`), Primary Users (all three segments; each spotlight targets a primary persona).
- `design_system.md` → § 1 Color Tokens, § 2 Typography (`headline-md` / `body-md`), § 3 Elevation, § 4 Radius (`2xl`), § 5 Spacing, § 8 Asymmetric Layout.
- `business_rules.md` → No Border Lines, Shadow Specification, Above-the-Fold Priority, Reduced Motion.

## V1 Spotlights (data — Spanish, TIN-voice)
The feature ships with **exactly two** instances in V1, rendered in this order:

| # | `id` | Media side | Eyebrow | `<h3>` | Body | Media content |
|---|---|---|---|---|---|---|
| 1 | `spotlight-checkout` | right | `CHECKOUT · LINKS` | `Checkout y links para cobrar de una.` | Crea links de pago en segundos y recibe pagos por múltiples métodos sin implementar flujos complejos. Tin. | Syntax-highlighted **JSON** sample of a Payin payload (amount, currency COP, method APM, recurrence, status `authorized`). |
| 2 | `spotlight-visibility` | left | `PANEL · CONCILIACIÓN` | `Visibilidad completa de tu operación.` | Transacciones, conciliación y estado de pagos en un panel limpio y accionable. | Static PNG/JPEG screenshot of the merchant dashboard (placeholder until brand ships a real asset). |

Copy changes must re-enter this spec before shipping.

## Data Contract
The section consumes a typed array `spotlights: Spotlight[]` from `src/constants/spotlights.ts`:

```typescript
type SpotlightMedia =
  | { kind: 'image'; src: string; alt: string; width: number; height: number }
  | { kind: 'code'; language: 'json' | 'javascript'; content: string; ariaLabel: string }

interface Spotlight {
  id: string                  // e.g. 'spotlight-checkout'
  eyebrow: string             // uppercase label
  heading: string             // <h3>, TIN voice mandatory
  body: string                // single paragraph, <= 200 chars
  mediaSide: 'left' | 'right' // desktop only; mobile always stacks copy-then-media
  media: SpotlightMedia
}
```

## User Flow
1. Visitor finishes the Value Pillars or Products Ecosystem band and scrolls.
2. A two-column spotlight appears: copy on one side, media on the other. On desktop the `mediaSide` alternates between instances (`right` → `left`) to create editorial rhythm.
3. Visitor reads the headline in under 3 seconds. If interested, the body paragraph supports the claim with a concrete proof (the media).
4. Spotlights are **non-interactive** in V1 — no CTAs. The next CTA is the Dark CTA Band (`feature_dark_cta_band.md`).
5. On mobile the layout collapses to a single column; copy always renders **above** media.

## Visual Design
- **Section wrapper:** `<section id="{spotlight.id}" aria-labelledby="{id}-title">` — one `<section>` per spotlight.
- **Background alternation:** spotlights alternate `--color-surface` ↔ `--color-surface-container-low` to extend the tonal-stacking rhythm.
- **Grid (desktop, `≥ 1024px`):**
  - `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)` with `gap: var(--space-12)`.
  - `mediaSide === 'right'` → default order; `mediaSide === 'left'` → copy column gets `order: 2`, media `order: 1`.
- **Copy column:** max-width `560px`. Stack: eyebrow (`label-md`, `--color-secondary`) → `<h3>` (`headline-md`, ≤ 1024px falls back to `headline-sm`) → `<p>` (`body-md`, `--color-on-surface-variant`).
- **Media column — `kind: 'image'`:** `<img>` inside a `--color-surface-container-lowest` frame at `--radius-2xl`, `--space-4` padding. `width` / `height` attributes mandatory. `loading="lazy"`, `decoding="async"`. Aspect ratio `5 / 4`.
- **Media column — `kind: 'code'`:** a `<pre>` inside a dark panel (see below), monospace rendered **only inside the panel** — the rest of the page stays on Inter. Padding `--space-5`, `--radius-2xl`. `aria-label` read from the data object.
- **Hover:** none. Spotlights are static.
- **Motion:** each spotlight fades/slides in with `whileInView` (threshold ~0.2, `once: true`). Gated by `useReducedMotion()`.

### Code-panel sub-token (new, scoped to this feature)
Because this is the **first monospace surface** in the codebase, and `design_system.md` § 2 mandates Inter **everywhere else**, this feature introduces a **narrowly scoped** code panel styling, without changing the global font token:

```
background: linear-gradient(160deg, #0f1729, #1a2a47 60%, #284276)   /* approved by dark-CTA band; same family */
color:      #dbe5ff
font-family: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace
font-size:  0.8125rem (label-md scale)
line-height: 1.5
padding:    var(--space-5)
radius:     var(--radius-2xl)
```

> **Spec delta — resolve in `task_002`:** adding a monospace stack conflicts with `design_system.md` § 2 ("Inter exclusively"). Two acceptable outcomes:
> - **(A)** Amend `design_system.md` § 2 to state: *"Inter is the page typeface. Code panels inside spotlights and developer surfaces may use a monospace stack strictly within the code container."* — preferred.
> - **(B)** Drop the monospace treatment and render code in Inter at 500 weight. Visually weaker, but strictly spec-compliant.

Owner decision required before the coding agent implements this feature.

## Business Rules
- Headings carry the TIN voice (inherited from `business_rules.md` → Brand Voice).
- No 1px solid borders around the section or the media frame.
- Images require descriptive Spanish `alt`; decorative wrappers use `alt=""`.
- Code blocks must be `<pre><code>` with proper whitespace preservation — no layout-level hacks.
- `prefers-reduced-motion`: entrance animation disabled; static render.

## Edge Cases
| Case | Expected Behavior |
|---|---|
| `media.kind === 'image'` and the image 404s | `<img onError>` swaps to the `--color-surface-container-high` panel with a `label-md` text fallback stating the media topic (e.g. `PANEL · CONCILIACIÓN`). |
| Code snippet is wider than the media column | Panel scrolls horizontally; never line-wraps JSON. `overflow-x: auto`, `-webkit-overflow-scrolling: touch`. |
| Viewport `< 640px` | Layout collapses. Copy first, media second, both 100% width. |
| Copy body string > 200 characters | Still renders, but this should trigger a content review in PR. |
| `prefers-reduced-motion: reduce` | No slide-in; opacity change only, 150ms, or disabled entirely. |
| Monospace stack is not installed locally | System `ui-monospace`/`SFMono-Regular`/`Menlo` take over. No layout regression. |

## Success Criteria
- [ ] A `Spotlight` data array is declared in `src/constants/spotlights.ts` with the two V1 entries.
- [ ] Each spotlight renders as its own `<section id="…">` with an `<h3>` ≥ `headline-sm` size.
- [ ] `mediaSide` alternates correctly on desktop; on mobile copy is always first.
- [ ] Section background alternates tonally with adjacent sections.
- [ ] Code spotlight preserves whitespace, is horizontally scrollable at narrow widths, and carries an `aria-label`.
- [ ] Image spotlight has `width`, `height`, `alt`, `loading="lazy"`.
- [ ] All colors flow through design tokens (grep-verified — no hardcoded hex in the component file, except the scoped code-panel tokens if approved in option A).
- [ ] `prefers-reduced-motion: reduce` removes the entrance animation.
- [ ] Zero `border: 1px solid` used for sectioning.

## Dependencies
- Existing `Card` atom is **not** used here — the media frame is a bespoke surface inside the section.
- No syntax-highlighting library in V1: the code panel is a plain `<pre>` with static tokens in the JSON. A future task may introduce Shiki/Prism if syntax colors are required.
- Resolution of the **typography spec delta** above (option A vs B) before coding starts.

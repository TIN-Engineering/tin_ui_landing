# TIN Sovereign Design System

## Creative North Star: "The Editorial Architect"

The TIN UI is not an app template. It is a **high-end financial publication**. Trust is communicated through extreme precision, intentional whitespace, and structural hierarchy — not ornamentation. The interface should feel as stable as a physical vault, and as readable as a premium broadsheet.

**The Pause:** Every layout decision should leave generous whitespace that allows a user to breathe and process complex financial data with speed and clarity. When in doubt, add more margin.

**Intentional Asymmetry:** Break the rigid grid deliberately. Key data points placed off-center draw the eye. Oversized typography dominates. Surfaces are layered to create a sense of physical architecture, not a flat screen.

---

## 1. Color Tokens

### Semantic Token Reference

| Token | Hex Value | Usage |
|---|---|---|
| `on_primary_fixed` | `#0a0f1e` | Primary headings, dominant text. Maximum authority. |
| `primary` | `#131b2e` | Dark navy. Base for primary actions and brand identity. |
| `primary_container` | `#131b2e` | Primary button background. |
| `on_primary` | `#ffffff` | Text/icons on primary-colored backgrounds. |
| `secondary` | `#0058be` | Secondary actions, links, active states, the "TIN Pulse" glow. |
| `on_surface` | `#191c1e` | Default body text color. |
| `on_surface_variant` | `#45464d` | Secondary/supporting body text. Data labels, captions. |
| `surface` | `#f7f9fb` | Base page background layer. |
| `surface_container_low` | `#f2f4f6` | Sectional layer. Used for alternating section backgrounds. |
| `surface_container_lowest` | `#ffffff` | Cards, modals, content blocks. The "paper" surface. |
| `surface_container_high` | `#e6e8ea` | Hover states on list items, elevated highlights. |
| `surface_container_highest` | `#dfe1e3` | Most critical action areas, top-level elevation. |
| `outline_variant` | `#c6c6cd` | Ghost border base color (used at 15% opacity only). |
| `error` | `#ba1a1a` | Form validation errors, destructive states. |
| `on_error` | `#ffffff` | Text on error-colored backgrounds. |
| `error_container` | `#ffdad6` | Error message background. |

### The "No-Line" Rule — Enforced

Section and component boundaries are created **exclusively** through background tonal shifts. The transition from `surface_container_low` → `surface_container_lowest` creates a "seam," not a "cut."

**Forbidden:** `border: 1px solid` for sectioning purposes.
**Forbidden:** Any border with more than 15% opacity.
**Permitted:** The Ghost Border (`outline_variant` at 15% opacity) when contrast is insufficient — it should be **felt, not seen**.

### Surface Stacking Hierarchy

Think of each layer as a sheet of fine paper placed on top of the previous:

```
Layer 4 — surface_container_highest (#dfe1e3)  ← Most critical actions
Layer 3 — surface_container_high    (#e6e8ea)  ← Hover states, highlights
Layer 2 — surface_container_lowest  (#ffffff)  ← Cards, content blocks
Layer 1 — surface_container_low     (#f2f4f6)  ← Section backgrounds
Layer 0 — surface                   (#f7f9fb)  ← Page base
```

### Glassmorphism — For Floating Elements Only

Applied to: floating navigation bar, modals, dropdowns, tooltips.

```css
background: rgba(255, 255, 255, 0.80);   /* surface_container_lowest at 80% */
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

Fallback (when `backdrop-filter` unsupported): Use solid `surface_container_lowest` (#ffffff).

### Primary CTA Gradient

Linear gradient for primary CTA buttons (optional premium treatment):

```css
background: linear-gradient(45deg, #131b2e, #1a2f52);
```

---

## 2. Typography

**Typeface:** Inter is the page typeface. Loaded via `@fontsource/inter`. No fallback fonts in headings — only system sans-serif as last resort.

**Monospace exception (code containers only):** A monospace stack is permitted **exclusively** inside code containers — spotlight JSON/code panels, developer surfaces, and inline `<code>` snippets. It MUST NOT be used for headings, body copy, labels, or any UI chrome. The stack is declared as `--font-family-mono` in `_tokens.scss` and is currently: `'JetBrains Mono', 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace`. Fonts are not self-hosted in V1; the system monospace fallback is acceptable.

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing | Color Token |
|---|---|---|---|---|---|
| `display-lg` | 64px / 4rem | 700 (Bold) | 1.1 | -0.02em (-2%) | `on_primary_fixed` |
| `display-md` | 48px / 3rem | 700 (Bold) | 1.1 | -0.02em (-2%) | `on_primary_fixed` |
| `headline-lg` | 36px / 2.25rem | 600 (SemiBold) | 1.2 | -0.01em | `on_primary_fixed` |
| `headline-md` | 28px / 1.75rem | 600 (SemiBold) | 1.25 | -0.01em | `on_primary_fixed` |
| `headline-sm` | 22px / 1.375rem | 600 (SemiBold) | 1.3 | 0 | `on_primary_fixed` |
| `body-lg` | 18px / 1.125rem | 400 (Regular) | 1.6 | 0 | `on_surface` |
| `body-md` | 16px / 1rem | 400 (Regular) | 1.6 | 0 | `on_surface` |
| `body-sm` | 14px / 0.875rem | 400 (Regular) | 1.5 | 0 | `on_surface_variant` |
| `label-md` | 13px / 0.8125rem | 500 (Medium) | 1.4 | +0.05em (+5%) | `on_surface_variant` |
| `label-sm` | 11px / 0.6875rem | 500 (Medium) | 1.4 | +0.05em (+5%) | `on_surface_variant` |

**Labels are always uppercase.** Apply `text-transform: uppercase` to all `label-md` and `label-sm` usages.

### Usage Context

- **`display-lg` / `display-md`:** Hero headlines, section openers with maximum visual impact. One per viewport.
- **`headline-lg` / `headline-md`:** Section `<h2>` tags. Primary navigational guides across the page.
- **`headline-sm`:** Card titles, feature names within the Products Ecosystem.
- **`body-lg`:** Hero subtitles, section introductions.
- **`body-md`:** Card descriptions, form labels, general prose.
- **`body-sm`:** Supporting details, metadata, secondary descriptions.
- **`label-md` / `label-sm`:** Category tags, badges, micro-copy. Always uppercase.

---

## 3. Elevation & Depth

### Principle: Tonal Layering over Drop Shadows

Default component elevation is created by placing `surface_container_lowest` cards on `surface_container_low` backgrounds. This creates a natural lift with zero shadow.

### Ambient Shadows

Used only for elements that **must visually float**: primary CTAs, modals, the floating navigation bar.

```css
/* Ambient Shadow — Standard */
box-shadow: 0 8px 24px rgba(25, 28, 30, 0.10);   /* on_surface at 10% */

/* Ambient Shadow — Elevated (modals, primary buttons on hover) */
box-shadow: 0 8px 40px rgba(25, 28, 30, 0.12);
```

**Forbidden:** `box-shadow` with `rgba(0, 0, 0, X)` or `#000000X`. Always use `rgba(25, 28, 30, X)` (the `on_surface` token).

### Ghost Border Fallback

When a card lacks sufficient contrast against its background:

```css
/* Ghost Border — barely visible, felt not seen */
outline: 1px solid rgba(198, 198, 205, 0.15);   /* outline_variant at 15% */
```

This is distinct from sectioning borders (which are always forbidden). Ghost borders may be used on individual components when contrast is genuinely insufficient.

---

## 4. Corner Radius Scale

| Scale | Value | Usage |
|---|---|---|
| `sm` | 4px / 0.25rem | Chips, tags, small badges |
| `md` | 6px / 0.375rem | Small nested elements (input fields within cards) |
| `lg` | 8px / 0.5rem | Input fields, secondary buttons |
| `xl` | 12px / 0.75rem | Primary buttons, large cards, main containers |
| `2xl` | 16px / 1rem | Feature cards, modal panels |
| `full` | 9999px | Pills, avatar circles, toggle switches |

**Nesting logic:** A container at `xl` (12px) nests inner elements at `lg` (8px) or `md` (6px). Never use the same radius for parent and child containers — this creates a "flat" look that destroys the layering principle.

---

## 5. Spacing Scale

Base unit: 4px. All spacing values are multiples of 4.

| Token | Value | Common Usage |
|---|---|---|
| `space-1` | 4px | Micro gaps, icon-to-label spacing |
| `space-2` | 8px | Inline element spacing |
| `space-3` | 12px | Compact component padding |
| `space-4` | 16px | Default component padding |
| `space-5` | 20px | Form field vertical rhythm |
| `space-6` | 24px | Button horizontal padding (minimum) |
| `space-8` | 32px | Card internal padding |
| `space-10` | 40px | Section sub-element spacing |
| `space-12` | 48px | Section heading to content gap |
| `space-16` | 64px | Desktop section vertical padding |
| `space-20` | 80px | Large section vertical padding (desktop) |
| `space-24` | 96px | Maximum section padding (hero) |

---

## 6. Component Specifications

### Primary Button
```
Background:   linear-gradient(45deg, #131b2e, #1a2f52)
Text:         #ffffff (on_primary), body-md, weight 600
Corner:       xl (12px)
Padding:      12px 24px (vertical 12px, horizontal 24px minimum)
Hover:        Increase gradient brightness +8%. Ambient shadow elevated.
Active:       Scale down to 0.97.
Disabled:     40% opacity. No pointer events.
Focus ring:   2px solid #0058be (secondary), 2px offset.
```

### Secondary / Ghost Button
```
Background:   transparent
Border:       Ghost Border — outline: 1px solid rgba(198, 198, 205, 0.30)
Text:         #0058be (secondary), body-md, weight 600
Corner:       xl (12px)
Padding:      12px 24px
Hover:        surface_container_high (#e6e8ea) background tint.
Focus ring:   2px solid #0058be, 2px offset.
```

### Card Component
```
Background:   surface_container_lowest (#ffffff)
Corner:       2xl (16px) for feature cards, xl (12px) for compact cards
Padding:      space-8 (32px)
Shadow:       None by default. Ambient shadow on hover only.
Border:       None. Context separation via parent background.
Hover:        Translate Y: -2px. Apply standard ambient shadow.
Transition:   200ms ease for transform and box-shadow.
```

### Input Field
```
Background:   surface_container_lowest (#ffffff)
Border:       1px solid rgba(198, 198, 205, 0.30) — Ghost Border
Corner:       lg (8px)
Padding:      12px 16px
Label:        label-md, uppercase, on_surface_variant
Placeholder:  on_surface_variant (#45464d) at 60% opacity
Focus state:  Border becomes 2px solid #0058be (secondary).
              Add: box-shadow: 0 0 0 4px rgba(0, 88, 190, 0.04)
Error state:  Border becomes 2px solid #ba1a1a (error).
              Label and helper text switch to error (#ba1a1a).
```

### The "TIN Pulse" Component
A small animated indicator showing the system is live and fast. Used next to real-time data points.

```
Size:         8px × 8px circle
Color:        #0058be (secondary)
Animation:    CSS keyframe — scale pulse from 1 to 1.4 and back, 1.5s infinite ease-in-out.
              Outer glow: box-shadow: 0 0 0 4px rgba(0, 88, 190, 0.20)
Reduced motion: Static dot, no animation.
```

### Navigation Bar (Floating Glassmorphic)
```
Position:     fixed, top: 0, full width, z-index: 50
Background:   rgba(255, 255, 255, 0.00) at scroll = 0
              rgba(255, 255, 255, 0.80) + backdrop-filter: blur(20px) at scroll > 50px
Transition:   background 200ms ease
Shadow:       0 1px 0 rgba(25, 28, 30, 0.08) — ultra-subtle bottom separator (not a border)
Height:       64px desktop, 56px mobile
Padding:      0 space-8 (32px) desktop, 0 space-4 (16px) mobile
```

---

## 7. Motion & Animation

### Principles
- Motion communicates state change and hierarchy, not decoration.
- Duration: fast interactions (hover, focus) at 150-200ms. Entrance animations at 300-500ms.
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material You standard ease) for most transitions.

### Standard Entrance Animation (Framer Motion)
Applied to cards and section content as they scroll into view:

```typescript
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.08 } }
};
```

### Reduced Motion
Always check `useReducedMotion()` from Framer Motion. When true:
- Set all animation variants to `{ opacity: 1, y: 0 }` immediately.
- Disable the TIN Pulse animation (render as static dot).
- Disable hover transform effects (keep shadow transitions only).

---

## 8. Asymmetric Layout Principles

**Do:**
- Align a section headline left and place supporting data far right, leaving a deliberate void in the center.
- Use oversized `display-lg` type that bleeds into the next visual element.
- Offset card grids intentionally — e.g., a 3-column grid where the middle card is slightly elevated (transform: translateY(-8px)).

**Don't:**
- Never center-align body text on desktop. Only headlines and CTAs may be centered.
- Never use identical vertical padding on both top and bottom of a hero section — create asymmetry (more top than bottom, or the reverse).
- Never place all key information in the "safe" center of the viewport.

---

## 9. SCSS Token Map

The project uses SCSS (`sass` package). All design tokens are defined as CSS custom properties in `src/styles/_tokens.scss` and consumed throughout the codebase via SCSS variables and `var()` references.

### `src/styles/_tokens.scss`

```scss
// ─── Color Tokens ────────────────────────────────────────────────────────────
:root {
  // Text
  --color-on-primary-fixed:          #0a0f1e;
  --color-on-primary:                #ffffff;
  --color-on-surface:                #191c1e;
  --color-on-surface-variant:        #45464d;
  --color-on-error:                  #ffffff;

  // Brand
  --color-primary:                   #131b2e;
  --color-primary-container:         #131b2e;
  --color-secondary:                 #0058be;

  // Surfaces
  --color-surface:                   #f7f9fb;
  --color-surface-container-low:     #f2f4f6;
  --color-surface-container-lowest:  #ffffff;
  --color-surface-container-high:    #e6e8ea;
  --color-surface-container-highest: #dfe1e3;

  // Utility
  --color-outline-variant:           #c6c6cd;
  --color-error:                     #ba1a1a;
  --color-error-container:           #ffdad6;

  // ─── Typography ────────────────────────────────────────────────────────────
  --font-family-base: 'Inter', system-ui, sans-serif;

  --font-size-display-lg:  4rem;       // 64px
  --font-size-display-md:  3rem;       // 48px
  --font-size-headline-lg: 2.25rem;    // 36px
  --font-size-headline-md: 1.75rem;    // 28px
  --font-size-headline-sm: 1.375rem;   // 22px
  --font-size-body-lg:     1.125rem;   // 18px
  --font-size-body-md:     1rem;       // 16px
  --font-size-body-sm:     0.875rem;   // 14px
  --font-size-label-md:    0.8125rem;  // 13px
  --font-size-label-sm:    0.6875rem;  // 11px

  --line-height-display:   1.1;
  --line-height-headline:  1.2;
  --line-height-body:      1.6;
  --line-height-label:     1.4;

  --letter-spacing-display:  -0.02em;
  --letter-spacing-headline: -0.01em;
  --letter-spacing-label:     0.05em;

  // ─── Radius ────────────────────────────────────────────────────────────────
  --radius-sm:   4px;
  --radius-md:   6px;
  --radius-lg:   8px;
  --radius-xl:   12px;
  --radius-2xl:  16px;
  --radius-full: 9999px;

  // ─── Shadows ───────────────────────────────────────────────────────────────
  --shadow-ambient:    0 8px 24px rgba(25, 28, 30, 0.10);
  --shadow-ambient-lg: 0 8px 40px rgba(25, 28, 30, 0.12);

  // ─── Spacing (4px base grid) ───────────────────────────────────────────────
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  // ─── Glassmorphism ─────────────────────────────────────────────────────────
  --glass-bg:     rgba(255, 255, 255, 0.80);
  --glass-blur:   blur(20px);

  // ─── Motion ────────────────────────────────────────────────────────────────
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 400ms;
}
```

### `src/styles/_typography.scss`

```scss
@use 'tokens' as *;

@mixin display-lg {
  font-size: var(--font-size-display-lg);
  font-weight: 700;
  line-height: var(--line-height-display);
  letter-spacing: var(--letter-spacing-display);
  color: var(--color-on-primary-fixed);
}

@mixin display-md {
  font-size: var(--font-size-display-md);
  font-weight: 700;
  line-height: var(--line-height-display);
  letter-spacing: var(--letter-spacing-display);
  color: var(--color-on-primary-fixed);
}

@mixin headline-lg {
  font-size: var(--font-size-headline-lg);
  font-weight: 600;
  line-height: var(--line-height-headline);
  letter-spacing: var(--letter-spacing-headline);
  color: var(--color-on-primary-fixed);
}

@mixin headline-md {
  font-size: var(--font-size-headline-md);
  font-weight: 600;
  line-height: var(--line-height-headline);
  letter-spacing: var(--letter-spacing-headline);
  color: var(--color-on-primary-fixed);
}

@mixin headline-sm {
  font-size: var(--font-size-headline-sm);
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-on-primary-fixed);
}

@mixin body-lg {
  font-size: var(--font-size-body-lg);
  font-weight: 400;
  line-height: var(--line-height-body);
  color: var(--color-on-surface);
}

@mixin body-md {
  font-size: var(--font-size-body-md);
  font-weight: 400;
  line-height: var(--line-height-body);
  color: var(--color-on-surface);
}

@mixin body-sm {
  font-size: var(--font-size-body-sm);
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-on-surface-variant);
}

@mixin label-md {
  font-size: var(--font-size-label-md);
  font-weight: 500;
  line-height: var(--line-height-label);
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
}

@mixin label-sm {
  font-size: var(--font-size-label-sm);
  font-weight: 500;
  line-height: var(--line-height-label);
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
}
```

### SCSS File Structure

```
src/styles/
├── _tokens.scss        ← CSS custom properties (all tokens)
├── _typography.scss    ← Typography mixins
├── _mixins.scss        ← Reusable layout, glass, shadow mixins
├── _reset.scss         ← Minimal CSS reset
└── main.scss           ← Entry point — @use all partials
```

`main.scss` is imported once in `src/main.tsx`:

```tsx
import './styles/main.scss'
```

Component-level styles use CSS Modules with `.module.scss` extension, co-located with the component file:

```
src/components/sections/Hero.tsx
src/components/sections/Hero.module.scss
```

---

## 10. Do's and Don'ts (Enforcement Rules)

### Do
- Use white space aggressively. If a section feels cluttered, double the margin.
- Layer surfaces for importance: `surface_container_highest` for the most critical CTA zones.
- Respect the corner radius nesting scale: outer `xl`, inner `lg` or `md`.
- Use `on_surface_variant` for secondary text so primary navy text (`on_primary_fixed`) naturally dominates.
- Use the TIN Pulse on any UI element that represents a live, real-time state.

### Don't
- **No 100% opaque borders for sectioning.** Ever.
- **No pure black shadows.** Always use `rgba(25, 28, 30, X)`.
- **No standard grid layouts** that feel "safe." Create tension with deliberate asymmetry.
- **No divider lines in lists.** Use spacing and weight to separate items.
- **No center-aligned body text on desktop** (headlines and CTAs only).
- **No generic placeholder gradients.** The only gradient permitted is the primary CTA gradient.

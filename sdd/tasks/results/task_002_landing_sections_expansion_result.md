# Task Result: Landing Sections Expansion

## Task reference
- Task file: `task_002_landing_sections_expansion.md`
- Parent features:
  - `feature_value_pillars.md`
  - `feature_feature_spotlights.md`
  - `feature_pricing_preview.md`
  - `feature_security_compliance.md`
  - `feature_testimonials.md`
  - `feature_dark_cta_band.md`
  - `feature_footer.md`

## Open Questions — resolutions applied

1. **Typography spec delta (OQ1)** → **Option A** adopted. `design_system.md` § 2 amended to permit a monospace stack strictly inside code containers; `--font-family-mono` added to `_tokens.scss`. Only used inside `FeatureSpotlights` code panel.
2. **Navbar + Hero copy (OQ2)** → **(i) status quo**. Navbar CTA copy (`Start Building` / `Contact Sales`) and the Hero headline remain unchanged, per R9.3. No sibling task created; the HTML-example copy drift stays a future decision for the owner.
3. **Product spec landing-features list (OQ3)** → amendment applied in the same change. `product_spec.md` § "Landing Page Features" now includes #11 Value Pillars, #12 Pricing Preview, #13 Final Conversion Band, #14 Testimonials.
4. **Testimonials content (OQ4)** → V1 placeholders shipped exactly as specified — see callouts below.
5. **Footer link destinations (OQ5)** → placeholders shipped as `aria-disabled` `href="#"` — full inventory listed below.

## Implemented

### New sections / layout components
- [x] `src/components/sections/ValuePillars.tsx` + `.module.scss` — section `#value-pillars`, 3-up non-interactive `Card`s, 1 / 2 / 3-col grid.
- [x] `src/components/sections/FeatureSpotlights.tsx` + `.module.scss` — renders each `Spotlight` as its own `<section>` (id = spotlight id), alternating `mediaSide` on desktop; code panel uses `--font-family-mono` with horizontal overflow.
- [x] `src/components/sections/PricingPreview.tsx` + `.module.scss` — section `#pricing`, three-tier cards (Starter/Growth/Enterprise), Enterprise on `--color-primary-container` + `translateY(-8px)` lift.
- [x] `src/components/sections/SecurityCompliance.tsx` + `.module.scss` — section `#security`, three pillar cards + four compliance pills; `tokenization` + `soft-precision` deep-link to `#products`.
- [x] `src/components/sections/Testimonials.tsx` + `.module.scss` — section `#testimonials` with visually-hidden `<h2>`; semantic `<blockquote>` + `<cite>` cards; renders only when array length > 0.
- [x] `src/components/sections/DarkCtaBand.tsx` + `.module.scss` — section `#final-cta`, gradient panel `--color-primary` → `--color-primary-gradient-stop`, dark-theme Buttons.
- [x] `src/components/layout/Footer.tsx` + `.module.scss` — `<footer role="contentinfo">`, desktop 4-col / tablet 2-col / mobile `<details>` accordions; tonal seam via `--shadow-navbar-seam`.

### New constants
- [x] `src/constants/value-pillars.ts`
- [x] `src/constants/spotlights.ts` (typed `Spotlight` union with `code` + `image` media)
- [x] `src/constants/pricing.ts`
- [x] `src/constants/security.ts`
- [x] `src/constants/testimonials.ts`
- [x] `src/constants/footer.ts` (all labels + link kinds + sandbox UTM config)

### Assets
- [x] `src/assets/spotlights/dashboard-visibility.svg` (neutral Inter-styled SVG placeholder, well under the 40 KB budget — ~1.6 KB).

### Modified files
- [x] `src/App.tsx` — final page composition wired in the order specified by the task.
- [x] `src/components/layout/Navbar.tsx` — extended `NAV_LINKS` with `Pricing` (`#pricing`) and `Seguridad` (`#security`); extended `SECTION_IDS` for the same; Navbar CTA copy untouched.
- [x] `src/components/ui/Button.tsx` + `Button.module.scss` — added `theme: 'light' | 'dark'` prop. `themeDark.primary` = `--color-on-primary` bg / `--color-primary` text. `themeDark.ghost` = transparent + 24% outline_variant border / `--color-on-primary` text. Focus ring remains `--color-secondary`.
- [x] `src/lib/analytics.ts` — extended `cta_click` params to `{ location: CtaLocation; tier?: PricingTier; cta_id?: string }`; `CtaLocation` now includes `pricing_preview` and `dark_cta_band`. `buildSignupUrl` now accepts optional UTM overrides (used by the footer sandbox link).
- [x] `src/styles/_tokens.scss` — added **only** `--color-primary-gradient-stop: #1e315f` and `--font-family-mono: 'JetBrains Mono', ...`. No other tokens introduced.

### Spec documents
- [x] `sdd/specs/design_system.md` § 2 Typography — amended to permit the monospace stack inside code containers only.
- [x] `sdd/specs/product_spec.md` § Landing Page Features — appended #11 Value Pillars, #12 Pricing Preview, #13 Final Conversion Band, #14 Testimonials.

## Acceptance checks

**Design-system greps (all zero matches)**
- `grep -rE "border:\s*1px\s+solid" src/components/sections src/components/layout/Footer*` → **0**
- `grep -rnE "rgba\(0\s*,\s*0\s*,\s*0" src/` → **0**
- `grep -rnE "#[0-9a-fA-F]{3,8}" src/components/ src/constants/` → **0**
- Only two new tokens in `_tokens.scss` (`--color-primary-gradient-stop`, `--font-family-mono`).

**Build**
- `npm run build` → passes (TypeScript 0 errors, Vite bundles cleanly). Node 22 required — Node 18 blocks Vite 8 but was not a code issue.

**Accessibility**
- Still exactly one `<h1>` on the page (in the Hero); every new `<section>` carries `aria-labelledby` → its own `<h2>` id.
- `Testimonials` and `ValuePillars` use visually-hidden `<h2>` via the `visually-hidden` mixin.
- `<footer role="contentinfo">` renders as a sibling **after** `</main>`.
- Every testimonial card is a `<blockquote>` with an inner `<cite>`.
- All new interactive elements inherit the `focus-ring` mixin (`2px solid var(--color-secondary)`, 2px offset).
- `prefers-reduced-motion: reduce` disables: ValuePillars stagger, Spotlights slide-in, Pricing card hover translate + Enterprise `-8px` lift, Testimonial card lift, Dark CTA Band reveal.

**Feature-level**
- [x] ValuePillars — three `Card elevation="raised"`, responsive 1/2/3-col, non-interactive.
- [x] FeatureSpotlights — both V1 entries render; mediaSide alternates; mobile stacks copy-then-media; code panel is `overflow-x: auto` with `-webkit-overflow-scrolling: touch` and `aria-label`.
- [x] PricingPreview — three cards; Enterprise on `--color-primary-container`; Starter CTA runs through `buildSignupUrl()`; each CTA fires `trackEvent('cta_click', { location: 'pricing_preview', tier })`.
- [x] SecurityCompliance — three pillars + four pills; `tokenization` + `soft-precision` deep-link to `#products`; deep-link handler prevents errors if target is missing.
- [x] Testimonials — two `<blockquote>`s; section auto-hides on empty array; placeholders listed below.
- [x] DarkCtaBand — dual CTAs; dark `Button` theme composes over Primary + Ghost without forking; both `cta_click` events fire; `signup_redirect` fires on primary; focus ring = `--color-secondary`.
- [x] Footer — 4-col desktop / 2-col tablet / `<details>` mobile; sandbox link carries footer UTMs via `buildSignupUrl({...sandboxUtm})`; external + sandbox links use `target="_blank" rel="noopener noreferrer"` and a trailing 12px `ExternalLink` icon.

**Analytics schema**
- [x] `AnalyticsEvent` union for `cta_click` now supports `{ location: CtaLocation; tier?: PricingTier }`.
- [x] `CtaLocation` = `'hero' | 'navbar' | 'developer_section' | 'pricing_preview' | 'dark_cta_band' | 'footer'`.
- [x] All new CTAs (pricing × 3, dark CTA × 2) call `trackEvent` with correct `location`.

## Content / Content-ops callouts

### Testimonial placeholders (`isPlaceholder: true`) — **require Marketing content + author consent before launch**
- `src/constants/testimonials.ts#payments-lead` — Camila R., Head of Payments, `banco`.
- `src/constants/testimonials.ts#cto-integration` — Javier M., CTO, `saas`.

### Footer links with placeholder destinations (`href="#"`, rendered `aria-disabled="true"` @ 60% opacity)
- [ ] Footer · Developers · Documentación de API → destination TBD
- [ ] Footer · Developers · SDKs → destination TBD
- [ ] Footer · Developers · Changelog → destination TBD
- [ ] Footer · Developers · Status Page → destination TBD
- [ ] Footer · Compañía · Sobre TIN → destination TBD
- [ ] Footer · Compañía · Prensa → destination TBD
- [ ] Footer · Compañía · Trabaja con nosotros → destination TBD
- [ ] Footer · Legal · Términos de servicio → destination TBD
- [ ] Footer · Legal · Política de privacidad → destination TBD
- [ ] Footer · Legal · Política de cookies → destination TBD
- [ ] Footer · Legal · Aviso legal → destination TBD

### Footer social destinations (render with brand-accurate `aria-label` but `href="#"` until owner supplies URLs)
- [ ] Footer · Socials · LinkedIn → URL TBD
- [ ] Footer · Socials · X (Twitter) → URL TBD
- [ ] Footer · Socials · GitHub → URL TBD

## Notes / deviations

- **Social icons**: `lucide-react@1.8.0` (current project pin) does not expose `Linkedin`, `Twitter`, or `Github` — the brand marks were removed from the Lucide set. We fall back to semantically close neutral glyphs (`Briefcase`, `AtSign`, `Code2`) and preserve the brand name via `aria-label`. If the brand icons are required for visual launch, the cleanest path is a follow-up task to self-host the three SVGs under `src/assets/social/` rather than adding another icon dependency.
- **Code-panel colors**: the feature spec references `#0f1729`, `#1a2a47`, `#284276`, `#dbe5ff` for the spotlight code panel. Per R11.6 (no hardcoded hex in components beyond the two documented tokens), the implementation uses `linear-gradient(160deg, var(--color-primary), var(--color-primary-gradient-stop))` with `var(--color-on-primary)` text. This is tonally consistent with the Dark CTA Band and strictly token-compliant.
- **Navbar desktop breakpoint**: the desktop link row activates at `≥ 960px` (inherited from task_001). The expanded 5-link row (`Ecosistema / Métodos / Pricing / Seguridad / Contacto`) still fits comfortably at 960px — no CSS change required.
- **`buildSignupUrl` signature change**: added an optional `overrides` parameter (`utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, `utmContent`). Callers that pass no arguments (Hero, Pricing, Dark CTA, Navbar) are unaffected; the Footer sandbox link passes the `sandboxUtm` object. Overrides take precedence over URL params from `window.location.search`.
- **Pill atom (R7.4)**: kept inline inside `SecurityCompliance` per the V1 acceptance — the chip shape is not needed elsewhere. Can be promoted to `src/components/ui/Pill.tsx` when a second consumer appears.
- **Node requirement**: Vite 8 requires Node `≥ 20.19`. CI / dev environments running Node 18 will fail at build time (unrelated to the code). Flagging for the CI owner.

## Spec / doc updates (done)
- [x] `sdd/specs/design_system.md` § 2 Typography — monospace-in-code-containers exception (Option A).
- [x] `sdd/specs/product_spec.md` § Landing Page Features — #11–#14 appended.

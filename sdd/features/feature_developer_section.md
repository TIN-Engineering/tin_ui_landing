# Feature: Developer Focus Section

## Description
A technically-oriented section targeting developer and startup users. It highlights TIN's API quality, SDK availability, webhook support, and provides direct access to the Dev Portal and Sandbox environment. It speaks to the developer's primary concerns: integration speed, documentation quality, and the ability to test before committing.

## Motivation
Developers evaluate payment gateways by the quality of their developer experience (DX). A dedicated section signals that TIN treats developers as first-class users, not an afterthought. It converts skeptical technical evaluators by showing — not just telling — that integration is fast, well-documented, and risk-free (sandbox).

## Spec References
- `product_spec.md` → Landing Page Features #4 (Developer Focus), Primary Users (Segment 1 — Developers & Startups)
- `api_spec.md` → Sign Up / Developer Provisioning Flow, GA4 Events (`cta_click`, `signup_redirect`)
- `business_rules.md` → CTA Destination, Pre-fill UTM Parameters, Typography Exclusivity

## Developer Value Props to Highlight

| Feature | Message |
|---|---|
| RESTful API | "Clean, predictable REST API with full OpenAPI spec." |
| SDKs | "Official SDKs for Node.js, Python, PHP, and more." |
| Webhooks | "Real-time event notifications for every payment state change." |
| Sandbox | "Full sandbox environment. Test every scenario without real money." |
| Dev Portal | "Interactive docs, API reference, and code examples in one place." |
| API Keys | "Instant sandbox API keys. No paperwork, no waiting." |

## User Flow
1. Developer user arrives on the page (likely via a developer-targeted ad or organic search).
2. Hero CTA has already been visible; developer may continue scrolling to evaluate before clicking.
3. Developer reaches this section and sees a code snippet preview (syntax-highlighted) and feature callouts.
4. Developer clicks "Get Sandbox Access" or "Start Building" CTA.
5. UTM params are appended to `import.meta.env.VITE_SIGNUP_URL`. User is redirected.
6. `cta_click` GA4 event fires with `location: 'developer_section'`.
7. `signup_redirect` GA4 event fires.

## Visual Design
- **Layout:** Two-column on desktop (feature callouts left, code snippet / terminal mockup right). Single column stacked on mobile.
- **Code Snippet:** A syntax-highlighted code block showing a sample API call (e.g., creating a Payin). Uses a dark terminal-style panel (`surface_container_lowest` + monospace font). Framer Motion typing or reveal animation.
- **Feature Callouts:** Small icon + bold label + 1-line description cards arranged vertically or in a 2-column micro-grid.
- **CTA:** A prominent "Get Sandbox Access" button (primary style) near the bottom of the section.
- **Section background:** `surface_container_lowest` for a dark, focused developer feel (contrasting with the lighter sections around it).

## Sample Code Snippet (for visual representation — not functional)
```javascript
// Create a Payin with TIN API
const tin = new TIN({ apiKey: 'sk_sandbox_...' });

const payment = await tin.payins.create({
  amount: 100000,
  currency: 'COP',
  method: 'PSE',
  customer: { email: 'user@example.com' }
});

// TIN. Your integration, done.
console.log(payment.status); // 'pending'
```

## Business Rules
- "Start Building" / "Get Sandbox Access" CTA reads destination from `import.meta.env.VITE_SIGNUP_URL` (see `business_rules.md` → CTA Destination).
- UTM params are propagated to the sign-up URL (see `business_rules.md` → Pre-fill UTM Parameters).
- No border lines for sectioning within the developer cards (see `business_rules.md` → No Border Lines).

## Edge Cases

| Case | Expected Behavior |
|---|---|
| `VITE_SIGNUP_URL` is not set | CTA renders but logs a console warning. Links to `#` as fallback. |
| Code snippet is too wide for mobile viewport | Snippet container scrolls horizontally. Never wraps or truncates the code. |
| `prefers-reduced-motion` is enabled | Code typing animation is disabled. Full snippet renders statically. |

## Success Criteria
- [ ] All six developer value props are displayed with icon, label, and description.
- [ ] Code snippet is syntax-highlighted and renders correctly on mobile (horizontal scroll).
- [ ] "Get Sandbox Access" CTA navigates to `VITE_SIGNUP_URL` with UTM params.
- [ ] `cta_click` GA4 event fires with `location: 'developer_section'`.
- [ ] Section has `id="developers"`, an `<h2>` heading, and a `<section>` wrapper.
- [ ] Responsive layout adapts correctly at all breakpoints.

## Dependencies
- `VITE_SIGNUP_URL` environment variable.
- `src/lib/analytics.ts` GA4 event helpers.
- `src/styles/_tokens.scss` CSS custom properties.
- A syntax highlighting library (e.g., `react-syntax-highlighter` or Shiki for zero-runtime).
- Six developer feature icons (SVG).

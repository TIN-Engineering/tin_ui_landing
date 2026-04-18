# System Architecture

## Tech Stack

- **Framework:** Vite 8 + React 19 (SPA)
- **Language:** TypeScript 6 (strict mode)
- **Styling:** SCSS (`sass` ^1.99.0) + CSS custom properties for design system tokens. Token values defined in `design_system.md` → Section 9. Vite handles `.scss` files natively — no extra plugin needed beyond the `sass` package.
- **Form Handling:** React Hook Form + Zod (already installed)
- **Font Loading:** `@fontsource/inter` (self-hosted via npm, zero external requests). See `design_system.md` → Typography for the full type scale.
- **Icons:** Lucide React (tree-shakeable SVG icons)
- **Meta Tags / SEO:** `react-helmet-async` + static `public/sitemap.xml` + static `public/robots.txt`
- **Analytics:** Google Analytics 4 loaded via dynamic `<script>` injection in `src/lib/analytics.ts`
- **Infrastructure:** Vercel (hosting, CDN, SSL)
- **DNS:** GoDaddy → CNAME/A record pointing to Vercel
- **CI/CD:** GitHub Actions + Vercel GitHub Integration (automatic preview deployments per PR)
- **Package Manager:** npm

## Actual Project Location

The Vite application lives in a subdirectory:

```
tin-landing/           ← workspace root (contains sdd/)
└── tin-landing/       ← Vite project root (npm project, all source code here)
    ├── src/
    ├── public/
    ├── vite.config.ts
    └── package.json
```

All `npm` commands and source file paths below are relative to `tin-landing/tin-landing/`.

## Services

| Service | Responsibility | Endpoint / Integration |
|---|---|---|
| Vercel Edge Network | Static asset serving, CDN, SSL termination | `paywithtin.com` |
| TIN CRM (internal) | Receives Contact Sales lead submissions | Internal REST API (see `api_spec.md`) |
| TIN Auth/Provisioning API | Receives Sign Up / developer account creation requests | Internal REST API (see `api_spec.md`) |
| Google Analytics 4 | User behavior tracking, conversion events | `gtag.js` loaded async after page interaction |

## Communication

- The landing page is a **client-side SPA**. All HTML is served from a single `index.html` entrypoint — no server-side rendering.
- Form submissions use **client-side `fetch` POST requests** directly to TIN's internal APIs.
- Analytics events are fired client-side via `window.gtag`.
- All external requests (CRM, Auth API) must be made over HTTPS. The CRM/Auth APIs are responsible for CORS headers.

## Project Structure

```
tin-landing/tin-landing/
├── index.html                      # Entry point — meta tags, OG tags, font preload, GA4 script tag
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── og-image.jpg                # Open Graph image (1200×630px)
│   ├── sitemap.xml                 # Static sitemap
│   └── robots.txt                  # Static robots file
│
├── src/
│   ├── main.tsx                    # React root mount
│   ├── App.tsx                     # Root component — renders all sections in order
│   ├── index.scss                  # global SCSS entry — @use styles/main.scss (tokens, reset, typography)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Floating glassmorphic navigation
│   │   │   └── Footer.tsx          # Full footer
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── ProductsEcosystem.tsx
│   │   │   ├── PaymentMethods.tsx
│   │   │   ├── DeveloperFocus.tsx
│   │   │   ├── SecurityCompliance.tsx
│   │   │   └── ContactSales.tsx
│   │   └── ui/                     # Reusable atoms (Button, Card, Input, etc.)
│   │
│   ├── styles/
│   │   ├── _tokens.scss            # All CSS custom properties (colors, spacing, radius, etc.)
│   │   ├── _typography.scss        # Typography mixins (display-lg, headline-md, body-sm, etc.)
│   │   ├── _mixins.scss            # Layout, glassmorphism, shadow reusable mixins
│   │   ├── _reset.scss             # Minimal CSS reset
│   │   └── main.scss               # Entry point — @use all partials
│   │
│   ├── lib/
│   │   ├── analytics.ts            # GA4 event helpers (gtag wrapper)
│   │   └── validations/
│   │       └── contact-sales.ts    # Zod schema for the Contact Sales form
│   │
│   ├── constants/
│   │   └── payment-methods.ts      # Payment method metadata (name, logo path, alt, category)
│   │
│   └── assets/                     # Images and static media imported by components
│
├── vite.config.ts
├── .env.local                      # gitignored — local env overrides
├── .env.example                    # committed — placeholder env vars
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── .env.local                      # gitignored — local env overrides
├── .env.example                    # committed — placeholder env vars
└── package.json
```

## SEO Strategy (SPA Constraints)

Since this is a client-side SPA (not SSR/SSG), all SEO-critical metadata must be **statically present in `index.html`** at the time of crawling. Do not rely on `react-helmet-async` alone — search engine bots may not execute JavaScript.

| Artifact | Location | Method |
|---|---|---|
| `<title>`, `<meta>`, OG tags | `index.html` `<head>` | Hardcoded static HTML |
| Canonical link | `index.html` `<head>` | Hardcoded |
| JSON-LD schema | `index.html` `<body>` | `<script type="application/ld+json">` |
| `sitemap.xml` | `public/sitemap.xml` | Static file, manually maintained |
| `robots.txt` | `public/robots.txt` | Static file |
| Dynamic title updates | `react-helmet-async` | For future multi-page / tab title needs |

## Deployment

- **Platform:** Vercel
- **Build command:** `npm run build` (runs `tsc -b && vite build`)
- **Output directory:** `dist/`
- **Root directory in Vercel:** `tin-landing/tin-landing` (the Vite project subdirectory)
- **Deployment strategy:** Every push to `main` → production. Every PR → isolated preview URL.
- **SSL:** Auto-provisioned by Vercel via Let's Encrypt. HTTP → HTTPS redirect enforced.
- **www redirect:** Vercel redirects `www.paywithtin.com` → `paywithtin.com` (301).

## Environments

| Environment | Purpose | URL |
|---|---|---|
| Development | Local dev with HMR | `http://localhost:5173` |
| Preview | Per-PR automated preview | `https://tin-landing-<hash>.vercel.app` |
| Production | Live public site | `https://paywithtin.com` |

## DNS Configuration (GoDaddy)

| Record Type | Host | Value | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` (Vercel IP) | 600s |
| `CNAME` | `www` | `cname.vercel-dns.com` | 600s |

> After DNS propagation, configure both `paywithtin.com` and `www.paywithtin.com` in the Vercel project domains settings. Set `paywithtin.com` as primary.

## Environment Variables

Stored in `tin-landing/tin-landing/.env.local` (gitignored). A `.env.example` file must be committed with placeholder values.

| Variable | Description |
|---|---|
| `VITE_CRM_API_URL` | Base URL for the CRM Lead API |
| `VITE_CRM_API_KEY` | API key for CRM (see security note in `api_spec.md`) |
| `VITE_SIGNUP_URL` | Redirect URL for the Sign Up / Start Building CTA |
| `VITE_GA4_MEASUREMENT_ID` | Google Analytics 4 Measurement ID (e.g., `G-XXXXXXXXXX`) |

> All client-exposed env vars must be prefixed `VITE_`. Access exclusively via `import.meta.env.VITE_*`. Never use `process.env` in Vite projects.

## Design System Reference

The visual implementation of this project is governed by the **TIN Sovereign Design System** documented in `sdd/specs/design_system.md`. It defines:

- **Color tokens** with exact hex values (Section 1)
- **Typography scale** with sizes, weights, and letter spacing (Section 2)
- **Elevation and shadow specifications** (Section 3)
- **Corner radius scale** (Section 4)
- **Spacing scale** (Section 5)
- **Component specifications** for buttons, cards, inputs, nav, and the TIN Pulse (Section 6)
- **Motion/animation standards** and reduced-motion rules (Section 7)
- **The complete SCSS token map** (CSS custom properties) ready for implementation (Section 9)

All implementation decisions that touch visual styling must trace back to `design_system.md`. The coding agent must read it before writing any CSS or Tailwind classes.

## Security

- **HTTPS:** Enforced globally via Vercel SSL.
- **No secrets in the browser bundle:** API keys in `VITE_*` env vars are visible in the browser bundle. For the CRM API key, confirm with the backend team whether the CRM supports CORS from `paywithtin.com` and allows a public key, or a Vercel Edge Function proxy must be added.
- **Form inputs:** Sanitized client-side with Zod before submission. Server-side validation is the responsibility of the CRM / Auth APIs.
- **Content Security Policy (CSP):** Configured via `vercel.json` response headers.

## Performance Budget

| Metric | Target | Measurement |
|---|---|---|
| Lighthouse Performance | ≥ 90 | Mobile + Desktop |
| First Contentful Paint (FCP) | ≤ 1.5s | 4G mobile |
| Largest Contentful Paint (LCP) | ≤ 2.5s | 4G mobile |
| Cumulative Layout Shift (CLS) | ≤ 0.1 | All viewports |
| Total Blocking Time (TBT) | ≤ 200ms | Desktop |
| Total JS bundle (initial load) | ≤ 200KB gzipped | `vite build` output |

## Monitoring

- **Core Web Vitals:** Vercel Analytics (real user monitoring)
- **Uptime:** Vercel native deployment alerts
- **Conversion tracking:** GA4 custom events (see `api_spec.md` → GA4 Analytics Events)

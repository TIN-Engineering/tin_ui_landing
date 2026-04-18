# Feature: SEO Foundation & Metadata

## Description
The technical SEO infrastructure of the landing page: static metadata in `index.html`, Open Graph tags, JSON-LD structured data, a static `sitemap.xml`, and a static `robots.txt`. Because this is a Vite SPA, all SEO-critical content must be **statically present in `index.html`** at build time — search engine crawlers cannot be relied upon to execute JavaScript.

## Motivation
A high-performing landing page that cannot be found or correctly shared is a wasted investment. This feature ensures `paywithtin.com` ranks for TIN-relevant searches, previews correctly when shared on LinkedIn/Slack/WhatsApp, and is fully discoverable by crawlers within days of launch.

## Spec References
- `product_spec.md` → Success Criteria (Google indexing within 7 days), Technical Requirements (SEO)
- `architecture_spec.md` → SEO Strategy (SPA Constraints), Performance Budget (Lighthouse SEO ≥ 90), Project Structure
- `business_rules.md` → Single H1 Per Page, Open Graph Tags, Canonical URLs, Image Optimization

## Scope

### 1. `index.html` Head — Static Metadata

All tags below are hardcoded directly into `tin-landing/tin-landing/index.html`. They must be present in the raw HTML served by the CDN, not injected by JavaScript.

```html
<!-- Primary Meta -->
<title>TIN — Infraestructura de pagos para Latinoamérica</title>
<meta name="description" content="TIN es la plataforma de pagos que conecta tu negocio con toda Latinoamérica. Payins, Payouts, Recurrencia, Antifraude y Conciliación. TIN." />
<link rel="canonical" href="https://paywithtin.com" />
<html lang="es">

<!-- Open Graph -->
<meta property="og:title" content="TIN — Infraestructura de pagos para Latinoamérica" />
<meta property="og:description" content="TIN es la plataforma de pagos que conecta tu negocio con toda Latinoamérica." />
<meta property="og:image" content="https://paywithtin.com/og-image.jpg" />
<meta property="og:url" content="https://paywithtin.com" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="TIN" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="TIN — Infraestructura de pagos para Latinoamérica" />
<meta name="twitter:description" content="TIN es la plataforma de pagos que conecta tu negocio con toda Latinoamérica." />
<meta name="twitter:image" content="https://paywithtin.com/og-image.jpg" />

<!-- Font preconnect (if loading from Google Fonts as fallback) -->
<!-- Preferred: use @fontsource/inter — no external request needed -->

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

### 2. JSON-LD Structured Data

Placed as a `<script>` tag inside `<body>` in `index.html` (not injected by React):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TIN",
  "url": "https://paywithtin.com",
  "logo": "https://paywithtin.com/logo.png",
  "description": "Infraestructura de pagos para Latinoamérica",
  "sameAs": []
}
</script>
```

### 3. Semantic HTML Structure in React Components

Every section component must use the correct semantic wrapper:

| Section | HTML Element | Required attributes |
|---|---|---|
| Root page wrapper | `<main>` | — |
| Each content section | `<section>` | `id="<section-id>"` + `aria-labelledby="<heading-id>"` |
| Hero heading | `<h1>` | Exactly one per page |
| Section headings | `<h2>` | One per section, `id` matching `aria-labelledby` |
| Sub-headings | `<h3>` | As needed — never skip levels |
| Navigation | `<nav>` | `aria-label="Main navigation"` |
| Footer | `<footer>` | — |

Agreed section IDs: `hero`, `products`, `payment-methods`, `developers`, `security`, `contact-sales`.

### 4. `public/sitemap.xml` — Static File

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://paywithtin.com/</loc>
    <lastmod>2026-04-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Update `<lastmod>` on each significant content change.

### 5. `public/robots.txt` — Static File

```
User-agent: *
Allow: /

Sitemap: https://paywithtin.com/sitemap.xml
```

### 6. GA4 Script — Loaded in `index.html`

The GA4 snippet is placed in `<head>` with `async` to avoid render-blocking:

```html
<!-- Google Analytics 4 — loaded async, non-render-blocking -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with the value of `VITE_GA4_MEASUREMENT_ID` at deploy time via `vite-plugin-html` or a build-time substitution.

## API
No API calls. All artifacts are static files or hardcoded HTML.

## Business Rules
- Exactly one `<h1>` per page (see `business_rules.md` → Single H1 Per Page).
- OG image must be 1200×630px static asset at `public/og-image.jpg` (see `business_rules.md` → Open Graph Tags).
- Canonical must point to `https://paywithtin.com` without `www` (see `business_rules.md` → Canonical URLs).
- All images use explicit `width`, `height`, and `alt` attributes (see `business_rules.md` → Image Optimization).

## Edge Cases

| Case | Expected Behavior |
|---|---|
| `og-image.jpg` asset is missing | The deploy pipeline must validate its presence. Missing OG image is a launch blocker. |
| GA4 measurement ID not substituted | Tracking silently fails. Build pipeline must validate `VITE_GA4_MEASUREMENT_ID` is set before production deploy. |
| `www.paywithtin.com` canonical | Canonical tag and Vercel redirect both enforce root domain. No `www` variant should be indexed. |
| Content is updated | `sitemap.xml` `<lastmod>` must be manually updated (or automated as a build step in V2). |

## Success Criteria
- [ ] `<title>` tag is present and matches spec in raw `index.html` served by Vercel.
- [ ] `<meta name="description">` is present and is between 150-160 characters.
- [ ] All OG tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`) are present in raw HTML.
- [ ] `twitter:card` and related tags are present.
- [ ] `<link rel="canonical">` points to `https://paywithtin.com` in raw HTML.
- [ ] `sitemap.xml` is accessible at `https://paywithtin.com/sitemap.xml`.
- [ ] `robots.txt` is accessible at `https://paywithtin.com/robots.txt` and allows all crawlers.
- [ ] JSON-LD `Organization` schema is present in raw page source (not injected by JS).
- [ ] Lighthouse SEO score ≥ 90 on both mobile and desktop.
- [ ] All `<section>` components have `id` attributes and `aria-labelledby` pointing to their `<h2>`.
- [ ] Page source contains exactly one `<h1>` tag.
- [ ] Google Search Console confirms indexing within 7 days of launch.

## Dependencies
- `og-image.jpg` (1200×630px) — must be provided by design team, placed in `public/`.
- `logo.png` — TIN logo for JSON-LD, placed in `public/`.
- `VITE_GA4_MEASUREMENT_ID` environment variable — must be defined before production deploy.
- All section IDs finalized and agreed upon (see Semantic HTML Structure table above).

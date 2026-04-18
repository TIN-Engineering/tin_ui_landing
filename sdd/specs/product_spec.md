# Product Specification

## Product Name
TIN Platform — Marketing Landing Page (`paywithtin.com`)

## Description
The TIN Platform Marketing Landing Page is the public-facing acquisition website for TIN's payment gateway infrastructure. It serves as the primary entry point for three distinct visitor segments: enterprise finance leaders seeking ledger/reconciliation/tax tools (Sales-Led Growth), developers seeking instant API access and sandbox environments (Product-Led Growth), and founders/CEOs evaluating conversion rates, security, and LatAm coverage (Sales-Led Growth).

The site communicates TIN's value proposition through high-impact editorial design, precision copywriting rooted in the Colombian colloquial use of "TIN" (meaning speed and immediacy), and structured information architecture that routes each visitor segment toward the appropriate conversion action.

## Primary Users

### Segment 1 — Developers & Startups (Product-Led Growth)
- **Who:** Software engineers, technical co-founders, integration architects at startups and scale-ups.
- **Goal:** Assess TIN's technical quality. Access API documentation, SDK availability, webhook support, and a Sandbox environment to start integrating immediately.
- **Key interests:** RESTful API, webhooks, instant sandbox API keys, SDKs.
- **Conversion action:** Click "Sign Up" / "Start Building" to create a developer account.

### Segment 2 — Finance Managers (Sales-Led Growth)
- **Who:** CFOs, Heads of Finance, Controllers, Treasury Managers at mid-to-large companies processing payments in Latin America.
- **Goal:** Evaluate TIN's ledger accuracy, reconciliation automation, tax management capabilities, and fee transparency.
- **Key interests:** Ledger & Conciliation, Fees & Tax Management, Recurrence, clear reporting.
- **Conversion action:** Submit a "Contact Sales" form to initiate a sales conversation.

### Segment 3 — Founders & CEOs (Sales-Led Growth)
- **Who:** CEOs, founders, and executive decision-makers at companies evaluating payment infrastructure for LatAm expansion.
- **Goal:** Evaluate conversion rates, security posture, fraud prevention, and geographic/payment-method coverage across Latin America.
- **Key interests:** Payins conversion, Soft Precision (fraud), Tokenization, payment method breadth, PCI-DSS compliance.
- **Conversion action:** Submit a "Contact Sales" form or request a demo.

## Core Products (The TIN Ecosystem)

The landing page must showcase all seven TIN engines:

| # | Engine | Value Proposition |
|---|---|---|
| 1 | **Payins** | High-conversion payment processing across local and global methods. |
| 2 | **Payouts** | Fast, automated mass disbursements to third-party bank accounts and wallets. |
| 3 | **Recurrence (Subscriptions)** | Automated recurring billing, dunning management, and plan creation. |
| 4 | **Soft Precision (Fraud & Routing)** | Intelligent routing engine and AI-driven fraud scoring and prevention. |
| 5 | **Fees & Tax Management** | Granular control over transaction costs, local taxes, and merchant fee structures. |
| 6 | **Tokenization** | PCI-compliant secure vault for card-on-file and one-click transactions. |
| 7 | **Ledger & Conciliation** | Immutable balance tracking, automated settlement reconciliation, and financial reporting. |

## Supported Payment Methods

| Category | Methods |
|---|---|
| **LatAm APMs** | Pix (Brazil), PSE (Colombia), SPEI (Mexico), OXXO (Mexico), Efecty (Colombia), PagoEfectivo (Peru) |
| **Credit & Debit Cards** | Visa, Mastercard, American Express |
| **Digital Wallets** | Apple Pay, Google Pay |

## Landing Page Features

1. **Hero Section** — High-impact headline with dual CTAs ("Start Building / Sign Up" and "Contact Sales"), communicating TIN's speed and capability at a glance. Headlines incorporate the TIN colloquialism.
2. **Products Ecosystem Showcase** — Visual breakdown of all seven TIN engines with individual cards/panels.
3. **Payment Methods Showcase** — Visual grid displaying all supported local and global payment methods organized by category.
4. **Developer Focus Section** — Highlights API quality, SDK availability, webhook support, and provides a direct link to the Dev Portal and Sandbox.
5. **Security & Compliance Section** — Establishes trust through PCI-DSS Level 1, Tokenization, end-to-end encryption, and Soft Precision (fraud prevention) callouts.
6. **Contact Sales Form** — Multi-field lead capture form integrated with the internal CRM. Targets Finance Managers and Founders/CEOs.
7. **Sign Up CTA** — Prominent CTA integrated with the Auth/Provisioning API. Targets developers.
8. **Navigation (Floating)** — Glassmorphic floating nav bar with links to all key sections and dual CTAs. Sticky on scroll.
9. **Footer** — Full navigation links, legal pages (Privacy, Terms), compliance badges, and social media links.
10. **SEO Foundation** — Semantic HTML5, meta tags, Open Graph tags, `sitemap.xml`, `robots.txt`, and JSON-LD schema markup.

## Acceptance Criteria

- Given a visitor arrives at the homepage, When they scroll, Then they must see distinct sections for all seven engines (Payins, Payouts, Recurrence, Soft Precision, Fees & Tax, Tokenization, Ledger & Conciliation).
- Given the user wants to see coverage, When they reach the Payment Methods section, Then a comprehensive grid of all supported methods (Cards, APMs, Wallets) must be displayed.
- Given the TIN Sovereign Design System, When the site is rendered, Then it must strictly follow the "No-Line" rule, use Inter typography, and apply correct Tonal Stacking.
- Given the site is accessed from a mobile phone, When rendering, Then the layout must be 100% responsive without breaking the "Editorial Architect" aesthetic.
- Google Lighthouse scores of **90+** across Performance, Accessibility, Best Practices, and SEO on both mobile and desktop.
- Site loads with a First Contentful Paint (FCP) under **1.5 seconds** on a mid-range mobile connection (4G).
- Both conversion funnels (Sign Up and Contact Sales) are functional end-to-end, with form submissions reaching their respective systems (CRM / Auth API).
- The site renders correctly across **mobile (320px+), tablet (768px+), and desktop (1280px+)** viewports.
- HTTPS is enforced globally. All traffic to `www.paywithtin.com` redirects to `paywithtin.com`.
- Headlines and benefit descriptions MUST incorporate the TIN colloquialism to emphasize speed and ease.

## Design System Constraints

The entire frontend implementation MUST strictly adhere to the **TIN Sovereign Design System** (documented in `design_system.md`):

- **Typography:** `Inter` font family exclusively. High-contrast headings (`on_primary_fixed`), uppercase labels with +5% letter spacing.
- **No-Line Rule:** Zero use of 1px solid borders for sectioning. Tonal Stacking via `surface_container_low` / `surface_container_lowest`.
- **Glassmorphism:** Floating elements at 80% opacity + 20px backdrop blur.
- **Ambient Shadows:** Tinted `rgba(25, 28, 30, X)` only. Never pure black.
- **Styling:** SCSS modules (`.module.scss`) with CSS custom properties from `src/styles/_tokens.scss`.
- **Brand Voice:** Copy must incorporate the Colombian colloquial "TIN" interjection. Tone is confident, modern, and technically precise.

## Out of Scope

- User dashboard, account management, or any authenticated app screens.
- Payment processing logic, API gateway, or backend transaction handling.
- A blog, help center, or documentation site — the Developer section links to an external Dev Portal.
- Multi-language / i18n support in V1 (Spanish-first content, English to follow).
- A headless CMS integration in V1 — all content is hardcoded with a clear content layer for future CMS migration.
- Native mobile apps (iOS/Android).

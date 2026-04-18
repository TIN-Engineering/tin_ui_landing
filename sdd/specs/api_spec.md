# API Specification

> This document defines the external API integrations consumed by the TIN Landing Page. The landing page does **not** expose its own API — it acts as a client to two internal TIN systems: the **CRM Lead API** and the **Auth/Provisioning API**.
>
> **Note:** Actual base URLs, authentication keys, and full request/response schemas for these internal APIs must be confirmed with the TIN backend team. This spec defines the **expected contract** that the landing page will code against.

---

## 1. CRM Lead Submission API

**Purpose:** Receives "Contact Sales" form submissions and creates a lead record in TIN's internal CRM.

**Base URL:** Configured via environment variable `VITE_CRM_API_URL`

**Authentication:** API Key via `Authorization: Bearer <token>` header. Token configured via environment variable `VITE_CRM_API_KEY` (exposed in the browser bundle in V1).

> **Security note:** All `VITE_` prefixed env vars are embedded in the client bundle at build time and visible in the browser. To avoid exposing a sensitive API key, the preferred V2 approach is to add a Vercel Edge Function or serverless proxy. In V1, confirm with the backend team whether the CRM API supports CORS from `paywithtin.com` and accepts a public/scoped key with write-only lead creation permissions.

---

### POST /leads

**Description:** Creates a new sales lead from a Contact Sales form submission.

**Auth required:** Yes (API Key)

**Request Headers:**
| Header | Value |
|---|---|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer <VITE_CRM_API_KEY>` |

**Request Body:**
| Field | Type | Required | Description |
|---|---|---|---|
| `full_name` | `string` | Yes | Submitter's full name |
| `company_name` | `string` | Yes | Company or organization name |
| `business_email` | `string (email)` | Yes | Validated business email (non-consumer domains) |
| `phone` | `string` | No | International format preferred (e.g., `+57 300 000 0000`) |
| `country` | `string` | Yes | ISO 3166-1 alpha-2 country code (e.g., `CO`, `MX`, `BR`) |
| `monthly_volume` | `string (enum)` | Yes | One of: `"<10k"`, `"10k-100k"`, `"100k-1M"`, `">1M"` (USD) |
| `message` | `string` | No | Optional free-text message from the prospect |
| `source` | `string` | No | UTM source or referrer (e.g., `"google"`, `"direct"`) |
| `utm_campaign` | `string` | No | UTM campaign identifier |
| `utm_medium` | `string` | No | UTM medium identifier |

**Example Request Body:**
```json
{
  "full_name": "Valentina Rojas",
  "company_name": "Fintech Latam SAS",
  "business_email": "valentina@fintechlatam.co",
  "phone": "+57 312 000 0000",
  "country": "CO",
  "monthly_volume": "100k-1M",
  "message": "We need a PSE integration for our checkout flow.",
  "source": "google",
  "utm_campaign": "latam_enterprise_q1"
}
```

**Response (success) — 201 Created:**
```json
{
  "id": "lead_abc123xyz",
  "status": "created",
  "message": "Lead successfully registered."
}
```

**Response (error):**

| Status | Condition |
|---|---|
| 400 | Missing required fields or validation failure (e.g., invalid email format) |
| 401 | Missing or invalid API key |
| 409 | A lead with this business email already exists |
| 422 | Unprocessable entity (e.g., unsupported `country` value) |
| 429 | Rate limit exceeded |
| 500 | Internal server error on CRM side |

**Frontend behavior on error:**
- **400 / 422:** Display inline validation error near the relevant field.
- **409:** Display: "It looks like you've already reached out. Our sales team will be in touch soon."
- **401 / 500:** Display error toast: "Something went wrong on our end. Please try again later."
- **429:** Display: "Too many requests. Please wait a moment before trying again."

---

## 2. Auth / Developer Provisioning Flow

**Purpose:** Handles the "Start Building / Sign Up" CTA. The landing page does **not** directly call a sign-up API — it redirects the user to TIN's Auth/Provisioning application hosted at a separate URL.

**Redirect URL:** Configured via environment variable `VITE_SIGNUP_URL`

**Flow:**
1. User clicks "Start Building" or "Sign Up" CTA anywhere on the page.
2. The landing page appends current UTM parameters to `import.meta.env.VITE_SIGNUP_URL`.
3. User is navigated to the resulting URL (same tab).
4. The Auth/Provisioning application handles registration, email verification, and sandbox provisioning independently.

**No direct API call is made from the landing page for sign-up in V1.**

> If TIN requires a pre-registration step (e.g., capturing an email before redirect), this section will be updated to define a `POST /waitlist` or `POST /pre-register` endpoint.

---

## 3. Environment Variable Reference

All API-related configuration is managed via Vite environment variables (prefixed `VITE_`). Access via `import.meta.env.VITE_*`. Never hardcode values.

| Variable | Description |
|---|---|
| `VITE_CRM_API_URL` | Base URL for the CRM Lead API |
| `VITE_CRM_API_KEY` | API key for CRM (see security note above) |
| `VITE_SIGNUP_URL` | Redirect URL for the Sign Up / Start Building CTA |
| `VITE_GA4_MEASUREMENT_ID` | Google Analytics 4 Measurement ID (e.g., `G-XXXXXXXXXX`) |

**Local development:** All variables must be defined in `tin-landing/tin-landing/.env.local` (gitignored). A `.env.example` file must be committed with placeholder values.

---

## 4. GA4 Analytics Events

The landing page fires custom GA4 events to track conversion funnel performance. These are not HTTP API calls but are documented here as contracts for the analytics implementation in `src/lib/analytics.ts`.

| Event Name | Trigger | Parameters |
|---|---|---|
| `cta_click` | Any CTA button clicked | `{ cta_id: string, location: 'hero' \| 'navbar' \| 'developer_section' \| 'footer' }` |
| `form_view` | Contact Sales form scrolled into view | `{ form_type: 'contact_sales' }` |
| `form_start` | User interacts with the first form field | `{ form_type: 'contact_sales' }` |
| `form_submit_attempt` | User clicks the Submit button | `{ form_type: 'contact_sales' }` |
| `form_submit_success` | CRM API returns 2xx | `{ form_type: 'contact_sales' }` |
| `form_submit_error` | CRM API returns 4xx/5xx or network error | `{ form_type: 'contact_sales', error_code: string }` |
| `signup_redirect` | User is redirected to `VITE_SIGNUP_URL` | `{ source: string, utm_campaign?: string }` |

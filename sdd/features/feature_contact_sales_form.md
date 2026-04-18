# Feature: Contact Sales Form

## Description
A structured lead capture form targeting Finance Managers and Founders/CEOs. Collects key qualification data, submits it to TIN's internal CRM via API, and provides clear feedback on success or failure. This is the primary conversion point for the Sales-Led Growth funnel.

## Motivation
Enterprise buyers will not click a generic "Sign Up" link. They need a human touchpoint. This form initiates the sales conversation by capturing enough context to allow TIN's sales team to prioritize and personalize their outreach. The form quality (field selection, validation, UX) directly impacts sales pipeline quality.

## Spec References
- `product_spec.md` → Landing Page Features #6 (Contact Sales Form), Primary Users (Segment 2 — Finance Managers, Segment 3 — Founders/CEOs)
- `api_spec.md` → CRM Lead Submission API (`POST /leads`), GA4 Events
- `business_rules.md` → Contact Sales Form section (all rules), Keyboard Navigation, ARIA Roles, Color Contrast

## User Flow
1. Enterprise user scrolls to or is smooth-scrolled to the `#contact-sales` section.
2. User sees the form with a supporting headline and trust signals (e.g., "Our team responds in < 24 hours").
3. User fills in: Full Name, Company Name, Business Email, Country (dropdown), Monthly Transaction Volume (dropdown), and optionally Phone and Message.
4. User clicks "Talk to Sales" (submit button).
5. **On valid submission:**
   a. Button disables and shows loading spinner.
   b. `form_submit_attempt` GA4 event fires.
   c. `POST /leads` is called to the CRM API with form data + UTM params.
   d. On 201 response: form is replaced by a success state panel. `form_submit_success` GA4 event fires.
6. **On validation error (client-side):**
   a. Inline error messages appear below invalid fields.
   b. Form is not submitted. Focus moves to first invalid field.
7. **On API error (server-side):**
   a. Button re-enables.
   b. Error toast appears with the appropriate message from `business_rules.md`.
   c. `form_submit_error` GA4 event fires with the error code.

## API

### POST /leads
See full contract in `api_spec.md` → CRM Lead Submission API.

**Request:**
| Field | Type | Required |
|---|---|---|
| `full_name` | `string` | Yes |
| `company_name` | `string` | Yes |
| `business_email` | `string (email)` | Yes |
| `phone` | `string` | No |
| `country` | `string (ISO 3166-1 alpha-2)` | Yes |
| `monthly_volume` | `string (enum)` | Yes |
| `message` | `string` | No |
| `source` | `string` | No |
| `utm_campaign` | `string` | No |
| `utm_medium` | `string` | No |

**Response:**
- `201 Created` → Display success state.
- `4xx / 5xx` → Display contextual error (see `business_rules.md`).

## Business Rules
- Required fields: Full Name, Company Name, Business Email, Country, Monthly Volume (see `business_rules.md` → Required Fields).
- Business email validation: reject free consumer domains (see `business_rules.md` → Business Email Validation).
- Submit button disables on click and re-enables on API error (see `business_rules.md` → Duplicate Submission Prevention).
- Success state replaces form in-place, never redirects (see `business_rules.md` → Successful Form Submission).
- Country field must be a dropdown with a specific list (see `business_rules.md` → Country Dropdown).

## Validation Schema (Zod)

```typescript
// lib/validations/contact-sales.ts
const BLOCKED_EMAIL_DOMAINS = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'icloud.com'];

export const ContactSalesSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  company_name: z.string().min(1, 'Company name is required'),
  business_email: z
    .string()
    .email('Please enter a valid email')
    .refine((email) => {
      const domain = email.split('@')[1];
      return !BLOCKED_EMAIL_DOMAINS.includes(domain);
    }, 'Please use your business email'),
  phone: z.string().optional(),
  country: z.enum(['CO', 'MX', 'BR', 'PE', 'CL', 'AR', 'US', 'OTHER']),
  monthly_volume: z.enum(['<10k', '10k-100k', '100k-1M', '>1M']),
  message: z.string().max(500).optional(),
});
```

## Edge Cases

| Case | Expected Behavior |
|---|---|
| User submits with `gmail.com` email | Inline error: "Please use your business email." Form not submitted. |
| CRM API returns 409 (duplicate lead) | Display: "It looks like you've already reached out. Our sales team will be in touch soon." Treat as a soft success (no form reset needed). |
| CRM API is unreachable (network timeout after 10s) | Re-enable button. Toast: "Something went wrong. Please try again." `form_submit_error` fires with `error_code: 'network_timeout'`. |
| User navigates away mid-fill | No data persistence in V1. Form resets on re-render. |
| User is on a mobile device | Form stacks in a single column. All touch targets ≥ 44×44px. |
| UTM parameters are not in the page URL | `source`, `utm_campaign`, `utm_medium` are omitted from the request payload. |
| JavaScript is disabled | Form is not functional in V1 (acceptable — target audience requires JS for any payment integration evaluation). |

## Success Criteria
- [ ] All required fields display inline validation errors when submitted empty.
- [ ] Consumer email domains are rejected with the correct error message.
- [ ] Submit button enters loading state on click and cannot be double-submitted.
- [ ] On `201` response, the success panel renders in-place with a thank-you message.
- [ ] On `409` response, the "already reached out" message displays.
- [ ] On network error, the error toast displays and the button re-enables.
- [ ] All GA4 events (`form_view`, `form_start`, `form_submit_attempt`, `form_submit_success`, `form_submit_error`) fire at the correct moments.
- [ ] UTM parameters from the page URL are included in the CRM payload.
- [ ] Country dropdown contains all required options.
- [ ] Form is fully keyboard-navigable with visible focus rings.
- [ ] Form meets WCAG AA color contrast ratios.

## Dependencies
- `api_spec.md` → CRM API contract must be finalized with TIN backend team.
- `VITE_CRM_API_URL` and `VITE_CRM_API_KEY` environment variables must be defined.
- `src/lib/validations/contact-sales.ts` Zod schema.
- `src/lib/analytics.ts` GA4 event helpers.
- `src/styles/_tokens.scss` (input states: default, focus, error, disabled tokens from `design_system.md` → Input Field spec).

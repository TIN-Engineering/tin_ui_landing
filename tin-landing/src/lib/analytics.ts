/**
 * Typed GA4 event wrapper.
 * V1: no-op stub. Full gtag wiring lands in the SEO/analytics task.
 * Interface kept stable so CTAs can call `trackEvent(...)` today.
 */

export type CtaLocation =
  | 'hero'
  | 'navbar'
  | 'developer_section'
  | 'footer'

export type AnalyticsEvent =
  | { name: 'cta_click'; params: { cta_id: string; location: CtaLocation } }
  | { name: 'form_view'; params: { form_type: 'contact_sales' } }
  | { name: 'form_start'; params: { form_type: 'contact_sales' } }
  | { name: 'form_submit_attempt'; params: { form_type: 'contact_sales' } }
  | { name: 'form_submit_success'; params: { form_type: 'contact_sales' } }
  | { name: 'form_submit_error'; params: { form_type: 'contact_sales'; error_code: string } }
  | { name: 'signup_redirect'; params: { source: string; utm_campaign?: string } }

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: Record<string, unknown>) => void
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', event.name, event.params)
  }
}

/**
 * Build a sign-up URL with current UTM parameters forwarded.
 * Returns null (and warns) if VITE_SIGNUP_URL is unset.
 */
export function buildSignupUrl(): string | null {
  const base = import.meta.env.VITE_SIGNUP_URL
  if (!base) {
    console.warn('[TIN] VITE_SIGNUP_URL is not set; sign-up CTA will no-op.')
    return null
  }

  try {
    const destination = new URL(base)
    const current = new URLSearchParams(window.location.search)
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    for (const key of utmKeys) {
      const value = current.get(key)
      if (value) destination.searchParams.set(key, value)
    }
    return destination.toString()
  } catch {
    console.warn('[TIN] VITE_SIGNUP_URL is not a valid URL.')
    return null
  }
}

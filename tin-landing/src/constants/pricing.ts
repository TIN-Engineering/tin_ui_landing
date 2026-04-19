import type { PricingTier } from '../lib/analytics'

export type PricingSurface = 'light' | 'dark'
export type PricingCtaKind = 'signup' | 'contact-sales'

export interface PricingTierEntry {
  id: PricingTier
  name: string
  tagline: string
  surface: PricingSurface
  ctaLabel: string
  ctaKind: PricingCtaKind
  ctaVariant: 'primary' | 'ghost'
}

export const pricingTiers: PricingTierEntry[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Para equipos que empiezan. Activas sandbox y sales. Tin.',
    surface: 'light',
    ctaLabel: 'Start Building',
    ctaKind: 'signup',
    ctaVariant: 'ghost',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Para escalar volumen sin fricción operativa.',
    surface: 'light',
    ctaLabel: 'Hablar con ventas',
    ctaKind: 'contact-sales',
    ctaVariant: 'ghost',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Arquitectura y soporte dedicado. Integración en un Tin.',
    surface: 'dark',
    ctaLabel: 'Hablar con ventas',
    ctaKind: 'contact-sales',
    ctaVariant: 'primary',
  },
]

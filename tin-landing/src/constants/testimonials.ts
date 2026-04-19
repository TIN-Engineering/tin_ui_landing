export type CompanyType = 'banco' | 'ecommerce' | 'saas' | 'retail' | 'other'

export interface Testimonial {
  id: string
  quote: string
  authorInitial: string
  role: string
  companyType: CompanyType
  isPlaceholder: boolean
}

export const companyTypeLabels: Record<CompanyType, string> = {
  banco: 'Banco',
  ecommerce: 'E-commerce',
  saas: 'SaaS',
  retail: 'Retail',
  other: 'Otros',
}

export const testimonials: Testimonial[] = [
  {
    id: 'payments-lead',
    quote:
      'Pasamos de integración lenta a cobros operando en días. Tin, y listo.',
    authorInitial: 'Camila R.',
    role: 'Head of Payments',
    companyType: 'banco',
    isPlaceholder: true,
  },
  {
    id: 'cto-integration',
    quote:
      'Redujimos fricción operativa y mejoramos conversión desde la primera semana.',
    authorInitial: 'Javier M.',
    role: 'CTO',
    companyType: 'saas',
    isPlaceholder: true,
  },
]

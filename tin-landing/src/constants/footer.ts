export type FooterLinkKind =
  | 'anchor'       // in-page smooth scroll to an #id
  | 'external'     // external URL, opens in new tab
  | 'sandbox'      // external, resolved via buildSignupUrl() with sandbox UTMs
  | 'placeholder'  // destination TBD; renders aria-disabled

export interface FooterLink {
  id: string
  label: string
  kind: FooterLinkKind
  href?: string
}

export interface FooterColumn {
  id: string
  heading: string
  links: FooterLink[]
}

export const footerColumns: FooterColumn[] = [
  {
    id: 'producto',
    heading: 'Producto',
    links: [
      { id: 'payins', label: 'Payins', kind: 'anchor', href: '#products' },
      { id: 'payouts', label: 'Payouts', kind: 'anchor', href: '#products' },
      { id: 'suscripciones', label: 'Suscripciones', kind: 'anchor', href: '#products' },
      {
        id: 'antifraude',
        label: 'Antifraude (Soft Precision)',
        kind: 'anchor',
        href: '#products',
      },
      { id: 'tokenizacion', label: 'Tokenización', kind: 'anchor', href: '#products' },
      {
        id: 'ledger',
        label: 'Ledger & Conciliación',
        kind: 'anchor',
        href: '#products',
      },
    ],
  },
  {
    id: 'developers',
    heading: 'Developers',
    links: [
      { id: 'docs', label: 'Documentación de API', kind: 'placeholder' },
      { id: 'sdks', label: 'SDKs', kind: 'placeholder' },
      { id: 'sandbox', label: 'Sandbox', kind: 'sandbox' },
      { id: 'changelog', label: 'Changelog', kind: 'placeholder' },
      { id: 'status', label: 'Status Page', kind: 'placeholder' },
    ],
  },
  {
    id: 'compania',
    heading: 'Compañía',
    links: [
      { id: 'about', label: 'Sobre TIN', kind: 'placeholder' },
      {
        id: 'contact',
        label: 'Contacto',
        kind: 'anchor',
        href: '#contact-sales',
      },
      { id: 'press', label: 'Prensa', kind: 'placeholder' },
      { id: 'careers', label: 'Trabaja con nosotros', kind: 'placeholder' },
    ],
  },
  {
    id: 'legal',
    heading: 'Legal',
    links: [
      { id: 'terms', label: 'Términos de servicio', kind: 'placeholder' },
      { id: 'privacy', label: 'Política de privacidad', kind: 'placeholder' },
      { id: 'cookies', label: 'Política de cookies', kind: 'placeholder' },
      { id: 'legal-notice', label: 'Aviso legal', kind: 'placeholder' },
    ],
  },
]

export interface FooterSocial {
  id: 'linkedin' | 'x' | 'github'
  label: string
  href: string
}

export const footerSocials: FooterSocial[] = [
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
  { id: 'x', label: 'X (Twitter)', href: '#' },
  { id: 'github', label: 'GitHub', href: '#' },
]

export const footerBrandTagline =
  'Infraestructura de pagos para Latinoamérica. Integra rápido, cobra sin fricción. Tin.'

export const footerCopyright =
  '© 2026 TIN Payments. Todos los derechos reservados.'

export const footerComplianceLine =
  'PCI-DSS Level 1 · Cifrado end-to-end · Operamos en LatAm.'

export const sandboxUtm = {
  utmSource: 'footer',
  utmMedium: 'footer',
  utmCampaign: 'sandbox',
} as const

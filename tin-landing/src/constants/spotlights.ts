import dashboardVisibilityUrl from '../assets/spotlights/dashboard-visibility.svg'

export type SpotlightMedia =
  | {
      kind: 'image'
      src: string
      alt: string
      width: number
      height: number
      fallbackLabel: string
    }
  | {
      kind: 'code'
      language: 'json' | 'javascript'
      content: string
      ariaLabel: string
    }

export interface Spotlight {
  id: string
  eyebrow: string
  heading: string
  body: string
  mediaSide: 'left' | 'right'
  media: SpotlightMedia
}

const CHECKOUT_PAYLOAD = `{
  "amount": 1250000,
  "currency": "COP",
  "method": "apm",
  "apm": "pse",
  "recurrence": null,
  "metadata": {
    "merchant_id": "mrc_0f9a",
    "order_id": "ord_2xK4"
  },
  "status": "authorized"
}`

export const spotlights: Spotlight[] = [
  {
    id: 'spotlight-checkout',
    eyebrow: 'Checkout · Links',
    heading: 'Checkout y links para cobrar de una.',
    body: 'Crea links de pago en segundos y recibe pagos por múltiples métodos sin implementar flujos complejos. Tin.',
    mediaSide: 'right',
    media: {
      kind: 'code',
      language: 'json',
      content: CHECKOUT_PAYLOAD,
      ariaLabel: 'Ejemplo de payload JSON de un pago Payin autorizado.',
    },
  },
  {
    id: 'spotlight-visibility',
    eyebrow: 'Panel · Conciliación',
    heading: 'Visibilidad completa de tu operación.',
    body: 'Transacciones, conciliación y estado de pagos en un panel limpio y accionable.',
    mediaSide: 'left',
    media: {
      kind: 'image',
      src: dashboardVisibilityUrl,
      alt: 'Vista previa del panel de conciliación y operaciones de TIN.',
      width: 800,
      height: 640,
      fallbackLabel: 'Panel · Conciliación',
    },
  },
]

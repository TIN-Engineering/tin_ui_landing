export type PaymentCategory = 'apm' | 'card' | 'wallet'

export interface PaymentMethod {
  id: string
  name: string
  category: PaymentCategory
  country?: string
  logoPath: string
  alt: string
}

import pix from '../assets/payment-methods/pix.svg'
import pse from '../assets/payment-methods/pse.svg'
import spei from '../assets/payment-methods/spei.svg'
import oxxo from '../assets/payment-methods/oxxo.svg'
import efecty from '../assets/payment-methods/efecty.svg'
import pagoefectivo from '../assets/payment-methods/pagoefectivo.svg'
import visa from '../assets/payment-methods/visa.svg'
import mastercard from '../assets/payment-methods/mastercard.svg'
import amex from '../assets/payment-methods/amex.svg'
import applePay from '../assets/payment-methods/apple-pay.svg'
import googlePay from '../assets/payment-methods/google-pay.svg'

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'pix',
    name: 'Pix',
    category: 'apm',
    country: 'BR',
    logoPath: pix,
    alt: 'Pix — Pago instantáneo de Brasil',
  },
  {
    id: 'pse',
    name: 'PSE',
    category: 'apm',
    country: 'CO',
    logoPath: pse,
    alt: 'PSE — Pagos Seguros en Línea de Colombia',
  },
  {
    id: 'spei',
    name: 'SPEI',
    category: 'apm',
    country: 'MX',
    logoPath: spei,
    alt: 'SPEI — Sistema de Pagos Electrónicos Interbancarios de México',
  },
  {
    id: 'oxxo',
    name: 'OXXO',
    category: 'apm',
    country: 'MX',
    logoPath: oxxo,
    alt: 'OXXO — Pago en efectivo en México',
  },
  {
    id: 'efecty',
    name: 'Efecty',
    category: 'apm',
    country: 'CO',
    logoPath: efecty,
    alt: 'Efecty — Red de pagos en efectivo de Colombia',
  },
  {
    id: 'pagoefectivo',
    name: 'PagoEfectivo',
    category: 'apm',
    country: 'PE',
    logoPath: pagoefectivo,
    alt: 'PagoEfectivo — Pagos en efectivo de Perú',
  },
  {
    id: 'visa',
    name: 'Visa',
    category: 'card',
    logoPath: visa,
    alt: 'Visa — Tarjetas de crédito y débito',
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    category: 'card',
    logoPath: mastercard,
    alt: 'Mastercard — Tarjetas de crédito y débito',
  },
  {
    id: 'amex',
    name: 'American Express',
    category: 'card',
    logoPath: amex,
    alt: 'American Express — Tarjetas de crédito',
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    category: 'wallet',
    logoPath: applePay,
    alt: 'Apple Pay — Wallet digital de Apple',
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    category: 'wallet',
    logoPath: googlePay,
    alt: 'Google Pay — Wallet digital de Google',
  },
]

export const paymentCategoryLabels: Record<PaymentCategory, string> = {
  apm: 'Métodos locales',
  card: 'Tarjetas',
  wallet: 'Wallets digitales',
}

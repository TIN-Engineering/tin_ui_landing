import type { LucideIcon } from 'lucide-react'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCcw,
  ShieldCheck,
  Receipt,
  Lock,
  BookOpen,
} from 'lucide-react'

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  Icon: LucideIcon
}

export const products: Product[] = [
  {
    id: 'payins',
    name: 'Payins',
    tagline: 'Cobra rápido. TIN.',
    description:
      'Acepta pagos por cualquier método local o global con las mejores tasas de conversión de Latinoamérica.',
    Icon: ArrowDownToLine,
  },
  {
    id: 'payouts',
    name: 'Payouts',
    tagline: 'Paga en un TIN.',
    description:
      'Dispersiones masivas y automáticas a cuentas bancarias y wallets en toda la región.',
    Icon: ArrowUpFromLine,
  },
  {
    id: 'recurrence',
    name: 'Suscripciones',
    tagline: 'Ingresos recurrentes sin fricciones.',
    description:
      'Planes, cobros automáticos y gestión inteligente de fallos. Tu MRR, siempre arriba.',
    Icon: RefreshCcw,
  },
  {
    id: 'soft-precision',
    name: 'Soft Precision',
    tagline: 'Antifraude y ruteo inteligente.',
    description:
      'Motor de ruteo y scoring con IA que maximiza aprobaciones y bloquea fraude en tiempo real.',
    Icon: ShieldCheck,
  },
  {
    id: 'fees-tax',
    name: 'Fees & Tax',
    tagline: 'Control fino de costos e impuestos.',
    description:
      'Gestión granular de tarifas, impuestos locales y comisiones por comercio. Sin ambigüedades.',
    Icon: Receipt,
  },
  {
    id: 'tokenization',
    name: 'Tokenization',
    tagline: 'Tarjetas guardadas, seguras. TIN.',
    description:
      'Bóveda PCI-compliant para card-on-file y experiencias one-click con cero fricción.',
    Icon: Lock,
  },
  {
    id: 'ledger',
    name: 'Ledger & Conciliación',
    tagline: 'Cada peso, rastreable.',
    description:
      'Balances inmutables y conciliación automatizada. Cero sorpresas al cierre del mes.',
    Icon: BookOpen,
  },
]

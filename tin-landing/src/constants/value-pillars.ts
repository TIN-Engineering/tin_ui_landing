import type { LucideIcon } from 'lucide-react'
import { Layers, MapPin, ShieldCheck } from 'lucide-react'

export interface ValuePillar {
  id: string
  eyebrow: string
  title: string
  description: string
  Icon: LucideIcon
}

export const valuePillars: ValuePillar[] = [
  {
    id: 'cards-apms',
    eyebrow: 'Cards & APMs',
    title: 'Integración Tin',
    description:
      'SDKs y una API clara para salir a producción rápido. Procesa tarjetas y métodos alternativos en una sola integración.',
    Icon: Layers,
  },
  {
    id: 'operacion-local',
    eyebrow: 'Operación local',
    title: 'Enfocados en LatAm',
    description:
      'Pagos locales con conocimiento profundo de cada mercado. Integración nativa con métodos y regulaciones regionales.',
    Icon: MapPin,
  },
  {
    id: 'seguridad',
    eyebrow: 'Seguridad',
    title: 'Operación confiable',
    description:
      'Monitoreo, antifraude y controles KYC/KYB integrados desde el inicio. Escala sin fricción.',
    Icon: ShieldCheck,
  },
]

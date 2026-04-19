import type { LucideIcon } from 'lucide-react'
import {
  ShieldCheck,
  UserCog,
  Activity,
  Lock,
  KeyRound,
  ShieldAlert,
  Radar,
} from 'lucide-react'

export interface SecurityPillar {
  id: string
  title: string
  description: string
  Icon: LucideIcon
}

export interface ComplianceBadge {
  id: string
  label: string
  Icon: LucideIcon
  href?: string
}

export const securityPillars: SecurityPillar[] = [
  {
    id: 'kyc-kyb',
    title: 'Controles KYC/KYB',
    description:
      'Onboarding de merchants con verificación regulatoria integrada desde el inicio.',
    Icon: ShieldCheck,
  },
  {
    id: 'role-management',
    title: 'Gestión de roles',
    description:
      'Permisos granulares por usuario y equipo. Tu panel, con las reglas de tu compañía.',
    Icon: UserCog,
  },
  {
    id: 'traceability',
    title: 'Trazabilidad',
    description:
      'Cada transacción, auditable. Ledger inmutable con exportación a la medida.',
    Icon: Activity,
  },
]

export const complianceBadges: ComplianceBadge[] = [
  {
    id: 'pci-dss',
    label: 'PCI-DSS Level 1',
    Icon: Lock,
  },
  {
    id: 'tokenization',
    label: 'Tokenización PCI',
    Icon: KeyRound,
    href: '#products',
  },
  {
    id: 'encryption',
    label: 'Cifrado end-to-end',
    Icon: ShieldAlert,
  },
  {
    id: 'soft-precision',
    label: 'Antifraude Soft Precision',
    Icon: Radar,
    href: '#products',
  },
]

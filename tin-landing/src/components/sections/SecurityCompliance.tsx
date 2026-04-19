import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { Card } from '../ui/Card'
import {
  securityPillars,
  complianceBadges,
} from '../../constants/security'
import type { ComplianceBadge } from '../../constants/security'
import styles from './SecurityCompliance.module.scss'

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
}

const GRID_VARIANTS: Variants = {
  visible: { transition: { staggerChildren: 0.08 } },
}

const BADGES_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: 0.1 },
  },
}

function handleDeepLink(
  event: ReactMouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith('#')) return
  const id = href.slice(1)
  const target = document.getElementById(id)
  if (!target) return
  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function BadgePill({ badge }: { badge: ComplianceBadge }) {
  const Icon = badge.Icon
  const content = (
    <>
      <span className={styles.badgeIconWrap} aria-hidden="true">
        <Icon size={14} strokeWidth={1.75} />
      </span>
      <span className={styles.badgeLabel}>{badge.label}</span>
    </>
  )

  if (badge.href) {
    return (
      <a
        className={`${styles.badge} ${styles.badgeLink}`}
        href={badge.href}
        onClick={(e) => handleDeepLink(e, badge.href as string)}
      >
        {content}
      </a>
    )
  }

  return <span className={styles.badge}>{content}</span>
}

export function SecurityCompliance() {
  const reduce = useReducedMotion()

  const gridContainerProps = reduce
    ? { initial: false as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.15 },
        variants: GRID_VARIANTS,
      }

  const badgesProps = reduce
    ? { initial: false as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.3 },
        variants: BADGES_VARIANTS,
      }

  return (
    <section
      id="security"
      className={styles.section}
      aria-labelledby="security-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Seguridad y cumplimiento</span>
          <h2 id="security-title" className={styles.title}>
            Seguridad y cumplimiento desde el diseño.{' '}
            <span className={styles.highlight}>Tin.</span>
          </h2>
          <p className={styles.lead}>
            Infraestructura auditada, controles de acceso por rol y trazabilidad
            completa. Todo lo que tus equipos de riesgo y cumplimiento esperan.
          </p>
        </header>

        <motion.div className={styles.grid} {...gridContainerProps}>
          {securityPillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={CARD_VARIANTS}
              className={styles.pillarWrapper}
            >
              <Card elevation="flat" className={styles.pillarCard}>
                <span className={styles.pillarIcon} aria-hidden="true">
                  <pillar.Icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarBody}>{pillar.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.ul
          className={styles.badgeList}
          aria-label="Certificaciones y controles de cumplimiento"
          {...badgesProps}
        >
          {complianceBadges.map((badge) => (
            <li key={badge.id} className={styles.badgeItem}>
              <BadgePill badge={badge} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

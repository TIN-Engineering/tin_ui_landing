import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Card } from '../ui/Card'
import { valuePillars } from '../../constants/value-pillars'
import styles from './ValuePillars.module.scss'

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

export function ValuePillars() {
  const reduce = useReducedMotion()

  const containerProps = reduce
    ? { initial: false as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.2 },
        variants: GRID_VARIANTS,
      }

  return (
    <section
      id="value-pillars"
      className={styles.section}
      aria-labelledby="value-pillars-title"
    >
      <div className={styles.inner}>
        <h2 id="value-pillars-title" className={styles.srOnly}>
          Pilares de valor
        </h2>

        <motion.div className={styles.grid} {...containerProps}>
          {valuePillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={CARD_VARIANTS}
              className={styles.cardWrapper}
            >
              <Card elevation="raised" className={styles.card}>
                <span className={styles.eyebrowRow}>
                  <span className={styles.iconWrap} aria-hidden="true">
                    <pillar.Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className={styles.eyebrow}>{pillar.eyebrow}</span>
                </span>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardBody}>{pillar.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

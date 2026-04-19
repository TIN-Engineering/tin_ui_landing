import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  testimonials,
  companyTypeLabels,
} from '../../constants/testimonials'
import styles from './Testimonials.module.scss'

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
}

const GRID_VARIANTS: Variants = {
  visible: { transition: { staggerChildren: 0.12 } },
}

export function Testimonials() {
  const reduce = useReducedMotion()

  if (testimonials.length === 0) return null

  const containerProps = reduce
    ? { initial: false as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.15 },
        variants: GRID_VARIANTS,
      }

  return (
    <section
      id="testimonials"
      className={styles.section}
      aria-labelledby="testimonials-title"
    >
      <div className={styles.inner}>
        <h2 id="testimonials-title" className={styles.srOnly}>
          Testimonios de clientes
        </h2>

        <motion.div className={styles.grid} {...containerProps}>
          {testimonials.map((testimonial, index) => {
            const companyLabel = companyTypeLabels[testimonial.companyType]
            const liftClass = index === 1 ? styles.cardLift : ''

            return (
              <motion.div
                key={testimonial.id}
                variants={CARD_VARIANTS}
                className={`${styles.cardWrapper} ${liftClass}`}
              >
                <blockquote className={styles.card}>
                  <p className={styles.quote}>{testimonial.quote}</p>
                  <cite className={styles.cite}>
                    <span>{testimonial.authorInitial}</span>
                    <span className={styles.dot} aria-hidden="true">
                      ·
                    </span>
                    <span>{testimonial.role}</span>
                    <span className={styles.dot} aria-hidden="true">
                      ·
                    </span>
                    <span>{companyLabel}</span>
                  </cite>
                </blockquote>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

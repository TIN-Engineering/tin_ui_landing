import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  paymentMethods,
  paymentCategoryLabels,
} from '../../constants/payment-methods'
import type {
  PaymentCategory,
  PaymentMethod,
} from '../../constants/payment-methods'
import styles from './PaymentMethods.module.scss'

const LOGO_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
}

const GRID_VARIANTS: Variants = {
  visible: { transition: { staggerChildren: 0.05 } },
}

const CATEGORY_ORDER: PaymentCategory[] = ['apm', 'card', 'wallet']

function Logo({ method }: { method: PaymentMethod }) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <motion.div variants={LOGO_VARIANTS} className={styles.logoCard}>
        <span className={styles.logoFallback}>{method.name}</span>
      </motion.div>
    )
  }

  return (
    <motion.div variants={LOGO_VARIANTS} className={styles.logoCard}>
      <img
        className={styles.logoImg}
        src={method.logoPath}
        alt={method.alt}
        width={120}
        height={48}
        loading="lazy"
        decoding="async"
        onError={() => setErrored(true)}
      />
    </motion.div>
  )
}

export function PaymentMethods() {
  const reduce = useReducedMotion()

  const containerProps = reduce
    ? { initial: false as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.1 },
        variants: GRID_VARIANTS,
      }

  return (
    <section
      id="payment-methods"
      className={styles.section}
      aria-labelledby="payment-methods-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Cobertura</span>
          <h2 id="payment-methods-title" className={styles.title}>
            Pagos locales. Escala global.{' '}
            <span className={styles.highlight}>TIN.</span>
          </h2>
          <p className={styles.lead}>
            Todos los métodos que tus clientes esperan: transferencias
            instantáneas, tarjetas, efectivo y wallets — listos para integrar
            en un TIN.
          </p>
        </header>

        {CATEGORY_ORDER.map((category) => {
          const methods = paymentMethods.filter((m) => m.category === category)
          if (methods.length === 0) return null

          return (
            <div key={category} className={styles.group}>
              <span className={styles.groupLabel}>
                {paymentCategoryLabels[category]}
              </span>
              <motion.div className={styles.grid} {...containerProps}>
                {methods.map((method) => (
                  <Logo key={method.id} method={method} />
                ))}
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

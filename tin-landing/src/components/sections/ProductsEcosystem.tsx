import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Card } from '../ui/Card'
import { products } from '../../constants/products'
import styles from './ProductsEcosystem.module.scss'

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
}

const GRID_VARIANTS: Variants = {
  visible: { transition: { staggerChildren: 0.08 } },
}

export function ProductsEcosystem() {
  const reduce = useReducedMotion()

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
      id="products"
      className={styles.section}
      aria-labelledby="products-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>El ecosistema</span>
          <h2 id="products-title" className={styles.title}>
            Todo lo que necesitas para cobrar, pagar y crecer.{' '}
            <span className={styles.highlight}>TIN.</span>
          </h2>
          <p className={styles.lead}>
            Siete motores conectados, una sola API. Así se resuelven los pagos
            en Latinoamérica — sin parches, sin atajos, en un TIN.
          </p>
        </header>

        <motion.div className={styles.grid} {...containerProps}>
          {products.map((product, index) => {
            const isRow1 = index < 4
            const row2Position = isRow1 ? -1 : index - 4
            const isFirstRow2 = row2Position === 0
            const isLifted = row2Position === 1

            const rowClass = isRow1 ? styles.cardRow1 : styles.cardRow2
            const firstRow2Class = isFirstRow2 ? styles.cardRow2First : ''
            const liftClass = isLifted ? styles.cardLift : ''

            return (
              <motion.div
                key={product.id}
                variants={CARD_VARIANTS}
                className={[styles.cardWrapper, rowClass, firstRow2Class, liftClass]
                  .filter(Boolean)
                  .join(' ')}
              >
                <Card elevation="raised" className={styles.card}>
                  <span className={styles.iconWrap} aria-hidden="true">
                    <product.Icon size={24} strokeWidth={1.75} />
                  </span>
                  <span className={styles.cardTagline}>{product.tagline}</span>
                  <h3 className={styles.cardTitle}>{product.name}</h3>
                  <p className={styles.cardDescription}>{product.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

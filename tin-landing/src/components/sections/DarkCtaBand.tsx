import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { Button } from '../ui/Button'
import { buildSignupUrl, trackEvent } from '../../lib/analytics'
import styles from './DarkCtaBand.module.scss'

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
}

const PANEL_VARIANTS: Variants = {
  visible: { transition: { staggerChildren: 0.08 } },
}

function smoothScrollTo(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function DarkCtaBand() {
  const reduce = useReducedMotion()
  const signupHref = buildSignupUrl() ?? '#'

  const handleSignup = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const href = buildSignupUrl()
    trackEvent({
      name: 'cta_click',
      params: { cta_id: 'start_building', location: 'dark_cta_band' },
    })
    if (!href) {
      event.preventDefault()
      return
    }
    const utmCampaign = new URLSearchParams(window.location.search).get('utm_campaign')
    trackEvent({
      name: 'signup_redirect',
      params: utmCampaign
        ? { source: 'dark_cta_band', utm_campaign: utmCampaign }
        : { source: 'dark_cta_band' },
    })
  }

  const handleContactSales = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    trackEvent({
      name: 'cta_click',
      params: { cta_id: 'contact_sales', location: 'dark_cta_band' },
    })
    smoothScrollTo('contact-sales')
  }

  const panelProps = reduce
    ? { initial: false as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.3 },
        variants: PANEL_VARIANTS,
      }

  return (
    <section
      id="final-cta"
      className={styles.section}
      aria-labelledby="final-cta-title"
    >
      <div className={styles.inner}>
        <motion.div className={styles.panel} {...panelProps}>
          <motion.div className={styles.copy} variants={ITEM_VARIANTS}>
            <h2 id="final-cta-title" className={styles.title}>
              ¿Listo para cobrar sin enredos?{' '}
              <span className={styles.highlight}>Tin.</span>
            </h2>
            <p className={styles.support}>
              Crea tu cuenta, integra y activa pagos con velocidad de ejecución
              real.
            </p>
          </motion.div>

          <motion.div className={styles.actions} variants={ITEM_VARIANTS}>
            <Button
              as="a"
              variant="primary"
              theme="dark"
              href={signupHref}
              onClick={handleSignup}
            >
              Empezar ahora
            </Button>
            <Button variant="ghost" theme="dark" onClick={handleContactSales}>
              Hablar con ventas
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

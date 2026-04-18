import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { Zap } from 'lucide-react'
import { Button } from '../ui/Button'
import { Pulse } from '../ui/Pulse'
import { buildSignupUrl, trackEvent } from '../../lib/analytics'
import styles from './Hero.module.scss'

const HEADLINE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
}

const CONTAINER_VARIANTS: Variants = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

function scrollToContactSales() {
  const target = document.getElementById('contact-sales')
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Hero() {
  const reduce = useReducedMotion()
  const signupHref = buildSignupUrl() ?? '#'

  const handleSignup = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const href = buildSignupUrl()
    trackEvent({ name: 'cta_click', params: { cta_id: 'start_building', location: 'hero' } })
    if (!href) {
      event.preventDefault()
      return
    }
    const utmCampaign = new URLSearchParams(window.location.search).get('utm_campaign')
    trackEvent({
      name: 'signup_redirect',
      params: utmCampaign ? { source: 'hero', utm_campaign: utmCampaign } : { source: 'hero' },
    })
  }

  const handleContactSales = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    trackEvent({ name: 'cta_click', params: { cta_id: 'contact_sales', location: 'hero' } })
    scrollToContactSales()
  }

  const containerProps = reduce
    ? { initial: false as const }
    : {
        initial: 'hidden' as const,
        animate: 'visible' as const,
        variants: CONTAINER_VARIANTS,
      }

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <motion.div className={styles.inner} {...containerProps}>
        <div className={styles.copy}>
          <motion.span className={styles.eyebrow} variants={HEADLINE_VARIANTS}>
            <Pulse label="Infraestructura en vivo" />
            Infraestructura de pagos · LatAm
          </motion.span>

          <motion.h1
            id="hero-title"
            className={styles.headline}
            variants={HEADLINE_VARIANTS}
          >
            Pagos para toda Latinoamérica.{' '}
            <span className={styles.highlight}>TIN.</span>
          </motion.h1>

          <motion.p className={styles.subtitle} variants={HEADLINE_VARIANTS}>
            Payins, Payouts, Suscripciones, Antifraude y Conciliación. Todo en
            una plataforma, conectada a Pix, PSE, SPEI, tarjetas y wallets —
            listo para integrar en un TIN.
          </motion.p>

          <motion.div className={styles.actions} variants={HEADLINE_VARIANTS}>
            <Button as="a" variant="primary" href={signupHref} onClick={handleSignup}>
              Start Building
            </Button>
            <Button variant="ghost" onClick={handleContactSales}>
              Contact Sales
            </Button>
          </motion.div>

          <motion.span className={styles.proof} variants={HEADLINE_VARIANTS}>
            <Pulse label="Sandbox en vivo" />
            Sandbox instantáneo · PCI-DSS Level 1
          </motion.span>
        </div>

        <motion.div
          className={styles.visual}
          aria-hidden="true"
          variants={HEADLINE_VARIANTS}
        >
          <div className={styles.visualHeader}>
            <Pulse />
            <span className={styles.visualLabel}>TIN Console · live</span>
          </div>

          <div className={styles.visualBody}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Aprobación</span>
              <span className={styles.statValue}>98.4%</span>
              <span className={styles.statDelta}>▲ +3.1 pts</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Latencia p95</span>
              <span className={styles.statValue}>120 ms</span>
              <span className={styles.statDelta}>▼ -18 ms</span>
            </div>
            <div className={styles.flowCard}>
              <span className={styles.flowIcon}>
                <Zap size={20} aria-hidden="true" />
              </span>
              <span className={styles.flowText}>
                <span className={styles.flowTitle}>Payin · PSE · Colombia</span>
                <span className={styles.flowMeta}>COP 1.250.000 · settled en 2s</span>
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

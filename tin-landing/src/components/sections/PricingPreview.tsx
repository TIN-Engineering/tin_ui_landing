import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { pricingTiers } from '../../constants/pricing'
import type { PricingTierEntry } from '../../constants/pricing'
import { buildSignupUrl, trackEvent } from '../../lib/analytics'
import styles from './PricingPreview.module.scss'

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

function smoothScrollTo(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

interface TierCardProps {
  tier: PricingTierEntry
}

function TierCard({ tier }: TierCardProps) {
  const isDark = tier.surface === 'dark'
  const buttonTheme = isDark ? 'dark' : 'light'

  const handleSignup = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const href = buildSignupUrl()
    trackEvent({
      name: 'cta_click',
      params: { cta_id: 'pricing_signup', location: 'pricing_preview', tier: tier.id },
    })
    if (!href) {
      event.preventDefault()
      return
    }
    const utmCampaign = new URLSearchParams(window.location.search).get('utm_campaign')
    trackEvent({
      name: 'signup_redirect',
      params: utmCampaign
        ? { source: 'pricing_preview', utm_campaign: utmCampaign }
        : { source: 'pricing_preview' },
    })
  }

  const handleContactSales = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    trackEvent({
      name: 'cta_click',
      params: { cta_id: 'pricing_contact_sales', location: 'pricing_preview', tier: tier.id },
    })
    smoothScrollTo('contact-sales')
  }

  const cardClasses = [
    styles.tierCard,
    isDark ? styles.tierCardDark : styles.tierCardLight,
    isDark ? styles.tierCardLift : '',
  ]
    .filter(Boolean)
    .join(' ')

  const signupHref = buildSignupUrl() ?? '#'

  return (
    <Card elevation="flat" className={cardClasses}>
      <div className={styles.tierHead}>
        <h3 className={styles.tierName}>{tier.name}</h3>
        <p className={styles.tierTagline}>{tier.tagline}</p>
      </div>

      <div className={styles.tierCta}>
        {tier.ctaKind === 'signup' ? (
          <Button
            as="a"
            variant={tier.ctaVariant}
            theme={buttonTheme}
            fullWidth
            href={signupHref}
            onClick={handleSignup}
          >
            {tier.ctaLabel}
          </Button>
        ) : (
          <Button
            variant={tier.ctaVariant}
            theme={buttonTheme}
            fullWidth
            onClick={handleContactSales}
          >
            {tier.ctaLabel}
          </Button>
        )}
      </div>
    </Card>
  )
}

export function PricingPreview() {
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
      id="pricing"
      className={styles.section}
      aria-labelledby="pricing-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Precios</span>
          <h2 id="pricing-title" className={styles.title}>
            Precios simples. Crecimiento sin sorpresas.{' '}
            <span className={styles.highlight}>Tin.</span>
          </h2>
          <p className={styles.lead}>
            Un plan para empezar, otro para escalar y uno diseñado para
            operaciones críticas. Habla con ventas cuando estés listo.
          </p>
        </header>

        <motion.div className={styles.grid} {...containerProps}>
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={CARD_VARIANTS}
              className={styles.tierWrapper}
            >
              <TierCard tier={tier} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { buildSignupUrl, trackEvent } from '../../lib/analytics'
import styles from './Navbar.module.scss'

interface NavLink {
  id: string
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { id: 'products', label: 'Ecosistema', href: '#products' },
  { id: 'payment-methods', label: 'Métodos', href: '#payment-methods' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
  { id: 'security', label: 'Seguridad', href: '#security' },
  { id: 'contact-sales', label: 'Contacto', href: '#contact-sales' },
]

const SECTION_IDS: string[] = [
  'hero',
  'products',
  'payment-methods',
  'pricing',
  'security',
]

function smoothScrollTo(id: string): void {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  useEffect(() => {
    if (!drawerOpen) return

    previousFocusRef.current = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    drawerCloseRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDrawer()
      }
    }
    window.addEventListener('keydown', onKey)

    const onResize = () => {
      if (window.innerWidth >= 960) closeDrawer()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = prevOverflow
      previousFocusRef.current?.focus()
    }
  }, [drawerOpen, closeDrawer])

  const handleLinkClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault()
    closeDrawer()
    smoothScrollTo(id)
  }

  const handleContactSales = (
    event: ReactMouseEvent<HTMLButtonElement>,
    location: 'navbar',
  ) => {
    event.preventDefault()
    closeDrawer()
    trackEvent({ name: 'cta_click', params: { cta_id: 'contact_sales', location } })
    smoothScrollTo('contact-sales')
  }

  const handleSignup = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    location: 'navbar',
  ) => {
    const href = buildSignupUrl()
    trackEvent({ name: 'cta_click', params: { cta_id: 'start_building', location } })
    if (!href) {
      event.preventDefault()
      return
    }
    const utmCampaign = new URLSearchParams(window.location.search).get('utm_campaign')
    trackEvent({
      name: 'signup_redirect',
      params: utmCampaign
        ? { source: location, utm_campaign: utmCampaign }
        : { source: location },
    })
  }

  const signupHref = buildSignupUrl() ?? '#'

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}
        role="banner"
      >
        <div className={styles.inner}>
          <a
            href="#hero"
            className={styles.logo}
            onClick={(e) => handleLinkClick(e, 'hero')}
            aria-label="TIN — Inicio"
          >
            <span className={styles.logoDot} aria-hidden="true" />
            <span>TIN</span>
          </a>

          <nav className={styles.links} aria-label="Secciones principales">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`${styles.link} ${
                  activeSection === link.id ? styles.linkActive : ''
                }`}
                aria-current={activeSection === link.id ? 'true' : undefined}
                onClick={(e) => handleLinkClick(e, link.id)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <Button
              variant="ghost"
              size="compact"
              className={styles.desktopOnly}
              onClick={(e) => handleContactSales(e, 'navbar')}
            >
              Contact Sales
            </Button>
            <Button
              as="a"
              variant="primary"
              size="compact"
              href={signupHref}
              onClick={(e) => handleSignup(e, 'navbar')}
            >
              Start Building
            </Button>
            <button
              type="button"
              className={styles.hamburger}
              aria-label="Abrir menú"
              aria-expanded={drawerOpen}
              aria-controls="tin-mobile-menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <>
          <div
            className={styles.drawerBackdrop}
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <aside
            id="tin-mobile-menu"
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className={styles.drawerHeader}>
              <span className={styles.drawerLabel}>Menú</span>
              <button
                type="button"
                ref={drawerCloseRef}
                className={styles.drawerClose}
                aria-label="Cerrar menú"
                onClick={closeDrawer}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <nav className={styles.drawerLinks} aria-label="Secciones principales">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`${styles.drawerLink} ${
                    activeSection === link.id ? styles.drawerLinkActive : ''
                  }`}
                  aria-current={activeSection === link.id ? 'true' : undefined}
                  onClick={(e) => handleLinkClick(e, link.id)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className={styles.drawerActions}>
              <Button
                variant="ghost"
                fullWidth
                onClick={(e) => handleContactSales(e, 'navbar')}
              >
                Contact Sales
              </Button>
              <Button
                as="a"
                variant="primary"
                fullWidth
                href={signupHref}
                onClick={(e) => handleSignup(e, 'navbar')}
              >
                Start Building
              </Button>
            </div>
          </aside>
        </>
      )}
    </>
  )
}

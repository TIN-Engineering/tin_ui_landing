import { useEffect, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { AtSign, Briefcase, Code2, ExternalLink } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Note: lucide-react v1.x does not ship Linkedin/Twitter/Github brand marks
// (ISC license constraints). We fall back to the closest neutral glyphs; the
// accessible brand name is carried on the anchor's aria-label.
import {
  footerBrandTagline,
  footerColumns,
  footerComplianceLine,
  footerCopyright,
  footerSocials,
  sandboxUtm,
} from '../../constants/footer'
import type { FooterLink, FooterSocial } from '../../constants/footer'
import { buildSignupUrl } from '../../lib/analytics'
import styles from './Footer.module.scss'

const SOCIAL_ICONS: Record<FooterSocial['id'], LucideIcon> = {
  linkedin: Briefcase,
  x: AtSign,
  github: Code2,
}

const MOBILE_BREAKPOINT = 768

function smoothScrollTo(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function useIsMobile(): boolean {
  const getInitial = () =>
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT

  const [isMobile, setIsMobile] = useState<boolean>(getInitial)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return isMobile
}

interface FooterLinkItemProps {
  link: FooterLink
}

function FooterLinkItem({ link }: FooterLinkItemProps) {
  if (link.kind === 'placeholder') {
    return (
      <a
        href="#"
        className={`${styles.link} ${styles.linkDisabled}`}
        aria-disabled="true"
        tabIndex={-1}
        onClick={(e) => e.preventDefault()}
      >
        {link.label}
      </a>
    )
  }

  if (link.kind === 'anchor') {
    const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
      if (!link.href?.startsWith('#')) return
      event.preventDefault()
      smoothScrollTo(link.href.slice(1))
    }

    return (
      <a href={link.href ?? '#'} className={styles.link} onClick={handleClick}>
        {link.label}
      </a>
    )
  }

  if (link.kind === 'sandbox') {
    const sandboxHref =
      buildSignupUrl({
        utmSource: sandboxUtm.utmSource,
        utmMedium: sandboxUtm.utmMedium,
        utmCampaign: sandboxUtm.utmCampaign,
      }) ?? '#'

    return (
      <a
        href={sandboxHref}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.linkLabel}>{link.label}</span>
        <ExternalLink
          size={12}
          strokeWidth={1.75}
          className={styles.linkIcon}
          aria-hidden="true"
        />
      </a>
    )
  }

  return (
    <a
      href={link.href ?? '#'}
      className={styles.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.linkLabel}>{link.label}</span>
      <ExternalLink
        size={12}
        strokeWidth={1.75}
        className={styles.linkIcon}
        aria-hidden="true"
      />
    </a>
  )
}

export function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer id="footer" className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandBlock}>
            <a href="#hero" className={styles.wordmark} aria-label="TIN — Inicio">
              <span className={styles.wordmarkDot} aria-hidden="true" />
              <span>TIN</span>
            </a>
            <p className={styles.brandTagline}>{footerBrandTagline}</p>
          </div>

          {footerColumns.map((column) => {
            const headingId = `footer-col-${column.id}`

            if (isMobile) {
              return (
                <details key={column.id} className={styles.columnDetails}>
                  <summary className={styles.columnSummary}>
                    <span id={headingId} className={styles.columnHeading}>
                      {column.heading}
                    </span>
                  </summary>
                  <ul
                    className={styles.linkList}
                    aria-labelledby={headingId}
                  >
                    {column.links.map((link) => (
                      <li key={link.id}>
                        <FooterLinkItem link={link} />
                      </li>
                    ))}
                  </ul>
                </details>
              )
            }

            return (
              <nav
                key={column.id}
                className={styles.column}
                aria-labelledby={headingId}
              >
                <span id={headingId} className={styles.columnHeading}>
                  {column.heading}
                </span>
                <ul className={styles.linkList}>
                  {column.links.map((link) => (
                    <li key={link.id}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            )
          })}
        </div>

        <div className={styles.strip}>
          <div className={styles.stripLeft}>
            <span className={styles.copyright}>{footerCopyright}</span>
            <span className={styles.compliance}>{footerComplianceLine}</span>
          </div>

          <ul className={styles.socials} aria-label="Redes sociales">
            {footerSocials.map((social) => {
              const Icon = SOCIAL_ICONS[social.id]
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}

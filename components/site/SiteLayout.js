import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { layout, navItems, siteConfig } from '../../data/site'
import styles from './SiteLayout.module.css'

function isActive(pathname, href) {
  if (href === '/') {
    return pathname === '/'
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [router.asPath])

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href={layout.brandHref} aria-label={layout.brandLabel}>
          <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} />
          <span className={styles.brandText}>
            {layout.brandText}
            <small>{siteConfig.studioLine}</small>
          </span>
        </Link>
        <button
          className={`${styles.menuButton} ${isOpen ? styles.menuButtonOpen : ''}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls={layout.navigationId}
          aria-label={layout.menuLabel}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
        </button>
        <nav
          id={layout.navigationId}
          className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}
          aria-label={layout.navigationLabel}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={isActive(router.pathname, item.href) ? styles.active : undefined}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link className={styles.navCta} href={layout.headerCta.href}>
            {layout.headerCta.label}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  const footer = layout.footer
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div>
          <div className="eyebrow">{footer.brand}</div>
          <h2>
            {footer.titleLines.map((line, index) => <span key={line}>{line}{index < footer.titleLines.length - 1 ? <br /> : null}</span>)}
          </h2>
          <p className={styles.footerNote}>{siteConfig.description}</p>
        </div>
        <div>
          <div className="eyebrow">{footer.studioLabel}</div>
          <p>{siteConfig.shortAddress}</p>
          <p>
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
            <br />
            <a href={siteConfig.emailHref}>{siteConfig.email}</a>
          </p>
        </div>
        <div>
          <div className="eyebrow">{footer.exploreLabel}</div>
          <p>
            {footer.links.map((link, index) => <span key={link.href}><Link href={link.href}>{link.label}</Link>{index < footer.links.length - 1 ? <br /> : null}</span>)}
          </p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>{footer.copyright}</span>
        <span>{footer.services}</span>
      </div>
    </footer>
  )
}

export default function SiteLayout({ children }) {
  return (
    <>
      <a className="skip-link" href={layout.skipHref}>
        {layout.skipLabel}
      </a>
      <Header />
      <main id={layout.mainId}>{children}</main>
      <Footer />
    </>
  )
}

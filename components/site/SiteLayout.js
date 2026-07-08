import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { navItems, siteConfig } from '../../data/site'
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
        <Link className={styles.brand} href="/" aria-label="Design Essentials home">
          <img src="/assets/logo4.webp" alt="Design Essentials logo" />
          <span className={styles.brandText}>
            DESIGN ESSENTIALS
            <small>{siteConfig.studioLine}</small>
          </span>
        </Link>
        <button
          className={`${styles.menuButton} ${isOpen ? styles.menuButtonOpen : ''}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
        </button>
        <nav
          id="primary-navigation"
          className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}
          aria-label="Primary navigation"
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
          <Link className={styles.navCta} href="/contact">
            Book Consultation
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div>
          <div className="eyebrow">Design Essentials</div>
          <h2>
            Spaces with purpose.
            <br />
            Details with meaning.
          </h2>
          <p className={styles.footerNote}>{siteConfig.description}</p>
        </div>
        <div>
          <div className="eyebrow">Studio</div>
          <p>{siteConfig.shortAddress}</p>
          <p>
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
            <br />
            <a href={siteConfig.emailHref}>{siteConfig.email}</a>
          </p>
        </div>
        <div>
          <div className="eyebrow">Explore</div>
          <p>
            <Link href="/showcase">Showcase</Link>
            <br />
            <Link href="/what-we-do">What we do</Link>
            <br />
            <Link href="/process">Process</Link>
            <br />
            <Link href="/contact">Start a project</Link>
          </p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>(c) 2026 Design Essentials</span>
        <span>Residential / Commercial / Turnkey</span>
      </div>
    </footer>
  )
}

export default function SiteLayout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}

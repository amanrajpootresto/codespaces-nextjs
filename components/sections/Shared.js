import Link from 'next/link'
import styles from './Sections.module.css'

export function ButtonLink({ href, children, variant = 'default' }) {
  const variantClass = variant === 'ghost' ? styles.ghost : variant === 'light' ? styles.light : ''
  return (
    <Link className={`${styles.btn} ${variantClass}`} href={href}>
      {children}
    </Link>
  )
}

export function ButtonRow({ children }) {
  return <div className={styles.buttonRow}>{children}</div>
}

export function PageHero({ eyebrow, title, children, className = '' }) {
  return (
    <section className={`${styles.pageHero} ${className}`}>
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {children ? <p>{children}</p> : null}
    </section>
  )
}

export function Section({ children, className = '' }) {
  return <section className={`${styles.section} ${className}`}>{children}</section>
}

export function SectionHead({ title, children }) {
  return (
    <div className={styles.sectionHead}>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  )
}

export function CtaPanel({ eyebrow, title, text, href, label }) {
  return (
    <Section className={styles.ctaPanel}>
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      <p>{text}</p>
      <ButtonLink href={href}>{label}</ButtonLink>
    </Section>
  )
}

export function ImageFrame({ src, alt, className = '' }) {
  return (
    <div className={`${styles.image} ${className}`}>
      <img src={src} alt={alt} />
    </div>
  )
}

export function Note({ children }) {
  return <p className={styles.note}>{children}</p>
}

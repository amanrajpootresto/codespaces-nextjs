import Link from 'next/link'
import SiteLayout from '../components/site/SiteLayout'
import { ButtonLink, ButtonRow, CtaPanel, ImageFrame, Section, SectionHead } from '../components/sections/Shared'
import { contentPageProps, getSiteContent } from '../lib/get-site-content'
import { localBusinessSchema, Seo, serviceSchema, websiteSchema } from '../lib/seo'
import styles from '../styles/pages.module.css'

export default function Home({ siteContent }) {
  const { imageLibrary, pages, processSteps, services, siteConfig } = siteContent
  const content = pages.home
  return (
    <SiteLayout>
      <Seo
        description={siteConfig.description}
        image={imageLibrary.hero}
        jsonLd={[localBusinessSchema(siteConfig), websiteSchema(siteConfig), serviceSchema(services, siteConfig)]}
      />
      <section className={styles.homeHero}>
        <aside className={styles.heroRail}>
          <span className={styles.vertical}>{content.rail[0]}</span>
          <span>{content.rail[1]}</span>
        </aside>
        <div className={styles.heroStage}>
          <div className={styles.heroCopy}>
            <div className="eyebrow">{content.eyebrow}</div>
            <h1>{content.title}</h1>
            <p>{content.intro}</p>
            <ButtonRow>
              {content.buttons.map((button) => <ButtonLink key={button.href} href={button.href} variant={button.variant}>{button.label}</ButtonLink>)}
            </ButtonRow>
          </div>
          <ImageFrame className={styles.heroPhoto} src={imageLibrary.hero} alt={content.heroAlt} />
        </div>
      </section>

      <Section className={styles.editorial}>
        <div>
          <div className="eyebrow">{content.statement.eyebrow}</div>
          <ImageFrame className={styles.smallEditorialImage} src={imageLibrary.intro} alt={content.statement.alt} />
        </div>
        <p>{content.statement.text}</p>
      </Section>

      <Section className={styles.splitPaths}>
        {content.paths.map((path) => {
          const service = services.find((item) => item.id === path.id)
          return (
          <article className={styles.pathCard} key={service.id}>
            <ImageFrame src={service.image} alt={service.alt} />
            <div>
              <span>{service.number} / {path.label}</span>
              <h2>{path.title}</h2>
              <p>{path.text}</p>
              <Link href={`/what-we-do#${service.id}`}>{path.linkLabel}</Link>
            </div>
          </article>
        )})}
      </Section>

      <Section>
        <SectionHead title={content.services.title}>
          {content.services.text}
        </SectionHead>
        <div className={styles.workIndex}>
          {services.map((service) => (
            <Link className={styles.workRow} href={`/what-we-do#${service.id}`} key={service.id}>
              <span>{service.number}</span>
              <h3>{service.shortTitle}</h3>
              <p>{service.summary}</p>
              <img src={service.image} alt={service.alt} />
            </Link>
          ))}
        </div>
      </Section>

      <section className={styles.processBand}>
        <div className={styles.processTitle}>
          <div>
            <div className="eyebrow">{content.process.eyebrow}</div>
            <h2>{content.process.title}</h2>
          </div>
          <p>{content.process.text}</p>
        </div>
        <div className={styles.processList}>
          {processSteps.slice(0, 4).map((step) => (
            <article className={styles.processItem} key={step.number}>
              <span>{step.number} / {step.label}</span>
              <h3>{step.shortTitle}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.galleryFeature}>
        <ImageFrame className={styles.galleryImage} src={imageLibrary.residence} alt={content.featured.alt} />
        <div className={styles.galleryCopy}>
          <div>
            <div className="eyebrow">{content.featured.eyebrow}</div>
            <h2>{content.featured.title}</h2>
          </div>
          <div>
            <p>{content.featured.text}</p>
            <ButtonLink href={content.featured.button.href}>{content.featured.button.label}</ButtonLink>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        {content.stats.map((stat) => <div className={styles.stat} key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </section>

      <CtaPanel
        {...content.cta}
      />
    </SiteLayout>
  )
}

export async function getStaticProps() {
  return contentPageProps(await getSiteContent())
}

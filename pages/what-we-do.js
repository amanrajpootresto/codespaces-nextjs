import SiteLayout from '../components/site/SiteLayout'
import { CtaPanel, ImageFrame, PageHero } from '../components/sections/Shared'
import { contentPageProps, getSiteContent } from '../lib/get-site-content'
import { Seo, serviceSchema } from '../lib/seo'
import styles from '../styles/pages.module.css'

export default function WhatWeDo({ siteContent }) {
  const { pages, services, siteConfig } = siteContent
  const content = pages.services
  return (
    <SiteLayout>
      <Seo
        {...content.seo}
        image={services[0].image}
        jsonLd={serviceSchema(services, siteConfig)}
      />
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title}>
        {content.hero.text}
      </PageHero>
      <section className={styles.serviceStack}>
        {services.map((service, index) => (
          <article
            className={`${styles.servicePanel} ${index % 2 === 1 ? styles.reverse : ''}`}
            id={service.id}
            key={service.id}
          >
            <div className={styles.serviceCopy}>
              <span>{service.number} / {service.shortTitle.replace(' interiors', '')}</span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <ImageFrame className={styles.serviceImage} src={service.image} alt={service.alt} />
          </article>
        ))}
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

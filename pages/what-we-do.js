import SiteLayout from '../components/site/SiteLayout'
import { CtaPanel, ImageFrame, PageHero } from '../components/sections/Shared'
import { services } from '../data/site'
import { Seo, serviceSchema } from '../lib/seo'
import styles from '../styles/pages.module.css'

export default function WhatWeDo() {
  return (
    <SiteLayout>
      <Seo
        title="What We Do"
        path="/what-we-do"
        description="Residential, commercial, turnkey and renovation interior services across Delhi NCR."
        image={services[0].image}
        jsonLd={serviceSchema(services)}
      />
      <PageHero eyebrow="What we do" title="Interior design, planning and execution under one clear process.">
        From homes and offices to restaurants, clinics and renovation projects, services are structured to help customers choose the right starting point.
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
        eyebrow="Need help choosing?"
        title="Tell us what space you are planning."
        text="The right service depends on property type, budget, timeline and how much execution support you need."
        href="/contact"
        label="Send Project Details"
      />
    </SiteLayout>
  )
}

import Link from 'next/link'
import SiteLayout from '../components/site/SiteLayout'
import { ButtonLink, ButtonRow, CtaPanel, ImageFrame, Section, SectionHead } from '../components/sections/Shared'
import { imageLibrary, processSteps, services, siteConfig } from '../data/site'
import { localBusinessSchema, Seo, serviceSchema, websiteSchema } from '../lib/seo'
import styles from '../styles/pages.module.css'

export default function Home() {
  return (
    <SiteLayout>
      <Seo
        description={siteConfig.description}
        image={imageLibrary.hero}
        jsonLd={[localBusinessSchema(), websiteSchema(), serviceSchema(services)]}
      />
      <section className={styles.homeHero}>
        <aside className={styles.heroRail}>
          <span className={styles.vertical}>Interior architecture / Delhi NCR</span>
          <span>RESIDENTIAL / COMMERCIAL</span>
        </aside>
        <div className={styles.heroStage}>
          <div className={styles.heroCopy}>
            <div className="eyebrow">Design Essentials / Interior Studio</div>
            <h1>Spaces shaped by light, material and purpose.</h1>
            <p>
              Premium residential and commercial interiors across Delhi NCR, from planning and
              3D concepts to complete execution and handover.
            </p>
            <ButtonRow>
              <ButtonLink href="/showcase">View Showcase</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Start a Project
              </ButtonLink>
            </ButtonRow>
          </div>
          <ImageFrame className={styles.heroPhoto} src={imageLibrary.hero} alt="Elegant contemporary living room interior" />
        </div>
      </section>

      <Section className={styles.editorial}>
        <div>
          <div className="eyebrow">Studio statement</div>
          <ImageFrame className={styles.smallEditorialImage} src={imageLibrary.intro} alt="Warm living room with natural light" />
        </div>
        <p>
          Design Essentials creates considered interiors for homes, offices and commercial spaces
          where beauty, usability and execution discipline work together.
        </p>
      </Section>

      <Section className={styles.splitPaths}>
        {services.slice(0, 2).map((service) => (
          <article className={styles.pathCard} key={service.id}>
            <ImageFrame src={service.image} alt={service.alt} />
            <div>
              <span>{service.number} / {service.id === 'residential' ? 'Residential' : 'Commercial'}</span>
              <h2>
                {service.id === 'residential'
                  ? 'Homes that work beautifully every day.'
                  : 'Business spaces with clarity and presence.'}
              </h2>
              <p>
                {service.id === 'residential'
                  ? 'Layouts, storage, kitchens, wardrobes, lighting and finishes planned around Indian homes and family routines.'
                  : 'Offices, retail, clinics and hospitality spaces designed for workflow, customer experience and brand identity.'}
              </p>
              <Link href={`/what-we-do#${service.id}`}>Explore {service.id}</Link>
            </div>
          </article>
        ))}
      </Section>

      <Section>
        <SectionHead title="What we design and deliver">
          One coordinated journey across consultation, planning, material selection, execution and handover.
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
            <div className="eyebrow">Method / 01-06</div>
            <h2>From first conversation to final handover.</h2>
          </div>
          <p>A transparent process helps clients see what is happening, what is next and who is accountable.</p>
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
        <ImageFrame className={styles.galleryImage} src={imageLibrary.residence} alt="Featured contemporary residence in neutral tones" />
        <div className={styles.galleryCopy}>
          <div>
            <div className="eyebrow">Selected work</div>
            <h2>Sandstone Residence</h2>
          </div>
          <div>
            <p>A warm family home shaped with muted textures, practical storage and calm transitions between daily living zones.</p>
            <ButtonLink href="/projects/sandstone-residence">Open Case Study</ButtonLink>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.stat}><strong>01</strong><span>Coordinated team</span></div>
        <div className={styles.stat}><strong>06</strong><span>Project stages</span></div>
        <div className={styles.stat}><strong>NCR</strong><span>Service region</span></div>
        <div className={styles.stat}><strong>360</strong><span>Design to handover</span></div>
      </section>

      <CtaPanel
        eyebrow="Start with clarity"
        title="Planning a new home, office or renovation?"
        text="Share your property details, project goals and expected timeline. The first conversation should make the next step clear."
        href="/contact"
        label="Request Consultation"
      />
    </SiteLayout>
  )
}

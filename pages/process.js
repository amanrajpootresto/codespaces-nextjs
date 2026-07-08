import SiteLayout from '../components/site/SiteLayout'
import { ImageFrame, PageHero } from '../components/sections/Shared'
import { imageLibrary, processSteps } from '../data/site'
import { Seo } from '../lib/seo'
import styles from '../styles/pages.module.css'

export default function Process() {
  return (
    <SiteLayout>
      <Seo
        title="Process"
        path="/process"
        description="Interior design and execution process from consultation to handover."
        image={imageLibrary.material}
      />
      <PageHero eyebrow="Process" title="A clear route from concept to handover.">
        Interior projects need structure. This page explains how the client journey stays clear from the first meeting to the final review.
      </PageHero>
      <section className={styles.processDeep}>
        {processSteps.map((step) => (
          <article key={step.number}>
            <span>{step.number}</span>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </article>
        ))}
      </section>
      <section className={styles.galleryFeature}>
        <ImageFrame className={styles.galleryImage} src={imageLibrary.material} alt="Interior material detail" />
        <div className={styles.galleryCopy}>
          <div>
            <div className="eyebrow">Why process matters</div>
            <h2>Good execution protects good design.</h2>
          </div>
          <p>
            Planning, sourcing and supervision should not be disconnected from the creative idea.
            The final website makes this strength visible.
          </p>
        </div>
      </section>
    </SiteLayout>
  )
}

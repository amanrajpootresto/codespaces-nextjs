import SiteLayout from '../components/site/SiteLayout'
import { ButtonLink, ImageFrame, Note, PageHero, Section } from '../components/sections/Shared'
import { imageLibrary } from '../data/site'
import { localBusinessSchema, Seo } from '../lib/seo'
import styles from '../styles/pages.module.css'

export default function About() {
  return (
    <SiteLayout>
      <Seo
        title="About"
        path="/about"
        description="About Design Essentials, a Delhi NCR interior design and execution studio."
        image={imageLibrary.exterior}
        jsonLd={localBusinessSchema()}
      />
      <PageHero
        eyebrow="About Design Essentials"
        title="A design and execution studio for spaces that need to feel considered, not crowded."
      >
        Based in Pitampura, Delhi, Design Essentials works across Delhi NCR to create residential and commercial interiors with a balance of aesthetics, usability and site-level practicality.
      </PageHero>
      <Section className={styles.twoColumnStory}>
        <ImageFrame className={styles.storyImage} src={imageLibrary.exterior} alt="Architectural home exterior and interior composition" />
        <div>
          <div className="eyebrow">Approach</div>
          <h2>Design is only successful when the finished space works in real life.</h2>
          <p>
            Our role is to connect ideas with execution. That means understanding how the space will be used,
            planning the technical details early, selecting materials carefully and coordinating the site so
            the final result remains faithful to the approved concept.
          </p>
          <Note>Client-verified founder biography, awards, team size and project count should be added before production content is finalized.</Note>
        </div>
      </Section>
      <Section className={styles.valuesGrid}>
        <article>
          <span>01</span>
          <h3>Measured luxury</h3>
          <p>Premium does not mean loud. We use proportion, material and detail to create restraint and comfort.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Practical planning</h3>
          <p>Storage, lighting, ventilation, movement and maintenance are planned before the visual layer is finalised.</p>
        </article>
        <article>
          <span>03</span>
          <h3>One accountable journey</h3>
          <p>Design, sourcing, site coordination and handover remain connected through one organised process.</p>
        </article>
      </Section>
      <section className={styles.quotePanel}>
        <ImageFrame className={styles.quoteVisual} src={imageLibrary.material} alt="Interior materials and architectural textures" />
        <div className={styles.quoteCopy}>
          <div className="eyebrow">Belief</div>
          <blockquote>"A space should look considered, but feel completely natural to use."</blockquote>
          <p>This is the principle behind every residential, commercial and renovation project.</p>
          <ButtonLink href="/process" variant="light">See our process</ButtonLink>
        </div>
      </section>
    </SiteLayout>
  )
}

import SiteLayout from '../components/site/SiteLayout'
import { ImageFrame, PageHero } from '../components/sections/Shared'
import { contentPageProps, getSiteContent } from '../lib/get-site-content'
import { Seo } from '../lib/seo'
import styles from '../styles/pages.module.css'

export default function Process({ siteContent }) {
  const { imageLibrary, pages, processSteps } = siteContent
  const content = pages.process
  return (
    <SiteLayout>
      <Seo
        {...content.seo}
        image={imageLibrary.material}
      />
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title}>
        {content.hero.text}
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
        <ImageFrame className={styles.galleryImage} src={imageLibrary.material} alt={content.feature.alt} />
        <div className={styles.galleryCopy}>
          <div>
            <div className="eyebrow">{content.feature.eyebrow}</div>
            <h2>{content.feature.title}</h2>
          </div>
          <p>{content.feature.text}</p>
        </div>
      </section>
    </SiteLayout>
  )
}

export async function getStaticProps() {
  return contentPageProps(await getSiteContent())
}

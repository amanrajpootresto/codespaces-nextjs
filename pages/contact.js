import SiteLayout from '../components/site/SiteLayout'
import { ImageFrame, PageHero, Section } from '../components/sections/Shared'
import { contentPageProps, getSiteContent } from '../lib/get-site-content'
import { localBusinessSchema, Seo } from '../lib/seo'
import styles from '../styles/pages.module.css'

export default function Contact({ siteContent }) {
  const { imageLibrary, pages, siteConfig } = siteContent
  const content = pages.contact

  return (
    <SiteLayout>
      <Seo
        {...content.seo}
        image={imageLibrary.consultation}
        jsonLd={localBusinessSchema(siteConfig)}
      />
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title}>
        {content.hero.text}
      </PageHero>
      <Section className={styles.contactLayout}>
        <div className={styles.contactDetails}>
          <ImageFrame className={styles.contactImage} src={imageLibrary.consultation} alt={content.imageAlt} />
          <div className={styles.contactItem}>
            <span>{content.detailLabels.phone}</span>
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          </div>
          <div className={styles.contactItem}>
            <span>{content.detailLabels.email}</span>
            <a href={siteConfig.emailHref}>{siteConfig.email}</a>
          </div>
          <div className={styles.contactItem}>
            <span>{content.detailLabels.studio}</span>
            <p>{siteConfig.address}</p>
          </div>
          <div className={styles.contactItem}>
            <span>{content.detailLabels.areas}</span>
            <p>{siteConfig.serviceAreas.join(', ')}</p>
          </div>
        </div>

        <div className={styles.contactSupport}>
          <div className={styles.contactSupportCard}>
            <span className="eyebrow">Consultation</span>
            <h2>Tell us what space you are planning.</h2>
            <p>
              For residential, commercial and hospitality projects across Delhi NCR, we begin with a quick conversation to understand your space, budget direction and timeline.
            </p>
            <div className={styles.contactSupportActions}>
              <a href={siteConfig.phoneHref}>Call the studio</a>
              <a href={siteConfig.emailHref}>Email the studio</a>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  )
}

export async function getStaticProps() {
  return contentPageProps(await getSiteContent())
}

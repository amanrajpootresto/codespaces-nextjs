import SiteLayout from '../components/site/SiteLayout'
import { ButtonLink, ImageFrame, Note, PageHero, Section } from '../components/sections/Shared'
import { contentPageProps, getSiteContent } from '../lib/get-site-content'
import { localBusinessSchema, Seo } from '../lib/seo'
import styles from '../styles/pages.module.css'

export default function About({ siteContent }) {
  const { imageLibrary, pages, siteConfig } = siteContent
  const content = pages.about
  return (
    <SiteLayout>
      <Seo
        {...content.seo}
        image={imageLibrary.exterior}
        jsonLd={localBusinessSchema(siteConfig)}
      />
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
      >
        {content.hero.text}
      </PageHero>
      <Section className={styles.twoColumnStory}>
        <ImageFrame className={styles.storyImage} src={imageLibrary.exterior} alt={content.story.alt} />
        <div>
          <div className="eyebrow">{content.story.eyebrow}</div>
          <h2>{content.story.title}</h2>
          <p>{content.story.text}</p>
          <Note>{content.story.note}</Note>
        </div>
      </Section>
      <Section className={styles.valuesGrid}>
        {content.values.map((value) => <article key={value.number}><span>{value.number}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}
      </Section>
      <section className={styles.quotePanel}>
        <ImageFrame className={styles.quoteVisual} src={imageLibrary.material} alt={content.belief.alt} />
        <div className={styles.quoteCopy}>
          <div className="eyebrow">{content.belief.eyebrow}</div>
          <blockquote>&quot;{content.belief.quote}&quot;</blockquote>
          <p>{content.belief.text}</p>
          <ButtonLink href={content.belief.button.href} variant="light">{content.belief.button.label}</ButtonLink>
        </div>
      </section>
    </SiteLayout>
  )
}

export async function getStaticProps() {
  return contentPageProps(await getSiteContent())
}

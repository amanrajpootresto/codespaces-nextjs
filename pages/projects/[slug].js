import { useRouter } from 'next/router'
import SiteLayout from '../../components/site/SiteLayout'
import { CtaPanel, ImageFrame, Section } from '../../components/sections/Shared'
import { pages, projects } from '../../data/site'
import { projectSchema, Seo } from '../../lib/seo'
import styles from '../../styles/pages.module.css'

export default function ProjectDetail({ project }) {
  const router = useRouter()
  const content = pages.project

  if (router.isFallback) return null

  return (
    <SiteLayout>
      <Seo
        title={project.name}
        path={`/projects/${project.slug}`}
        description={project.description}
        image={project.image}
        jsonLd={projectSchema(project)}
      />
      <section className={styles.projectDetailHero}>
        <div className={styles.projectLabels}>
          <span>{project.category}</span>
          <span>{project.location}</span>
          <span>{project.type}</span>
          {project.placeholder ? <span>{content.sampleLabel}</span> : null}
        </div>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <ImageFrame className={styles.detailHeroImage} src={project.image} alt={project.alt} />
      </section>
      <Section className={styles.projectSummary}>
        <div>
          <div className="eyebrow">{content.factsEyebrow}</div>
          <ul>
            <li>{content.factLabels.location}: {project.location}</li>
            <li>{content.factLabels.category}: {project.type}</li>
            <li>{content.factLabels.scope}: {project.scope}</li>
            <li>{content.factLabels.duration}: {project.duration}</li>
          </ul>
        </div>
        <div>
          <h2>{content.briefTitle}</h2>
          <p>{project.brief}</p>
        </div>
      </Section>
      <Section className={styles.caseGrid}>
        <article><h2>{content.challengeTitle}</h2><p>{project.challenge}</p></article>
        <article><h2>{content.solutionTitle}</h2><p>{project.solution}</p></article>
      </Section>
      <section className={styles.projectGalleryDetail} aria-label={`${project.name} ${content.galleryLabel}`}>
        {project.gallery.map((image, index) => (
          <img src={image} alt={`${project.name} ${content.galleryAlt} ${index + 1}`} key={`${image}-${index}`} />
        ))}
      </section>
      <CtaPanel
        {...content.cta}
      />
    </SiteLayout>
  )
}

export function getStaticPaths() {
  return { paths: projects.map((project) => ({ params: { slug: project.slug } })), fallback: false }
}

export function getStaticProps({ params }) {
  const project = projects.find((item) => item.slug === params.slug)
  return project ? { props: { project } } : { notFound: true }
}

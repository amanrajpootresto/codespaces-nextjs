import SiteLayout from '../../components/site/SiteLayout'
import { CtaPanel, ImageFrame, Section } from '../../components/sections/Shared'
import { projects } from '../../data/site'
import { projectSchema, Seo } from '../../lib/seo'
import styles from '../../styles/pages.module.css'

const project = projects.find((item) => item.slug === 'sandstone-residence')

export default function SandstoneResidence() {
  return (
    <SiteLayout>
      <Seo
        title="Sandstone Residence"
        path="/projects/sandstone-residence"
        description="A sample residential interior design case study for Design Essentials."
        image={project.image}
        jsonLd={projectSchema(project)}
      />
      <section className={styles.projectDetailHero}>
        <div className={styles.projectLabels}>
          <span>Residential</span>
          <span>{project.location}</span>
          <span>{project.type}</span>
          {project.placeholder ? <span>Sample content</span> : null}
        </div>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <ImageFrame className={styles.detailHeroImage} src={project.image} alt="Sandstone Residence living room" />
      </section>
      <Section className={styles.projectSummary}>
        <div>
          <div className="eyebrow">Project facts</div>
          <ul>
            <li>Location: {project.location}</li>
            <li>Category: Residential Interior</li>
            <li>Scope: {project.scope}</li>
            <li>Duration: {project.duration}</li>
          </ul>
        </div>
        <div>
          <h2>Client brief</h2>
          <p>{project.brief}</p>
        </div>
      </Section>
      <Section className={styles.caseGrid}>
        <article>
          <h2>Design challenge</h2>
          <p>{project.challenge}</p>
        </article>
        <article>
          <h2>Solution</h2>
          <p>{project.solution}</p>
        </article>
      </Section>
      <section className={styles.projectGalleryDetail}>
        {project.gallery.map((image, index) => (
          <img src={image} alt={`Sandstone Residence interior view ${index + 1}`} key={image} />
        ))}
      </section>
      <CtaPanel
        eyebrow="Inspired by this project?"
        title="Discuss a similar home interior."
        text="Bring your floor plan, rough budget and preferred references to the first consultation."
        href="/contact"
        label="Start Consultation"
      />
    </SiteLayout>
  )
}

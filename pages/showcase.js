import Link from 'next/link'
import { useMemo, useState } from 'react'
import SiteLayout from '../components/site/SiteLayout'
import { CtaPanel, ImageFrame, PageHero } from '../components/sections/Shared'
import { filters, projects } from '../data/site'
import { Seo } from '../lib/seo'
import styles from '../styles/pages.module.css'

function matchesFilter(project, filter) {
  return filter === 'all' || project.category === filter || project.tags.includes(filter)
}

function matchesSearch(project, search) {
  const query = search.trim().toLowerCase()
  if (!query) {
    return true
  }
  return [project.name, project.type, project.location, project.category, ...project.tags]
    .join(' ')
    .toLowerCase()
    .includes(query)
}

export default function Showcase() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter) && matchesSearch(project, search)),
    [activeFilter, search]
  )

  return (
    <SiteLayout>
      <Seo
        title="Showcase"
        path="/showcase"
        description="Interior design showcase with residential, commercial, office and renovation projects."
        image={projects[0].image}
      />
      <PageHero eyebrow="Showcase" title="Selected interiors, organised by space type.">
        Review sample residential, commercial, office, renovation and hospitality work. Search and filters are handled directly in the Next.js interface.
      </PageHero>
      <section className={styles.showcaseTools}>
        <div className={styles.filterBar} aria-label="Project filters">
          {filters.map((filter) => (
            <button
              className={activeFilter === filter.value ? styles.activeFilter : undefined}
              type="button"
              key={filter.value}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className={styles.searchShell}>
          <label htmlFor="project-search">Search projects</label>
          <input
            id="project-search"
            type="search"
            placeholder="Search by location, style or service"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <small>{visibleProjects.length} result{visibleProjects.length === 1 ? '' : 's'}</small>
        </div>
        {visibleProjects.length ? (
          <div className={styles.projectsGrid}>
            {visibleProjects.map((project) => (
              <article className={styles.projectCard} key={project.slug}>
                <Link href={project.slug === 'sandstone-residence' ? `/projects/${project.slug}` : '/projects/sandstone-residence'}>
                  <ImageFrame className={styles.projectImage} src={project.image} alt={project.alt} />
                  <div className={styles.projectMeta}>
                    <div>
                      <span>{project.type}</span>
                      <h3>{project.name}</h3>
                      {project.placeholder ? <em className={styles.placeholder}>Sample content</em> : null}
                    </div>
                    <span>{project.location}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>No matching projects</h2>
            <p>Try a broader search term or choose a different category.</p>
          </div>
        )}
      </section>
      <CtaPanel
        eyebrow="Like a project?"
        title="Bring reference images and your floor plan to the consultation."
        text="This helps the team understand your preferred style, budget direction and practical requirements."
        href="/contact"
        label="Plan a similar space"
      />
    </SiteLayout>
  )
}

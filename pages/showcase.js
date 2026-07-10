import Link from 'next/link'
import { useMemo, useState } from 'react'
import SiteLayout from '../components/site/SiteLayout'
import { CtaPanel, ImageFrame, PageHero } from '../components/sections/Shared'
import { filters, pages, projects } from '../data/site'
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
  const content = pages.showcase
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter) && matchesSearch(project, search)),
    [activeFilter, search]
  )

  return (
    <SiteLayout>
      <Seo
        {...content.seo}
        image={projects[0].image}
      />
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title}>
        {content.hero.text}
      </PageHero>
      <section className={styles.showcaseTools}>
        <div className={styles.filterBar} aria-label={content.filtersLabel}>
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
          <label htmlFor="project-search">{content.searchLabel}</label>
          <input
            id="project-search"
            type="search"
            placeholder={content.searchPlaceholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <small>{visibleProjects.length} {visibleProjects.length === 1 ? content.resultSingular : content.resultPlural}</small>
        </div>
        {visibleProjects.length ? (
          <div className={styles.projectsGrid}>
            {visibleProjects.map((project) => (
              <article className={styles.projectCard} key={project.slug}>
                <Link href={`/projects/${project.slug}`}>
                  <ImageFrame className={styles.projectImage} src={project.image} alt={project.alt} />
                  <div className={styles.projectMeta}>
                    <div>
                      <span>{project.type}</span>
                      <h3>{project.name}</h3>
                      {project.placeholder ? <em className={styles.placeholder}>{content.sampleLabel}</em> : null}
                    </div>
                    <span>{project.location}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>{content.empty.title}</h2>
            <p>{content.empty.text}</p>
          </div>
        )}
      </section>
      <CtaPanel
        {...content.cta}
      />
    </SiteLayout>
  )
}

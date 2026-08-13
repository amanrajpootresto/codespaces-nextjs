import Link from 'next/link'
import { useMemo, useState } from 'react'
import SiteLayout from '../components/site/SiteLayout'
import { CtaPanel, ImageFrame, PageHero } from '../components/sections/Shared'
import { contentPageProps, getSiteContent } from '../lib/get-site-content'
import { Seo } from '../lib/seo'
import styles from '../styles/pages.module.css'

function matchesFilter(project, filter) {
  return filter === 'all' || project.category === filter || project.tags?.includes(filter)
}

function normalizeSearchValue(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function matchesSearch(project, search, filters) {
  const query = normalizeSearchValue(search)
  if (!query) {
    return true
  }
  const categoryLabel = filters.find((filter) => filter.value === project.category)?.label
  const searchableContent = [
    project.name,
    project.type,
    project.location,
    project.category,
    categoryLabel,
    ...(project.tags || []),
    project.description,
    project.scope,
    project.brief,
    project.challenge,
    project.solution,
  ]
    .filter(Boolean)
    .join(' ')

  return normalizeSearchValue(searchableContent).includes(query)
}

export default function Showcase({ siteContent }) {
  const { filters = [], pages, projects = [] } = siteContent
  const content = pages.showcase
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter) && matchesSearch(project, search, filters)),
    [activeFilter, filters, search]
  )

  return (
    <SiteLayout>
      <Seo
        {...content.seo}
        image={projects[0]?.image}
      />
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title}>
        {content.hero.text}
      </PageHero>
      <section className={styles.showcaseTools} aria-label={content.filtersLabel}>
        <div className={styles.filterBar} aria-label={content.filtersLabel}>
          {filters.map((filter) => (
            <button
              className={activeFilter === filter.value ? styles.activeFilter : undefined}
              type="button"
              key={filter.value}
              aria-pressed={activeFilter === filter.value}
              aria-controls="showcase-results"
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className={styles.searchShell} role="search">
          <label htmlFor="project-search">{content.searchLabel}</label>
          <input
            id="project-search"
            type="search"
            placeholder={content.searchPlaceholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <small aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? content.resultSingular : content.resultPlural}</small>
        </div>
        <div id="showcase-results">
          {visibleProjects.length ? (
            <div className={`${styles.projectsGrid} ${visibleProjects.length === 2 ? styles.projectsGridTwo : ''}`}>
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
        </div>
      </section>
      <CtaPanel
        {...content.cta}
      />
    </SiteLayout>
  )
}

export async function getStaticProps() {
  return contentPageProps(await getSiteContent())
}

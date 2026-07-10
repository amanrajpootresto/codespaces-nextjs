import Head from 'next/head'
import fallbackContent from '../data/site.json'
import { useSiteContent } from '../components/site/SiteContentContext'

export function absoluteUrl(path = '/', siteConfig = fallbackContent.siteConfig) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.baseUrl}${normalized}`
}

export function Seo({ title, description, path = '/', image, jsonLd = [] }) {
  const { siteConfig } = useSiteContent()
  description = description || siteConfig.description
  const fullTitle = title ? `${title} - ${siteConfig.name}` : `${siteConfig.name} - ${siteConfig.defaultSeoTitle}`
  const canonical = absoluteUrl(path, siteConfig)
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd]

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      {schemas.filter(Boolean).map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  )
}

export function localBusinessSchema(siteConfig = fallbackContent.siteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.schema,
    },
    areaServed: siteConfig.serviceAreas,
  }
}

export function websiteSchema(siteConfig = fallbackContent.siteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.baseUrl,
  }
}

export function serviceSchema(services, siteConfig = fallbackContent.siteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
          '@type': 'LocalBusiness',
          name: siteConfig.name,
        },
        areaServed: siteConfig.serviceAreas,
      },
    })),
  }
}

export function projectSchema(project, siteConfig = fallbackContent.siteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    image: project.image,
    locationCreated: project.location,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      url: siteConfig.baseUrl,
    },
  }
}

import { getSiteContent } from '../lib/get-site-content'

function generateSitemap(siteConfig, routes) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteConfig.baseUrl}${route}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`
}

export async function getServerSideProps({ res }) {
  const { navItems, projects, siteConfig } = await getSiteContent()
  const routes = [...navItems.map((item) => item.href), ...projects.map((project) => `/projects/${project.slug}`)]
  res.setHeader('Content-Type', 'text/xml')
  res.write(generateSitemap(siteConfig, routes))
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}

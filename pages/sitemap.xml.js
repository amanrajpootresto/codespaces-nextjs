import { navItems, projects, siteConfig } from '../data/site'

const routes = [
  ...navItems.map((item) => item.href),
  ...projects.map((project) => `/projects/${project.slug}`),
]

function generateSitemap() {
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
  res.setHeader('Content-Type', 'text/xml')
  res.write(generateSitemap())
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}

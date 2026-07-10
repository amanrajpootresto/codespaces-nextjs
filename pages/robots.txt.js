import { getSiteContent } from '../lib/get-site-content'

function generateRobots(siteConfig) {
  return `User-agent: *
Allow: /

Sitemap: ${siteConfig.baseUrl}/sitemap.xml
`
}

export async function getServerSideProps({ res }) {
  const { siteConfig } = await getSiteContent()
  res.setHeader('Content-Type', 'text/plain')
  res.write(generateRobots(siteConfig))
  res.end()

  return { props: {} }
}

export default function Robots() {
  return null
}

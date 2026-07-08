import { siteConfig } from '../data/site'

function generateRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${siteConfig.baseUrl}/sitemap.xml
`
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain')
  res.write(generateRobots())
  res.end()

  return { props: {} }
}

export default function Robots() {
  return null
}

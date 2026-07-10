import fallbackContent from '../data/site.json'

let cachedContent
let cacheExpiresAt = 0
let pendingRequest

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function mergeContent(fallback, remote) {
  if (Array.isArray(remote)) return remote
  if (!isObject(remote)) return remote === undefined ? fallback : remote
  const result = isObject(fallback) ? { ...fallback } : {}
  Object.entries(remote).forEach(([key, value]) => { result[key] = mergeContent(result[key], value) })
  return result
}

function adaptStarterSheet(content) {
  const adapted = { ...content }
  const global = content.global
  const starterHome = content.home
  const hero = starterHome?.hero
  if (global || hero) {
    adapted.siteConfig = {
      ...(global?.siteName ? { name: global.siteName } : {}),
      ...(global?.phone ? { phone: global.phone, phoneHref: `tel:${global.phone.replace(/[^\d+]/g, '')}` } : {}),
    }
    adapted.pages = { home: {
      ...(hero?.title ? { title: hero.title } : {}),
      ...(hero?.description ? { intro: hero.description } : {}),
      ...(hero?.button ? { buttons: [hero.button, ...fallbackContent.pages.home.buttons.slice(1)] } : {}),
      ...(starterHome?.stats?.projects !== undefined ? { stats: [{ ...fallbackContent.pages.home.stats[0], value: String(starterHome.stats.projects) }, ...fallbackContent.pages.home.stats.slice(1)] } : {}),
    } }
    if (hero?.image) adapted.imageLibrary = { hero: hero.image }
    if (starterHome?.services?.length) {
      adapted.services = fallbackContent.services.map((service, index) => ({ ...service, ...(starterHome.services[index] || {}) }))
    }
  }
  delete adapted.global
  delete adapted.home
  return adapted
}

async function fetchSiteContent() {
  const contentApiUrl = process.env.CONTENT_API_URL || fallbackContent.contentApi?.url
  if (!contentApiUrl) return fallbackContent
  try {
    const response = await fetch(contentApiUrl)
    if (!response.ok) throw new Error(`Content API returned HTTP ${response.status}`)
    const result = await response.json()
    if (!result?.content || !isObject(result.content)) throw new Error('Content API response is missing content')
    if (result.errors?.length) console.error('Google Sheet content errors:', result.errors)
    return mergeContent(fallbackContent, adaptStarterSheet(result.content))
  } catch (error) {
    console.error('Unable to load remote website content; using local fallback:', error)
    return fallbackContent
  }
}

export async function getSiteContent() {
  const now = Date.now()
  if (cachedContent && now < cacheExpiresAt) return cachedContent
  if (pendingRequest) return pendingRequest

  pendingRequest = fetchSiteContent().then((content) => {
    cachedContent = content
    cacheExpiresAt = Date.now() + (fallbackContent.contentApi?.revalidateSeconds || 60) * 1000
    return content
  }).finally(() => { pendingRequest = undefined })

  return pendingRequest
}

export function contentPageProps(content) {
  return { props: { siteContent: content }, revalidate: fallbackContent.contentApi?.revalidateSeconds || 60 }
}

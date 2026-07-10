import { getSiteContent } from '../../lib/get-site-content'

const requiredFields = ['name', 'phone']

function isBlank(value) {
  return typeof value !== 'string' || value.trim().length === 0
}

function isValidEmail(value) {
  if (!value || typeof value !== 'string') {
    return true
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export default async function handler(req, res) {
  const { api } = await getSiteContent()
  const content = api.contact
  if (req.method !== content.allowedMethod) {
    res.setHeader('Allow', content.allowedMethod)
    return res.status(405).json({ ok: false, error: content.errors.method })
  }

  const body = req.body || {}
  const missing = requiredFields.filter((field) => isBlank(body[field]))

  if (missing.length > 0) {
    return res.status(400).json({
      ok: false,
      error: `${content.errors.requiredPrefix}${missing.length > 1 ? content.errors.requiredPlural : ''}: ${missing.join(', ')}`,
    })
  }

  if (!isValidEmail(body.email)) {
    return res.status(400).json({ ok: false, error: content.errors.email })
  }

  const enquiry = {
    name: clean(body.name),
    phone: clean(body.phone),
    email: clean(body.email),
    location: clean(body.location),
    projectType: clean(body.projectType) || content.defaults.projectType,
    area: clean(body.area),
    budget: clean(body.budget) || content.defaults.budget,
    timeline: clean(body.timeline),
    message: clean(body.message),
    receivedAt: new Date().toISOString(),
  }

  return res.status(200).json({
    ok: true,
    message: content.success,
    enquiry,
  })
}

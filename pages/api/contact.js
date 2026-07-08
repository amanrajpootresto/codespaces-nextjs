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

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = req.body || {}
  const missing = requiredFields.filter((field) => isBlank(body[field]))

  if (missing.length > 0) {
    return res.status(400).json({
      ok: false,
      error: `Missing required field${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`,
    })
  }

  if (!isValidEmail(body.email)) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' })
  }

  const enquiry = {
    name: clean(body.name),
    phone: clean(body.phone),
    email: clean(body.email),
    location: clean(body.location),
    projectType: clean(body.projectType) || 'Residential',
    area: clean(body.area),
    budget: clean(body.budget) || 'To be discussed',
    timeline: clean(body.timeline),
    message: clean(body.message),
    receivedAt: new Date().toISOString(),
  }

  return res.status(200).json({
    ok: true,
    message: 'Enquiry validated. Email/CRM delivery can be connected here.',
    enquiry,
  })
}

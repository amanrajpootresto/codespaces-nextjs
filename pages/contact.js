import { useState } from 'react'
import SiteLayout from '../components/site/SiteLayout'
import { ImageFrame, PageHero, Section } from '../components/sections/Shared'
import { imageLibrary, siteConfig } from '../data/site'
import { localBusinessSchema, Seo } from '../lib/seo'
import styles from '../styles/pages.module.css'

const initialState = {
  name: '',
  phone: '',
  email: '',
  location: '',
  projectType: 'Residential',
  area: '',
  budget: 'To be discussed',
  timeline: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus({ state: 'loading', message: 'Sending enquiry...' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()

      if (!response.ok) {
        setStatus({ state: 'error', message: result.error || 'Please review the form and try again.' })
        return
      }

      setStatus({
        state: 'success',
        message: 'Thanks. Your enquiry passed validation and is ready for email integration.',
      })
      setForm(initialState)
    } catch (error) {
      setStatus({ state: 'error', message: 'The enquiry could not be submitted. Please try again.' })
    }
  }

  return (
    <SiteLayout>
      <Seo
        title="Contact"
        path="/contact"
        description="Start a residential or commercial interior design project with Design Essentials."
        image={imageLibrary.consultation}
        jsonLd={localBusinessSchema()}
      />
      <PageHero eyebrow="Start a project" title="Share the space, timeline and budget direction.">
        This form qualifies residential and commercial enquiries before the first call.
      </PageHero>
      <Section className={styles.contactLayout}>
        <div className={styles.contactDetails}>
          <ImageFrame className={styles.contactImage} src={imageLibrary.consultation} alt="Interior consultation table" />
          <div className={styles.contactItem}>
            <span>Phone</span>
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          </div>
          <div className={styles.contactItem}>
            <span>Email</span>
            <a href={siteConfig.emailHref}>{siteConfig.email}</a>
          </div>
          <div className={styles.contactItem}>
            <span>Studio</span>
            <p>{siteConfig.address}</p>
          </div>
          <div className={styles.contactItem}>
            <span>Service areas</span>
            <p>{siteConfig.serviceAreas.join(', ')}</p>
          </div>
        </div>
        <form className={styles.projectForm} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={updateField} required />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={updateField} required />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={updateField} />
            </div>
            <div className={styles.field}>
              <label htmlFor="location">Project location</label>
              <input id="location" name="location" type="text" placeholder="Delhi / Gurgaon / Noida" value={form.location} onChange={updateField} />
            </div>
            <div className={styles.field}>
              <label htmlFor="projectType">Project type</label>
              <select id="projectType" name="projectType" value={form.projectType} onChange={updateField}>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Renovation</option>
                <option>Office</option>
                <option>Retail / Hospitality</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="area">Approx. area</label>
              <input id="area" name="area" type="text" placeholder="e.g. 1800 sq ft" value={form.area} onChange={updateField} />
            </div>
            <div className={styles.field}>
              <label htmlFor="budget">Budget range</label>
              <select id="budget" name="budget" value={form.budget} onChange={updateField}>
                <option>To be discussed</option>
                <option>Rs 2L-Rs 5L</option>
                <option>Rs 5L-Rs 10L</option>
                <option>Rs 10L-Rs 25L</option>
                <option>Rs 25L+</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="timeline">Expected start</label>
              <input id="timeline" name="timeline" type="text" placeholder="Immediately / 1 month / 3 months" value={form.timeline} onChange={updateField} />
            </div>
            <div className={`${styles.field} ${styles.full}`}>
              <label htmlFor="message">Project brief</label>
              <textarea id="message" name="message" placeholder="Tell us about the space, requirements and preferred style." value={form.message} onChange={updateField} />
            </div>
            <div className={`${styles.field} ${styles.full}`}>
              <label>File uploads</label>
              <p>File upload support can be connected with the final form service or CRM.</p>
            </div>
          </div>
          <button className={styles.formButton} type="submit" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? 'Sending...' : 'Send Enquiry'}
          </button>
          {status.message ? (
            <p className={`${styles.formMessage} ${status.state === 'error' ? styles.formError : ''}`} role="status">
              {status.message}
            </p>
          ) : null}
        </form>
      </Section>
    </SiteLayout>
  )
}

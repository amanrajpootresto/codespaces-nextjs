import { useState } from 'react'
import SiteLayout from '../components/site/SiteLayout'
import { ImageFrame, PageHero, Section } from '../components/sections/Shared'
import { contentPageProps, getSiteContent } from '../lib/get-site-content'
import { localBusinessSchema, Seo } from '../lib/seo'
import styles from '../styles/pages.module.css'

export default function Contact({ siteContent }) {
  const { api, imageLibrary, pages, siteConfig } = siteContent
  const content = pages.contact
  const initialState = content.initial
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus({ state: 'loading', message: content.status.loading })

    try {
      const response = await fetch(api.contact.endpoint, {
        method: api.contact.allowedMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()

      if (!response.ok) {
        setStatus({ state: 'error', message: result.error || content.status.fallbackError })
        return
      }

      setStatus({
        state: 'success',
        message: content.status.success,
      })
      setForm(initialState)
    } catch (error) {
      setStatus({ state: 'error', message: content.status.networkError })
    }
  }

  return (
    <SiteLayout>
      <Seo
        {...content.seo}
        image={imageLibrary.consultation}
        jsonLd={localBusinessSchema(siteConfig)}
      />
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title}>
        {content.hero.text}
      </PageHero>
      <Section className={styles.contactLayout}>
        <div className={styles.contactDetails}>
          <ImageFrame className={styles.contactImage} src={imageLibrary.consultation} alt={content.imageAlt} />
          <div className={styles.contactItem}>
            <span>{content.detailLabels.phone}</span>
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          </div>
          <div className={styles.contactItem}>
            <span>{content.detailLabels.email}</span>
            <a href={siteConfig.emailHref}>{siteConfig.email}</a>
          </div>
          <div className={styles.contactItem}>
            <span>{content.detailLabels.studio}</span>
            <p>{siteConfig.address}</p>
          </div>
          <div className={styles.contactItem}>
            <span>{content.detailLabels.areas}</span>
            <p>{siteConfig.serviceAreas.join(', ')}</p>
          </div>
        </div>
        <form className={styles.projectForm} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            {content.fields.map((field) => <div className={`${styles.field} ${field.full ? styles.full : ''}`} key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'select' ? <select id={field.name} name={field.name} value={form[field.name]} onChange={updateField}>{field.options.map((option) => <option key={option}>{option}</option>)}</select> : field.type === 'textarea' ? <textarea id={field.name} name={field.name} placeholder={field.placeholder} value={form[field.name]} onChange={updateField} /> : <input id={field.name} name={field.name} type={field.type} placeholder={field.placeholder} value={form[field.name]} onChange={updateField} required={field.required} />}
            </div>)}
            <div className={`${styles.field} ${styles.full}`}>
              <label>{content.upload.label}</label>
              <p>{content.upload.text}</p>
            </div>
          </div>
          <button className={styles.formButton} type="submit" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? content.status.sending : content.status.submit}
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

export async function getStaticProps() {
  return contentPageProps(await getSiteContent())
}

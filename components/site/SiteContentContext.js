import { createContext, useContext } from 'react'
import fallbackContent from '../../data/site.json'

const SiteContentContext = createContext(fallbackContent)

export function SiteContentProvider({ content, children }) {
  return <SiteContentContext.Provider value={content || fallbackContent}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  return useContext(SiteContentContext)
}

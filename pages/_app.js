import '../global.css'
import { SiteContentProvider } from '../components/site/SiteContentContext'

export default function MyApp({ Component, pageProps }) {
  return <SiteContentProvider content={pageProps.siteContent}><Component {...pageProps} /></SiteContentProvider>
}

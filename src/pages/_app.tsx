import type { AppProps } from 'next/app'

import { SiteLayout } from '@/components/layout/SiteLayout'
import '@/styles/fonts.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  )
}

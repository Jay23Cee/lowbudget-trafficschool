import { ReactNode } from 'react'
import { useRouter } from 'next/router'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { StickyStateCta } from '@/components/state/StickyStateCta'

interface SiteLayoutProps {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  return (
    <div className='min-h-screen bg-brand-surface text-brand-ink'>
      <div className='bg-brand-primary px-4 py-2 text-center text-xs font-semibold tracking-wide text-brand-ink'>
        State-by-state traffic school guidance <span aria-hidden='true'>•</span> Affiliate-supported provider links
      </div>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      {isHomePage ? null : <StickyStateCta />}
    </div>
  )
}

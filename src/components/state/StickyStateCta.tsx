import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { AffiliateButton } from '@/components/AffiliateButton'
import { findStateBySlug } from '@/data/states'

export function StickyStateCta() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const stateSlug = getPageStateSlug(router.pathname, router.query.state)
  const state = stateSlug ? findStateBySlug(stateSlug) : undefined

  useEffect(() => {
    function onScroll(): void {
      setIsVisible(window.scrollY > 640)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-brand-border-strong bg-brand-ink/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 text-white shadow-2xl transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        {state ? (
          <>
            <p className='text-sm font-medium text-slate-100 md:text-base'>
              Ready to review the current {state.name} provider terms?
            </p>
            <AffiliateButton
              stateSlug={state.slug}
              text={
                state.slug === 'california'
                  ? 'View Provider Option'
                  : 'Check provider terms'
              }
              buttonLocation={state.slug === 'california' ? 'sticky_mobile' : 'sticky_state_cta'}
              className='w-full md:w-auto'
            />
          </>
        ) : (
          <>
            <p className='text-sm font-medium text-slate-100 md:text-base'>
              Got a California ticket? Check your next step before reviewing a provider.
            </p>
            <AffiliateButton
              stateSlug='california'
              text='View Provider Option'
              buttonLocation='sticky_mobile'
              className='w-full md:w-auto'
            />
          </>
        )}
      </div>
    </div>
  )
}

function getPageStateSlug(
  pathname: string,
  queryState: string | string[] | undefined
): string | undefined {
  if (pathname === '/california') {
    return 'california'
  }

  if (pathname !== '/online-traffic-school/[state]' || typeof queryState !== 'string') {
    return undefined
  }

  return queryState
}

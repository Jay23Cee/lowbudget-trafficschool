import Link from 'next/link'

import { US_STATES } from '@/data/states'
import { getStateGuideRoute } from '@/lib/routes'

interface StateLinkGridProps {
  onlySlugs?: string[]
  excludeSlugs?: string[]
  limit?: number
  showDescriptions?: boolean
}

export function StateLinkGrid({
  onlySlugs,
  excludeSlugs = [],
  limit,
  showDescriptions = false,
}: StateLinkGridProps) {
  const excludedSlugs = new Set(excludeSlugs)
  const matchingStates = onlySlugs
    ? US_STATES.filter((state) => onlySlugs.includes(state.slug))
    : US_STATES
  const displayedStates = matchingStates
    .filter((state) => !excludedSlugs.has(state.slug))
    .slice(0, limit)

  return (
    <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
      {displayedStates.map((state) => (
        <li key={state.slug}>
          <Link
            href={getStateGuideRoute(state.slug)}
            className='group block h-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition hover:border-brand-primary hover:bg-brand-surface-alt'
          >
            <span className='flex items-center justify-between gap-3'>
              <span className='font-semibold text-brand-ink group-hover:text-brand-primary'>
                {state.name}
              </span>
              <span className='rounded-md bg-brand-surface px-2 py-1 text-xs font-semibold text-slate-700 ring-1 ring-brand-border'>
                {state.code}
              </span>
            </span>
            {showDescriptions ? (
              <>
                <span className='mt-2 block leading-relaxed text-slate-600'>
                  Review eligibility questions, cost notes, and provider next steps for {state.name}.
                </span>
                <span className='mt-3 inline-flex font-semibold text-brand-accent group-hover:text-brand-primary'>
                  View guide
                </span>
              </>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}

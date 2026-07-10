import Link from 'next/link'
import { FaExternalLinkAlt, FaShieldAlt, FaUniversity } from 'react-icons/fa'

import { getStateAffiliateRecommendation } from '@/data/affiliate-links'

interface TrustDisclosureCardProps {
  stateName: string
  stateSlug: string
  className?: string
}

export function TrustDisclosureCard({
  stateName,
  stateSlug,
  className = '',
}: TrustDisclosureCardProps) {
  const { entry, provider } = getStateAffiliateRecommendation(stateSlug)

  return (
    <div className={`rounded-lg border border-brand-border bg-white p-6 shadow-sm ${className}`}>
      <div className='space-y-5'>
        <div className='space-y-2'>
          <p className='text-sm font-semibold text-brand-accent'>Trust and disclosure</p>
          <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink'>
            Check acceptance before you leave this guide
          </h2>
          <p className='leading-relaxed text-slate-700'>{entry.approvalNotes}</p>
        </div>

        <div className='space-y-4 text-sm leading-relaxed text-slate-700'>
          <div className='flex gap-3'>
            <FaUniversity className='mt-1 shrink-0 text-brand-ink' aria-hidden='true' />
            <p>
              LowBudgetTrafficSchool is a referral guide and does not provide traffic school
              courses directly.
            </p>
          </div>
          <div className='flex gap-3'>
            <FaShieldAlt className='mt-1 shrink-0 text-brand-success' aria-hidden='true' />
            <p>{provider.disclosureText}</p>
          </div>
          <div className='flex gap-3'>
            <FaExternalLinkAlt className='mt-1 shrink-0 text-brand-accent' aria-hidden='true' />
            <p>
              The provider handoff for {stateName} uses the default TrafficSchool101 affiliate
              link. Visit the provider for current price, terms, support, certificate handling, and
              enrollment details.
            </p>
          </div>
        </div>

        <Link
          href='/affiliate-disclosure'
          className='inline-flex font-semibold text-brand-accent hover:text-brand-primary'
        >
          Read affiliate disclosure
        </Link>
      </div>
    </div>
  )
}

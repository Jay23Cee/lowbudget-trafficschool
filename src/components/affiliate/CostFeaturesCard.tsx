import { FaClipboardCheck, FaDollarSign, FaRegClock } from 'react-icons/fa'

import { AffiliateButton } from '@/components/AffiliateButton'
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure'
import { getStateAffiliateRecommendation } from '@/data/affiliate-links'
import {
  getAffiliatePriceDetail,
  getAffiliatePriceLabel,
  UNVERIFIED_PRICE_LABEL,
} from '@/lib/affiliate-display'

interface CostFeaturesCardProps {
  stateName: string
  stateSlug: string
  className?: string
}

const COST_FACTORS = [
  {
    title: 'Course type',
    description:
      'Ticket dismissal, defensive driving, insurance discount, and employer requirements may use different pricing.',
    icon: FaDollarSign,
  },
  {
    title: 'Completion proof',
    description:
      'Certificate delivery, court reporting, and expedited processing can affect the final cost.',
    icon: FaClipboardCheck,
  },
  {
    title: 'Provider terms',
    description:
      'Promotions, refund windows, and processing fees can change before you enroll.',
    icon: FaRegClock,
  },
]

export function CostFeaturesCard({
  stateName,
  stateSlug,
  className = '',
}: CostFeaturesCardProps) {
  const recommendation = getStateAffiliateRecommendation(stateSlug)
  const priceLabel = getAffiliatePriceLabel(recommendation.pricing)
  const heading =
    priceLabel === UNVERIFIED_PRICE_LABEL
      ? `Check current ${stateName} price`
      : priceLabel

  return (
    <div className={`rounded-lg border border-brand-border bg-white p-6 shadow-sm ${className}`}>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <p className='text-sm font-semibold text-brand-accent'>Cost guidance</p>
          <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink'>
            {heading}
          </h2>
          <p className='leading-relaxed text-slate-700'>
            {getAffiliatePriceDetail(stateName, recommendation.pricing)}
          </p>
        </div>

        <div className='grid gap-3'>
          {COST_FACTORS.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.title} className='flex gap-3 text-sm leading-relaxed text-slate-700'>
                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-surface-alt text-brand-success'>
                  <Icon aria-hidden='true' />
                </span>
                <span>
                  <strong className='text-brand-ink'>{item.title}:</strong> {item.description}
                </span>
              </div>
            )
          })}
        </div>

        <div className='space-y-3'>
          <AffiliateButton
            stateSlug={stateSlug}
            text={`Check ${stateName} Price`}
            buttonLocation='provider_card'
            variant='secondary'
          />
          <AffiliateDisclosure />
        </div>
      </div>
    </div>
  )
}

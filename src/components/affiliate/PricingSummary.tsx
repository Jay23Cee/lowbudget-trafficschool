import { AffiliateButton } from '@/components/AffiliateButton'
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure'
import { getStateAffiliateRecommendation } from '@/data/affiliate-links'
import { getAffiliatePriceDetail, getAffiliatePriceLabel } from '@/lib/affiliate-display'

interface PricingSummaryProps {
  stateName: string
  stateSlug: string
  className?: string
}

export function PricingSummary({
  stateName,
  stateSlug,
  className = '',
}: PricingSummaryProps) {
  const recommendation = getStateAffiliateRecommendation(stateSlug)
  const { pricing, provider } = recommendation

  if (!pricing || pricing.verificationStatus !== 'verified') {
    return (
      <div className={`rounded-lg border border-brand-border bg-white p-6 shadow-sm ${className}`}>
        <div className='space-y-3'>
          <p className='text-sm font-semibold text-brand-accent'>Current cost</p>
          <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink'>
            Check the latest {stateName} price
          </h2>
          <p className='leading-relaxed text-slate-700'>
            We do not have a manually verified price for {stateName} in the site data yet. Traffic
            school pricing may vary by state, course type, provider, certificate delivery, and any
            court or agency requirements.
          </p>
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

  return (
    <div className={`rounded-lg border border-brand-border bg-white p-6 shadow-sm ${className}`}>
      <div className='space-y-3'>
        <p className='text-sm font-semibold text-brand-accent'>Verified provider price</p>
        <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink'>
          {getAffiliatePriceLabel(pricing)}
        </h2>
        {pricing.salePriceCents !== undefined && pricing.basePriceCents !== undefined ? (
          <p className='text-sm text-slate-600'>
            Base price: {formatCurrency(pricing.basePriceCents, pricing.currency)}
          </p>
        ) : null}
        <p className='leading-relaxed text-slate-700'>
          Price for {provider.displayName} in {stateName}.{' '}
          {getAffiliatePriceDetail(stateName, pricing)}
        </p>
        <p className='text-xs leading-relaxed text-slate-600'>Source: {pricing.source}</p>
      </div>
    </div>
  )
}

function formatCurrency(cents: number, currency: 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    currency,
    style: 'currency',
  }).format(cents / 100)
}

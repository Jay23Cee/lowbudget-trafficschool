import { AffiliateButton } from '@/components/AffiliateButton'
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure'
import { getStateAffiliateRecommendation } from '@/data/affiliate-links'
import {
  formatAffiliateDate,
  getAffiliatePriceLabel,
  UNVERIFIED_PRICE_LABEL,
} from '@/lib/affiliate-display'

interface ProviderComparisonTableProps {
  stateName: string
  stateSlug: string
  className?: string
}

export function ProviderComparisonTable({
  stateName,
  stateSlug,
  className = '',
}: ProviderComparisonTableProps) {
  const recommendations = [getStateAffiliateRecommendation(stateSlug)]

  return (
    <div className={`rounded-lg border border-brand-border bg-white p-6 shadow-sm ${className}`}>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <p className='text-sm font-semibold text-brand-accent'>Provider handoff</p>
          <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink'>
            Current provider option for {stateName}
          </h2>
          <p className='leading-relaxed text-slate-700'>
            This is a single affiliate handoff, not a full provider marketplace. Confirm acceptance,
            pricing, reporting, and support terms before paying.
          </p>
        </div>

        <div className='grid gap-4 md:hidden'>
          {recommendations.map(({ entry, pricing, provider }) => {
            const priceLabel = getAffiliatePriceLabel(pricing)
            const priceDetail =
              pricing?.verificationStatus === 'verified'
                ? `Verified ${formatAffiliateDate(pricing.lastVerified)}`
                : 'Visit provider for current price'
            const handoffLabel = entry.isStateSpecific
              ? `${stateName} provider destination`
              : `Internal redirect through /go/${stateSlug}`

            return (
              <div
                key={`${entry.stateSlug}-${provider.id}`}
                className='rounded-lg border border-brand-border bg-brand-surface p-4'
              >
                <div className='space-y-3 text-sm text-slate-700'>
                  <div>
                    <p className='text-xs font-semibold uppercase text-slate-600'>Provider</p>
                    <p className='mt-1 font-semibold text-brand-ink'>{provider.displayName}</p>
                  </div>
                  <div>
                    <p className='text-xs font-semibold uppercase text-slate-600'>Price status</p>
                    <p className='mt-1 font-semibold text-brand-ink'>{priceLabel}</p>
                    <p className='mt-1 text-xs text-slate-600'>
                      {priceLabel === UNVERIFIED_PRICE_LABEL ? priceDetail : pricing?.priceLabel}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs font-semibold uppercase text-slate-600'>Handoff</p>
                    <p className='mt-1'>{handoffLabel}</p>
                  </div>
                  <div>
                    <p className='text-xs font-semibold uppercase text-slate-600'>
                      Verify before paying
                    </p>
                    <p className='mt-1'>{entry.approvalNotes}</p>
                  </div>
                  <AffiliateButton
                    stateSlug={stateSlug}
                    text={`Check ${stateName} Price`}
                    buttonLocation='provider_handoff'
                    className='w-full min-h-10 px-4 py-2'
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className='hidden overflow-x-auto md:block'>
          <table className='w-full min-w-[720px] border-collapse text-left text-sm'>
            <thead>
              <tr className='border-b border-brand-border-strong text-slate-700'>
                <th scope='col' className='py-3 pr-4 font-semibold'>
                  Provider
                </th>
                <th scope='col' className='py-3 pr-4 font-semibold'>
                  Price status
                </th>
                <th scope='col' className='py-3 pr-4 font-semibold'>
                  Handoff
                </th>
                <th scope='col' className='py-3 pr-4 font-semibold'>
                  Verify before paying
                </th>
                <th scope='col' className='py-3 font-semibold'>
                  Next step
                </th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map(({ entry, pricing, provider }) => {
                const priceLabel = getAffiliatePriceLabel(pricing)
                const priceDetail =
                  pricing?.verificationStatus === 'verified'
                    ? `Verified ${formatAffiliateDate(pricing.lastVerified)}`
                    : 'Visit provider for current price'

                return (
                  <tr
                    key={`${entry.stateSlug}-${provider.id}`}
                    className='border-b border-brand-border'
                  >
                    <td className='py-4 pr-4 align-top'>
                      <div className='font-semibold text-brand-ink'>{provider.displayName}</div>
                    </td>
                    <td className='py-4 pr-4 align-top'>
                      <div className='font-semibold text-brand-ink'>{priceLabel}</div>
                      <div className='mt-1 text-xs text-slate-600'>
                        {priceLabel === UNVERIFIED_PRICE_LABEL ? priceDetail : pricing?.priceLabel}
                      </div>
                    </td>
                    <td className='py-4 pr-4 align-top text-slate-700'>
                      {entry.isStateSpecific
                        ? `${stateName} provider destination`
                        : `Internal redirect through /go/${stateSlug}`}
                    </td>
                    <td className='py-4 pr-4 align-top text-slate-700'>{entry.approvalNotes}</td>
                    <td className='py-4 align-top'>
                      <AffiliateButton
                        stateSlug={stateSlug}
                        text={`Check ${stateName} Price`}
                        buttonLocation='provider_handoff'
                        className='min-h-10 px-4 py-2'
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <AffiliateDisclosure />
      </div>
    </div>
  )
}

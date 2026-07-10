import { FaCheckCircle } from 'react-icons/fa'

import { AffiliateButton } from '@/components/AffiliateButton'
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure'
import { getStateAffiliateRecommendation } from '@/data/affiliate-links'
import { getAffiliatePriceLabel } from '@/lib/affiliate-display'

interface ProviderRecommendationCardProps {
  stateName: string
  stateSlug: string
  eyebrow?: string
  title?: string
  description?: string
  supportingText?: string
  bulletItems?: string[]
  ctaText?: string
  buttonLocation?: string
  className?: string
}

export function ProviderRecommendationCard({
  stateName,
  stateSlug,
  eyebrow = 'Provider handoff',
  title,
  description,
  supportingText,
  bulletItems,
  ctaText,
  buttonLocation,
  className = '',
}: ProviderRecommendationCardProps) {
  const recommendation = getStateAffiliateRecommendation(stateSlug)
  const { provider, pricing } = recommendation
  const defaultCtaText =
    stateSlug === 'california'
      ? 'View Provider Option'
      : `Check ${stateName} Provider Terms`
  const priceLabel = getAffiliatePriceLabel(pricing)
  const resolvedButtonLocation =
    buttonLocation ??
    (stateSlug === 'california' ? 'provider_card' : 'provider_handoff_cta')
  const resolvedTitle = title ?? `Provider handoff for ${stateName}`
  const resolvedDescription =
    description ??
    `${provider.displayName} is the currently configured affiliate provider handoff for drivers comparing online traffic school options. Before enrolling, confirm the authority handling your requirement allows online completion for your situation.`
  const resolvedSupportingText =
    supportingText ??
    `For ${stateName}, this site uses the default affiliate link until a state-specific destination is independently verified.`
  const resolvedBulletItems = bulletItems ?? [
    `Provider: ${provider.name}`,
    `Price: ${priceLabel}.`,
    'Use after checking acceptance, deadline, reporting, and current provider terms.',
  ]

  return (
    <div
      id='provider-handoff-card'
      className={`rounded-lg border border-brand-border bg-white p-6 shadow-sm ${className}`}
    >
      <div className='flex flex-col gap-5'>
        <div className='space-y-3'>
          <p className='text-sm font-semibold text-brand-accent'>{eyebrow}</p>
          <div className='space-y-2'>
            <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink'>
              {resolvedTitle}
            </h2>
            <p className='leading-relaxed text-slate-700'>{resolvedDescription}</p>
            <p className='text-sm leading-relaxed text-slate-600'>{resolvedSupportingText}</p>
          </div>
        </div>

        <ul className='grid gap-3 text-sm text-slate-700'>
          {resolvedBulletItems.map((item) => (
            <li key={item} className='flex gap-3'>
              <FaCheckCircle className='mt-1 shrink-0 text-brand-success' aria-hidden='true' />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className='space-y-3'>
          <AffiliateButton
            stateSlug={stateSlug}
            text={ctaText ?? defaultCtaText}
            buttonLocation={resolvedButtonLocation}
          />
          <AffiliateDisclosure />
        </div>
      </div>
    </div>
  )
}

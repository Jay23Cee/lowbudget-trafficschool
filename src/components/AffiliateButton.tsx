import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { getPrimaryAffiliateProvider } from '@/data/affiliate-links'
import { getAffiliateRedirectRoute, getTrafficSchool101RedirectRoute } from '@/lib/routes'

type AffiliateButtonVariant = 'primary' | 'secondary'

interface GtagEventParameters {
  event_category: string
  event_label?: string
  button_location?: string
  state_slug?: string
  provider_id: string
  provider_name: string
}

declare global {
  interface Window {
    gtag?: (command: 'event', action: string, parameters: GtagEventParameters) => void
  }
}

interface AffiliateButtonProps {
  stateSlug?: string
  text?: string
  buttonLocation?: string
  trackingLabel?: string
  variant?: AffiliateButtonVariant
  className?: string
}

const BASE_CLASSES =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition'

const VARIANT_CLASSES: Record<AffiliateButtonVariant, string> = {
  primary: 'bg-brand-primary text-brand-ink hover:bg-brand-primary-hover',
  secondary:
    'border border-brand-border-strong bg-white text-brand-primary hover:bg-brand-surface-alt',
}

export function AffiliateButton({
  stateSlug,
  text = 'Check current price',
  buttonLocation,
  trackingLabel,
  variant = 'primary',
  className = '',
}: AffiliateButtonProps) {
  const provider = getPrimaryAffiliateProvider()
  const href = stateSlug
    ? getAffiliateRedirectRoute(stateSlug)
    : getTrafficSchool101RedirectRoute()
  const resolvedButtonLocation = buttonLocation ?? trackingLabel

  function handleClick(): void {
    if (!resolvedButtonLocation || typeof window === 'undefined') {
      return
    }

    window.gtag?.('event', 'affiliate_cta_click', {
      event_category: 'affiliate',
      event_label: resolvedButtonLocation,
      button_location: resolvedButtonLocation,
      state_slug: stateSlug,
      provider_id: provider.id,
      provider_name: provider.displayName,
    })
  }

  return (
    <Link
      href={href}
      rel='sponsored nofollow'
      data-affiliate-label={resolvedButtonLocation}
      data-affiliate-provider={provider.id}
      data-state-slug={stateSlug}
      onClick={handleClick}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {text}
      <FaExternalLinkAlt className='shrink-0' aria-hidden='true' />
    </Link>
  )
}

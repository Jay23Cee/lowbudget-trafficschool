import { formatDateOnly } from '@/lib/date-format'
import { AffiliatePricingEntry } from '@/types/site'

export const UNVERIFIED_PRICE_LABEL = 'Check current price'

export function getAffiliatePriceLabel(pricing?: AffiliatePricingEntry): string {
  if (!pricing || pricing.verificationStatus !== 'verified') {
    return UNVERIFIED_PRICE_LABEL
  }

  const displayedPrice = pricing.salePriceCents ?? pricing.basePriceCents

  if (displayedPrice === undefined) {
    return pricing.priceLabel || UNVERIFIED_PRICE_LABEL
  }

  return formatCurrency(displayedPrice, pricing.currency)
}

export function getAffiliatePriceDetail(
  stateName: string,
  pricing?: AffiliatePricingEntry
): string {
  if (!pricing || pricing.verificationStatus !== 'verified') {
    return `Pricing for ${stateName} is not manually verified in our site data. Visit the provider for the current price before enrolling.`
  }

  return `Last verified on ${formatAffiliateDate(pricing.lastVerified)}. ${pricing.notes}`
}

export function formatAffiliateDate(value: string): string {
  return formatDateOnly(value)
}

function formatCurrency(cents: number, currency: 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    currency,
    style: 'currency',
  }).format(cents / 100)
}

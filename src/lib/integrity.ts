import {
  AFFILIATE_DESTINATIONS,
  AFFILIATE_PRICING,
  AFFILIATE_PROVIDERS,
  AFFILIATE_REQUIRED_QUERY_PARAMS,
  buildAffiliateUrl,
  getAffiliateProvider,
  getStateAffiliateEntry,
} from '@/data/affiliate-links'
import { US_STATES } from '@/data/states'
import { getAllGoRoutes, getAllIndexableRoutes } from '@/lib/routes'
import { loadAllStateContent } from '@/lib/state-content'

function assertValidUrl(url: string): void {
  try {
    const parsedUrl = new URL(url)
    if (parsedUrl.protocol !== 'https:') {
      throw new Error()
    }
  } catch (error) {
    throw new Error(`Invalid HTTPS URL: ${url}`)
  }
}

export function assertAffiliateIntegrity(): void {
  Object.values(AFFILIATE_PROVIDERS).forEach((provider) => {
    assertValidUrl(provider.baseUrl)

    if (!provider.displayName.trim()) {
      throw new Error(`Missing display name for affiliate provider "${provider.id}"`)
    }

    if (!provider.disclosureText.trim()) {
      throw new Error(`Missing disclosure text for affiliate provider "${provider.id}"`)
    }

    if (!provider.defaultCtaText.trim()) {
      throw new Error(`Missing default CTA text for affiliate provider "${provider.id}"`)
    }

    if (!provider.approvalNotes.trim()) {
      throw new Error(`Missing approval notes for affiliate provider "${provider.id}"`)
    }

    if (!provider.certificateDeliveryNotes.trim()) {
      throw new Error(`Missing certificate delivery notes for affiliate provider "${provider.id}"`)
    }
  })

  US_STATES.forEach((state) => {
    const destination = AFFILIATE_DESTINATIONS[state.slug]

    if (!destination) {
      throw new Error(`Missing affiliate destination for "${state.slug}"`)
    }

    getAffiliateProvider(destination.providerId)

    const resolvedDestinationUrl = new URL(destination.pathname, destination.baseUrl).toString()
    assertValidUrl(resolvedDestinationUrl)

    const entry = getStateAffiliateEntry(state.slug)

    if (!entry) {
      throw new Error(`Missing affiliate provider entry for "${state.slug}"`)
    }

    if (entry.directStateUrl) {
      assertValidUrl(entry.directStateUrl)
    }

    if (entry.destinationUrl) {
      assertValidUrl(entry.destinationUrl)
    }

    if (!entry.ctaText.trim()) {
      throw new Error(`Missing CTA text for affiliate provider entry "${state.slug}"`)
    }

    if (!entry.approvalNotes.trim()) {
      throw new Error(`Missing approval notes for affiliate provider entry "${state.slug}"`)
    }

    if (!entry.certificateDeliveryNotes.trim()) {
      throw new Error(
        `Missing certificate delivery notes for affiliate provider entry "${state.slug}"`
      )
    }

    const finalUrl = buildAffiliateUrl(state.slug)
    assertValidUrl(finalUrl)

    const parsedUrl = new URL(finalUrl)

    if ((parsedUrl.pathname === '/' || parsedUrl.pathname === '') && !parsedUrl.search) {
      throw new Error(`Affiliate destination resolves to homepage for "${state.slug}"`)
    }

    AFFILIATE_REQUIRED_QUERY_PARAMS.forEach((queryKey) => {
      if (!parsedUrl.searchParams.get(queryKey)) {
        throw new Error(`Missing required affiliate param "${queryKey}" for "${state.slug}"`)
      }
    })

    if (destination.includeStateParam) {
      if (parsedUrl.searchParams.get('state') !== state.slug) {
        throw new Error(`Missing fallback state param for "${state.slug}"`)
      }

      return
    }

    if (parsedUrl.searchParams.has('state')) {
      throw new Error(`Unexpected state query param for deep-linked state "${state.slug}"`)
    }
  })

  AFFILIATE_PRICING.forEach((pricing) => {
    const provider = getAffiliateProvider(pricing.providerId)

    if (!US_STATES.some((state) => state.slug === pricing.stateSlug)) {
      throw new Error(`Unknown pricing state slug "${pricing.stateSlug}"`)
    }

    if (!pricing.lastVerified.trim()) {
      throw new Error(
        `Missing pricing verification date for "${provider.displayName}" in "${pricing.stateSlug}"`
      )
    }

    if (!pricing.priceLabel.trim()) {
      throw new Error(
        `Missing pricing label for "${provider.displayName}" in "${pricing.stateSlug}"`
      )
    }

    if (!['verified', 'unverified'].includes(pricing.verificationStatus)) {
      throw new Error(
        `Invalid pricing verification status for "${provider.displayName}" in "${pricing.stateSlug}"`
      )
    }

    if (
      pricing.basePriceCents !== undefined &&
      (!Number.isInteger(pricing.basePriceCents) || pricing.basePriceCents < 0)
    ) {
      throw new Error(`Invalid base price for "${provider.displayName}" in "${pricing.stateSlug}"`)
    }

    if (
      pricing.salePriceCents !== undefined &&
      (!Number.isInteger(pricing.salePriceCents) || pricing.salePriceCents < 0)
    ) {
      throw new Error(`Invalid sale price for "${provider.displayName}" in "${pricing.stateSlug}"`)
    }
  })
}

export function assertInternalLinkIntegrity(referencedLinks: string[]): void {
  const knownRoutes = new Set([...getAllIndexableRoutes(), ...getAllGoRoutes()])

  referencedLinks.forEach((link) => {
    if (!knownRoutes.has(link)) {
      throw new Error(`Broken internal link detected: "${link}"`)
    }
  })
}

export function assertSiteIntegrity(referencedLinks: string[]): void {
  loadAllStateContent()
  assertAffiliateIntegrity()
  assertInternalLinkIntegrity(referencedLinks)
}

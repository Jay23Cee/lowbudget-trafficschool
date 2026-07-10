import { US_STATES } from '@/data/states'
import { getAffiliateRedirectRoute } from '@/lib/routes'
import {
  AffiliateDestination,
  AffiliatePricingEntry,
  AffiliateProvider,
  StateAffiliateProviderEntry,
  StateAffiliateRecommendation,
} from '@/types/site'

export const affiliateLinks = {
  trafficSchool101: {
    name: 'TrafficSchool101',
    campaign: '50% Commission plus 0% Customer Discount',
    defaultUrl: 'https://www.traffic101.com?a_aid=6466716d66623&a_bid=eda15e51',
  },
} as const

export const TRAFFIC_SCHOOL_101_PROVIDER_ID = 'traffic-school-101'

const LAST_AFFILIATE_REVIEWED = '2026-07-09'
const TRAFFIC_SCHOOL_101_DEFAULT_URL = new URL(affiliateLinks.trafficSchool101.defaultUrl)
const TRAFFIC_SCHOOL_101_TRACKING_PARAMS = Object.fromEntries(
  TRAFFIC_SCHOOL_101_DEFAULT_URL.searchParams.entries()
) as Record<string, string>

export const AFFILIATE_PROVIDERS: Record<string, AffiliateProvider> = {
  [TRAFFIC_SCHOOL_101_PROVIDER_ID]: {
    id: TRAFFIC_SCHOOL_101_PROVIDER_ID,
    name: affiliateLinks.trafficSchool101.name,
    displayName: affiliateLinks.trafficSchool101.name,
    campaign: affiliateLinks.trafficSchool101.campaign,
    defaultUrl: affiliateLinks.trafficSchool101.defaultUrl,
    baseUrl: TRAFFIC_SCHOOL_101_DEFAULT_URL.origin,
    defaultPathname: TRAFFIC_SCHOOL_101_DEFAULT_URL.pathname || '/',
    trackingParams: TRAFFIC_SCHOOL_101_TRACKING_PARAMS,
    defaultCtaText: 'Check current price',
    disclosureText:
      'Low Budget Traffic School is an independent affiliate and referral website. We are not the California DMV, a court, or a traffic school operator. We may earn a commission when users click our links and enroll with a third party traffic school provider.',
    termsNotes:
      'Confirm eligibility, court acceptance, pricing, certificate handling, and reporting details before enrolling.',
    approvalNotes:
      'Course acceptance can vary by court, citation, deadline, insurer, employer, and driving record. Confirm approval before enrolling.',
    certificateDeliveryNotes:
      'Certificate delivery, completion reporting, and processing timing may vary by provider, state, and course type.',
  },
}

export const AFFILIATE_REQUIRED_QUERY_PARAMS = Object.keys(
  TRAFFIC_SCHOOL_101_TRACKING_PARAMS
)

export const STATE_AFFILIATE_PROVIDERS: StateAffiliateProviderEntry[] = US_STATES.map((state) => {
  const provider = AFFILIATE_PROVIDERS[TRAFFIC_SCHOOL_101_PROVIDER_ID]

  return {
    stateSlug: state.slug,
    providerId: TRAFFIC_SCHOOL_101_PROVIDER_ID,
    destinationUrl: affiliateLinks.trafficSchool101.defaultUrl,
    isStateSpecific: false,
    verificationStatus: 'fallback',
    lastVerified: LAST_AFFILIATE_REVIEWED,
    approvalNotes: `No state-specific TrafficSchool101 destination is configured for ${state.name}. Confirm court, DMV, agency, insurer, or employer acceptance before enrolling.`,
    certificateDeliveryNotes:
      'Confirm whether completion proof is reported automatically, sent by email, mailed, or submitted by you before paying.',
    isRecommended: true,
    ctaText: provider.defaultCtaText,
    notes: `Using the default TrafficSchool101 affiliate link for ${state.name} until any state-specific destination is confirmed through the affiliate dashboard Dynamic Link tool.`,
  }
})

export const AFFILIATE_PRICING: AffiliatePricingEntry[] = []

export const AFFILIATE_DESTINATIONS: Record<string, AffiliateDestination> =
  STATE_AFFILIATE_PROVIDERS.reduce<Record<string, AffiliateDestination>>(
    (accumulator, entry) => {
      const provider = getAffiliateProvider(entry.providerId)

      accumulator[entry.stateSlug] = {
        stateSlug: entry.stateSlug,
        providerId: provider.id,
        providerName: provider.displayName,
        baseUrl: provider.baseUrl,
        pathname: provider.defaultPathname,
        includeStateParam: false,
        isStateSpecific: false,
        verificationStatus: entry.verificationStatus,
        lastVerified: entry.lastVerified,
        notes: entry.notes,
        queryParams: provider.trackingParams,
      }

      return accumulator
    },
    {}
  )

export function getAffiliateProvider(providerId: string): AffiliateProvider {
  const provider = AFFILIATE_PROVIDERS[providerId]

  if (!provider) {
    throw new Error(`Missing affiliate provider "${providerId}"`)
  }

  return provider
}

export function getPrimaryAffiliateProvider(): AffiliateProvider {
  return getAffiliateProvider(TRAFFIC_SCHOOL_101_PROVIDER_ID)
}

export function getStateAffiliateEntry(
  stateSlug: string
): StateAffiliateProviderEntry | undefined {
  return STATE_AFFILIATE_PROVIDERS.find((entry) => entry.stateSlug === stateSlug)
}

export function getStateAffiliatePricing(
  stateSlug: string,
  providerId: string
): AffiliatePricingEntry | undefined {
  return AFFILIATE_PRICING.find(
    (pricing) => pricing.stateSlug === stateSlug && pricing.providerId === providerId
  )
}

export function getStateAffiliateRecommendation(
  stateSlug: string
): StateAffiliateRecommendation {
  const entry = getStateAffiliateEntry(stateSlug)

  if (!entry) {
    throw new Error(`Missing affiliate provider entry for state slug "${stateSlug}"`)
  }

  const provider = getAffiliateProvider(entry.providerId)
  const pricing = getStateAffiliatePricing(stateSlug, provider.id)

  return {
    provider,
    entry,
    pricing,
    internalHref: getAffiliateRedirectRoute(stateSlug),
  }
}

export function buildAffiliateUrl(
  stateSlug?: string,
  forwardedQuery: Record<string, string | string[] | undefined> = {}
): string {
  const destination = stateSlug ? AFFILIATE_DESTINATIONS[stateSlug] : undefined

  if (stateSlug !== undefined && !destination) {
    throw new Error(`Unknown affiliate state slug "${stateSlug}"`)
  }

  const provider = getPrimaryAffiliateProvider()
  const affiliateUrl = new URL(
    `${destination?.baseUrl ?? provider.baseUrl}${destination?.pathname ?? provider.defaultPathname}`
  )
  const queryParams = destination?.queryParams ?? provider.trackingParams

  Object.entries(queryParams).forEach(([key, value]) => {
    affiliateUrl.searchParams.set(key, value)
  })

  if (destination?.includeStateParam && stateSlug) {
    affiliateUrl.searchParams.set('state', stateSlug)
  }

  Object.entries(forwardedQuery).forEach(([key, value]) => {
    if (
      key === 'state' ||
      AFFILIATE_REQUIRED_QUERY_PARAMS.includes(key) ||
      !/^[A-Za-z0-9_.~-]+$/.test(key)
    ) {
      return
    }

    const forwardedValue = Array.isArray(value) ? value[0] : value

    if (forwardedValue && forwardedValue.length <= 512) {
      affiliateUrl.searchParams.set(key, forwardedValue)
    }
  })

  return affiliateUrl.toString()
}

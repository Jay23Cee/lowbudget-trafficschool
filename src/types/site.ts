export interface StateFaqItem {
  question: string
  answer: string
}

export interface StateContentFrontmatter {
  stateName: string
  slug: string
  seoTitle: string
  seoDescription: string
  hero: string
  intro: string
  eligibility: string
  faq: StateFaqItem[]
  lastReviewed: string
}

export interface StateContentDocument extends StateContentFrontmatter {
  body: string
  sourceFile: string
}

export type AffiliateVerificationStatus = 'verified' | 'fallback'

export type AffiliatePricingVerificationStatus = 'verified' | 'unverified'

export interface AffiliateProvider {
  id: string
  name: string
  displayName: string
  campaign: string
  defaultUrl: string
  baseUrl: string
  defaultPathname: string
  trackingParams: Record<string, string>
  logoAssetPath?: string
  defaultCtaText: string
  disclosureText: string
  termsNotes: string
  approvalNotes: string
  certificateDeliveryNotes: string
}

export interface StateAffiliateProviderEntry {
  stateSlug: string
  providerId: string
  destinationPathname?: string
  destinationUrl?: string
  directStateUrl?: string
  isStateSpecific: boolean
  verificationStatus: AffiliateVerificationStatus
  lastVerified: string
  approvalNotes: string
  certificateDeliveryNotes: string
  isRecommended: boolean
  ctaText: string
  notes: string
}

export interface AffiliatePricingEntry {
  stateSlug: string
  providerId: string
  basePriceCents?: number
  salePriceCents?: number
  currency: 'USD'
  priceLabel: string
  verificationStatus: AffiliatePricingVerificationStatus
  lastVerified: string
  source: string
  notes: string
}

export interface AffiliateDestination {
  stateSlug: string
  providerId: string
  providerName: string
  baseUrl: string
  pathname: string
  queryParams: Record<string, string>
  includeStateParam: boolean
  isStateSpecific: boolean
  verificationStatus: AffiliateVerificationStatus
  lastVerified: string
  notes: string
}

export interface StateAffiliateRecommendation {
  provider: AffiliateProvider
  entry: StateAffiliateProviderEntry
  pricing?: AffiliatePricingEntry
  internalHref: string
}

export interface SeoPageMeta {
  title: string
  description: string
  canonical: string
  openGraphImage: string
}

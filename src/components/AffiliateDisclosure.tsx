export const AFFILIATE_DISCLOSURE_COPY =
  'Low Budget Traffic School is an independent affiliate and referral website. We are not the California DMV, a court, or a traffic school operator. We may earn a commission when users click our links and enroll with a third party traffic school provider. Before enrolling, confirm your traffic school eligibility with your court and verify the provider\'s current license status using the California DMV traffic school list.'

interface AffiliateDisclosureProps {
  className?: string
}

export function AffiliateDisclosure({ className = '' }: AffiliateDisclosureProps) {
  return (
    <p className={`text-xs leading-relaxed text-slate-600 ${className}`}>
      {AFFILIATE_DISCLOSURE_COPY}
    </p>
  )
}

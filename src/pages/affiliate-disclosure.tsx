import { PageContainer } from '@/components/layout/PageContainer'
import { buildSeoMeta, SeoHead } from '@/lib/seo'

export default function AffiliateDisclosurePage() {
  const meta = buildSeoMeta(
    '/affiliate-disclosure',
    'Affiliate Disclosure | Low Budget Traffic School',
    'Read the affiliate disclosure for Low Budget Traffic School referral links to third-party online traffic school providers.'
  )

  return (
    <>
      <SeoHead meta={meta} />
      <section className='border-b border-brand-border bg-white py-16'>
        <PageContainer className='max-w-4xl space-y-6'>
          <p className='text-sm font-semibold text-brand-accent'>Affiliate Disclosure</p>
          <h1 className='font-poppins text-4xl font-semibold leading-tight text-brand-ink md:text-5xl'>
            Affiliate Disclosure
          </h1>
          <p className='text-lg leading-relaxed text-slate-700'>
            Low Budget Traffic School may earn a commission when users click referral links and
            purchase from third-party providers.
          </p>
        </PageContainer>
      </section>

      <section className='py-14'>
        <PageContainer className='max-w-4xl space-y-8'>
          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>
              How affiliate links work
            </h2>
            <p className='leading-relaxed text-slate-700'>
              Outbound provider links currently use the default TrafficSchool101 affiliate link.
              The homepage state selector sends users to the `/go/[state]` redirect route, which
              then forwards them to the provider with our affiliate tracking parameters.
            </p>
          </div>

          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>
              Pricing and provider details
            </h2>
            <p className='leading-relaxed text-slate-700'>
              Pricing may vary by state, course type, provider, certificate delivery, and current
              provider terms. We only display prices when they are manually verified in our site
              data. If a price is not listed, use the provider link to check the current cost.
            </p>
          </div>

          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>
              Editorial independence
            </h2>
            <p className='leading-relaxed text-slate-700'>
              Affiliate compensation helps support this site, but users should independently verify
              provider approval status, course acceptance, pricing, reporting, refund terms, and
              completion deadlines.
            </p>
          </div>

          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>
              No course operation
            </h2>
            <p className='leading-relaxed text-slate-700'>
              Low Budget Traffic School does not operate courses, issue completion certificates, or
              determine whether a user is eligible for traffic school in any state.
            </p>
          </div>
        </PageContainer>
      </section>
    </>
  )
}

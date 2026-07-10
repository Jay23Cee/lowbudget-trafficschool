import { PageContainer } from '@/components/layout/PageContainer'
import { buildSeoMeta, SeoHead } from '@/lib/seo'

export default function PrivacyPage() {
  const meta = buildSeoMeta(
    '/privacy',
    'Privacy Policy | Low Budget Traffic School',
    'Review how Low Budget Traffic School handles basic site data, analytics, and affiliate referral activity.'
  )

  return (
    <>
      <SeoHead meta={meta} />
      <section className='border-b border-brand-border bg-white py-16'>
        <PageContainer className='max-w-4xl space-y-6'>
          <p className='font-poppins text-sm font-semibold text-brand-accent'>
            Privacy Policy
          </p>
          <h1 className='font-poppins text-4xl font-semibold leading-tight text-brand-ink md:text-5xl'>
            Privacy Policy
          </h1>
          <p className='text-lg leading-relaxed text-slate-700'>
            This policy explains the limited information handled by Low Budget Traffic School as an
            affiliate referral publisher.
          </p>
        </PageContainer>
      </section>

      <section className='py-14'>
        <PageContainer className='max-w-4xl space-y-8'>
          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>Information we collect</h2>
            <p className='leading-relaxed text-slate-700'>
              This site does not collect course enrollment records, student records, certificate
              records, payment information, or traffic citation details. If analytics is configured,
              standard usage data may be collected through Google Analytics.
            </p>
          </div>

          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>Affiliate links</h2>
            <p className='leading-relaxed text-slate-700'>
              When you use a provider link, you leave this website for a third-party provider. That
              provider may collect information under its own privacy policy. Review the provider
              terms and privacy practices before enrolling.
            </p>
          </div>

          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>Analytics</h2>
            <p className='leading-relaxed text-slate-700'>
              Google Analytics only loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured for
              the deployment. If the variable is absent, this site does not inject the Google
              Analytics tracking script.
            </p>
          </div>
        </PageContainer>
      </section>
    </>
  )
}

import { PageContainer } from '@/components/layout/PageContainer'
import { buildSeoMeta, SeoHead } from '@/lib/seo'

export default function AboutPage() {
  const meta = buildSeoMeta(
    '/about',
    'About Low Budget Traffic School | Affiliate Referral Publisher',
    'Learn how Low Budget Traffic School publishes state-by-state referral guides for third-party online traffic school providers.'
  )

  return (
    <>
      <SeoHead meta={meta} />
      <section className='border-b border-brand-border bg-white py-16'>
        <PageContainer className='max-w-4xl space-y-6'>
          <p className='font-poppins text-sm font-semibold text-brand-accent'>
            About This Site
          </p>
          <h1 className='font-poppins text-4xl font-semibold leading-tight text-brand-ink md:text-5xl'>
            Low Budget Traffic School is a referral publisher
          </h1>
          <p className='text-lg leading-relaxed text-slate-700'>
            Low Budget Traffic School publishes state-by-state guides that help drivers compare
            online traffic school options before visiting a third-party provider.
          </p>
        </PageContainer>
      </section>

      <section className='py-14'>
        <PageContainer className='max-w-4xl space-y-8'>
          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>What we do</h2>
            <p className='leading-relaxed text-slate-700'>
              We maintain informational guide pages, state selectors, and referral links to
              third-party providers. Our goal is to make the research step clearer before a user
              leaves this site to enroll with a provider.
            </p>
          </div>

          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>What we do not do</h2>
            <p className='leading-relaxed text-slate-700'>
              We do not operate courses, make eligibility decisions, issue certificates, report
              completions, or provide legal advice. Users should verify eligibility, deadlines,
              pricing, certificate handling, and reporting requirements directly with the court,
              agency, insurer, or course provider before enrolling.
            </p>
          </div>

          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>How this site is funded</h2>
            <p className='leading-relaxed text-slate-700'>
              This site may earn a commission when users visit a provider through our affiliate
              links. That affiliate relationship does not make us the course provider and does not
              change the price or eligibility rules set by the provider.
            </p>
          </div>
        </PageContainer>
      </section>
    </>
  )
}

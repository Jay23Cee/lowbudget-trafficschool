import { PageContainer } from '@/components/layout/PageContainer'
import { buildSeoMeta, SeoHead } from '@/lib/seo'

export default function TermsPage() {
  const meta = buildSeoMeta(
    '/terms',
    'Terms Of Use | Low Budget Traffic School',
    'Review the terms for using Low Budget Traffic School referral guides and affiliate links.'
  )

  return (
    <>
      <SeoHead meta={meta} />
      <section className='border-b border-brand-border bg-white py-16'>
        <PageContainer className='max-w-4xl space-y-6'>
          <p className='font-poppins text-sm font-semibold text-brand-accent'>
            Terms Of Use
          </p>
          <h1 className='font-poppins text-4xl font-semibold leading-tight text-brand-ink md:text-5xl'>
            Terms Of Use
          </h1>
          <p className='text-lg leading-relaxed text-slate-700'>
            By using this site, you understand that Low Budget Traffic School is an informational
            publisher and affiliate referral website.
          </p>
        </PageContainer>
      </section>

      <section className='py-14'>
        <PageContainer className='max-w-4xl space-y-8'>
          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>Informational use only</h2>
            <p className='leading-relaxed text-slate-700'>
              The content on this site is provided for general research purposes. It is not legal
              advice and should not be treated as confirmation that a course is accepted for a
              specific citation, court, agency, insurer, or employer requirement.
            </p>
          </div>

          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>Third-party providers</h2>
            <p className='leading-relaxed text-slate-700'>
              Course enrollment, pricing, refund terms, certificate handling, completion reporting,
              and eligibility decisions are controlled by third-party providers and the applicable
              authority. Verify all requirements before paying for a course.
            </p>
          </div>

          <div className='space-y-3'>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink'>Site changes</h2>
            <p className='leading-relaxed text-slate-700'>
              We may update guide content, provider links, disclosures, and these terms as the site
              changes. Continued use of the site means you accept the current version of these
              terms.
            </p>
          </div>
        </PageContainer>
      </section>
    </>
  )
}

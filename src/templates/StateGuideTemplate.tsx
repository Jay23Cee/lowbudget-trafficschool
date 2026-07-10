import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { FaArrowRight, FaClipboardCheck, FaMapMarkedAlt, FaUserCheck } from 'react-icons/fa'
import remarkGfm from 'remark-gfm'

import { AffiliateButton } from '@/components/AffiliateButton'
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure'
import { CompletionTimelineCard } from '@/components/affiliate/CompletionTimelineCard'
import { CostFeaturesCard } from '@/components/affiliate/CostFeaturesCard'
import { ProviderComparisonTable } from '@/components/affiliate/ProviderComparisonTable'
import { ProviderRecommendationCard } from '@/components/affiliate/ProviderRecommendationCard'
import { StateEligibilityChecklist } from '@/components/affiliate/StateEligibilityChecklist'
import { TrustDisclosureCard } from '@/components/affiliate/TrustDisclosureCard'
import { PageContainer } from '@/components/layout/PageContainer'
import { StateLinkGrid } from '@/components/state/StateLinkGrid'
import { formatDateOnly } from '@/lib/date-format'
import { StateContentDocument } from '@/types/site'

interface StateGuideTemplateProps {
  stateContent: Omit<StateContentDocument, 'sourceFile'>
  relatedStateSlugs: string[]
}

export function StateGuideTemplate({
  stateContent,
  relatedStateSlugs,
}: StateGuideTemplateProps) {
  const audienceItems = [
    {
      title: 'Ticket or court requirement',
      description: `You need to check whether an online course may be accepted for a citation or court requirement in ${stateContent.stateName}.`,
      icon: FaUserCheck,
    },
    {
      title: 'Insurance or employer request',
      description: `You are checking course and provider questions before asking an insurer or employer what they accept in ${stateContent.stateName}.`,
      icon: FaClipboardCheck,
    },
    {
      title: 'Provider handoff clarity',
      description:
        'You want to understand pricing, certificate, and reporting questions before leaving this guide.',
      icon: FaMapMarkedAlt,
    },
  ]
  const decisionItems = [
    {
      label: 'A. Is this for me?',
      description: `Use this guide if you need to compare online traffic school options for a ${stateContent.stateName} ticket, court requirement, insurance request, employer request, or personal driver improvement need.`,
    },
    {
      label: 'B. What should I check before enrolling?',
      description:
        'Confirm acceptance, ticket eligibility, deadlines, certificate handling, reporting rules, refund terms, and support before paying.',
    },
    {
      label: 'C. What might it cost?',
      description:
        'Pricing can change by provider, course type, certificate handling, and processing options. This guide shows verified prices only when the data has been manually confirmed.',
    },
    {
      label: 'D. How do I start?',
      description: `Review the ${stateContent.stateName} checklist, then use the provider button when you are ready to check current terms on the provider site.`,
    },
    {
      label: 'E. Where is the direct button?',
      description: `Use the "Check ${stateContent.stateName} Price" or "Continue to Provider Site" buttons. They route through /go/${stateContent.slug}.`,
    },
  ]

  return (
    <>
      <section className='relative overflow-hidden bg-brand-ink text-white'>
        <Image
          src='/assets/state-guide-hero.jpg'
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
        <div className='absolute inset-0 bg-brand-ink/80' />
        <PageContainer className='relative z-10 grid gap-8 py-14 md:py-16 lg:grid-cols-[1fr,0.78fr] lg:items-center'>
          <div className='max-w-4xl space-y-5'>
            <div className='flex flex-wrap items-center gap-3 text-sm text-slate-200'>
              <Link href='/' className='font-medium hover:text-brand-accent-soft'>
                Home
              </Link>
              <span>/</span>
              <span>Online Traffic School</span>
              <span>/</span>
              <span>{stateContent.stateName}</span>
            </div>
            <p className='text-sm font-semibold text-brand-accent-soft'>State referral guide</p>
            <h1 className='font-poppins text-4xl font-semibold leading-tight md:text-6xl'>
              {stateContent.hero}
            </h1>
            <p className='max-w-3xl text-lg leading-relaxed text-slate-100'>
              {stateContent.intro}
            </p>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <Link
                href='#state-checklist'
                className='inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-primary px-5 py-3 font-semibold text-brand-ink transition hover:bg-brand-primary-hover'
              >
                Review Checklist
              </Link>
              <AffiliateButton
                stateSlug={stateContent.slug}
                text={
                  stateContent.slug === 'california'
                    ? 'View Provider Option'
                    : `Check ${stateContent.stateName} Provider Terms`
                }
                trackingLabel='state_hero_cta'
              />
              <p className='text-sm text-slate-200'>
                Editorial review date: {formatDateOnly(stateContent.lastReviewed)}
              </p>
            </div>
          </div>
          <ProviderRecommendationCard
            stateName={stateContent.stateName}
            stateSlug={stateContent.slug}
            className='text-brand-ink'
          />
        </PageContainer>
      </section>

      <section className='border-b border-brand-border bg-white py-10'>
        <PageContainer className='grid gap-5 lg:grid-cols-[1fr,0.95fr]'>
          <div className='rounded-lg border border-brand-border bg-white p-6 shadow-sm'>
            <div className='space-y-3'>
              <p className='text-sm font-semibold text-brand-accent'>Who this page is for</p>
              <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink'>
                Use this {stateContent.stateName} guide before choosing a course
              </h2>
              <p className='leading-relaxed text-slate-700'>
                This page is decision support for drivers comparing traffic school options. It is
                not a course, approval database, or legal advice.
              </p>
            </div>
            <div className='mt-5 grid gap-4'>
              {audienceItems.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.title} className='flex gap-4'>
                    <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-surface-alt text-brand-primary'>
                      <Icon aria-hidden='true' />
                    </span>
                    <div>
                      <h3 className='font-semibold text-brand-ink'>{item.title}</h3>
                      <p className='mt-1 text-sm leading-relaxed text-slate-700'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <TrustDisclosureCard stateName={stateContent.stateName} stateSlug={stateContent.slug} />
        </PageContainer>
      </section>

      <section className='bg-brand-surface py-10'>
        <PageContainer className='grid gap-5 lg:grid-cols-[1.1fr,0.9fr]'>
          <div className='rounded-lg border border-brand-border bg-white p-6 shadow-sm'>
            <div className='space-y-3'>
              <p className='text-sm font-semibold text-brand-accent'>Simple decision flow</p>
              <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink'>
                How to decide before you leave this {stateContent.stateName} guide
              </h2>
              <p className='leading-relaxed text-slate-700'>
                This page is built as a short decision guide: review your requirement, confirm
                acceptance, check provider terms, then continue only after the course fits your
                situation.
              </p>
            </div>
            <div className='mt-5 grid gap-4'>
              {decisionItems.map((item) => (
                <div
                  key={item.label}
                  className='rounded-lg border border-brand-border bg-brand-surface p-4'
                >
                  <h3 className='font-semibold text-brand-ink'>{item.label}</h3>
                  <p className='mt-2 text-sm leading-relaxed text-slate-700'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <CostFeaturesCard stateName={stateContent.stateName} stateSlug={stateContent.slug} />
        </PageContainer>
      </section>

      <section className='bg-white py-10'>
        <PageContainer>
          <ProviderComparisonTable
            stateName={stateContent.stateName}
            stateSlug={stateContent.slug}
          />
        </PageContainer>
      </section>

      <section id='state-checklist' className='bg-brand-surface py-10'>
        <PageContainer className='grid gap-5 lg:grid-cols-2'>
          <StateEligibilityChecklist
            stateName={stateContent.stateName}
            eligibilityText={stateContent.eligibility}
          />
          <CompletionTimelineCard
            stateName={stateContent.stateName}
            stateSlug={stateContent.slug}
          />
        </PageContainer>
      </section>

      <section className='py-14'>
        <PageContainer className='grid gap-10 lg:grid-cols-[1.45fr,0.85fr]'>
          <article className='rounded-lg border border-brand-border bg-white p-6 shadow-sm md:p-8'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className='mt-10 font-poppins text-3xl font-semibold text-brand-ink first:mt-0'>
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className='mt-8 font-poppins text-2xl font-semibold text-brand-ink'>
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className='mt-4 leading-relaxed text-slate-700 first:mt-0'>{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className='mt-4 list-disc space-y-2 pl-5 text-slate-700'>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className='mt-4 list-decimal space-y-2 pl-5 text-slate-700'>{children}</ol>
                ),
                li: ({ children }) => <li className='leading-relaxed'>{children}</li>,
                a: ({ href = '', children }) => {
                  const className = 'font-semibold text-brand-accent hover:text-brand-primary'

                  if (href.startsWith('/')) {
                    return (
                      <Link href={href} className={className}>
                        {children}
                      </Link>
                    )
                  }

                  return (
                    <a
                      href={href}
                      className={className}
                      target='_blank'
                      rel='noreferrer noopener'
                    >
                      {children}
                    </a>
                  )
                },
              }}
            >
              {stateContent.body}
            </ReactMarkdown>
          </article>

          <aside className='space-y-8'>
            <div>
              <h2 className='font-poppins text-2xl font-semibold text-brand-ink'>
                Frequently asked questions
              </h2>
              <div className='mt-4 space-y-4'>
                {stateContent.faq.map((faqItem) => (
                  <div
                    key={faqItem.question}
                    className='rounded-lg border border-brand-border bg-white p-4 shadow-sm'
                  >
                    <h3 className='font-semibold text-brand-ink'>{faqItem.question}</h3>
                    <p className='mt-2 text-sm leading-relaxed text-slate-700'>{faqItem.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='rounded-lg border border-brand-border bg-white p-6 shadow-sm'>
              <h2 className='font-poppins text-2xl font-semibold text-brand-ink'>
                Ready to check the provider?
              </h2>
              <p className='mt-2 text-sm leading-relaxed text-slate-600'>
                Use the direct handoff after you confirm the course fits your ticket, deadline, and
                reporting rules.
              </p>
              <div className='mt-4 space-y-3'>
              <AffiliateButton
                stateSlug={stateContent.slug}
                text={
                  stateContent.slug === 'california'
                    ? 'Continue to Provider Site'
                    : `Check ${stateContent.stateName} Price`
                }
                trackingLabel='state_bottom_cta'
                className='w-full'
              />
                <AffiliateDisclosure />
              </div>
            </div>

            <div className='rounded-lg border border-brand-border bg-white p-6 shadow-sm'>
              <h2 className='font-poppins text-2xl font-semibold text-brand-ink'>
                Browse more state guides
              </h2>
              <p className='mt-2 text-sm leading-relaxed text-slate-600'>
                Review nearby or high-volume state guides before choosing a provider.
              </p>
              <div className='mt-4'>
                <StateLinkGrid onlySlugs={relatedStateSlugs} />
              </div>
              <Link
                href='/'
                className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-primary'
              >
                View all state guides
                <FaArrowRight aria-hidden='true' />
              </Link>
            </div>
          </aside>
        </PageContainer>
      </section>
    </>
  )
}

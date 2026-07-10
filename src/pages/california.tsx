import Image from 'next/image'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { AffiliateButton } from '@/components/AffiliateButton'
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure'
import { CaliforniaTicketHelper } from '@/components/affiliate/CaliforniaTicketHelper'
import { HowItWorksSection } from '@/components/affiliate/HowItWorksSection'
import { ProviderRecommendationCard } from '@/components/affiliate/ProviderRecommendationCard'
import { StateEligibilityChecklist } from '@/components/affiliate/StateEligibilityChecklist'
import { PageContainer } from '@/components/layout/PageContainer'
import {
  CALIFORNIA_ELIGIBILITY_COPY,
  CALIFORNIA_ELIGIBILITY_ITEMS,
  CALIFORNIA_ELIGIBILITY_WARNING,
  CALIFORNIA_HOW_IT_WORKS_STEPS,
  CALIFORNIA_PROVIDER_BULLETS,
  CALIFORNIA_PROVIDER_DESCRIPTION,
  CALIFORNIA_PROVIDER_SUPPORTING_TEXT,
} from '@/data/california-funnel'
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildSeoMeta, SeoHead } from '@/lib/seo'
import { StateFaqItem } from '@/types/site'

const PAGE_TITLE = 'Low Cost California Online Traffic School Guide'
const PAGE_DESCRIPTION =
  'Compare a low cost California online traffic school option, check eligibility basics, and verify the provider before enrolling.'

const FAQ_ITEMS: StateFaqItem[] = [
  {
    question: 'Can I take traffic school online in California?',
    answer:
      'Many California drivers may be able to complete traffic school online, but eligibility depends on the court, citation, deadline, license status, and driving history. Confirm with the court handling your ticket before enrolling.',
  },
  {
    question: 'Will California traffic school remove my ticket?',
    answer:
      'No. If you are eligible and complete the court requirements on time, traffic school may help keep the point from appearing on your public driving record.',
  },
  {
    question: 'How often can I take traffic school in California?',
    answer:
      'Many California courts apply an 18-month rule measured from violation date to violation date. Confirm your exact eligibility with your court because exceptions and special situations can vary.',
  },
  {
    question: 'Will TrafficSchool101 be accepted for my California ticket?',
    answer:
      'Acceptance depends on your court and situation. Before paying, confirm that your court allows online traffic school and that the provider matches your requirement.',
  },
  {
    question: 'Does Low Budget Traffic School sell the course?',
    answer:
      'No. Low Budget Traffic School is an affiliate referral guide. Enrollment, coursework, payment, support, and certificates are handled by the provider.',
  },
]

export default function CaliforniaPage() {
  const meta = buildSeoMeta('/california', PAGE_TITLE, PAGE_DESCRIPTION)
  const structuredData = [
    buildBreadcrumbJsonLd([
      { name: 'Home', pathname: '/' },
      { name: 'California Online Traffic School Guide', pathname: '/california' },
    ]),
    buildFaqJsonLd(FAQ_ITEMS),
  ]

  return (
    <>
      <SeoHead meta={meta} structuredData={structuredData} />

      <section className='relative overflow-hidden bg-brand-ink text-white lg:min-h-[calc(100svh-128px)]'>
        <Image
          src='/assets/california-guide-hero.jpg'
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
        <div className='absolute inset-0 bg-brand-ink/80' />
        <PageContainer className='relative z-10 grid gap-8 py-8 md:py-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-start lg:py-12'>
          <div className='max-w-4xl space-y-5'>
            <div className='flex flex-wrap items-center gap-3 text-sm text-slate-200'>
              <Link href='/' className='font-medium hover:text-brand-accent-soft'>
                Home
              </Link>
              <span>/</span>
              <span>California</span>
            </div>
            <p className='text-sm font-semibold uppercase tracking-wide text-brand-accent-soft'>
              California traffic school guide
            </p>
            <h1 className='font-poppins text-3xl font-semibold leading-[1.02] sm:text-4xl md:text-5xl'>
              California traffic school next-step guide
            </h1>
            <p className='max-w-3xl text-base leading-relaxed text-slate-100 md:text-lg'>
              Use this guide to understand what traffic school may do, what to verify with your
              court, and when it is reasonable to review an online provider option.
            </p>
            <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
              <Link
                href='#traffic-school-helper'
                className='inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand-primary px-5 py-3 font-semibold text-brand-ink transition hover:bg-brand-primary-hover sm:w-auto'
              >
                Check My Traffic School Next Step
              </Link>
              <Link
                href='#eligibility'
                className='inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-white/70 px-5 py-3 font-semibold text-white transition hover:bg-white/10 sm:w-auto'
              >
                Review Eligibility Basics
              </Link>
              <Link
                href='#provider'
                className='inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-white/70 px-5 py-3 font-semibold text-white transition hover:bg-white/10 sm:w-auto'
              >
                View Provider Option
              </Link>
            </div>
            <AffiliateDisclosure className='max-w-3xl text-slate-200' />
          </div>

          <div className='rounded-lg border border-white/20 bg-white p-5 text-brand-ink shadow-xl md:p-6'>
            <p className='text-sm font-semibold text-brand-accent'>Quick answer</p>
            <h2 className='mt-2 font-poppins text-xl font-semibold md:text-2xl'>
              Traffic school may help hide a point
            </h2>
            <p className='mt-3 text-sm leading-relaxed text-slate-700'>
              California Courts explain that eligible drivers can use traffic school to hide a
              point on their driving record. You still need court permission and must complete all
              requirements on time.
            </p>
            <div className='mt-5 space-y-2 text-sm'>
              <a
                href='https://selfhelp.courts.ca.gov/traffic/traffic-school'
                target='_blank'
                rel='noreferrer noopener'
                className='flex items-center gap-2 font-semibold text-brand-accent hover:text-brand-primary'
              >
                California Courts traffic school guide
                <FaExternalLinkAlt aria-hidden='true' />
              </a>
              <a
                href='https://www.dmv.ca.gov/portal/vehicle-industry-services/occupational-licensing/occupational-license-lookup/traffic-school-list/'
                target='_blank'
                rel='noreferrer noopener'
                className='flex items-center gap-2 font-semibold text-brand-accent hover:text-brand-primary'
              >
                California DMV traffic school list
                <FaExternalLinkAlt aria-hidden='true' />
              </a>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className='border-b border-slate-200 bg-white py-14'>
        <PageContainer className='space-y-8'>
          <div className='max-w-3xl space-y-3'>
            <p className='text-sm font-semibold text-brand-accent'>What this page solves</p>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink md:text-4xl'>
              Get the next step, not just a course link
            </h2>
            <p className='leading-relaxed text-slate-700'>
              California traffic school is controlled by your court, citation, deadline, driving
              history, and provider requirements. This page helps you identify what to confirm
              before you leave for a third-party provider.
            </p>
          </div>
          <CaliforniaTicketHelper />
        </PageContainer>
      </section>

      <section id='eligibility' className='bg-white py-14'>
        <PageContainer className='grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-start'>
          <div className='space-y-4'>
            <p className='text-sm font-semibold text-brand-accent'>Eligibility basics</p>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink md:text-4xl'>
              Check these points before you pay
            </h2>
            <p className='leading-relaxed text-slate-700'>
              Traffic school eligibility is a court-specific decision. Use these checks as a
              practical starting point, then confirm the exact rules for your citation.
            </p>
          </div>
          <StateEligibilityChecklist
            stateName='California'
            title='California traffic school eligibility checklist'
            eligibilityText={CALIFORNIA_ELIGIBILITY_COPY}
            items={CALIFORNIA_ELIGIBILITY_ITEMS}
            warningText={CALIFORNIA_ELIGIBILITY_WARNING}
          />
        </PageContainer>
      </section>

      <section id='provider' className='border-y border-slate-200 bg-slate-50 py-14'>
        <PageContainer className='max-w-4xl'>
          <div className='mb-6 max-w-3xl space-y-3'>
            <p className='text-sm font-semibold text-brand-accent'>Provider handoff</p>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink md:text-4xl'>
              Review provider terms after your checks
            </h2>
            <p className='leading-relaxed text-slate-700'>
              TrafficSchool101 is a third-party course option linked through this affiliate site.
              It is not the court, DMV, or Low Budget Traffic School.
            </p>
          </div>
          <ProviderRecommendationCard
            stateName='California'
            stateSlug='california'
            eyebrow='Third-party provider option'
            title='TrafficSchool101 course option'
            description={CALIFORNIA_PROVIDER_DESCRIPTION}
            supportingText={CALIFORNIA_PROVIDER_SUPPORTING_TEXT}
            bulletItems={CALIFORNIA_PROVIDER_BULLETS}
            ctaText='View Provider Option'
            buttonLocation='provider_card'
          />
        </PageContainer>
      </section>

      <section id='how-it-works' className='border-y border-slate-200 bg-slate-50 py-14'>
        <PageContainer>
          <HowItWorksSection
            title='The practical California traffic school flow'
            steps={CALIFORNIA_HOW_IT_WORKS_STEPS}
          />
        </PageContainer>
      </section>

      <section id='faq' className='bg-white py-14'>
        <PageContainer className='grid gap-8 lg:grid-cols-[0.88fr,1.12fr] lg:items-start'>
          <div className='space-y-4'>
            <p className='text-sm font-semibold text-brand-accent'>FAQ</p>
            <h2 className='font-poppins text-3xl font-semibold text-brand-ink md:text-4xl'>
              California traffic school questions
            </h2>
            <div className='space-y-3'>
              <AffiliateButton
                stateSlug='california'
                text='View Traffic School Provider'
                buttonLocation='faq'
              />
              <AffiliateDisclosure className='max-w-xl' />
            </div>
          </div>
          <div className='space-y-4'>
            {FAQ_ITEMS.map((faqItem) => (
              <div
                key={faqItem.question}
                className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm'
              >
                <h3 className='font-semibold text-brand-ink'>{faqItem.question}</h3>
                <p className='mt-2 text-sm leading-relaxed text-slate-700'>{faqItem.answer}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className='bg-brand-ink py-14 text-white'>
        <PageContainer className='grid gap-6 lg:grid-cols-[1fr,auto] lg:items-center'>
          <div className='max-w-3xl space-y-3'>
            <p className='text-sm font-semibold text-brand-accent-soft'>Provider handoff</p>
            <h2 className='font-poppins text-3xl font-semibold md:text-4xl'>
              Ready to check the current TrafficSchool101 terms?
            </h2>
            <p className='leading-relaxed text-slate-200'>
              Use the button after you confirm that traffic school is available for your California
              ticket, verify the current provider license status, and understand your deadline.
            </p>
          </div>
          <div className='space-y-3'>
            <AffiliateButton
              stateSlug='california'
              text='Continue to Provider Site'
              buttonLocation='bottom_cta'
              className='w-full sm:w-auto'
            />
            <AffiliateDisclosure className='max-w-md text-slate-300' />
          </div>
        </PageContainer>
      </section>
    </>
  )
}

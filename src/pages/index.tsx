import Image from 'next/image'
import Link from 'next/link'
import {
  FaArrowRight,
  FaCheckCircle,
  FaClipboardCheck,
  FaExternalLinkAlt,
  FaMapMarkedAlt,
  FaShieldAlt,
} from 'react-icons/fa'

import { AffiliateDisclosure } from '@/components/AffiliateDisclosure'
import { PageContainer } from '@/components/layout/PageContainer'
import { StateAffiliateRedirectForm } from '@/components/state/StateAffiliateRedirectForm'
import { StateLinkGrid } from '@/components/state/StateLinkGrid'
import { TOP_STATES, US_STATES } from '@/data/states'
import { buildSeoMeta, SeoHead } from '@/lib/seo'

const STATE_GUIDE_SLUGS = TOP_STATES

const SEARCH_CUES = [
  'Pick the state named on your ticket',
  'Open the provider site in one click',
  'Check acceptance and total price before paying',
]

const EXPLANATION_CARDS = [
  {
    title: 'Compare low cost options by state',
    description:
      'Start with the state connected to your ticket, court, insurer, employer, or driver improvement requirement so you can compare lower cost online traffic school options in the right place.',
    icon: FaMapMarkedAlt,
  },
  {
    title: 'Check the full price before you pay',
    description:
      'State guides keep advertised pricing, possible certificate or processing fee questions, provider terms, and disclosure context together.',
    icon: FaClipboardCheck,
  },
  {
    title: 'Continue with budget context',
    description:
      'Provider buttons remain available after the visitor has seen the state-specific price, eligibility, and reporting checks that matter.',
    icon: FaExternalLinkAlt,
  },
]

const VISUAL_POINTS = [
  'Traffic school acceptance can vary by state, court, ticket type, and deadline.',
  'Low advertised prices do not always include every certificate, court, or processing cost.',
  'Provider pricing, certificate handling, and reporting rules should be checked before paying.',
  'Low Budget Traffic School is a referral guide, not a court, DMV office, or course operator.',
]

const HOME_FAQ = [
  {
    question: 'How do I find a low cost online traffic school?',
    answer:
      'Start with your state guide, then compare the provider price, certificate fees, reporting process, deadlines, support options, and refund terms before enrolling.',
  },
  {
    question: 'Does the cheapest traffic school always cost the least?',
    answer:
      'Not always. Some providers advertise a low starting price but charge extra for certificates, processing, or other add-ons, so the total cost matters more than the headline price.',
  },
  {
    question: 'Can I use any online traffic school for my ticket?',
    answer:
      'No. Approval and eligibility can depend on your state, court, agency, insurer, ticket type, and deadline, so verify acceptance before you pay for a course.',
  },
]

const HOME_SEO_SUMMARY = [
  'affordable online traffic school options',
  'low cost traffic school by state',
  'budget-friendly provider comparisons',
]

export default function HomePage() {
  const meta = buildSeoMeta(
    '/',
    'Low Budget Traffic School | Affordable Online Traffic School by State',
    'Choose your state to find an affordable online traffic school provider, then review acceptance, deadlines, and total price before enrolling.'
  )

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Low Budget Traffic School',
      url: meta.canonical,
      description: meta.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Low Budget Traffic School',
      url: meta.canonical,
      logo: `${meta.canonical}assets/lowbudget-traffic-school-logo.png`,
      description:
        'An independent referral website with online traffic school guides and provider links by state.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Online traffic school guides by state',
      itemListElement: TOP_STATES.map((stateSlug, index) => {
        const state = US_STATES.find((item) => item.slug === stateSlug)

        return {
          '@type': 'ListItem',
          position: index + 1,
          name: state ? `${state.name} online traffic school guide` : stateSlug,
          url: `${meta.canonical}online-traffic-school/${stateSlug}`,
        }
      }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOME_FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]

  return (
    <>
      <SeoHead meta={meta} structuredData={structuredData} />

      <section id='state-selector' className='state-choice-hero relative overflow-hidden text-white'>
        <PageContainer className='relative z-10 py-10 md:py-14 lg:py-16'>
          <div className='mx-auto max-w-6xl'>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent-soft'>
                Low Budget Traffic School
              </p>
              <h1 className='mt-3 font-poppins text-4xl font-semibold leading-tight text-white md:text-5xl'>
                Which state is your traffic ticket in?
              </h1>
              <p className='mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg'>
                Select the state on your ticket to continue to an online traffic school provider.
              </p>
            </div>

            <div className='mx-auto mt-8 max-w-2xl rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-5'>
              <p className='pb-3 text-center text-sm font-medium text-slate-200'>
                Choose a state to continue
              </p>
              <StateAffiliateRedirectForm
                inputId='hero-state-selector'
                buttonLabel='Go To Provider'
                className='sm:items-stretch'
              />
            </div>

            <div className='mt-6 grid gap-3 text-left sm:grid-cols-3'>
              {SEARCH_CUES.map((point) => (
                <div
                  key={point}
                  className='flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.08] p-4'
                >
                  <FaCheckCircle
                    className='mt-1 shrink-0 text-brand-accent-soft'
                    aria-hidden='true'
                  />
                  <p className='text-sm font-medium leading-relaxed text-slate-100'>{point}</p>
                </div>
              ))}
            </div>
            <AffiliateDisclosure className='mx-auto mt-6 max-w-3xl text-center text-slate-300' />
          </div>
        </PageContainer>
      </section>

      <section className='border-y border-brand-border bg-white py-12'>
        <PageContainer className='grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center'>
          <div className='relative min-h-[320px] overflow-hidden rounded-lg border border-brand-border bg-brand-surface shadow-sm md:min-h-[420px]'>
            <Image
              src='/assets/home-state-search.jpg'
              alt='A person searching a state traffic school guide on a laptop'
              fill
              sizes='(max-width: 1023px) 100vw, 50vw'
              className='object-cover'
            />
          </div>
          <div className='space-y-5'>
            <p className='text-sm font-semibold uppercase tracking-wide text-brand-accent'>
              Affordable traffic school help
            </p>
            <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink md:text-4xl'>
              A low advertised price only helps if the total cost still makes sense
            </h2>
            <p className='leading-relaxed text-slate-700'>
              Traffic school requirements are not one-size-fits-all, and the lowest advertised
              price is not always the best deal. Use our state guides to review total-cost
              questions and eligibility reminders before leaving for a provider.
            </p>
            <div className='grid gap-3'>
              {VISUAL_POINTS.map((point) => (
                <div key={point} className='flex gap-3 rounded-lg bg-brand-surface p-4'>
                  <FaShieldAlt className='mt-1 shrink-0 text-brand-success' aria-hidden='true' />
                  <p className='text-sm leading-relaxed text-slate-700'>{point}</p>
                </div>
              ))}
            </div>
            <AffiliateDisclosure />
          </div>
        </PageContainer>
      </section>

      <section className='bg-brand-surface py-12'>
        <PageContainer>
          <div className='grid gap-4 lg:grid-cols-3'>
            {EXPLANATION_CARDS.map((card) => {
              const Icon = card.icon

              return (
                <div
                  key={card.title}
                  className='rounded-lg border border-brand-border bg-white p-6 shadow-sm'
                >
                  <span className='flex h-11 w-11 items-center justify-center rounded-lg bg-brand-ink text-white'>
                    <Icon aria-hidden='true' />
                  </span>
                  <h2 className='mt-4 font-poppins text-2xl font-semibold text-brand-ink'>
                    {card.title}
                  </h2>
                  <p className='mt-3 leading-relaxed text-slate-600'>{card.description}</p>
                </div>
              )
            })}
          </div>
        </PageContainer>
      </section>

      <section id='state-guides' className='bg-brand-surface py-14'>
        <PageContainer className='grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-start'>
          <div className='space-y-4'>
            <p className='text-sm font-semibold uppercase tracking-wide text-brand-accent'>
              Online traffic school guides
            </p>
            <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink md:text-4xl'>
              Explore popular traffic school guides by state
            </h2>
            <p className='leading-relaxed text-slate-700'>
              Review state-specific eligibility notes, cost questions, and provider next steps
              before or after you continue to a third-party provider.
            </p>
            <p className='text-sm leading-relaxed text-slate-600'>
              Common searches covered here include {HOME_SEO_SUMMARY.join(', ')}.
            </p>
            <Link
              href='/online-traffic-school/california'
              className='inline-flex min-h-11 items-center gap-2 rounded-lg border border-brand-border-strong bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-primary hover:bg-brand-surface-alt'
            >
              Start with the California guide
              <FaArrowRight aria-hidden='true' />
            </Link>
          </div>
          <StateLinkGrid onlySlugs={STATE_GUIDE_SLUGS} showDescriptions />
        </PageContainer>
      </section>

      <section className='border-t border-brand-border bg-white py-14'>
        <PageContainer className='grid gap-8 lg:grid-cols-[1.05fr,0.95fr]'>
          <div className='space-y-4'>
            <p className='text-sm font-semibold uppercase tracking-wide text-brand-accent'>
              Price comparison help
            </p>
            <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink md:text-4xl'>
              What to check when you want the cheapest traffic school that still fits your situation
            </h2>
            <p className='leading-relaxed text-slate-700'>
              A low budget traffic school search should go beyond the first price you see. Compare
              approval status, deadline fit, mobile usability, customer support, completion
              reporting, and total cost before you enroll.
            </p>
          </div>
          <div className='space-y-4 rounded-lg border border-brand-border bg-brand-surface p-6 shadow-sm'>
            {HOME_FAQ.map((item) => (
              <div key={item.question} className='rounded-lg bg-white p-4'>
                <h3 className='font-poppins text-xl font-semibold text-brand-ink'>
                  {item.question}
                </h3>
                <p className='mt-2 leading-relaxed text-slate-700'>{item.answer}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  )
}

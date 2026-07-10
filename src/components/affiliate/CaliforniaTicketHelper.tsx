import { useMemo, useState } from 'react'
import {
  FaClipboardCheck,
  FaExternalLinkAlt,
  FaQuestionCircle,
  FaShieldAlt,
} from 'react-icons/fa'

import { AffiliateButton } from '@/components/AffiliateButton'
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure'
import {
  CaliforniaTicketHelperAnswer,
  CaliforniaTicketHelperResult,
  CALIFORNIA_TICKET_HELPER_STEPS,
} from '@/data/california-funnel'

type HelperAnswers = Partial<
  Record<(typeof CALIFORNIA_TICKET_HELPER_STEPS)[number]['id'], CaliforniaTicketHelperAnswer>
>

const ANSWER_OPTIONS: {
  label: string
  value: CaliforniaTicketHelperAnswer
}[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Not sure', value: 'not-sure' },
]

const RESULT_CONTENT: Record<
  CaliforniaTicketHelperResult,
  {
    eyebrow: string
    title: string
    description: string
    nextSteps: string[]
    showProviderCta: boolean
  }
> = {
  'confirm-with-court': {
    eyebrow: 'Next step',
    title: 'Confirm with court first',
    description:
      'Your answers show at least one court-controlled issue that should be confirmed before paying for a course.',
    nextSteps: [
      'Check your ticket, courtesy notice, or court website for traffic school permission.',
      'Confirm the deadline and whether online completion is accepted for your citation.',
      'Ask the court before enrolling if there is a commercial or serious-violation concern.',
    ],
    showProviderCta: false,
  },
  'verify-provider': {
    eyebrow: 'Next step',
    title: 'Verify provider before enrolling',
    description:
      'You may be close to provider review, but you still need to verify acceptance, timing, or provider details before paying.',
    nextSteps: [
      'Use official California Courts and DMV resources to confirm the requirement.',
      'Verify certificate handling, completion reporting, refund terms, and final price.',
      'Continue to the provider only after the course fits your ticket and deadline.',
    ],
    showProviderCta: true,
  },
  'ready-to-review-provider': {
    eyebrow: 'Next step',
    title: 'Ready to review provider terms',
    description:
      'Your answers suggest you have handled the main pre-enrollment checks. Review the provider terms before paying.',
    nextSteps: [
      'Confirm the current price, certificate handling, and support terms on the provider site.',
      'Keep your court deadline available while enrolling.',
      'Save completion records in case your court asks for proof.',
    ],
    showProviderCta: true,
  },
}

interface CaliforniaTicketHelperProps {
  className?: string
}

export function CaliforniaTicketHelper({ className = '' }: CaliforniaTicketHelperProps) {
  const [answers, setAnswers] = useState<HelperAnswers>({})
  const answeredCount = Object.keys(answers).length
  const result = useMemo(() => getHelperResult(answers), [answers])
  const resultContent = RESULT_CONTENT[result]

  function setAnswer(
    stepId: (typeof CALIFORNIA_TICKET_HELPER_STEPS)[number]['id'],
    answer: CaliforniaTicketHelperAnswer
  ): void {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [stepId]: answer,
    }))
  }

  return (
    <div
      id='traffic-school-helper'
      className={`rounded-lg border border-brand-border bg-white p-5 text-brand-ink shadow-sm md:p-6 ${className}`}
    >
      <div className='grid gap-6 lg:grid-cols-[1.08fr,0.92fr]'>
        <div className='space-y-5'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold text-brand-accent'>California ticket helper</p>
            <h2 className='font-poppins text-2xl font-semibold leading-tight md:text-3xl'>
              Check your next step before choosing traffic school
            </h2>
            <p className='text-sm leading-relaxed text-slate-700'>
              Answer these non-sensitive questions on this page only. The helper does not store
              your answers and does not decide eligibility for a court.
            </p>
          </div>

          <div className='space-y-4'>
            {CALIFORNIA_TICKET_HELPER_STEPS.map((step) => (
              <fieldset key={step.id} className='rounded-lg border border-brand-border p-4'>
                <legend className='flex gap-2 px-1 text-sm font-semibold text-brand-ink'>
                  <FaQuestionCircle className='mt-1 shrink-0 text-brand-accent' aria-hidden='true' />
                  <span>{step.question}</span>
                </legend>
                <p className='mt-2 text-sm leading-relaxed text-slate-600'>{step.helperText}</p>
                <div className='mt-3 grid gap-2 sm:grid-cols-3'>
                  {ANSWER_OPTIONS.map((option) => {
                    const isSelected = answers[step.id] === option.value

                    return (
                      <button
                        key={option.value}
                        type='button'
                        aria-pressed={isSelected}
                        onClick={() => setAnswer(step.id, option.value)}
                        className={`min-h-10 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                          isSelected
                            ? 'border-brand-accent bg-brand-accent text-white'
                            : 'border-brand-border bg-white text-brand-ink hover:border-brand-accent'
                        }`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <aside className='rounded-lg border border-brand-border bg-brand-surface p-5'>
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-brand-ink'>
                <FaClipboardCheck aria-hidden='true' />
              </span>
              <div>
                <p className='text-sm font-semibold text-brand-accent'>{resultContent.eyebrow}</p>
                <h3 className='font-poppins text-2xl font-semibold leading-tight text-brand-ink'>
                  {resultContent.title}
                </h3>
              </div>
            </div>
            <p className='text-sm leading-relaxed text-slate-700'>{resultContent.description}</p>
            <p className='text-xs font-semibold uppercase text-slate-600'>
              {answeredCount} of {CALIFORNIA_TICKET_HELPER_STEPS.length} checks answered
            </p>
            <ul className='space-y-3 text-sm leading-relaxed text-slate-700'>
              {resultContent.nextSteps.map((nextStep) => (
                <li key={nextStep} className='flex gap-3'>
                  <FaShieldAlt className='mt-1 shrink-0 text-brand-success' aria-hidden='true' />
                  <span>{nextStep}</span>
                </li>
              ))}
            </ul>

            <div className='space-y-3 border-t border-brand-border pt-4'>
              <div className='space-y-2 text-sm'>
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

              {resultContent.showProviderCta ? (
                <div className='space-y-3'>
                  <AffiliateButton
                    stateSlug='california'
                    text='View Provider Option'
                    buttonLocation='ticket_helper_result'
                    className='w-full'
                  />
                  <AffiliateDisclosure />
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function getHelperResult(answers: HelperAnswers): CaliforniaTicketHelperResult {
  if (
    answers.courtAllowed === 'no' ||
    answers.courtAllowed === 'not-sure' ||
    answers.deadlineKnown === 'no' ||
    answers.deadlineKnown === 'not-sure' ||
    answers.commercialConcern === 'yes' ||
    answers.commercialConcern === 'not-sure'
  ) {
    return 'confirm-with-court'
  }

  if (
    answers.priorTrafficSchool === 'yes' ||
    answers.priorTrafficSchool === 'not-sure' ||
    answers.providerVerification === 'no' ||
    answers.providerVerification === 'not-sure' ||
    Object.keys(answers).length < CALIFORNIA_TICKET_HELPER_STEPS.length
  ) {
    return 'verify-provider'
  }

  return 'ready-to-review-provider'
}

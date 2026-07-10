export interface FunnelChecklistItem {
  title?: string
  description: string
}

export interface FunnelStep {
  title: string
  description: string
}

export type CaliforniaTicketHelperAnswer = 'yes' | 'no' | 'not-sure'

export type CaliforniaTicketHelperResult =
  | 'confirm-with-court'
  | 'verify-provider'
  | 'ready-to-review-provider'

export interface CaliforniaTicketHelperStep {
  id:
    | 'courtAllowed'
    | 'deadlineKnown'
    | 'commercialConcern'
    | 'priorTrafficSchool'
    | 'providerVerification'
  question: string
  helperText: string
}

export const CALIFORNIA_TICKET_HELPER_STEPS: CaliforniaTicketHelperStep[] = [
  {
    id: 'courtAllowed',
    question: 'Does your court or courtesy notice say traffic school is allowed?',
    helperText:
      'Traffic school only helps when the court handling your ticket allows it for your case.',
  },
  {
    id: 'deadlineKnown',
    question: 'Do you know your traffic school completion deadline?',
    helperText:
      'You need enough time to finish the course and handle any completion reporting before the court cutoff.',
  },
  {
    id: 'commercialConcern',
    question: 'Is there a commercial license, commercial vehicle, or serious violation concern?',
    helperText:
      'Commercial and more serious citation situations can follow different rules, so they need extra court review.',
  },
  {
    id: 'priorTrafficSchool',
    question: 'Have you taken traffic school for another ticket in the last 18 months?',
    helperText:
      'Many California courts look at the time between violation dates when deciding eligibility.',
  },
  {
    id: 'providerVerification',
    question: 'Have you checked that the provider matches your court and DMV requirements?',
    helperText:
      'Before paying, verify the provider on official sources and confirm certificate or reporting details.',
  },
]

export const CALIFORNIA_ELIGIBILITY_ITEMS: FunnelChecklistItem[] = [
  {
    description: 'Your court or courtesy notice says traffic school is an option for this ticket.',
  },
  {
    description:
      'Your citation, license status, and driving history fit the court rules for traffic school.',
  },
  {
    description:
      'You were not driving a commercial vehicle in a situation with different traffic school rules.',
  },
  {
    description:
      'You understand your deadline and have enough time to finish before the court cutoff.',
  },
]

export const CALIFORNIA_PROVIDER_BULLETS = [
  'TrafficSchool101 advertises California online traffic school courses starting as low as $14.95.',
  'Before enrolling, verify the provider on the California DMV traffic school list.',
  'The provider handles enrollment, payment, coursework, support, completion reporting, and certificates.',
]

export const CALIFORNIA_HOW_IT_WORKS_STEPS: FunnelStep[] = [
  {
    title: 'Confirm your court allows traffic school',
    description:
      'Check your ticket, courtesy notice, or court website before paying for any course.',
  },
  {
    title: 'Continue to the provider site',
    description:
      'Use the California provider handoff when you are ready to review current terms and enroll.',
  },
  {
    title: 'Finish before your deadline',
    description:
      'Leave enough time for coursework, completion reporting, and any certificate handling required by your court.',
  },
]

export const CALIFORNIA_ELIGIBILITY_COPY =
  'California traffic school is not automatic for every ticket. Your court, citation, deadline, driving history, and license status can all affect whether traffic school helps in your situation.'

export const CALIFORNIA_ELIGIBILITY_WARNING =
  'Traffic school eligibility depends on your court, ticket type, deadline, and driving history. Confirm the exact rules before you enroll.'

export const CALIFORNIA_PROVIDER_DESCRIPTION =
  'This guide can hand California drivers off to TrafficSchool101 as a third-party online traffic school option after they confirm court eligibility. The provider, not this site, handles enrollment, payment, coursework, support, completion reporting, and certificates.'

export const CALIFORNIA_PROVIDER_SUPPORTING_TEXT =
  'Check your court notice first, verify the provider on the California DMV traffic school list, then use the provider handoff when you are ready to review current terms, pricing, and enrollment details.'

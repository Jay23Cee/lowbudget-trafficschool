import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

import { FunnelChecklistItem } from '@/data/california-funnel'

interface StateEligibilityChecklistProps {
  stateName: string
  eligibilityText: string
  eyebrow?: string
  title?: string
  items?: FunnelChecklistItem[]
  warningText?: string
  className?: string
}

const CHECKLIST_ITEMS: FunnelChecklistItem[] = [
  { description: 'Confirm the authority handling your requirement allows online traffic school' },
  { description: 'Confirm your ticket is eligible' },
  { description: 'Confirm the deadline' },
  { description: 'Confirm certificate or completion reporting rules' },
  { description: 'Check the current provider price' },
]

export function StateEligibilityChecklist({
  stateName,
  eligibilityText,
  eyebrow = 'Before you enroll',
  title,
  items = CHECKLIST_ITEMS,
  warningText = 'Traffic school eligibility can vary by state, court, ticket type, and driving record. Check with the authority handling your requirement before enrolling.',
  className = '',
}: StateEligibilityChecklistProps) {
  return (
    <div className={`rounded-lg border border-brand-border bg-white p-6 shadow-sm ${className}`}>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <p className='text-sm font-semibold text-brand-accent'>{eyebrow}</p>
          <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink'>
            {title ?? `Verify before you enroll in ${stateName}`}
          </h2>
          <p className='leading-relaxed text-slate-700'>{eligibilityText}</p>
        </div>

        <ul className='space-y-3'>
          {items.map((item) => (
            <li
              key={`${item.title ?? ''}-${item.description}`}
              className='flex gap-3 text-sm leading-relaxed text-slate-700'
            >
              <FaCheckCircle className='mt-1 shrink-0 text-brand-success' aria-hidden='true' />
              <span>
                {item.title ? <strong className='text-brand-ink'>{item.title}: </strong> : null}
                {item.description}
              </span>
            </li>
          ))}
        </ul>

        <div className='flex gap-3 rounded-lg border border-brand-border-strong bg-brand-accent-soft p-4 text-sm leading-relaxed text-brand-ink'>
          <FaExclamationTriangle className='mt-1 shrink-0 text-brand-accent' aria-hidden='true' />
          <p>{warningText}</p>
        </div>
      </div>
    </div>
  )
}

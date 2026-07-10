import { FaClipboardCheck, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa'

import { getStateAffiliateRecommendation } from '@/data/affiliate-links'

interface CompletionTimelineCardProps {
  stateName: string
  stateSlug: string
  className?: string
}

export function CompletionTimelineCard({
  stateName,
  stateSlug,
  className = '',
}: CompletionTimelineCardProps) {
  const { entry, provider } = getStateAffiliateRecommendation(stateSlug)
  const timelineItems = [
    {
      title: 'Before enrolling',
      description:
        'Confirm your deadline, accepted course type, required provider approval, and total cost.',
      icon: FaRegCalendarCheck,
    },
    {
      title: 'During the course',
      description:
        'Complete all provider requirements, including any identity checks, quizzes, or timed sections.',
      icon: FaRegClock,
    },
    {
      title: 'After completion',
      description: entry.certificateDeliveryNotes || provider.certificateDeliveryNotes,
      icon: FaClipboardCheck,
    },
  ]

  return (
    <div className={`rounded-lg border border-brand-border bg-white p-6 shadow-sm ${className}`}>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <p className='text-sm font-semibold text-brand-accent'>Completion timing</p>
          <h2 className='font-poppins text-3xl font-semibold leading-tight text-brand-ink'>
            Certificate and reporting steps for {stateName}
          </h2>
          <p className='leading-relaxed text-slate-700'>
            Completion timing can depend on your deadline, provider processing, certificate
            delivery, and whether reporting is automatic or handled by you.
          </p>
        </div>

        <div className='space-y-4'>
          {timelineItems.map((item) => {
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
    </div>
  )
}

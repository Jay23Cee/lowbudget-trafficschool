import { FunnelStep } from '@/data/california-funnel'

interface HowItWorksSectionProps {
  eyebrow?: string
  title: string
  steps: FunnelStep[]
  className?: string
}

export function HowItWorksSection({
  eyebrow = 'How it works',
  title,
  steps,
  className = '',
}: HowItWorksSectionProps) {
  return (
    <section className={className}>
      <div className='space-y-6'>
        <div className='max-w-3xl space-y-3'>
          <p className='text-sm font-semibold text-brand-accent'>{eyebrow}</p>
          <h2 className='font-poppins text-3xl font-semibold text-brand-ink md:text-4xl'>
            {title}
          </h2>
        </div>
        <div className='grid gap-4 md:grid-cols-3'>
          {steps.map((step, index) => (
            <div key={step.title} className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-sm font-bold text-brand-ink'>
                {index + 1}
              </div>
              <h3 className='mt-4 font-semibold text-brand-ink'>{step.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-slate-600'>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

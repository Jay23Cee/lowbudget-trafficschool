import Image from 'next/image'
import Link from 'next/link'

import { getStateGuideRoute } from '@/lib/routes'

export function SiteFooter() {
  const reviewedDate = 'March 14, 2026'
  const siteLinks = [
    { href: '/', label: 'Home' },
    { href: '/#state-selector', label: 'State Selector' },
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
    { href: getStateGuideRoute('california'), label: 'California Guide' },
  ]

  return (
    <footer className='mt-16 border-t border-brand-border bg-white pb-36 md:pb-28'>
      <div className='mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 text-sm text-slate-700 md:grid-cols-[1.2fr,0.8fr] md:px-6'>
        <div className='space-y-4'>
          <Link
            href='/'
            className='relative block h-[84px] w-[260px] max-w-full'
            aria-label='Low Budget Traffic School home'
          >
            <Image
              src='/assets/lowbudget-traffic-school-logo-header.png'
              alt='Low Budget Traffic School'
              fill
              sizes='260px'
              className='object-contain object-left'
            />
          </Link>
          <p className='leading-relaxed'>
            LowBudgetTrafficSchool is an affiliate referral website. We may earn a commission
            when you visit a provider through our links. Pricing may vary by state, course type,
            and provider, and users should verify current cost before enrolling.
          </p>
          <p className='text-xs text-slate-600'>
            Last network-wide editorial policy review: {reviewedDate}
          </p>
        </div>
        <div className='space-y-4'>
          <p className='font-semibold text-brand-ink'>Site links</p>
          <div className='flex flex-wrap gap-4 text-slate-700'>
            {siteLinks.map((link) => (
              <Link key={link.href} href={link.href} className='hover:text-brand-primary'>
                {link.label}
              </Link>
            ))}
          </div>
          <p className='text-xs text-slate-600'>
            Copyright 2026 LowBudgetTrafficSchool.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

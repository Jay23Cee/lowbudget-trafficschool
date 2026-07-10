import Link from 'next/link'

import { PageContainer } from '@/components/layout/PageContainer'

export default function NotFoundPage() {
  return (
    <section className='py-20'>
      <PageContainer className='max-w-2xl text-center'>
        <p className='font-poppins text-sm font-semibold uppercase tracking-wide text-brand-accent'>
          Page not found
        </p>
        <h1 className='mt-3 font-poppins text-4xl font-semibold text-brand-ink'>
          We could not find that page
        </h1>
        <p className='mt-4 leading-relaxed text-slate-700'>
          The link may be outdated or the page may have moved.
        </p>
        <Link
          href='/'
          className='mt-8 inline-flex min-h-11 items-center rounded-lg bg-brand-primary px-5 py-2 font-semibold text-brand-ink hover:bg-brand-primary-hover'
        >
          Return home
        </Link>
      </PageContainer>
    </section>
  )
}

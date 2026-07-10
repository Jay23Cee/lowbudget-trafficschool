import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa'

const HEADER_LINKS = [
  { href: '/california', label: 'California Guide' },
  { href: '/#state-guides', label: 'State Guides' },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function closeMobileMenu(): void {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className='sticky top-0 z-40 border-b border-brand-border bg-white/95 backdrop-blur'>
      <div className='mx-auto flex min-h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-6'>
        <Link
          href='/'
          className='relative block h-[52px] w-[154px] shrink-0 sm:h-[56px] sm:w-[174px] md:w-[190px]'
          aria-label='Low Budget Traffic School home'
          onClick={closeMobileMenu}
        >
          <Image
            src='/assets/lowbudget-traffic-school-logo-header.png'
            alt='Low Budget Traffic School'
            fill
            priority
            sizes='(max-width: 479px) 154px, (max-width: 767px) 174px, 190px'
            className='block object-contain object-left'
          />
        </Link>
        <nav aria-label='Main navigation' className='flex items-center gap-2'>
          <ul className='hidden items-center gap-1 text-sm font-medium text-slate-700 lg:flex'>
            {HEADER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='inline-flex min-h-10 items-center rounded-md px-3 py-2 transition hover:bg-brand-surface hover:text-brand-ink focus-visible:bg-brand-surface'
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href='/#state-selector'
            className='hidden min-h-10 items-center gap-2 rounded-md bg-brand-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:bg-slate-800 sm:inline-flex'
          >
            Find your state
            <FaArrowRight aria-hidden='true' />
          </Link>
          <button
            type='button'
            aria-controls='mobile-navigation'
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className='inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-brand-border-strong bg-white text-brand-ink transition hover:bg-brand-surface lg:hidden'
            onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
          >
            {isMobileMenuOpen ? (
              <FaTimes aria-hidden='true' />
            ) : (
              <FaBars aria-hidden='true' />
            )}
          </button>
        </nav>
      </div>
      {isMobileMenuOpen ? (
        <div
          id='mobile-navigation'
          className='border-t border-brand-border bg-white px-4 py-4 shadow-lg lg:hidden'
        >
          <div className='mx-auto grid w-full max-w-7xl gap-2 text-sm font-semibold text-slate-700'>
            {HEADER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='flex min-h-11 items-center rounded-md px-3 py-2 transition hover:bg-brand-surface hover:text-brand-ink'
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href='/#state-selector'
              className='mt-2 flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-ink px-4 py-2 text-white transition hover:bg-slate-800'
              onClick={closeMobileMenu}
            >
              Find your state
              <FaArrowRight aria-hidden='true' />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}

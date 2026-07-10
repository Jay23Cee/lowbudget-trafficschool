import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'

import { StateSelector } from '@/components/state/StateSelector'
import { findStateBySlug } from '@/data/states'
import { getAffiliateRedirectRoute } from '@/lib/routes'

const FORM_STATE_STORAGE_PREFIX = 'state-affiliate-redirect-form'

interface StateAffiliateRedirectFormProps {
  inputId: string
  buttonLabel?: string
  initialStateSlug?: string
  className?: string
}

export function StateAffiliateRedirectForm({
  inputId,
  buttonLabel = 'Go To Provider',
  initialStateSlug = '',
  className = '',
}: StateAffiliateRedirectFormProps) {
  const router = useRouter()
  const [selectedStateSlug, setSelectedStateSlug] = useState(initialStateSlug)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    function syncRestoredStateSelection(): void {
      const stateSelector = document.getElementById(inputId)
      const restoredStateSlug =
        stateSelector instanceof HTMLSelectElement && stateSelector.value
          ? stateSelector.value
          : readSavedStateSlug(inputId)

      if (restoredStateSlug) {
        setSelectedStateSlug(restoredStateSlug)
      }
    }

    syncRestoredStateSelection()
    window.addEventListener('pageshow', syncRestoredStateSelection)

    return () => {
      window.removeEventListener('pageshow', syncRestoredStateSelection)
    }
  }, [inputId])

  function handleStateChange(stateSlug: string): void {
    setSelectedStateSlug(stateSlug)
    setErrorMessage('')
    saveSelectedStateSlug(inputId, stateSlug)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!selectedStateSlug || !findStateBySlug(selectedStateSlug)) {
      setErrorMessage('Select a valid state before continuing.')
      return
    }

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const forwardedQuery = Object.fromEntries(
        Object.entries(router.query).filter(([key]) => key !== 'state')
      )

      const didNavigate = await router.push({
        pathname: getAffiliateRedirectRoute(selectedStateSlug),
        query: forwardedQuery,
      })

      if (!didNavigate) {
        throw new Error('Affiliate redirect navigation was cancelled')
      }
    } catch {
      setErrorMessage('We could not open the provider right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <label htmlFor={inputId} className='sr-only'>
        Select your state
      </label>
      <StateSelector
        id={inputId}
        value={selectedStateSlug}
        onChange={handleStateChange}
        className='min-w-[240px] flex-1'
      />
      {errorMessage ? (
        <p role='alert' aria-live='polite' className='text-sm text-red-700 sm:col-span-2'>
          {errorMessage}
        </p>
      ) : null}
      <button
        type='submit'
        className='inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-2 font-semibold text-brand-ink transition hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:bg-brand-border-strong'
        disabled={!selectedStateSlug || isSubmitting}
      >
        {isSubmitting ? 'Opening...' : buttonLabel}
        <FaArrowRight aria-hidden='true' />
      </button>
    </form>
  )
}

function getFormStateStorageKey(inputId: string): string {
  return `${FORM_STATE_STORAGE_PREFIX}:${inputId}`
}

function readSavedStateSlug(inputId: string): string {
  if (typeof window === 'undefined') {
    return ''
  }

  try {
    return window.sessionStorage.getItem(getFormStateStorageKey(inputId)) ?? ''
  } catch {
    return ''
  }
}

function saveSelectedStateSlug(inputId: string, stateSlug: string): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const storageKey = getFormStateStorageKey(inputId)

    if (!stateSlug) {
      window.sessionStorage.removeItem(storageKey)
      return
    }

    window.sessionStorage.setItem(storageKey, stateSlug)
  } catch {
    // Storage can be unavailable in privacy-restricted browsers. The form remains usable.
  }
}

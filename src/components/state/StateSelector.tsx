import { ChangeEvent } from 'react'

import { US_STATES } from '@/data/states'

interface StateSelectorProps {
  id: string
  value: string
  onChange: (stateSlug: string) => void
  className?: string
  includePlaceholder?: boolean
}

export function StateSelector({
  id,
  value,
  onChange,
  className = '',
  includePlaceholder = true,
}: StateSelectorProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    onChange(event.target.value)
  }

  return (
    <select
      id={id}
      value={value}
      onChange={handleChange}
      className={`min-h-12 rounded-lg border border-brand-border-strong bg-white px-3 py-2 text-brand-ink shadow-sm ${className}`}
    >
      {includePlaceholder && <option value=''>Select your state</option>}
      {US_STATES.map((state) => (
        <option key={state.slug} value={state.slug}>
          {state.name}
        </option>
      ))}
    </select>
  )
}

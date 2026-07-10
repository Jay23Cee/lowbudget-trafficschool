export function formatDateOnly(value: string): string {
  const date = parseDateOnly(value)

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split('-').map((part) => Number(part))

  if (
    Number.isInteger(year) &&
    Number.isInteger(month) &&
    Number.isInteger(day) &&
    year > 0 &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31
  ) {
    return new Date(year, month - 1, day)
  }

  return new Date(value)
}

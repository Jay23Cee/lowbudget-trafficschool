export const SITE_NAME = 'Low Budget Traffic School'
export const SITE_TAGLINE = 'National online traffic school referral guides by state'
const DEFAULT_SITE_URL = 'https://www.lowbudgettrafficschool.com'

function getSiteUrl(): string {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!configuredSiteUrl) {
    return DEFAULT_SITE_URL
  }

  let parsedUrl: URL

  try {
    parsedUrl = new URL(configuredSiteUrl)
  } catch {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a valid HTTP or HTTPS URL')
  }

  if (
    !['http:', 'https:'].includes(parsedUrl.protocol) ||
    parsedUrl.pathname !== '/' ||
    parsedUrl.search ||
    parsedUrl.hash
  ) {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must contain only an HTTP or HTTPS origin without a path, query, or hash'
    )
  }

  return parsedUrl.origin
}

export const SITE_URL = getSiteUrl()
export const DEFAULT_OG_IMAGE = '/assets/traffic-school-og.png'

export function getAbsoluteUrl(pathname: string): string {
  const safePath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${SITE_URL}${safePath}`
}

import { US_STATES } from '@/data/states'

export const CORE_SITE_ROUTES = [
  '/',
  '/california',
  '/about',
  '/privacy',
  '/terms',
  '/affiliate-disclosure',
]

export const TRAFFIC_SCHOOL_101_REDIRECT_ROUTE = '/go/trafficschool101'

export function getAllStateRoutes(): string[] {
  return US_STATES.map((state) => getStateGuideRoute(state.slug))
}

export function getAllGoRoutes(): string[] {
  return [
    ...US_STATES.map((state) => getAffiliateRedirectRoute(state.slug)),
    TRAFFIC_SCHOOL_101_REDIRECT_ROUTE,
  ]
}

export function getAllIndexableRoutes(): string[] {
  return [...CORE_SITE_ROUTES, ...getAllStateRoutes()]
}

export function getStateGuideRoute(stateSlug: string): string {
  return `/online-traffic-school/${stateSlug}`
}

export function getAffiliateRedirectRoute(stateSlug: string): string {
  return `/go/${stateSlug}`
}

export function getTrafficSchool101RedirectRoute(): string {
  return TRAFFIC_SCHOOL_101_REDIRECT_ROUTE
}

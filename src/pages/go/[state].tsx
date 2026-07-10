import { GetServerSideProps } from 'next'

import { buildAffiliateUrl } from '@/data/affiliate-links'
import { findStateBySlug } from '@/data/states'
import { logger } from '@/lib/logger'

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const stateSlug = params?.state

  if (typeof stateSlug !== 'string' || !findStateBySlug(stateSlug)) {
    logger.warn('affiliate_redirect_invalid_state', 'Invalid state affiliate redirect requested', {
      stateParamType: typeof stateSlug,
      stateSlug: typeof stateSlug === 'string' ? stateSlug : undefined,
    })

    return {
      notFound: true,
    }
  }

  const forwardedQuery = Object.fromEntries(
    Object.entries(query).filter(([key]) => key !== 'state')
  )

  try {
    const destination = buildAffiliateUrl(stateSlug, forwardedQuery)

    logger.info('affiliate_redirect_created', 'State affiliate redirect generated', {
      stateSlug,
      destinationHost: new URL(destination).hostname,
      forwardedQueryKeys: Object.keys(forwardedQuery),
    })

    return {
      redirect: {
        destination,
        permanent: false,
      },
    }
  } catch (error) {
    logger.error('affiliate_redirect_failed', 'Failed to generate state affiliate redirect', error, {
      stateSlug,
      forwardedQueryKeys: Object.keys(forwardedQuery),
    })

    throw error
  }
}

export default function GoStatePage() {
  return null
}

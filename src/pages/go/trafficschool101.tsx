import { GetServerSideProps } from 'next'

import { buildAffiliateUrl } from '@/data/affiliate-links'
import { logger } from '@/lib/logger'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const destination = buildAffiliateUrl(undefined, query)

    logger.info('affiliate_redirect_created', 'Default affiliate redirect generated', {
      destinationHost: new URL(destination).hostname,
      forwardedQueryKeys: Object.keys(query),
    })

    return {
      redirect: {
        destination,
        permanent: false,
      },
    }
  } catch (error) {
    logger.error('affiliate_redirect_failed', 'Failed to generate default affiliate redirect', error, {
      forwardedQueryKeys: Object.keys(query),
    })

    throw error
  }
}

export default function TrafficSchool101RedirectPage() {
  return null
}

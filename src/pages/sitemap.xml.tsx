import { GetServerSideProps } from 'next'

import { logger } from '@/lib/logger'
import { getAllIndexableRoutes } from '@/lib/routes'
import { getAbsoluteUrl } from '@/lib/site-config'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const urls = getAllIndexableRoutes().map((pathname) => getAbsoluteUrl(pathname))
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
  .join('\n')}
</urlset>`

    res.setHeader('Content-Type', 'text/xml; charset=utf-8')
    res.setHeader(
      'Cache-Control',
      'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
    )
    res.write(xml)
    res.end()

    logger.info('sitemap_generated', 'Sitemap XML generated', {
      urlCount: urls.length,
    })

    return {
      props: {},
    }
  } catch (error) {
    logger.error('sitemap_generation_failed', 'Failed to generate sitemap XML', error)

    throw error
  }
}

export default function SitemapPage() {
  return null
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

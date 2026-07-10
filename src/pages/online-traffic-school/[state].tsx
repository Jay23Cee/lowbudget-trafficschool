import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

import { TOP_STATES, US_STATES } from '@/data/states'
import { assertSiteIntegrity } from '@/lib/integrity'
import { logger } from '@/lib/logger'
import { getAllGoRoutes, getAllIndexableRoutes, getStateGuideRoute } from '@/lib/routes'
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildSeoMeta, SeoHead } from '@/lib/seo'
import { loadStateContentBySlug } from '@/lib/state-content'
import { StateGuideTemplate } from '@/templates/StateGuideTemplate'
import { StateContentDocument } from '@/types/site'

export const getStaticPaths: GetStaticPaths = async () => {
  assertSiteIntegrity([...getAllIndexableRoutes(), ...getAllGoRoutes()])

  return {
    paths: US_STATES.map((state) => ({
      params: { state: state.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  relatedStateSlugs: string[]
  stateContent: Omit<StateContentDocument, 'sourceFile'>
}> = async ({ params }) => {
  const stateSlug = params?.state

  if (typeof stateSlug !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const stateContent = loadStateContentBySlug(stateSlug)

    if (!stateContent) {
      logger.warn('state_guide_content_not_found', 'No state guide content found for slug', {
        stateSlug,
      })

      return {
        notFound: true,
      }
    }

    const relatedStateSlugs = getRelatedStateSlugs(stateSlug)

    return {
      props: {
        relatedStateSlugs,
        stateContent: {
          body: stateContent.body,
          eligibility: stateContent.eligibility,
          faq: stateContent.faq,
          hero: stateContent.hero,
          intro: stateContent.intro,
          lastReviewed: stateContent.lastReviewed,
          seoDescription: stateContent.seoDescription,
          seoTitle: stateContent.seoTitle,
          slug: stateContent.slug,
          stateName: stateContent.stateName,
        },
      },
    }
  } catch (error) {
    logger.error('state_guide_static_props_failed', 'Failed to build state guide static props', error, {
      stateSlug,
    })

    throw error
  }
}

export default function StateGuidePage({
  relatedStateSlugs,
  stateContent,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const meta = buildSeoMeta(
    getStateGuideRoute(stateContent.slug),
    stateContent.seoTitle,
    stateContent.seoDescription
  )
  const structuredData = [
    buildBreadcrumbJsonLd([
      { name: 'Home', pathname: '/' },
      {
        name: stateContent.stateName,
        pathname: getStateGuideRoute(stateContent.slug),
      },
    ]),
    buildFaqJsonLd(stateContent.faq),
  ]

  return (
    <>
      <SeoHead meta={meta} structuredData={structuredData} />
      <StateGuideTemplate stateContent={stateContent} relatedStateSlugs={relatedStateSlugs} />
    </>
  )
}

function getRelatedStateSlugs(currentStateSlug: string): string[] {
  const relatedSlugs = new Set<string>()

  TOP_STATES.forEach((stateSlug) => {
    if (stateSlug !== currentStateSlug) {
      relatedSlugs.add(stateSlug)
    }
  })

  const currentIndex = US_STATES.findIndex((state) => state.slug === currentStateSlug)
  const offsets = [-2, -1, 1, 2, 3, -3]

  offsets.forEach((offset) => {
    if (currentIndex === -1) {
      return
    }

    const relatedIndex = (currentIndex + offset + US_STATES.length) % US_STATES.length
    const relatedSlug = US_STATES[relatedIndex]?.slug

    if (relatedSlug && relatedSlug !== currentStateSlug) {
      relatedSlugs.add(relatedSlug)
    }
  })

  return Array.from(relatedSlugs).slice(0, 6)
}

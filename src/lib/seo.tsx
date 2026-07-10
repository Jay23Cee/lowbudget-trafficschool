import Head from 'next/head'

import { DEFAULT_OG_IMAGE, getAbsoluteUrl, SITE_NAME } from '@/lib/site-config'
import { SeoPageMeta, StateFaqItem } from '@/types/site'

interface SeoHeadProps {
  meta: SeoPageMeta
  structuredData?: Record<string, unknown>[]
}

export function buildSeoMeta(
  pathname: string,
  title: string,
  description: string
): SeoPageMeta {
  return {
    title,
    description,
    canonical: getAbsoluteUrl(pathname),
    openGraphImage: getAbsoluteUrl(DEFAULT_OG_IMAGE),
  }
}

export function buildBreadcrumbJsonLd(
  items: { name: string; pathname: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.pathname),
    })),
  }
}

export function buildFaqJsonLd(faq: StateFaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((faqItem) => ({
      '@type': 'Question',
      name: faqItem.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqItem.answer,
      },
    })),
  }
}

export function SeoHead({ meta, structuredData = [] }: SeoHeadProps) {
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='description' content={meta.description} />
      <link rel='canonical' href={meta.canonical} />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={SITE_NAME} />
      <meta property='og:title' content={meta.title} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:url' content={meta.canonical} />
      <meta property='og:image' content={meta.openGraphImage} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.openGraphImage} />
      {structuredData.map((item, index) => (
        <script
          key={index}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  )
}

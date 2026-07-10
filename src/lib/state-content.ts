import { US_STATES } from '@/data/states'
import { getContentDirectory, loadMarkdownCollection } from '@/lib/content-loader'
import { StateContentDocument, StateFaqItem } from '@/types/site'

const STATE_CONTENT_DIRECTORY = getContentDirectory('states')

function assertTextField(value: unknown, fieldName: string, sourceFile: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Invalid "${fieldName}" in ${sourceFile}`)
  }

  return value.trim()
}

function assertFaqField(value: unknown, sourceFile: string): StateFaqItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`Invalid "faq" in ${sourceFile}: expected a non-empty list`)
  }

  return value.map((faqItem, index) => {
    if (typeof faqItem !== 'object' || faqItem === null) {
      throw new Error(`Invalid faq item at index ${index} in ${sourceFile}`)
    }

    const question = assertTextField(
      (faqItem as Record<string, unknown>).question,
      `faq[${index}].question`,
      sourceFile
    )
    const answer = assertTextField(
      (faqItem as Record<string, unknown>).answer,
      `faq[${index}].answer`,
      sourceFile
    )

    return { question, answer }
  })
}

function validateLastReviewed(lastReviewed: string, sourceFile: string): string {
  const parsedDate = new Date(lastReviewed)

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid "lastReviewed" in ${sourceFile}: expected ISO-compatible date`)
  }

  return lastReviewed
}

function assertStateCoverage(documents: StateContentDocument[]): void {
  const expectedSlugs = new Set(US_STATES.map((state) => state.slug))
  const actualSlugs = new Set(documents.map((document) => document.slug))

  if (actualSlugs.size !== expectedSlugs.size) {
    throw new Error(
      `State content coverage mismatch: expected ${expectedSlugs.size} states, found ${actualSlugs.size}`
    )
  }

  expectedSlugs.forEach((slug) => {
    if (!actualSlugs.has(slug)) {
      throw new Error(`Missing state content for slug "${slug}"`)
    }
  })
}

function assertUniqueSeoFields(documents: StateContentDocument[]): void {
  const titleMap = new Map<string, string>()
  const descriptionMap = new Map<string, string>()

  documents.forEach((document) => {
    const existingTitleSlug = titleMap.get(document.seoTitle)
    if (existingTitleSlug) {
      throw new Error(
        `Duplicate seoTitle detected for "${document.slug}" and "${existingTitleSlug}"`
      )
    }
    titleMap.set(document.seoTitle, document.slug)

    const existingDescriptionSlug = descriptionMap.get(document.seoDescription)
    if (existingDescriptionSlug) {
      throw new Error(
        `Duplicate seoDescription detected for "${document.slug}" and "${existingDescriptionSlug}"`
      )
    }
    descriptionMap.set(document.seoDescription, document.slug)
  })
}

function parseDocument(rawDocument: ReturnType<typeof loadMarkdownCollection>[number]): StateContentDocument {
  const { data, fileSlug, sourceFile } = rawDocument

  const stateName = assertTextField(data.stateName, 'stateName', sourceFile)
  const slug = assertTextField(data.slug, 'slug', sourceFile)
  const seoTitle = assertTextField(data.seoTitle, 'seoTitle', sourceFile)
  const seoDescription = assertTextField(data.seoDescription, 'seoDescription', sourceFile)
  const hero = assertTextField(data.hero, 'hero', sourceFile)
  const intro = assertTextField(data.intro, 'intro', sourceFile)
  const eligibility = assertTextField(data.eligibility, 'eligibility', sourceFile)
  const lastReviewed = validateLastReviewed(
    assertTextField(data.lastReviewed, 'lastReviewed', sourceFile),
    sourceFile
  )
  const faq = assertFaqField(data.faq, sourceFile)

  if (slug !== fileSlug) {
    throw new Error(`Slug mismatch in ${sourceFile}: slug "${slug}" must match file name`)
  }

  if (!US_STATES.some((state) => state.slug === slug)) {
    throw new Error(`Unexpected state slug "${slug}" in ${sourceFile}`)
  }

  return {
    stateName,
    slug,
    seoTitle,
    seoDescription,
    hero,
    intro,
    eligibility,
    faq,
    lastReviewed,
    body: rawDocument.body,
    sourceFile,
  }
}

export function loadAllStateContent(): StateContentDocument[] {
  const rawDocuments = loadMarkdownCollection(STATE_CONTENT_DIRECTORY)
  const documents = rawDocuments.map((rawDocument) => parseDocument(rawDocument))

  assertStateCoverage(documents)
  assertUniqueSeoFields(documents)

  return documents
}

export function loadStateContentBySlug(stateSlug: string): StateContentDocument | undefined {
  return loadAllStateContent().find((document) => document.slug === stateSlug)
}

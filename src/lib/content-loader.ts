import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

export interface MarkdownCollectionDocument {
  body: string
  data: Record<string, unknown>
  fileSlug: string
  sourceFile: string
}

export function getContentDirectory(...segments: string[]): string {
  return path.join(process.cwd(), 'src', 'content', ...segments)
}

export function loadMarkdownCollection(
  directory: string,
  fileExtension = '.md'
): MarkdownCollectionDocument[] {
  if (!fs.existsSync(directory)) {
    throw new Error(`Missing content directory: ${directory}`)
  }

  const contentFiles = fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(fileExtension))
    .sort()

  if (contentFiles.length === 0) {
    throw new Error(`No content files found in ${directory}`)
  }

  return contentFiles.map((fileName) => {
    const sourceFile = path.join(directory, fileName)
    const fileContents = fs.readFileSync(sourceFile, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      body: content.trim(),
      data,
      fileSlug: fileName.slice(0, -fileExtension.length),
      sourceFile,
    }
  })
}

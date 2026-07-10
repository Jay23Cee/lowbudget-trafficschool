import fs from 'fs'
import path from 'path'

const statesFile = path.join(process.cwd(), 'src', 'data', 'states.ts')
const outputDirectory = path.join(process.cwd(), 'src', 'content', 'states')
const statePattern = /\{ name: '([^']+)', slug: '([^']+)', code: '([^']+)' \}/g
const lastReviewed = '2026-03-14'

const source = fs.readFileSync(statesFile, 'utf8')
const matches = [...source.matchAll(statePattern)]

if (matches.length === 0) {
  throw new Error(`No states found in ${statesFile}`)
}

fs.mkdirSync(outputDirectory, { recursive: true })

for (const [, name, slug] of matches) {
  const filePath = path.join(outputDirectory, `${slug}.md`)

  if (fs.existsSync(filePath)) {
    continue
  }

  const content = `---
stateName: ${quote(name)}
slug: ${quote(slug)}
seoTitle: ${quote(`Best Online Traffic School Options in ${name} | Low Budget Traffic School`)}
seoDescription: ${quote(`Review online traffic school options in ${name}, understand typical eligibility questions, and compare providers before you enroll.`)}
hero: ${quote(`Compare Online Traffic School Options in ${name}`)}
intro: ${quote(`Our ${name} referral guide helps drivers review provider options, understand common enrollment questions, and decide what to verify before signing up.`)}
eligibility: ${quote(`Eligibility rules vary by court, agency, insurer, and provider in ${name}. Confirm whether your citation, driving history, deadline, and desired outcome qualify before you enroll.`)}
lastReviewed: ${quote(lastReviewed)}
faq:
  - question: ${quote(`Can I take traffic school online in ${name}?`)}
    answer: ${quote(`Online course availability and acceptance policies vary in ${name}. Confirm approval with the court, agency, insurer, or provider before registering.`)}
  - question: ${quote(`Will traffic school remove points from my record in ${name}?`)}
    answer: ${quote(`Point reduction, dismissal, or insurance treatment depends on the specific program and authority involved in ${name}. Verify the expected outcome in writing before you enroll.`)}
  - question: ${quote(`How do I choose a provider for ${name} traffic school?`)}
    answer: ${quote(`Compare provider approval status, deadlines, pricing, support, reporting process, and refund terms before choosing a course for ${name}.`)}
---

## What to verify before you enroll

If you are comparing traffic school options in ${name}, start by confirming which authority is handling your citation or requirement. Courts, insurers, employers, and state agencies may use different rules, deadlines, and completion standards.

Before you pay for any course, verify:

- whether an online course is accepted for your situation in ${name}
- the deadline for registration and course completion
- how completion is reported and whether you need to submit proof yourself
- total price, including any certificate or processing fees

## How to compare providers

The lowest advertised price is not the only factor that matters. Review customer support availability, mobile usability, identity verification steps, completion reporting process, and refund policies before choosing a provider in ${name}.

This website is an affiliate referral publisher. We do not operate courses, issue certificates, or make decisions about eligibility in ${name}.

## Next step

Use the state selector on this page to continue to a provider, or return to the [national state guide directory](/) to compare other locations.

You can also review our [about page](/about) for details on how this site uses affiliate links.
`

  fs.writeFileSync(filePath, content)
}

function quote(value) {
  return JSON.stringify(value)
}

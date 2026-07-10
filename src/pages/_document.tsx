import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

import { SITE_NAME } from '@/lib/site-config'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
    const measurementId =
      configuredMeasurementId && /^G-[A-Z0-9]+$/.test(configuredMeasurementId)
        ? configuredMeasurementId
        : undefined

    return (
      <Html lang='en'>
        <Head>
          <meta name='application-name' content={SITE_NAME} />
          <meta name='apple-mobile-web-app-title' content={SITE_NAME} />
          <meta name='theme-color' content='#0a0a0a' />
          <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
          <link rel='icon' href='/favicon.ico' sizes='any' />
          <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
          {measurementId ? (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || []
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date())
                    gtag('config', ${JSON.stringify(measurementId)})
                  `,
                }}
              />
            </>
          ) : null}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

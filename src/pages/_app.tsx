import '~/styles/global.scss'
import type { AppProps } from 'next/app'
import { lazy } from 'react'
import Head from 'next/head'
import { orgSchema, siteLinkSchema } from '~/utils/customHead'
import { usePathname } from 'next/navigation'
import { slugToCapitalized } from '~/utils/common'

export interface SharedPageProps {
  draftMode?: boolean
  token?: string
  locale?: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))


export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  const pathname:any = usePathname()
  const currentWindow =pathname && pathname?.split('/') || []
  const index = pathname?.split('/').length-1 || 0
  const result = slugToCapitalized(currentWindow[index])

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="/favicon-32x32.ico"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/VoiceStack.svg"
          sizes="16x16"
          type="image/png"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      {orgSchema()}
      {siteLinkSchema()}
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}

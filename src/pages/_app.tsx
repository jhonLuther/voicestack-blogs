import '~/styles/global.scss'

import type { AppProps } from 'next/app'
import {  Inter, Archivo, Manrope} from 'next/font/google'
import { lazy } from 'react'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

const inter = Inter({ subsets: ["latin"], display: "swap", variable: '--font-inter' });
const archivo = Archivo({ subsets: ["latin"], display: "swap" });
const monrope = Manrope({ subsets: ["latin"], display: "swap",  variable: '--font-manrope' });

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  
  return (
    <>
        <style jsx global>{`
          body {
            font-family: ${inter.style.fontFamily};
          }
          button {
            font-family: ${inter.style.fontFamily};
          }
          .archivo {
            font-family: ${archivo.style.fontFamily};
          }
          .monrope {
            font-family: ${monrope.style.fontFamily};
          }
        `}</style>
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

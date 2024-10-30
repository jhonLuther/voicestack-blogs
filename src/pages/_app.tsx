import '~/styles/global.scss';
import type { AppProps } from 'next/app';
import { lazy } from 'react';
import Head from 'next/head';

export interface SharedPageProps {
  draftMode: boolean;
  token: string;
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'));

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:image" content="https://cdn.sanity.io/images/bbmnn1wc/production/ed6b4c33951e6f3723af2fefef6ad2fc130ffd58-1000x629.png?auto=format"></meta>
        <meta property="og:description" content="In today’s digitally connected world, phones still play an essential role in the success of dental practices. Despite the rise of online appointment booking systems and email communication, the phone remains a primary tool for first impressions and ongoing patient engagement."></meta>
        <meta property="og:type" content="website"></meta>
        <title>Dentistry’s Inner Circle</title>
      </Head>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

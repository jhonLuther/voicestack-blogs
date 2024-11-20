import '~/styles/global.scss';
import type { AppProps } from 'next/app';
import { lazy } from 'react';
import Head from 'next/head';
import { orgSchema, siteLinkSchema } from '~/utils/customHead';

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
        <title>CS GrowthClub</title>
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
  );
}

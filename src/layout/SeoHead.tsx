import Head from 'next/head';
import Script from 'next/script';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
  robots: string;
  canonical: string;
  jsonLD: string;
}

export default function SEOHead({
  title,
  description,
  keywords,
  robots,
  canonical,
  jsonLD,
}: SEOHeadProps) {
  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta name="description" content={description} key="description" />
        <meta name="keywords" content={keywords} key="keywords" />
        <meta name="robots" content={robots} key="robots" />
        <link rel="canonical" href={canonical} key="canonical" />
      </Head>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLD }}
        key="jsonld"
      />
    </>
  );
}
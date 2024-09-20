import Head from 'next/head';
import Script from 'next/script';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
  robots: string;
  canonical: string;
  jsonLD: string;
  contentType?:any;
  props?: {
    contentType: string;
  };
}

export default function SEOHead({
  title,
  description,
  keywords,
  robots,
  canonical,
  jsonLD,
  props, 
}: SEOHeadProps) {
  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta name="description" content={description} key="description" />
        <meta name="keywords" content={keywords} key="keywords" />
        <meta name="robots" content={robots} key="robots" />
        <link rel="canonical" href={canonical} key="canonical" />
        {jsonLD && props?.contentType && ( 
          <script
            key={`blogJSON-${0.5 * Math.random()}`}
            type="application/ld+json"
            id={`${props.contentType}-jsonLd`}
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
          />
        )}
      </Head>
    </>
  );
}

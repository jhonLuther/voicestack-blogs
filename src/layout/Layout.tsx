import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


interface LayoutProps {
  children?: React.ReactNode;
  locale?: string | undefined;
  locales?: string[] | undefined;
  defaultLocale?: string | undefined;
  header?: any;
  body?: any;
  isPage?: Boolean;
  full_slug?: any;
  [x: string]: any
}

const Layout = ({
  children,
  locale,
  locales,
  defaultLocale,
  header,
  body,
  isPage = true,
  segmentName,
  // jsonLdSchema,
  ...rest
}: LayoutProps) => {

  const router = useRouter();


  

  return (
    <>

      {children}

    </>
  );
};

export default Layout;

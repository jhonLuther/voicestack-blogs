import { NextRouter } from 'next/router';

export const getBasePath = (router: NextRouter, contentType: string): string => {
  switch (true) {
    case router.pathname.startsWith('/podcast'):
      return 'podcast';
    case router.pathname.startsWith('/article'):
      return 'article';
    case router.pathname.startsWith('/webinar'):
      return 'webinar';
    case router.pathname.startsWith('/press-release'):
      return 'press-release';
    case router.pathname.startsWith('/ebook'):
      return 'ebook';
    case router.pathname.startsWith('/case-study'):
      return 'case-study';
    default:
      return 'post'; 
  }
};

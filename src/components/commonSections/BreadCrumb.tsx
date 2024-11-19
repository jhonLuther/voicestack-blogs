import { useState, useEffect, Fragment, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { breadCrumbJsonLd } from '~/utils/generateJSONLD';
import {CustomHead} from '~/utils/customHead';
import {ArrowRightIcon} from '@sanity/icons'
import { removeUnwantedCharacters } from '~/utils/common';

interface BreadCrumbProps {
  className?: string
}

const Breadcrumb = ({className}:BreadCrumbProps) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const pathSegments = useRef(router.asPath.split('/').filter(segment => segment !== ''));

  const breadcrumbLabels = useMemo(() => ({
    blogs: 'Blogs',
    articles: 'Articles',
    ebooks: 'eBooks',
    podcasts: 'Podcasts',
  }), []);

  useEffect(() => {
    const breadcrumbList = pathSegments?.current.map((segment, index) => {
      const href = `/${pathSegments?.current.slice(0, index + 1).join('/')}`;
      const label = (breadcrumbLabels[segment] || segment).replace(/-/g, ' ');
      return { href, label };
    });
    setBreadcrumbs(breadcrumbList);
  }, [router.asPath, breadcrumbLabels ,pathSegments]);

  const breadcrumbLd = breadCrumbJsonLd(breadcrumbs);


  return (
    <Fragment>
      <CustomHead props={breadcrumbs} type="breadCrumbs" />
      <nav
        className={`cursor-pointer mb-4 ${className}`}
        aria-label="Breadcrumb"
      >
        <div className="line-clamdiv-1 uppercase overflow-hidden text-ellipsis flex items-center flex-wrap">
          <span className='flex items-center'> 
            <Link href="/" className='zinc-300 text-xs font-500'>{`Home`}</Link>
            <span className="mx-3 text-zinc-500 uppercase"><ArrowRightIcon width={24} height={24}/></span>
          </span>
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1
            return (
              <span key={breadcrumb.href} className={`flex items-center ${isLast && 'w-full cursor-default'}`}>
                {isLast ? (
                  <span aria-current="page" className='zinc-400 text-xs font-500 uppercase opacity-50 mt-2'>{removeUnwantedCharacters(breadcrumb.label)}</span>
                ) : (
                  <Link href={breadcrumb.href} className='zinc-300 text-xs font-500 uppercase'>{removeUnwantedCharacters(breadcrumb.label)}</Link>
                )}
                {!isLast && <span className="mx-3 text-zinc-500"><ArrowRightIcon width={24} height={24}/></span>}
              </span>
            )
          })}
        </div>
      </nav>
    </Fragment>
  )
};

export default Breadcrumb;
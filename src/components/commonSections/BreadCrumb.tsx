import { useState, useEffect, Fragment, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { breadCrumbJsonLd } from '~/utils/generateJSONLD';
import Head from 'next/head';
import CustomHead from '~/utils/customHead';

interface BreadCrumbProps {
  className?: string
}

const Breadcrumb = ({className}:BreadCrumbProps) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const pathSegments = useRef(router.asPath.split('/').filter(segment => segment !== ''));
  const prevRouterAsPath = useRef(router.asPath);

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
        <p className="line-clamp-1 uppercase overflow-hidden text-ellipsis">
          <span>
            <Link href="/">{`Home`}</Link>
          </span>
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1
            return (
              <span key={breadcrumb.href}>
                <span className="mx-1">/</span>
                {isLast ? (
                  <span aria-current="page">{breadcrumb.label}</span>
                ) : (
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                )}
              </span>
            )
          })}
        </p>
      </nav>
    </Fragment>
  )
};

export default Breadcrumb;
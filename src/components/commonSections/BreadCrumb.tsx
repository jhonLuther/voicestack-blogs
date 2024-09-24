import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(segment => segment !== '');

  const breadcrumbLabels = {
    blogs: 'Blogs',
    articles: 'Articles',
    ebooks: 'eBooks',
    podcasts: 'Podcasts',
    // Add more mappings as needed
  };

  return (
    <nav className='cursor-pointer mb-4' aria-label="Breadcrumb">
      <p className="line-clamp-1 uppercase overflow-hidden text-ellipsis">
        <span>
          <Link href="/">Home</Link>
        </span>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;

          const label = (breadcrumbLabels[segment] || segment).replace(/-/g, ' ');

          return (
            <span key={segment}>
              <span className='mx-1'>/</span>
              {isLast ? (
                <span aria-current="page">{label}</span>
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </span>
          );
        })}
      </p>
    </nav>
  );
};

export default Breadcrumb;

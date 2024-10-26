import React from 'react';
import Link from 'next/link';
import { Post } from '~/interfaces/post';
import { getRelatedFeatures } from '~/utils/common';
import ShareableLinks from './commonSections/ShareableLinks';
import { useRouter } from 'next/router';
import { getBasePath } from '~/utils/getBasePath';
import post from '~/schemas/post';

interface RelatedFeaturesSectionProps {
  allPosts: any[];
  title?: string;
}


const RelatedFeaturesSection: React.FC<RelatedFeaturesSectionProps> = ({ allPosts, title }) => {
  const router = useRouter();
  if (!allPosts) {
    return null
  }
  
  return (
    <React.Fragment>
      <div className="flex flex-col gap-4 cursor-pointer pt-12">
          <h2 className="text-base font-extrabold font-manrope uppercase ">{`Related Articles`}</h2>
          <ul className="space-y-2 grid  md:grid-cols-3 grid-cols-1  gap-2 ">
            {allPosts && allPosts.map((feature) => (
              <li key={feature._id} className="flex flex-col !m-0 items-start p-6 self-stretch rounded-md bg-[#151515] group">
                <Link
                  href={`/${getBasePath(router, feature.contentType)}/${feature.slug.current}`}
                  className="hover:underline group-hover:underline underline-offset-2 cursor-pointer text-white text-[20px] mb-2 font-extrabold leading-[26px] tracking-[-0.4px]"
                >
                  {feature.title}
                </Link>
                <p className="text-white text-opacity-70 line-clamp-3">
                  {feature.postFields?.excerpt}
                </p>
                {feature.tags && feature.tags.length > 0 ? (
                  // <Link href={`${feature?.tags[0].slug.current}`}>
                  <h3 key={feature.tags[0]._id} className="text-[#EBECED] font-inter text-[14px] font-semibold leading-[24px]">
                    {feature.tags[0].tagName}
                  </h3>
                  // </Link>
                ) : ""}
              </li>
            ))}
          </ul>

      </div>
    </React.Fragment>
  );
};

export default RelatedFeaturesSection;
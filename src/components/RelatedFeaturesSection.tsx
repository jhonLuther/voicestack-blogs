import React from 'react';
import Link from 'next/link';
import { Post } from '~/interfaces/post';
import { getRelatedFeatures } from '~/utils/common';
import ShareableLinks from './commonSections/ShareableLinks';
import { useRouter } from 'next/router';
import { getBasePath } from '~/utils/getBasePath';
import post from '~/schemas/post';
import H3Large from './typography/H3Large';
import AllcontentSection from './sections/AllcontentSection';
import Section from './Section';
import Wrapper from '~/layout/Wrapper';
import BannerSubscribeSection from './sections/BannerSubscribeSection';

interface RelatedFeaturesSectionProps {
  allPosts: any[];
  contentType?: string;
}


const RelatedFeaturesSection: React.FC<RelatedFeaturesSectionProps> = ({ allPosts, contentType }) => {

  if (!allPosts) {
    return null
  }
  
  return (
      <Section className="flex flex-col md:!p-0 md:!pb-12  !bg-zinc-50">
        <AllcontentSection
          className={'pb-9'}
          allContent={allPosts}
          cardType="left-image-card"
          itemsPerPage={4}
          redirect={true}
          contentType={contentType}
        />
      </Section>
  );
};

export default RelatedFeaturesSection;
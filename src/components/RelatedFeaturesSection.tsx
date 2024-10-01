import React from 'react';
import Link from 'next/link';
import { Post } from '~/interfaces/post';
import { getRelatedFeatures } from '~/utils/common';

interface RelatedFeaturesSectionProps {
    currentPostSlug: string;
    allPosts: any[]; // Replace 'any' with your actual post type
}


const RelatedFeaturesSection: React.FC<RelatedFeaturesSectionProps> = ({ currentPostSlug, allPosts }) => {
    const relatedFeatures = allPosts
        .filter(post => post.slug.current !== currentPostSlug)
        .slice(0, 2); 

    if (relatedFeatures.length === 0) {
        return null;
    }



    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-base font-extrabold font-manrope uppercase ">{`Related Articles`}</h2>
            <ul className="space-y-2 flex flex-col gap-2">
                {relatedFeatures && relatedFeatures.map((feature) => (
                    <li key={feature._id} className="flex flex-col items-start p-6 self-stretch rounded-md bg-[#151515] group">
                        <Link
                            href={`/post/${feature.slug.current}`}
                            className="hover:underline group-hover:underline underline-offset-2 cursor-pointer text-white text-[20px] mb-2 font-extrabold leading-[26px] tracking-[-0.4px]"
                        >
                            {feature.title}
                        </Link>
                        <p className="text-white text-opacity-70 line-clamp-3">
                            {feature.postFields?.excerpt}
                        </p>
                        {feature.tags && feature.tags.length > 0 ? (
                            <h3 key={feature.tags[0]._id} className="text-[#EBECED] font-inter text-[14px] font-semibold leading-[24px]">
                                {feature.tags[0].tagName}
                            </h3>
                        ):""}
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default RelatedFeaturesSection;
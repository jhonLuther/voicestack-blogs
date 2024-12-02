import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import Section from '~/components/Section'
import TagsCarousel from '~/components/sections/TagsCarousel'
import Wrapper from '~/layout/Wrapper'
import { ArrowTopRightIcon, UlistIcon } from '@sanity/icons'
import H2Large from '~/components/typography/H2Large'
import siteConfig from 'config/siteConfig'

interface ContentHubProps {
  contentCount: Record<string, number> // Accepts any number of dynamic content types with counts
}

export default function ContentHub({ contentCount }: ContentHubProps) {
  if (!contentCount) {
    return null
  }
 
  return (
    <Section className="bg-zinc-900 justify-center md:pt-12 md:pb-6">
      <Wrapper className={`flex-col gap-3   w-full`}>
        <H2Large className="text-white">{`Browse Topics`}</H2Large>

        <div className="flex-1 overflow-hidden">
          <div className={`flex md:gap-x-8 relative `}>
            <div className="text-zinc-400 flex flex-wrap gap-3">
            <div className="text-zinc-400 flex flex-wrap gap-3">
            {Object.entries(contentCount).map(([key, count], index) => {
              const singularKey = key.endsWith('s') ? key.slice(0, -1) : key;
              const url = siteConfig.pageURLs[singularKey] || '/'; 
              return (
                <Link href={`/${url}`} key={index} className="hover:text-zinc-300 text-sm md:text-base">
                {count}{' '}
                {key.charAt(0).toUpperCase() + key.slice(1)} 
                <span className="hidden md:inline ml-3 ">
                  {index < Object.entries(contentCount).length - 1 && ' • '}
                </span>
              </Link>              
              );
            })}
          </div>
              <Link
                href={`/${siteConfig.paginationBaseUrls.base}`}
                className=" text-[14px] group font-medium leading-[1.5] justify-center  flex items-center gap-x-1 group"
              ><span className="hidden md:inline mr-3">{' • '}</span>
                <span className="text-[14px] md:text-[16px] cursor-pointer text-zinc-400 font-medium text-sm hover:text-zinc-300 inline-flex items-center gap-1">
                  {'Browse All'}
                  <ArrowTopRightIcon
                    className="group-hover:translate-y-[-2px] transition-transform duration-300"
                    height={20}
                    width={20}
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </Section>
  )
}

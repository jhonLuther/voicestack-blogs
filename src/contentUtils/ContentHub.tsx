import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import Section from '~/components/Section'
import TagsCarousel from '~/components/sections/TagsCarousel'
import Wrapper from '~/layout/Wrapper'
import { UlistIcon } from '@sanity/icons'
import H2Large from '~/components/typography/H2Large'

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
              {Object.keys(contentCount).map((key, index) => (
                <span key={index} className="text-sm md:text-base">
                  {contentCount[key]}{' '}
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <span className="hidden md:inline ml-3">
                    {index < Object.keys(contentCount).length - 1 && ' • '}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </Section>
  )
}

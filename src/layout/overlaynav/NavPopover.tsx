import React, { useState, useRef, useEffect } from 'react';
import Wrapper from '../Wrapper';
import Section from '~/components/Section';
import { useGlobalData } from '~/components/Context/GlobalDataContext';
import Link from 'next/link';
import { TruncateIcon } from '@sanity/icons'
import { navigationLinks } from '../Header';
import { useRouter } from 'next/router';

interface NavProps {
  className?: string;
}

export const NavPopover = ({ className = '' }: NavProps) => {
  const { data, featuredTags } = useGlobalData();
  const [active, setActive] = useState(false);
  const [tagData, setTagData] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();


  useEffect(() => {
    if (active && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
  }, [active]);

  useEffect(() => {
    if (data) setTagData(data);
  }, [tagData, data]);

  const handleMouseEnter = () => {
    setActive(true);
  };

  const handleMouseLeave = (event) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setActive(false); // to hide default menu
    }
  };

  return (
    <Section className="justify-center w-full bg-transparent !p-0">
      <Wrapper>
        <div
          className={`relative ${className} w-full`}
        >
          <button
            ref={buttonRef}
            className="px-4 py-3 text-sm font-medium  hover:bg-zinc-300 rounded-md"
            onMouseEnter={handleMouseEnter}
          >
            <TruncateIcon width={40} height={40} />
          </button>

          <div
            className={`
              absolute top-full left-0 mt-4 w-full
              overflow-hidden transition-all duration-200
              ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            style={{ height: active ? contentHeight + 16 : 0 }}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={contentRef}
              className={`
                w-full bg-white rounded-xl shadow-lg border border-gray-100
                transform transition-all duration-200
                ${active ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}
              `}
            >

              <nav className="flex flex-col lg:flex-row gap-y-2 gap-x-6 lg:gap-x-10 flex-wrap">

              {navigationLinks?.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-zinc-300 text-base flex ${router.pathname.startsWith(link.href) ? 'text-zinc-300' : 'text-zinc-500'}`}
                >
                  {link.label}
                </Link>

              ))}
              </nav>
              <div className='p-2'>
                <span className='text-zinc-500'>Browse By Key Topics</span>


              <div className="p-8 columns-4">
                {tagData && tagData.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/browse/${tag?.slug?.current}`}
                    scroll={false}
                    className="text-zinc-400 flex hover:text-zinc-600 transition-colors break-inside-avoid"
                  >
                    <span>{tag?.tagName}</span>
                  </Link>
                ))}
              </div>
              </div>

            </div>
          </div>
        </div>
      </Wrapper>
    </Section>
  );
};
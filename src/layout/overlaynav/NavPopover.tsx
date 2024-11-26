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
  showMenu?: boolean;
}

export const NavPopover = ({ className = '', showMenu }: NavProps) => {
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
    <section className={`pt-[10px] px-[10px] pb-[20px] lg:rounded-[12px] bg-white shadow-custom 
    justify-center bg-transparent absolute lg:top-0 left-0 w-full h-[100vh] lg:h-auto overflow-auto 
    lg:overflow-hidden top-0 transition-transform duration-300 linear ${
    showMenu ? 'flex translate-y-0 opacity-100 visible' : 'lg:-translate-y-3 opacity-0 invisible'}`}>
      <Wrapper>
        <div
          className={`${className} w-full`}
        >
          {/* <button
            ref={buttonRef}
            className="px-4 py-3 text-sm font-medium  hover:bg-zinc-300 rounded-md"
            onMouseEnter={handleMouseEnter}
          >
            <TruncateIcon width={40} height={40} />
          </button> */}

          <div>
            <div ref={contentRef} className={`w-full transform transition-all duration-200}`}>

              <nav className="flex flex-col lg:flex-row gap-y-4 gap-x-6 lg:gap-x-10 flex-wrap rounded-[10px] py-[17px] px-[20px] bg-zinc-100">
                {navigationLinks?.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`hover:text-zinc-500 self-start font-medium text-base lg:text-sm flex items-center gap-2 ${router.pathname.startsWith(link.href) ? 'text-zinc-600' : 'text-zinc-600'}`}
                  >
                    {link.icon && <link.icon />}{link.label}
                  </Link>

                ))}
              </nav>
              <div className='px-[10px] py-6 lg:p-6'>
                <div className='text-zinc-400 pb-6 font-medium text-sm uppercase'>Browse By Key Topics</div>
                <div className="lg:columns-4 gap-6">
                  {tagData && tagData.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/browse/${tag?.slug?.current}`}
                      scroll={false}
                      className="text-zinc-500 pb-[14px] font-medium text-sm flex hover:text-zinc-600 transition-colors break-inside-avoid"
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
    </section>
  );
};
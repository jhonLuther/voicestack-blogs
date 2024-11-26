import React, { useState, useRef, useEffect } from 'react';
import Wrapper from '../Wrapper';
import Section from '~/components/Section';
import { useGlobalData } from '~/components/Context/GlobalDataContext';
import Link from 'next/link';
import { CloseIcon, TruncateIcon, ChevronRightIcon, ChevronLeftIcon } from '@sanity/icons'
import { navigationLinks } from '../Header';
import { useRouter } from 'next/router';
import GrowthClubLogo from '~/assets/reactiveAssets/GrowthClubLogo';
import { transform } from 'next/dist/build/swc';

interface NavProps {
  className?: string;
  showMenu?: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavPopover = ({ className = '', showMenu, setShowMenu }: NavProps) => {
  const { data, featuredTags } = useGlobalData();
  const [active, setActive] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [tagData, setTagData] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();


  useEffect(() => {
    if (active && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    } else {
      setContentHeight(0)
    }
  }, [active])

  useEffect(() => {
    if (data) setTagData(data)
  }, [tagData, data])

  const closeMenu = () => {
    setShowMenu(false);
    setShowTags(false);
  };

  const showTagsMob = () => {
    setShowTags(true);
  };

  const hideTagsMob = () => {
    setShowTags(false);
  };

  const handleMouseLeave = (event) => {
    const rect = buttonRef.current.getBoundingClientRect()
    const x = event.clientX
    const y = event.clientY
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setActive(false) // to hide default menu
    }
  }

  return (
    <section className={`pt-[10px] px-[10px] pb-[20px] lg:rounded-[12px] bg-white shadow-custom 
    justify-center bg-transparent fixed lg:absolute lg:top-0 left-0 w-full h-[100vh] lg:h-auto 
    lg:overflow-hidden top-0 transition-transform duration-300 linear z-20 lg:z-10 ${
    showMenu ? 'flex lg:translate-y-0 opacity-100 visible' : 'lg:-translate-y-3 opacity-0 invisible'}`}>
      <Wrapper>
        <div
          className={`${className} w-full lg:pt-0 pt-14`}
        >
          {/* <button
            ref={buttonRef}
            className="px-4 py-3 text-sm font-medium  hover:bg-zinc-300 rounded-md"
            onMouseEnter={handleMouseEnter}
          >
            <TruncateIcon width={40} height={40} />
          </button> */}
          <div className={`lg:hidden flex fixed top-0 left-0 w-full py-4 px-4 z-20 bg-zinc-900 h-[56px] items-center justify-between`}>
            {showTags ? (
              <div className='flex items-center gap-0'>
                <ChevronLeftIcon width={25} height={25} className='text-white'/>
                <span onClick={hideTagsMob} className='text-white text-base'>Back</span>
              </div>
            ):(

              <Link href="/" className="text-2xl font-extrabold bg-gradient-text bg-clip-text text-transparent font-monrope tracking-tighterText">
                {/* <ClubLogo/>  */}
                <GrowthClubLogo/>
              </Link>
            )}
            <CloseIcon width={40} height={40} onClick={closeMenu} className='text-white'/>
          </div>

          <div className={`transition-all duration-300 ease ${showTags && '-translate-x-[105%]'} lg:translate-x-0`}>
            <div ref={contentRef} className={`w-full transform transition-all duration-200}`}>

              <nav className="flex flex-col lg:flex-row gap-y-6 gap-x-6 lg:gap-x-10 flex-wrap rounded-[10px] py-[17px] lg:px-[20px] lg:bg-zinc-100">
                {navigationLinks?.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`hover:text-zinc-500 self-start font-medium text-base lg:text-sm flex items-center gap-2 ${router.pathname.startsWith(link.href) ? 'text-zinc-600' : 'text-zinc-600'}`}
                  >
                    {link.icon && <link.icon />}
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className='px-[10px] py-6 lg:p-6 lg:block hidden'>
                <div className='text-zinc-400 pb-6 font-medium text-sm uppercase'>Browse By Key Topics</div>
                <div className="lg:columns-4 gap-6">
                  {tagData && tagData.map((tag, index) => (
                    <div className='break-inside-avoid pb-[14px]' key={index}>
                      <Link
                        href={`/browse/${tag?.slug?.current}`}
                        scroll={false}
                        className="text-zinc-500 font-medium text-sm hover:text-zinc-600 transition-colors inlin-flex underline underline-offset-2"
                      >
                        <span>{tag?.tagName}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className='text-zinc-400 pt-3 font-medium text-sm uppercase lg:hidden flex items-center gap-1' onClick={showTagsMob}>
                Browse By Key Topics
                <ChevronRightIcon width={25} height={25} className='text-zinc-400'/>
              </div>

            </div>
          </div>
          {/* this duplicate is for mobile only */}
          {/* {showTags && ( */}
            <div className={`px-[10px] py-6 lg:p-6 lg:hidden block absolute top-[56px] h-full left-0 w-full overflow-auto transition-all duration-300 ease  ${showTags ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="columns-2 gap-6">
                {tagData && tagData.map((tag, index) => (
                  <div className='break-inside-avoid' key={index}>
                    <Link
                      href={`/browse/${tag?.slug?.current}`}
                      scroll={false}
                      className="text-zinc-500 pb-[14px] font-medium text-sm flex hover:text-zinc-600 transition-colors"
                    >
                      <span>{tag?.tagName}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          {/* )} */}
          {/* ./ this is for mobile only */}
        </div>
      </Wrapper>
    </section>
  )
}

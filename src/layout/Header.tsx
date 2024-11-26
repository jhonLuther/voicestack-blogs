import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ProgressBar from '~/utils/progressBar/progressBar'
import { ArrowRightIcon } from '@sanity/icons'
import { useRouter } from 'next/router'
import { CloseIcon } from '@sanity/icons'
import useMediaQuery from '~/utils/useMediaQueryHook'
import ClubLogo from '~/assets/reactiveAssets/ClubLogo'
import GrowthClubLogo from '~/assets/reactiveAssets/GrowthClubLogo'
import { NavPopover } from './overlaynav/NavPopover'
import { useGlobalData } from '~/components/Context/GlobalDataContext'
import { MenuIcon } from '@sanity/icons'
import { CaseStudiesIcon } from '~/assets/reactiveAssets/svgs'
import { ArticlesIcon } from '~/assets/reactiveAssets/svgs'
import { PodcastsIcon } from '~/assets/reactiveAssets/svgs'
import { EbooksIcon } from '~/assets/reactiveAssets/svgs'
import { WebinarsIcon } from '~/assets/reactiveAssets/svgs'
import { PressIcon } from '~/assets/reactiveAssets/svgs'

export const navigationLinks = [
  { href: '/case-study', label: 'Case Studies', icon: CaseStudiesIcon },
  { href: '/article', label: 'Articles', icon: ArticlesIcon },
  { href: '/podcast', label: 'Podcasts', icon: PodcastsIcon },
  { href: '/ebook', label: 'Ebooks', icon: EbooksIcon },
  { href: '/webinar', label: 'Webinars', icon: WebinarsIcon },
  { href: '/press-release', label: 'Press Releases', icon: PressIcon },
]

const Header = () => {
  let { featuredTags } = useGlobalData()
  if (useGlobalData) {
  }
  const [showMenu, setShowMenu] = useState(false)
  const [headerFixed, setHeaderFixed] = useState(false)

  const closeMenu = () => {
    setShowMenu(false)
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
    if (window.innerWidth < 1024 && showMenu == true) {
      document.body.classList.add('menu-active')
    } else {
      document.body.classList.remove('menu-active')
    }
  }

  const handleScrollMob = () => {
    setHeaderFixed(window.scrollY > 44)
  }

  const isMobile: any = useMediaQuery(1024)

  useEffect(() => {
    window.addEventListener('scroll', handleScrollMob)
    return () => {
      window.removeEventListener('scroll', handleScrollMob)
    }
  })

  console.log(featuredTags, 'featuredTags')

  const router = useRouter()
  const before =
    "before:content-[''] before:h-[100px] before:absolute before:left-0 before:right-0 before:top-full before:bg-zinc-900"
  return (
    <>
      <ProgressBar />
      {/* {showMenu && <div className='fixed top-0 w-full h-full z-[19] bg-zinc-900'></div>} */}
      <div
        className={`relative w-full before:content-[''] before:-z-0 before:h-[100px] before:absolute before:left-0 before:right-0 before:top-[-100px] before:bg-zinc-900`}
      >
        <header
          className={`fixed w-full top-0 left-0 z-20 transition-all duration-300 ease-linear ${headerFixed && '!fixed w-full !top-[-44px] left-0'}`}
        >
          <div
            className={`bg-cs-primary group hover:bg-[#42dd88] transition-all duration-200 px-4 h-[44px]`}
          >
            <Link
              href="https://carestack.com/demo"
              className="flex justify-center py-3"
            >
              <div className="max-w-7xl flex justify-center gap-3 w-full items-center">
                <div className="text-xs md:text-sm text-zinc-900">
                  {` Book a Demo with us - It's free!`}
                </div>
                <div className="flex items-center gap-1 text-xs md:text-sm text-zinc-800 font-medium">
                  <span>{`Register Now`}</span>
                  <ArrowRightIcon className="w-5 h-5 text-zinc-800 group-hover:translate-x-[4px] transition-transform duration-300 ease-in-out" />
                </div>
              </div>
            </Link>
          </div>

          <div className={`z-10 bg-zinc-900 text-white px-4 `}>
            <div className="max-w-7xl mx-auto">
              {/* <div className={`flex flex-col gap-3 justify-between py-[10px] transition-all duration-300 ease-linear relative  ${headerFixed ? '!lg:py-3' : 'lg:py-6'}`}> */}
              <div
                className={`flex flex-col gap-3 justify-between py-0 transition-all duration-300 ease-linear`}
              >
                <div
                  className={`flex flex-row gap-2 justify-between items-center rounded-xl border border-zinc-700 
                pl-[18px] lg:relative transition-all duration-300 ease-in-out ${headerFixed ? 'my-3' : 'lg:mt-8 mt-3 mb-3'}`}
                >
                  <Link
                    href="/"
                    className="text-2xl font-extrabold bg-gradient-text bg-clip-text text-transparent font-monrope tracking-tighterText"
                  >
                    {/* <ClubLogo/>  */}
                    <GrowthClubLogo />
                  </Link>
                  <div
                    className={`lg:flex-row top-[110px] hidden right-0 px-4 pt-4 pb-8 lg:p-0 bg-zinc-900 lg:bg-transparent left-0 lg:static flex-col gap-2 justify-between lg:items-center lg:flex`}
                  >
                    <nav className="flex flex-col lg:flex-row gap-y-2 gap-x-5 lg:gap-x-5 flex-wrap ">
                      {featuredTags &&
                        featuredTags?.map((link, i) => (
                          <Link
                            key={link.slug?.current}
                            href={`/browse/${link.slug?.current}`}
                            className={`hover:text-zinc-300 text-sm ${router.pathname.startsWith(link.href) ? 'text-zinc-300' : 'text-zinc-500'}`}
                          >
                            {link.tagName}
                          </Link>
                        ))}
                    </nav>
                  </div>

                  <div
                    onClick={toggleMenu}
                    className={`flex text-zinc-900 cursor-pointer items-center select-none z-20 rounded-lg lg:rounded-xl lg:py-[6px] lg:pr-[10px] lg:pl-[14px]
                  ${showMenu ? 'lg:pr-[15px] lg:pt-[15px] absolute top-[20px] right-[20px] lg:static' : 'bg-white'}`}
                  >
                    {!showMenu && (
                      <span className="hidden lg:inline-flex text-zinc-800 text-sm">
                        More
                      </span>
                    )}
                    {
                      showMenu ? (
                        <CloseIcon width={40} height={40} />
                      ) : (
                        <MenuIcon width={40} height={40} />
                      )
                      // <svg width="46" height="41" viewBox="0 0 46 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                      //   <path d="M12 12.4062H34" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
                      //   <path d="M12 20.4062H34" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
                      //   <path d="M23 28.4062L34 28.4062" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
                      // </svg>
                    }
                  </div>
                  <NavPopover showMenu={showMenu} className="z-10" />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}

export default Header

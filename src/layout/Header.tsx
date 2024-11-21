import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProgressBar from '~/utils/progressBar/progressBar';
import {ArrowRightIcon} from '@sanity/icons'
import { useRouter } from 'next/router';
import {CloseIcon} from '@sanity/icons'
import useMediaQuery from '~/utils/useMediaQueryHook';
import ClubLogo from '~/assets/reactiveAssets/ClubLogo';
import { NavPopover } from './overlaynav/NavPopover';
import { useGlobalData } from '~/components/Context/GlobalDataContext';

export const navigationLinks = [
  { href: "/case-study", label: "Case Studies" },
  { href: "/article", label: "Articles" },
  { href: "/podcast", label: "Podcasts" },
  { href: "/ebook", label: "Ebooks" },
  { href: "/webinar", label: "Webinars" },
  { href: "/press-release", label: "Press Releases" }
];

const Header = () => {

  const {featuredTags } = useGlobalData();
  const [showMenu, setShowMenu] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);

  const closeMenu = () => {
    setShowMenu(false);  
  };

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleScrollMob = () => {
    setHeaderFixed(window.scrollY > 44);
  };

  const isMobile: any = useMediaQuery(1024);


  useEffect(() => {
    window.addEventListener("scroll", handleScrollMob);
    return () => {
      window.removeEventListener("scroll", handleScrollMob);
    }
  });


  const navItems = [
    {
      label: "Products",
      content: (
        <div className="grid gap-8">
          <div>
            <h3 className="font-semibold text-gray-500 uppercase text-sm mb-4">Global Payments</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="group">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Payments</h4>
                    <p className="text-sm text-gray-500 mt-0.5">Online payments</p>
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">Terminal</h4>
                    <p className="text-sm text-gray-500 mt-0.5">In-person payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-500 uppercase text-sm mb-4">Financial Services</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="group">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">Connect</h4>
                    <p className="text-sm text-gray-500 mt-0.5">Payments for platforms</p>
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                    <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">Billing</h4>
                    <p className="text-sm text-gray-500 mt-0.5">Subscription management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

  ];

  console.log(featuredTags,'featuredTags');
  

  const router = useRouter();
  const before = "before:content-[''] before:h-[100px] before:absolute before:left-0 before:right-0 before:top-full before:bg-zinc-900"; 
  return (
    <>
    <ProgressBar/>
    {showMenu && <div className='fixed top-0 w-full h-full z-[19] bg-zinc-900'></div>}
    <div className={`relative w-full before:content-[''] before:-z-0 before:h-[100px] before:absolute before:left-0 before:right-0 before:top-[-100px] before:bg-zinc-900`}>
      <header className={`fixed w-full top-0 left-0 z-20 transition-all duration-300 ease-linear ${headerFixed && '!fixed w-full !top-[-44px] left-0'}`}>
        <div className={`bg-cs-primary group hover:bg-[#42dd88] transition-all duration-200 px-4 h-[44px]`}>  
          <Link href="https://carestack.com/demo" className="flex justify-center py-3">
            <div className="max-w-7xl flex justify-center gap-3 w-full items-center">
              <div className="text-xs md:text-sm text-zinc-900">
                {` Book a Demo with us - It's free!`}
              </div>
                <div className="flex items-center gap-1 text-xs md:text-sm text-zinc-800 font-medium">
                  <span>{`Register Now`}</span><ArrowRightIcon className="w-5 h-5 text-zinc-800 group-hover:translate-x-[4px] transition-transform duration-300 ease-in-out"/>
                </div>
            </div>
          </Link>
        </div>

        <div className={`z-10 bg-zinc-900 text-white border-b border-zinc-800 px-4 `}>
          <div className="max-w-7xl mx-auto">
            <div className={`flex flex-col gap-3 justify-between py-[10px] transition-all duration-300 ease-linear  ${headerFixed ? '!lg:py-3' : 'lg:py-6'}`}>
              <div className='flex flex-row gap-2 justify-between'>
                <Link href="/" className="text-2xl font-extrabold bg-gradient-text bg-clip-text text-transparent font-monrope tracking-tighterText">
                  <ClubLogo/> 
                </Link>
                <div onClick={toggleMenu} className='flex lg:hidden text-zinc-400'> {showMenu ? <CloseIcon width={40} height={40}/>: 
                <svg width="46" height="41" viewBox="0 0 46 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12.4062H34" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 20.4062H34" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
                <path d="M23 28.4062L34 28.4062" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
                </svg>}</div>
                <div className={`lg:flex-row absolute top-[110px] right-0 z-10 px-4 pt-4 pb-8 lg:p-0 bg-zinc-900 lg:bg-transparent left-0 lg:static flex-col gap-2 justify-between lg:items-center lg:flex ${showMenu ? 'flex' : 'hidden'}`}>
                  <nav className="flex flex-col lg:flex-row gap-y-2 gap-x-6 lg:gap-x-10 flex-wrap">
                    {featuredTags  && featuredTags?.map((link,i) => (
                      <Link 
                        key={link.slug?.current} 
                        href={`/browse/${link.slug?.current}`}
                        className={`hover:text-zinc-300 text-base ${router.pathname.startsWith(link.href) ? 'text-zinc-300' : 'text-zinc-500'}`}
                      >
                        {link.tagName}
                      </Link>
                      
                    ))}
                    <NavPopover />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
    </>

  );
};

export default Header;
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from '~/components/widgets/SearchBar';
import ProgressBar from '~/utils/progressBar/progressBar';
import {ArrowRightIcon} from '@sanity/icons'
import { useRouter } from 'next/router';
import Logo from '~/assets/reactiveAssets/Logo';
import {MenuIcon} from '@sanity/icons'
import {CloseIcon} from '@sanity/icons'
import useMediaQuery from '~/utils/useMediaQueryHook';

const navigationLinks = [
  { href: "/case-study", label: "Case Studies" },
  { href: "/article", label: "Articles" },
  { href: "/podcast", label: "Podcasts" },
  { href: "/ebook", label: "Ebooks" },
  { href: "/webinar", label: "Webinars" },
  { href: "/press-release", label: "Press Releases" }
];

const Header = () => {
  
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

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollMob);
    return () => {
      window.removeEventListener("scroll", handleScrollMob);
    }
  });

  const router = useRouter();
  const before = "before:content-[''] before:h-[100px] before:absolute before:left-0 before:right-0 before:top-full before:bg-zinc-900"; 
  return (
    <>
    <ProgressBar/>
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
                  <Logo/> 
                </Link>
                <div onClick={toggleMenu} className='flex lg:hidden text-zinc-400'> {showMenu ? <CloseIcon width={40} height={40}/>: <MenuIcon width={40} height={40}/>}</div>
                <div className={`lg:flex-row absolute top-[110px] right-0 z-10 px-4 pt-4 pb-8 lg:p-0 bg-zinc-900 lg:bg-transparent left-0 lg:static flex-col gap-2 justify-between lg:items-center lg:flex ${showMenu ? 'flex' : 'hidden'}`}>
                  <nav className="flex flex-col lg:flex-row gap-y-2 gap-x-6 lg:gap-x-10 flex-wrap">
                    {navigationLinks?.map((link) => (
                      
                      <Link 
                        key={link.href} 
                        href={link.href} 
                        className={`hover:text-zinc-300 text-base ${router.pathname.startsWith(link.href) ? 'text-zinc-300' : 'text-zinc-500'}`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  {/* <div className=" text-white">
                    <SearchBar header={true} />
                  </div> */}
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
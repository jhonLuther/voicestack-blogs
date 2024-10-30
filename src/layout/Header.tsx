import React from 'react';
import Link from 'next/link';
import SearchBar from '~/components/widgets/SearchBar';
import ProgressBar from '~/utils/progressBar/progressBar';
import {ArrowRightIcon} from '@sanity/icons'
import { useRouter } from 'next/router';
import Logo from '~/assets/reactiveAssets/Logo';

const navigationLinks = [
  { href: "/case-study", label: "Case Studies" },
  { href: "/article", label: "Articles" },
  { href: "/podcast", label: "Podcasts" },
  { href: "/ebook", label: "Ebooks" },
  { href: "/webinar", label: "Webinars" },
  { href: "/press-release", label: "Press Releases" }
];

const Header = () => {

  const router = useRouter();
  return (
    <>
    <ProgressBar/>
    <header className="w-full">

      <div className="bg-cs-primary group hover:bg-[#42dd88] transition-all duration-200 px-4">  
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

      <div className="bg-zinc-900 text-white border-b border-zinc-800 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 justify-between py-6">
            <div className='flex md:flex-row gap-2 flex-col justify-between'>
              <Link href="/" className="text-2xl font-extrabold bg-gradient-text bg-clip-text text-transparent font-monrope tracking-tighterText">
              <Logo/> 
              </Link>
              
              <div className='flex md:flex-row flex-col gap-2 justify-between items-center'>
                <nav className="flex gap-y-2 gap-x-6 md:gap-x-10 flex-wrap">
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
    </>

  );
};

export default Header;
import React from 'react';
import Link from 'next/link';
import SearchBar from '~/components/widgets/SearchBar';
import ProgressBar from '~/utils/progressBar/progressBar';

const navigationLinks = [
  { href: "/case-study", label: "Case Study" },
  { href: "/article", label: "Articles" },
  { href: "/podcast", label: "Podcasts" },
  { href: "/ebook", label: "Ebooks" },
  { href: "/webinar", label: "Webinars" },
  { href: "/press-release", label: "Press Releases" }
];

const Header = () => {
  return (
    <>
    <ProgressBar/>
    <header className="w-full">
      <Link href="https://carestack.com/demo" >
      <div className="bg-[#39B54A] text-white hover:translate-y-[-1px] transition-transform duration-300 ease-in-outduration-300 text-center py-2 text-sm">
       {` Book a Demo with us - It's free!`}
      </div>
      </Link>

      <div className="bg-cs-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-3 justify-between py-4">
            <div className='flex md:flex-row gap-2  flex-col justify-between'>
              <Link href="/" className="text-2xl font-bold">
                {`CS Growth Digest`}
              </Link>
              <p className="text-sm md:max-w-xl w-full">
                {`Stories, insights, and advice from the dental industry that will transform how you grow and build your practice.`}
              </p>
            </div>
            <div className='flex md:flex-row  flex-col gap-2 justify-between items-center'>
              <nav className="flex gap-8 flex-wrap">
                {navigationLinks?.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="hover:text-[#39B54A]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className=" text-white md:max-w-xl w-full">
							<SearchBar/>
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
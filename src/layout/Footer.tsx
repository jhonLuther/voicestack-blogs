import React from 'react'
import Link from 'next/link';
import Wrapper from './Wrapper';
import Image from 'next/image';
import CsLogo from '../assets/carestack-logo-white.svg'

const Footer = ({ className }) => {

  const terms = [
    {title: 'Terms of use', url: '#'},
    {title: 'Privacy policy', url: '#'},
    {title: 'Do not sell my information', url: '#'},
  ]

  const sections = [
    {
      title: 'Help',
      links: [
        { name: 'Help Center', url: '#', external: false  },
        { name: 'Help Forum', url: '#', external: false  },
      ],
    },

    {
      title: 'Quick Links',
      links: [
        { name: 'Blogs', url: '/article', external: false },
        { name: 'Case Studies', url: '/case-study', external: false },
        { name: 'Podcasts', url: '/podcast', external: false },
        { name: 'Ebooks', url: '/ebook', external: false },
        { name: 'Webinars', url: '/webinar', external: false },
        { name: 'Press Release', url: '/press-release', external: false },
      ],
    },

    {
      title: 'CareStack',
      link: '#',
      links: [
        { name: 'Book Demo', url: 'https://carestack.com/demo', external: true },
        { name: 'Login', url: 'https://id.carestack.com/Account/Domain', external: true },
        { name: 'Features', url: 'https://carestack.com/dental-software/features', external: true },
        { name: 'Onboarding', url: 'https://carestack.com/support/onboarding', external: true },
        { name: 'Support', url: 'https://carestack.com/support', external: true },
      ],
    },
    {
      title: 'Company',
      link: '#',
      links: [
        { name: 'About', url: 'https://carestack.com/company', external: true },
        { name: 'Leadership Team', url: 'https://carestack.com/company/leadership-team', external: true },
        { name: 'Events', url: 'https://carestack.com/company/events', external: true },
        { name: 'Press', url: 'https://carestack.com/company/press', external: true },
        { name: 'Contact', url: 'https://carestack.com/company/contact', external: true },
      ],
    },
  ]

  const currentYear = new Date().getFullYear();

  // const features = [
  //   'Analytics & Reporting',
  //   'Appointment Reminders',
  //   'Backups',
  //   'Charting',
  //   'Clinical Notes',
  //   'Membership Plans',
  //   'UK GDPR-Compliance',
  //   'Online Forms',
  //   'Online Payments',
  //   'Curbside Check-In',
  //   'Patient Kiosk',
  //   'Patient Notifications',
  //   'Patient Portal',
  //   'Payment Plans',
  //   'Remote Access',
  //   'Scheduling',
  //   'Teledentistry',
  //   'Treatment Planning',
  //   'Payment Reminders'
  // ];

  return (
    <footer className={`bg-zinc-900 text-white pt-24 pb-12 px-4 ${className}`}>
      <Wrapper className="container mx-auto max-w-7xl flex flex-col gap-12">
        <div className="flex md:flex-row gap-12 justify-between">
          <div>
            <Link href="/" className="text-[30px] font-extrabold bg-gradient-text bg-clip-text text-transparent font-monrope tracking-tighterText max-w-[170px] leading-[1.16] block">
              {`Dentistry's Inner Circle`}
            </Link>
            <div className="flex flex-col mt-12 md:mt-12 gap-2">
              {terms.map((item:any, idx) => (
                // <a href={item.url}  key={idx} className="hover:text-zinc-300 text-zinc-500 text-[15px] leading-[1.62]">
                //   {item.title}
                // </a>
                <Link href={item.url} target={item.external ? "_blank" : "_self"} key={idx} className="hover:text-zinc-300 text-zinc-500 text-[15px] leading-[1.62]">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-0 text-sm flex-1 max-w-[816px]">
            {sections.map((section, index) => (
              <div key={index} className='max-w-[204px]'>
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-2">
                      <Link  target={link.external ? "_blank" : "_self"} href={link.url} className="hover:text-zinc-300 text-zinc-500 text-[15px] leading-[1.62]">
                        {link.name}{' '}
                        {/* {link.special && (
                          <span className="text-green-400">{link.special}</span>
                        )} */}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='flex justify-between pt-8 border-t border-[#3F3F46]'>
          <span className='hover:text-zinc-300 text-zinc-500 text-[15px] leading-[1.62]'>&copy; {`2017 - ${currentYear} Good Methods Global Inc. All rights reserved.`}</span>    
          <Link href='https://www.carestack.com' target="_blank">
            <Image src={CsLogo} alt='CareStack' title='CareStack'/>
          </Link>
        </div>
      </Wrapper>
    </footer>
  )
}

export default Footer

{/* Social media   */}
            {/* 
            <div>
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/company/carestack/"
                    target="_blank"
                    rel=" noreferrer"
                    title="LinkedIn"
                  >
                    <span className="icon-linked"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/c/CareStack"
                    target="_blank"
                    title="YouTube"
                    rel=" noreferrer"
                  >
                    <span className="icon-youtube"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/CareStackSystem/"
                    target="_blank"
                    title="Facebook"
                    rel=" noreferrer"
                  >
                    <span className="icon-facebook"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/carestack_/"
                    target="_blank"
                    title="Instagram"
                    rel=" noreferrer"
                  >
                    <span className="icon-instagram"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/CareStackSystem/"
                    target="_blank"
                    title="Twitter"
                    rel=" noreferrer"
                  >
                    <span className="icon-twitter"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://vimeo.com/user14264510"
                    target="_blank"
                    rel=" noreferrer"
                    title="Vimeo"
                  >
                    <span className="icon-vimeo"></span>
                  </a>
                </li>
              </ul>
            </div> 
            */}

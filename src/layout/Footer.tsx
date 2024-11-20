import React from 'react'
import Link from 'next/link';
import Wrapper from './Wrapper';
import Image from 'next/image';
import CsLogo from '../assets/carestack-logo-white.svg'
import ClubLogo from '~/assets/reactiveAssets/ClubLogo';

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
    <footer className={`bg-black text-white pt-12 md:pt-24 pb-12 px-4 ${className}`}>
      <Wrapper className="container mx-auto max-w-7xl flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 justify-between">
          <div className='flex flex-col items-center md:items-start'>
            <Link href="/" className="text-[30px] font-extrabold bg-gradient-text bg-clip-text text-transparent font-monrope tracking-tighterText max-w-[170px] leading-[1.16] block">
            <ClubLogo/>
            </Link>
            
            {/* Social media   */}
            <div className='mt-6'>
              <ul className='flex gap-6 items-center'>
                <li>
                  <a
                    href="https://www.linkedin.com/company/carestack/"
                    target="_blank"
                    rel=" noreferrer"
                    title="LinkedIn"
                    className='group'
                  >
                    <span className="icon-linked">
                      <svg className='group-hover:text-white text-[#71717A] transition-colors duration-300' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_312_57)"> <path d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42187 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79688V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043V17.043Z" fill="currentColor"/> </g> <defs> <clipPath id="clip0_312_57"> <rect width="20" height="20" fill="white"/> </clipPath> </defs>
                      </svg>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/c/CareStack"
                    target="_blank"
                    title="YouTube"
                    rel=" noreferrer"
                    className='group'
                  >
                    <span className="icon-youtube">
                      <svg className='group-hover:text-white text-[#71717A] transition-colors duration-300' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.8008 6C19.8008 6 19.6055 4.62109 19.0039 4.01563C18.2422 3.21875 17.3906 3.21484 17 3.16797C14.2031 2.96484 10.0039 2.96484 10.0039 2.96484H9.99609C9.99609 2.96484 5.79687 2.96484 3 3.16797C2.60938 3.21484 1.75781 3.21875 0.996094 4.01563C0.394531 4.62109 0.203125 6 0.203125 6C0.203125 6 0 7.62109 0 9.23828V10.7539C0 12.3711 0.199219 13.9922 0.199219 13.9922C0.199219 13.9922 0.394531 15.3711 0.992187 15.9766C1.75391 16.7734 2.75391 16.7461 3.19922 16.832C4.80078 16.9844 10 17.0313 10 17.0313C10 17.0313 14.2031 17.0234 17 16.8242C17.3906 16.7773 18.2422 16.7734 19.0039 15.9766C19.6055 15.3711 19.8008 13.9922 19.8008 13.9922C19.8008 13.9922 20 12.375 20 10.7539V9.23828C20 7.62109 19.8008 6 19.8008 6ZM7.93359 12.5938V6.97266L13.3359 9.79297L7.93359 12.5938Z" fill="currentColor"/>
                      </svg>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/CareStackSystem/"
                    target="_blank"
                    title="Facebook"
                    rel=" noreferrer"
                    className='group'
                  >
                    <span className="icon-facebook">
                      <svg className='group-hover:text-white text-[#71717A] transition-colors duration-300' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_312_58)"> <path d="M10 0C4.4772 0 0 4.4772 0 10C0 14.6896 3.2288 18.6248 7.5844 19.7056V13.056H5.5224V10H7.5844V8.6832C7.5844 5.2796 9.1248 3.702 12.4664 3.702C13.1 3.702 14.1932 3.8264 14.6404 3.9504V6.7204C14.4044 6.6956 13.9944 6.6832 13.4852 6.6832C11.8456 6.6832 11.212 7.3044 11.212 8.9192V10H14.4784L13.9172 13.056H11.212V19.9268C16.1636 19.3288 20.0004 15.1128 20.0004 10C20 4.4772 15.5228 0 10 0Z" fill="currentColor"/> </g> <defs> <clipPath id="clip0_312_58"> <rect width="20" height="20" fill="white"/> </clipPath> </defs>
                      </svg>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/carestack_/"
                    target="_blank"
                    title="Instagram"
                    rel=" noreferrer"
                    className='group'
                  >
                    <span className="icon-instagram">
                      <svg className='group-hover:text-white text-[#71717A] transition-colors duration-300' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_312_59)"> <path d="M10 1.80078C12.6719 1.80078 12.9883 1.8125 14.0391 1.85937C15.0156 1.90234 15.543 2.06641 15.8945 2.20313C16.3594 2.38281 16.6953 2.60156 17.043 2.94922C17.3945 3.30078 17.6094 3.63281 17.7891 4.09766C17.9258 4.44922 18.0898 4.98047 18.1328 5.95313C18.1797 7.00781 18.1914 7.32422 18.1914 9.99219C18.1914 12.6641 18.1797 12.9805 18.1328 14.0313C18.0898 15.0078 17.9258 15.5352 17.7891 15.8867C17.6094 16.3516 17.3906 16.6875 17.043 17.0352C16.6914 17.3867 16.3594 17.6016 15.8945 17.7813C15.543 17.918 15.0117 18.082 14.0391 18.125C12.9844 18.1719 12.668 18.1836 10 18.1836C7.32813 18.1836 7.01172 18.1719 5.96094 18.125C4.98438 18.082 4.45703 17.918 4.10547 17.7813C3.64063 17.6016 3.30469 17.3828 2.95703 17.0352C2.60547 16.6836 2.39063 16.3516 2.21094 15.8867C2.07422 15.5352 1.91016 15.0039 1.86719 14.0313C1.82031 12.9766 1.80859 12.6602 1.80859 9.99219C1.80859 7.32031 1.82031 7.00391 1.86719 5.95313C1.91016 4.97656 2.07422 4.44922 2.21094 4.09766C2.39063 3.63281 2.60938 3.29688 2.95703 2.94922C3.30859 2.59766 3.64063 2.38281 4.10547 2.20313C4.45703 2.06641 4.98828 1.90234 5.96094 1.85937C7.01172 1.8125 7.32813 1.80078 10 1.80078ZM10 0C7.28516 0 6.94531 0.0117187 5.87891 0.0585938C4.81641 0.105469 4.08594 0.277344 3.45313 0.523437C2.79297 0.78125 2.23438 1.12109 1.67969 1.67969C1.12109 2.23438 0.78125 2.79297 0.523438 3.44922C0.277344 4.08594 0.105469 4.8125 0.0585938 5.875C0.0117188 6.94531 0 7.28516 0 10C0 12.7148 0.0117188 13.0547 0.0585938 14.1211C0.105469 15.1836 0.277344 15.9141 0.523438 16.5469C0.78125 17.207 1.12109 17.7656 1.67969 18.3203C2.23438 18.875 2.79297 19.2188 3.44922 19.4727C4.08594 19.7188 4.8125 19.8906 5.875 19.9375C6.94141 19.9844 7.28125 19.9961 9.99609 19.9961C12.7109 19.9961 13.0508 19.9844 14.1172 19.9375C15.1797 19.8906 15.9102 19.7188 16.543 19.4727C17.1992 19.2188 17.7578 18.875 18.3125 18.3203C18.8672 17.7656 19.2109 17.207 19.4648 16.5508C19.7109 15.9141 19.8828 15.1875 19.9297 14.125C19.9766 13.0586 19.9883 12.7188 19.9883 10.0039C19.9883 7.28906 19.9766 6.94922 19.9297 5.88281C19.8828 4.82031 19.7109 4.08984 19.4648 3.45703C19.2188 2.79297 18.8789 2.23438 18.3203 1.67969C17.7656 1.125 17.207 0.78125 16.5508 0.527344C15.9141 0.28125 15.1875 0.109375 14.125 0.0625C13.0547 0.0117188 12.7148 0 10 0Z" fill="currentColor"/> <path d="M10 4.86328C7.16406 4.86328 4.86328 7.16406 4.86328 10C4.86328 12.8359 7.16406 15.1367 10 15.1367C12.8359 15.1367 15.1367 12.8359 15.1367 10C15.1367 7.16406 12.8359 4.86328 10 4.86328ZM10 13.332C8.16016 13.332 6.66797 11.8398 6.66797 10C6.66797 8.16016 8.16016 6.66797 10 6.66797C11.8398 6.66797 13.332 8.16016 13.332 10C13.332 11.8398 11.8398 13.332 10 13.332Z" fill="currentColor"/> <path d="M16.5391 4.66016C16.5391 5.32422 16 5.85938 15.3398 5.85938C14.6758 5.85938 14.1406 5.32031 14.1406 4.66016C14.1406 3.99609 14.6797 3.46094 15.3398 3.46094C16 3.46094 16.5391 4 16.5391 4.66016Z" fill="currentColor"/> </g> <defs> <clipPath id="clip0_312_59"> <rect width="20" height="20" fill="white"/> </clipPath> </defs>
                    </svg>
                    </span>
                  </a>
                </li>
                
                <li>
                  <a
                    href="https://vimeo.com/user14264510"
                    target="_blank"
                    rel=" noreferrer"
                    className='group'
                    title="Vimeo"
                  >
                    <span className="icon-vimeo">
                      <svg className='group-hover:text-white text-[#71717A] transition-colors duration-300' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_312_61)"> <path d="M0.812934 7.06493C0.812934 7.06493 2.48837 5.74419 3.04685 6.40401C3.60533 7.06493 5.7368 15.0356 6.44839 16.5062C7.06966 17.7961 8.78255 19.5002 10.6607 18.283C12.5388 17.0658 18.7823 11.7343 19.9004 5.43906C21.0173 -0.85512 12.3868 0.46342 11.4725 5.94687C13.7582 4.57546 14.9776 6.50425 13.8078 8.68859C12.6401 10.8707 11.5738 12.2939 11.0154 12.2939C10.458 12.2939 10.0295 10.8333 9.3906 8.28102C8.73078 5.64284 8.73408 0.889714 5.99016 1.42837C3.40154 1.93617 0 5.99864 0 5.99864L0.812934 7.06493V7.06493Z" fill="currentColor"/> </g> <defs> <clipPath id="clip0_312_61"> <rect width="20" height="20" fill="white"/> </clipPath> </defs> </svg>
                    </span>
                  </a>
                </li>
              </ul>
            </div> 
            
            <div className="flex flex-row md:flex-col mt-6 md:mt-12 gap-y-[6px] gap-x-4 md:gap-y-2 flex-wrap justify-center ">
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
          <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-0 text-sm flex-1 max-w-[816px]">
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

        <div className='flex flex-col md:flex-row justify-between items-center pt-8 gap-6 border-t border-[#3F3F46]'>
          <span className='hover:text-zinc-300 text-zinc-500 text-center md:text-left text-xs md:text-[15px] leading-[1.62]'>&copy; {`2017 - ${currentYear} Good Methods Global Inc. All rights reserved.`}</span>    
          <Link href='https://www.carestack.com' target="_blank">
            <Image src={CsLogo} alt='CareStack' title='CareStack'/>
          </Link>
        </div>
      </Wrapper>
    </footer>
  )
}

export default Footer

            

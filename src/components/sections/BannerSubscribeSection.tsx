import React, { use, useEffect, useState } from 'react';
import Button from '../commonSections/Button';
import Section from '../Section';
import Wrapper from '~/layout/Wrapper';
import H3XL from '../typography/H3XL';
import Link from 'next/link';

interface BannerSubscribeSectionProps {
  isSmall?: boolean
}
function BannerSubscribeSection({ isSmall }: BannerSubscribeSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      });
      const data = await response.json();
      setIsSubmitted(true)
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Section className='justify-center' >
      <Wrapper className={`flex-col`}>
        <div className={`bg-white flex gap-3`}>
          <div className='flex flex-col gap-6 flex-1'>
            <div className='flex gap-1 justify-between items-start md:flex-row flex-col'>
              <H3XL className={`text-zinc-900 md:text-5xl text-2xl font-monrope tracking-[-0.96px] font-manrope font-extrabold`}>Subscribe to<br /> <span className=' bg-gradient-text2 bg-clip-text text-transparent '>CS GrowthClub</span></H3XL>
              <p className="md:text-lg text-base font-medium md:max-w-[392px] md:self-end text-zinc-700">Get the best, coolest, and latest in the dental industry delivered to your inbox each week.</p>
            </div>

            {!isSubmitted &&
              <div className={`flex md:flex-row flex-col gap-3 items-centerjustify-between relative`}>

                <input id="default-search"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="block flex-1 w-full rounded-[5px] md:rounded-[10px] border py-3 md:py-4 pl-3 md:pl-6 pr-3 md:pr-4 border-zinc-300
                 text-zinc-400 font-medium text-sm md:text-2xl h-[53px] md:h-[84px] bg-transparent focus:ring-blue-500 focus:border-blue-500 
                 dark:bg-transparent focus:outline-none dark:placeholder-zinc-400 dark:text-zinc-600 dark:focus:border-blue-500 
                 placeholder-zinc-300"
                  required />

                <Button className='bg-zinc-900 !px-12 hover:bg-zinc-700 md:absolute md:translate-y-[-50%] top-[50%] right-[16px] self-start' onClick={handleSubmit}>
                  <span className='text-base font-medium'>{`Submit`}</span>
                </Button>
              </div>}
            {
              isSubmitted && <p className="text-xs md:text-base font-bold text-zinc-500 leading-[1.2]">{`Thank you for subscribing!`}</p>
            }
          </div>
        </div>
        <p className="mt-3 md:mt-6 text-xs md:text-base font-medium text-zinc-500 leading-[1.2]">You can unsubscribe at any time, no hard feelings. <Link href="https://carestack.com/legal/2024-1/privacypolicy" target='_blank' className='underline underline-offset-2'>{`Privacy policy.`} </Link></p>
      </Wrapper>
    </Section>
  );
}

export default BannerSubscribeSection;
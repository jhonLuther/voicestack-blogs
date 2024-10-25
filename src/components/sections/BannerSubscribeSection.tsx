import React, { useState } from 'react';
import Button from '../commonSections/Button';
import Section from '../Section';
import Wrapper from '~/layout/Wrapper';
import H3XL from '../typography/H3XL';

interface BannerSubscribeSectionProps {
  isSmall?: boolean
}
function BannerSubscribeSection({ isSmall }: BannerSubscribeSectionProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
  };

  return (
    <Section className='justify-center' >
      <Wrapper className={`flex-col`}>
        <div className={`bg-white flex gap-3`}>
          <div className='flex flex-col gap-6 flex-1'>

            <div className='flex gap-1 justify-between content-start align items-start md:flex-row flex-col'>
              <H3XL className={`text-zinc-900 md:text-5xl text-2xlfont-monrope tracking-[-0.96px] font-manrope font-extrabold`}>Subscribe to<br/> <span className=' bg-gradient-text2 bg-clip-text text-transparent '>Dentistry’s Inner Circle</span></H3XL>
              <p className="md:text-lg text-base font-medium max-w-[392px] self-end">Get the best, coolest, and latest in the dental industry delivered to your inbox each week.</p>
            </div>

            <div className={`flex md:flex-row flex-col gap-3 items-center rounded border justify-between py-3 md:py-4 pl-6 pr-4 border-zinc-300`}>
              <input id="default-search"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="block flex-1 md:max-w-2xl  w-full py-2 
                 text-zinc-600 font-medium text-2x bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent focus:outline-none dark:placeholder-zinc-400 dark:text-zinc-600 dark:focus:border-blue-500"
                required />

              <Button className='bg-zinc-900' onClick={handleSubmit}>
                <span className='text-base font-medium'>Submit</span>
              </Button>
            </div>

          </div>
        </div>

        <p className="mt-4 text-base font-medium text-zinc-500 leading-[1.2]">You can unsubscribe at any time, no hard feelings. <span className='underline underline-offset-2'>{`Privacy policy.`} </span></p>

      </Wrapper>
    </Section>
  );
}

export default BannerSubscribeSection;
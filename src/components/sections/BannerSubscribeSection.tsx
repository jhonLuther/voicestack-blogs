import React, { useState } from 'react';
import Button from '../commonSections/Button';
import Section from '../Section';
import Wrapper from '~/layout/Wrapper';

interface BannerSubscribeSectionProps {
  version?: string
}
function BannerSubscribeSection({ version }: BannerSubscribeSectionProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
  };

  return (
    <Section className='justify-center py-24' >
      <Wrapper className={`flex-col`}>
        <div className={`${version === "compact" ? ' ' : 'bg-cs-gray-900  p-9  '} text-white rounded flex gap-3`}>
          <div className='flex flex-col gap-6 flex-1'>
            <div className='flex  gap-1 justify-start content-start align items-start md:flex-row flex-col'>
              <h2 className={` ${version === "compact" ? ' text-black md:text-4xl  text-2xl' : 'text-white md:text-5xl  text-2xl '} font-manrope font-extrabold`}>Subscribe to CS Growth Digest</h2>
              {version !== "compact" && <p className="md:text-lg text-base font-medium">Get the best, coolest, and latest in the dental industry delivered to your inbox each week.</p>}
            </div>
            <div className={`flex md:flex-row flex-col gap-3 
            items-center m rounded border-2 justify-between  ${version === "compact" ? 'px-5 py-4 border-cs-gray-100 ' : 'bg-cs-gray-900 md:py-6 py-3 md:px-8 px-4  border-cs-gray-800'}`}>
              <input id="default-search"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="block  flex-1  md:max-w-2xl  w-full p-4 
                 text-cs-gray-600  font-medium text-2x   bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent  focus:outline-none dark:placeholder-gray-400 dark:text-cs-gray-600 dark:focus:border-blue-500"
                required />
              <Button className='bg-cs-gray-900' onClick={handleSubmit}>
                <span className='text-base font-medium'>Submit</span>
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-4 text-base font-semibold text-cs-lightGray-900">You can unsubscribe at any time, no hard feelings. <span className='underline underline-offset-2'>{`Privacy policy.`} </span></p>
      </Wrapper>
    </Section>
  );
}

export default BannerSubscribeSection;
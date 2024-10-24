import React from 'react'
import Wrapper from '../../layout/Wrapper'
import Link from 'next/link'
import icLogo from '../../assets/inner-circle.svg'
import Image from 'next/image'
import {ArrowTopRightIcon} from '@sanity/icons'

function ShortBannerSection() {
    return (
        <section className='flex justify-center'>
            <Wrapper>
                <Link href={'https://carestack.com/company/events/inner-circle-2025'} className='group'>
                {/* <div className='flex p-9 justify-between items-start rounded cursor-pointer my-9 bg-gray-900'>
                    <div className='flex flex-col gap-[10px]'>
                        <h2 className='uppercase text-white text-base font-inter '>{'INNER CIRCLE 2025'}</h2>
                        <h2 className='uppercase text-white text-4xl font-extrabold font-manrope '>{'Get your Early Bird tickets before they’re gone!'}</h2>
                    </div>
                    <div className='group-hover:translate-y-[-10px]   transition'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                            <path d="M0 2H36M36 2V38M36 2L4.5 33.5" stroke="white" strokeWidth="4" />
                        </svg>
                    </div>
                    </div> */}
                    <div className='flex flex-col md:flex-row items-center p-8 lg:p-16 gap-6 md:gap-20 rounded-lg bg-[#ADEDFE] justify-center my-8 md:my-12'>
                        <Image alt='Inner Circle' title='Inner Circle' src={icLogo}/>
                        <div className='flex flex-1 md:gap-x-16 gap-x-6 items-center justify-center'>
                            <h2 className='text-zinc-900 text-xl md:text-4xl font-extrabold font-manrope'>{`Get your Early Bird tickets before they're gone!`}</h2>
                            <ArrowTopRightIcon className='flex-shrink-0 w-10 h-10 md:w-28 md:h-28 group-hover:-translate-y-3 transition-transform duration-300 ease-in-out '></ArrowTopRightIcon>
                        </div>
                    </div>
                </Link>
            </Wrapper>
        </section>
       
    )
}

export default ShortBannerSection

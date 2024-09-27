import React from 'react'
import Wrapper from '../commonSections/Wrapper'
import Link from 'next/link'

function ShortBannerSection() {
    return (
        <Link href={'https://carestack.com/company/events/inner-circle-2025'} className='group hover:transform duration-300'>
            <div className='flex p-9 justify-between items-start rounded cursor-pointer my-9 bg-gray-900'>
                <div className='flex flex-col gap-[10px]'>
                    <h2 className='uppercase text-white text-base font-inter '>{'INNER CIRCLE 2025'}</h2>
                    <h2 className='uppercase text-white text-4xl font-extrabold font-manrope '>{'Get your Early Bird tickets before they’re gone!'}</h2>
                </div>
                <div className='group-hover:translate-y-[-10px]   transition'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                        <path d="M0 2H36M36 2V38M36 2L4.5 33.5" stroke="white" stroke-width="4" />
                    </svg>
                </div>
            </div>
        </Link>
    )
}

export default ShortBannerSection

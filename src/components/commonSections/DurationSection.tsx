import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { formatDateShort } from '~/utils/formateDate'
import { ClockIcon } from '@sanity/icons'
import {DotIcon} from '@sanity/icons'

interface DurationProps {
    author?: any
    duration?: string
    date?: string
    isAudio?: boolean
    className?: string
    contentType?: string
}

const DurationSection = ({ className, contentType, duration, date, isAudio = false }: DurationProps) => {    
    console.log(contentType === 'webinar');
    // let durationText = duration;

    // useEffect( () => {
    //     durationText = contentType === 'podcast' || contentType === 'webinar'
    //         ? `${duration} min read`
    //         : `${duration} min read`;
    //         // : `${duration}`;
    // },[contentType])

    const [durationText, setDurationText] = useState(duration);

    useEffect(() => {
        setDurationText((contentType === 'podcast' || contentType === 'webinar')
            ? duration
            : `${duration} min read`);
    }, []);
    

    return (
        <div className='font-medium text-[14px]'>
            {isAudio ? (
                <div className='flex items-center gap-2 mt-8'>
                    <ClockIcon color='white' width={24} height={24} />
                    <span>{duration}</span>
                </div>
            ) : contentType === 'ebook' ? (
                <div className={`text-white ${className}`}>
                    {date ? formatDateShort(date) : 'Dec 30, 2020'}
                </div>
            ) : (
                <div className={`flex relative gap-[6px] pt-3 items-center`}>
                    <div className={`text-white ${className}`}>
                        {date ? formatDateShort(date) : 'Dec 30, 2020'}
                    </div>
                    {durationText && (
                        <>
                            <DotIcon className='w-[18px] h-[18px] text-zinc-500'/>
                            <div className={`relative flex flex-col ${className}`}>
                                <span>{durationText}</span>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DurationSection;

import Link from 'next/link'
import React from 'react'
import { formatDateShort } from '~/utils/formateDate'
import { ClockIcon } from '@sanity/icons'

interface DurationProps {
    author?: any
    duration?: string
    date?: string
    isAudio?: boolean
    className?: string
    contentType?: string
}

const DurationSection = ({ className, contentType, duration, date, isAudio = false }: DurationProps) => {
    if (!duration && contentType !== 'ebook') {
        return null;
    }

    const durationText = contentType === 'podcast' || contentType === 'webinar'
        ? duration
        : `${duration} min read`;

    return (
        <div>
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
                <div className={`flex relative gap-3 pt-3 ${className}`}>
                    <div className={`text-white ${className}`}>
                        {date ? formatDateShort(date) : 'Dec 30, 2020'}
                    </div>
                    {`• `}
                    <div className={`relative flex flex-col ${className}`}>
                        <span>{durationText}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DurationSection;

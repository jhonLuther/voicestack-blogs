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

const DurationSection = ({className,contentType,duration, date, isAudio = false }: DurationProps) => {

    if (!duration) {
        return null
    }
    return (
        <div>
            {isAudio ?
                <div className=' flex  items-center gap-2  mt-8'>
                    <ClockIcon color='white' width={24} height={24} />
                    <span>
                        {duration}
                    </span>
                </div>
                :
                <div className={`flex relative gap-3 pt-3}`}>
                    <div className={`text-white ${className}`  }>
                        {date ? formatDateShort(date) : 'Dec 30, 2020'}
                    </div>
                    .
                    <div className={`relative flex flex-col ${className} `}>
                        <span>{`${duration} min read`}
                        </span>
                    </div>
                </div>}
        </div>
    )






}

export default DurationSection
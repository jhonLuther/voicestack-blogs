import Link from 'next/link'
import React from 'react'
import { formatDateShort } from '~/utils/formateDate'
import { ClockIcon } from '@sanity/icons'

interface DurationProps {
    author?: any
    duration?: string
    date?: string
    isAudio?: boolean
}

const DurationSection = ({ duration, date, isAudio = false }: DurationProps) => {

    if (!duration) {
        return null
    }
    return (
        <React.Fragment>
            {isAudio ?
                <div className=' flex  items-center gap-2  mt-8'>
                    <ClockIcon color='white' width={24} height={24} />
                    <span>
                        {duration}
                    </span>
                </div>
                :
                <div className='flex relative gap-3 pt-3'>
                    <div className='text-white'>
                        {formatDateShort(date)}
                    </div>
                    .
                    <div className='relative flex flex-col'>
                        <span>{`${duration} min read `}
                        </span>
                    </div>
                </div>}
        </React.Fragment>
    )






}

export default DurationSection
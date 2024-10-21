import Link from 'next/link'
import React from 'react'
import { formatDateShort } from '~/utils/formateDate'

interface DurationProps {
    author?: any
    duration?: string
    date?: string
}

const DurationSection = ({ duration, date, }: DurationProps) => {

    if (!duration) {
        return null
    }
    return (
        <div className='flex relative gap-3 pt-3'>
            <div className='text-white'>
                {formatDateShort(date)}
            </div>
            .
            <div  className='relative flex flex-col'>
                <span>{`${duration} min read `}
                </span>
            </div>
        </div>
    )






}

export default DurationSection
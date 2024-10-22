import Link from 'next/link';
import { ArrowRightIcon, ArrowLeftIcon } from '@sanity/icons';

interface PodcastNavigatorProps {
    nextSlug: string;
    prevSlug: string;
    currentNumber: number;
    totalPodcasts: number;
    className?: string
}

export default function PodcastNavigator({
    className,
    nextSlug,
    prevSlug,
    currentNumber,
    totalPodcasts
}: PodcastNavigatorProps) {

    if (!nextSlug || !prevSlug) {
        return
    }

    const prevNumber = currentNumber > 1 ? currentNumber - 1 : totalPodcasts;
    const nextNumber = currentNumber < totalPodcasts ? currentNumber + 1 : 1;

    return (
        <div className={` ${className} md:flex-row flex-col flex justify-between items-center w-full py-4 px-6`}>
            <Link href={`/podcast/${prevSlug}`} >
                <div className="flex items-center ">
                    <ArrowLeftIcon style={{ strokeWidth: 2 }} width={24} height={24} />
                    <span className="ml-1 text-cs-black font-semibold text-lg ">PODCAST {prevNumber.toString().padStart(2, '0')}</span>
                </div>
            </Link>
            <Link href={`/podcast/${nextSlug}`} >
                <div className="flex items-center">
                    <span className="mr-1 text-cs-black font-semibold text-lg ">PODCAST {nextNumber.toString().padStart(2, '0')}</span>
                    <ArrowRightIcon style={{ strokeWidth: 2 }} width={24} height={24} />
                </div>
            </Link>
        </div>
    );
}
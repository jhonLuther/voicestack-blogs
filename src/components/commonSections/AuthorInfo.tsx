import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'


const AuthorInfo = ({ author }) => {
    if (!author) {
      return null
    }
    
  return (
    <Link href={`/author/${author.slug.current}`}>

    <div className="author-info flex gap-4 items-center">
      {author.picture && (
        <Image
        alt={author.name} 
        className=""
        src={author.picture}
        height={56}
        width={56}
      />
      )}
      <div className='flex flex-col'>
      <span className='!font-semibold text-lg leading-tight'>{author.name}</span>
      <span className='text-base text-gray-600'>{author.role}</span>
      </div>
    </div>
    </Link>

  )
}

export default AuthorInfo

import Link from 'next/link'
import ImageLoader from './ImageLoader'


interface AuthorProps {
  author?: any
  className?: string
  showMultiple?: boolean
  showNameOnly?: boolean
  isParentLink?: boolean
}

const  AuthorInfo = ({ author, className, showMultiple = false, showNameOnly = false, isParentLink = false }:AuthorProps) => {

  if (!author) {
    return null
  }

  if(showMultiple === false){
    author = [author[0]]
  }

    return (
      <div className='flex flex-col gap-4'>
        {Array.isArray(author)  &&  author && author.map((authors, index) => (
          isParentLink ? (
            <div key={authors?._id || index}  className={`${className}`}>
            <div className="author-info flex gap-4 cursor-pointer items-center">
            <div className='h-12 w-12 shrink-0'>
            {authors?.picture && (
              <ImageLoader
                alt={authors.name}
                imageClassName="rounded-full !m-0"
                image={authors.picture}
                height={48}
                width={48}  />
              )}
            </div>
            <div className='flex flex-col gap-[2px]'>
            <span className={`!font-medium text-base leading-[1.5] !no-underline text-zinc-900 ${className}`}>
              {authors?.name}
            </span>
              {!showNameOnly && <span className={`text-sm md:text-base text-zinc-600 !no-underline leading-[1.3] ${className}`} >{authors?.role}</span>}
            </div>
          </div>
          </div>
          ):
          <Link className={`${className} !no-underline`}  key={authors?._id || index} href={`/author/${authors?.slug && authors?.slug.current && authors?.slug.current}`}>
            <div className="author-info flex gap-4 cursor-pointer items-center">
              <div className='h-12 w-12 shrink-0'>
              {authors?.picture && (
                <ImageLoader
                  alt={authors.name}
                  imageClassName="rounded-full !m-0"
                  image={authors.picture}
                  height={48}
                  width={48}  />
                )}
              </div>
              <div className='flex flex-col gap-[2px]'>
              <span className={`!font-medium text-base leading-[1.5] !no-underline text-zinc-900 ${className}`}>
                {authors?.name}
              </span>
                {!showNameOnly && <span className={`text-sm md:text-base text-zinc-600 !no-underline leading-[1.3] ${className}`} >{authors?.role}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  
}

export default AuthorInfo
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'


interface AuthorProps {
  author?: any
  contentType?: string
  className?: string
  showMultiple?: boolean
}

const  AuthorInfo = ({ author, contentType,className,showMultiple = false }:AuthorProps) => {

  if (!author) {
    return null
  }

  if(showMultiple === false){
    author = [author[0]]
  }
 


    return (
      <div className='flex flex-col gap-4'>
        {Array.isArray(author)  && author.map((authors, index) => (
          <Link className={`${className} !no-underline`}  key={authors._id || index} href={`/author/${authors.slug && authors.slug.current && authors.slug.current}`}>
            <div className="author-info flex gap-4 cursor-pointer items-center">
              {authors.picture && (
                <Image
                  alt={authors.name}
                  className=" rounded-full !m-0"
                  src={authors.picture}
                  height={56}
                  width={56}
                />
              )}
              <div className='flex flex-col'>
                <span className='!font-semibold text-lg leading-tight !no-underline'>{authors.name}</span>
                <span className='text-base text-gray-600 !no-underline' >{authors.role}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  
}

export default AuthorInfo
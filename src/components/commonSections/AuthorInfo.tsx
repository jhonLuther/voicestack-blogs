import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'

const AuthorInfo = ({ author, contentType }) => {

  if (!author) {
    return null
  }

  if (contentType === 'article') {
    const singleAuthor = author[0] || author; 
    return (
      <Link href={`/author/${singleAuthor.slug && singleAuthor.slug.current && singleAuthor.slug.current}`}>
        <div className="author-info flex gap-4 cursor-pointer items-center">
          {singleAuthor.picture && (
            <Image
              alt={singleAuthor.name}
              className=" rounded-full"
              src={singleAuthor.picture}
              height={56}
              width={56}
            />
          )}
          <div className='flex flex-col'>
            <span className='!font-semibold text-lg leading-tight'>{singleAuthor.name}</span>
            <span className='text-base text-gray-600'>{singleAuthor.role}</span>
          </div>
        </div>
      </Link>
    )
  } else {
    return (
      <>
        {author.map((authors, index) => (
          <Link key={authors._id || index} href={`/author/${authors.slug && authors.slug.current && authors.slug.current}`}>
            <div className="author-info flex gap-4 cursor-pointer items-center">
              {authors.picture && (
                <Image
                  alt={authors.name}
                  className=" rounded-full"
                  src={authors.picture}
                  height={56}
                  width={56}
                />
              )}
              <div className='flex flex-col'>
                <span className='!font-semibold text-lg leading-tight'>{authors.name}</span>
                <span className='text-base text-gray-600'>{authors.role}</span>
              </div>
            </div>
          </Link>
        ))}
      </>
    )
  }
}

export default AuthorInfo
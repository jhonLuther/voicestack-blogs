import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'


const AuthorInfo = ({ author }) => {
    if (!author) {
      return null
    }
    
  return (
    <div className="author-info">
      {author.picture && (
        <Image
        alt={author.name} 
        className="rounded-lg"
        src={author.picture}
        height={100}
        width={100}
      />
      )}
      {author.slug?.current ? (
        <Link href={`/author/${author.slug.current}`}>
          {author.name}
        </Link>
      ) : (
        <span>{author.name}</span>
      )}
      <p>{author.bio}</p>
    </div>
  )
}

export default AuthorInfo

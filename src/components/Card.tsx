import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function Card({ post }: { post: Post }) {
  return (
    <div className="flex flex-col">
      {post.mainImage ? (
        <Image
          className="w-full h-[300px] object-cover rounded-lg"
          src={urlForImage(post.mainImage).width(500).height(300).url()}
          height={300}
          width={500}
          alt=""
        />
      ) : (
        <div className="" />
      )}
      <div className="card__container ">
        <h3 className="card__title">
          <a className="card__link text-red-500 text-xl" href={`/post/${post.slug.current}`}>
            {post.title}
          </a>
        </h3>
        <p className="card__excerpt">{post.excerpt}</p>
        <p className="card__date">{formatDate(post._createdAt)}</p>
      </div>
    </div>
  )
}

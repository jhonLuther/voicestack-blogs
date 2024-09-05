import Image from 'next/image'
import { Post } from '~/interfaces/post'
import { urlForImage } from '~/lib/sanity.image'
import { formatDate } from '~/utils'

export default function Card({ post }: { post: Post }) {
  return (
    <div className="flex flex-col max-w-[516px] h-auto">
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
          <a className="card__link text-red-500 text-xl" href={`/post/${post.slug && post.slug.current}`}>
            {post.title}
          </a>
        </h3>
        <div className='flex flex-col gap-1'>
        {post.tags && post.tags.map(tag => (
          <span key={tag._id} className="tag text-violet-800">
            {tag.tagName}
          </span>))}
          {post.contentTypes && post.contentTypes.map(contentType => (
          <span key={contentType._id} className="text-2xl text-blue-500">
            {contentType.contentType}
          </span>))}
          </div>
        <p className="card__excerpt">{post.excerpt}</p>
        <p className="card__date">{formatDate(post._createdAt)}</p>
      </div>
    </div>
  )
}

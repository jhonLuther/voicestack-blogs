import Image from 'next/image'
import { Post } from '~/interfaces/post'
import { urlForImage } from '~/lib/sanity.image'
import { formatDate } from '~/utils'
import Wrapper from './commonSections/Wrapper'

export default function Card({ post }: { post: Post }) {
  return (
    <div className="flex flex-col w-full min-h-[250px] group hover:scale-105 transform duration-300">
      {post.mainImage ? (
        <Image
          className="w-auto min-h-[250px] object-center object-cover rounded-lg "
          src={urlForImage(post.mainImage).width(411).height(170).url()}
          height={170}
          width={411}
          alt=""
        />
      ) : (
        <div className="" />
      )}
      <div className="mt-4">
        <h3 className="text-ellipsis h-auto line-clamp-1 overflow-hidden  w-full">
          <a className=" text-gray-950 text-xl font-semibold group-hover:underline underline-offset-2 " href={`/post/${post.slug && post.slug.current}`}>
            <div className='text-blue-500'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
              </svg>
            </div>
            {post.title}
          </a>
        </h3>
        <div className='flex flex-col gap-1'>
          {post.tags && post.tags.map(tag => (
            <span key={tag._id} className=" text-violet-800">
              {tag.tagName}
            </span>))}
          {post.contentType &&
            <span className="text-sm uppercase text-cs-100">
              {post.contentType}
            </span>}
        </div>
        <p className=" text-akash ">{post.excerpt}</p>
        <p className="">{formatDate(post._createdAt)}</p>
      </div>
    </div>
  )
}

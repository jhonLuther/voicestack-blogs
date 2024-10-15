import Image from 'next/image'
import { Post } from '~/interfaces/post'
import { urlForImage } from '~/lib/sanity.image'
import { formatDate } from '~/utils'

interface VaryWidthCardProps {
    height?: number;
    width?: number;
    useClientWidth?: boolean;
    priority?: boolean;
    maxWidth?: number;
    wrapperPadding?: boolean;
    client?: any;
    [x: string]: any;
    alignment?: "left" | "center" | "right";
    

  }
export default function VaryWidthCard({ post }: { post: VaryWidthCardProps }) {
  
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
       ):post.image ? (
        <Image
          className="w-auto min-h-[250px] object-center object-cover rounded-lg "
          src={urlForImage(post.image).width(411).height(170).url()}
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
        <p className="">{(post._createdAt)}</p>
      </div>
    </div>
  )
}

import Link from 'next/link'
import Section from '../Section'
import DescriptionText from '../typography/DescriptionText'
import siteConfig from 'config/siteConfig'
import { useRouter } from 'next/router'
import { generateHref } from '~/utils/common'

interface RelatedTagProps {
  tags?: any
  className?: string
}

const RelatedTag = ({ tags, className }: RelatedTagProps) => {
    const router = useRouter();
    const { locale } = router.query; 
  
  if (!tags.length) {
    return null
  }

  return (
    <Section className={`justify-center border-t border-zinc-200  !pb-0 md:!mt-4  ${className}`}>
      <div className='w-full  md:flex-row flex flex-col flex-wrap gap-4'>
        <DescriptionText className='text-zinc-900 font-medium flex  items-center pr-[14px]'>{`Related Tags`}</DescriptionText>
        {tags && tags.length > 0 && tags.map((tag: any) => {
          // const hrefLink = `/${prefLocale}/${siteConfig.paginationBaseUrls.base}/${tag?.slug?.current ? tag?.slug?.current : ''}`cons
          let hrefTemplate = `${siteConfig.paginationBaseUrls.base}/${tag?.slug?.current ? tag?.slug?.current : ''}`
          const hrefLink = generateHref(locale as string, hrefTemplate)
          return (
            <Link className='rounded-md bg-zinc-100 px-4 py-[5px] hover:bg-zinc-200 transition-all duration-300 ease-in-out' 
            href={hrefLink} key={tag?.slug?.current} >
              <DescriptionText className='text-zinc-600 font-normal md:text-base text-sm'>
              {tag.tagName}
              </DescriptionText>
              </Link>
          )
        })}
      </div>
    </Section>
  )
}

export default RelatedTag

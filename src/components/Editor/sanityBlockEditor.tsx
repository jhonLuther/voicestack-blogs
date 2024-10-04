import React from 'react'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { getClient } from '~/lib/sanity.client'
import { SanityImage } from '~/components/SanityImage'
import DecoratorTable from '~/components/DecoratorTable'
import DynamicComponent from '~/layout/DynamicComponent'
import ListItem from '~/components/typography/ListItem'

interface SanityPortableTextProps {
  content: any
  draftMode?: boolean
  token?: string
}

const SanityPortableText: React.FC<SanityPortableTextProps> = ({
  content,
  draftMode = false,
  token = '',
}) => {
  const portableTextComponents: Partial<PortableTextReactComponents> = {
    marks: {
      link: ({value, children}) => {
        return (
          <a href={value?.href} className="!text-blue-500">
            {children}
          </a>
        )
      },
    },
    list: {
      bullet: ({children}) => <ul className="list-disc ml-4">{children}</ul>,
      number: ({children}) => <ol className="list-decimal ml-4">{children}</ol>,
    },
    listItem: {
      bullet: ({children, index}) => (
        <ListItem 
          node={{ children }} 
          index={index ?? 0} 
          isOrdered={false} 
        />
      ),
      number: ({children, index}) => (
        <ListItem 
          node={{ children }} 
          index={index ?? 0} 
          isOrdered={true} 
        />
      ),
    },
    types: {
      image: ({value}) => {
        return (
          <SanityImage 
            {...value} 
            client={getClient(draftMode ? { token } : undefined)} 
          />
        )
      },
      table: ({value}) => {
        return <DecoratorTable>{value}</DecoratorTable>
      },
      htmlCode: ({value}) => {
        return (
          <div 
            className="content-wrapper w-full" 
            dangerouslySetInnerHTML={{ __html: value.htmlCode }} 
          />
        )
      },
      dynamicComponent: ({value}) => {
        return (
          <DynamicComponent 
            {...value} 
            client={getClient(draftMode ? { token } : undefined)} 
          />
        )
      },
    },
  }

  return <PortableText value={content} components={portableTextComponents} />
}

export default SanityPortableText
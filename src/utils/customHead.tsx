import React, { useId } from 'react'
import { generateJSONLD } from './generateJSONLD'
import Head from 'next/head'

export default function CustomHead({ props, type = null }: any) {
  const randomId = useId() + Math.log(Math.random())

  const head = (data, i) => {
    return (
      <Head key={i}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        ></script>
      </Head>
    )
  }

  if (props && type === null) {
    return props.map((e, i) => {
      const data = generateJSONLD(e)
      console.log(data, 'data')
      return head(e, i)
    })
  } else if (props && type == 'caseStudy') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: [
        props.title,
        props.author.reduce((acc, red) => {
          return acc + red
        }),
      ],
      image: props?.author[0]?.picture,
      author: {
        '@type': 'Person',
        name: [
          props?.author?.map((e) => {
            return e.name
          }),
        ],
        url: 'https://carestack.com',
      },
      dateCreated: new Date(),
      inLanguage: 'en-US',
      copyrightHolder: {
        '@id': 'https://carestack.com/#organization',
      },
      publisher: {
        '@type': 'Organization',
        name: 'CareStack',
        url: 'https://carestack.com',
      },
    }
    return head(metaData, randomId)
  }
}

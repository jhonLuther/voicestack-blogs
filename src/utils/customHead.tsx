import React from 'react'
import { generateJSONLD } from './generateJSONLD'
import Head from 'next/head'
import { CaseStudies } from '~/interfaces/post'

interface CustomHeadProps {
  props: Array<CaseStudies>
}

export default function CustomHead({ props }: CustomHeadProps) {
  return (
    <div>
      {props
        ? props.map((e: CaseStudies,i:number) => {
            let data = generateJSONLD(e)
            return (
              <Head key={i}>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: data }}
                ></script>
                {data}
              </Head>
            )
          })
        : null}
    </div>
  )
}

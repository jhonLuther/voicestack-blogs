import siteConfig from 'config/siteConfig'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidSecret } from 'sanity-plugin-iframe-pane/is-valid-secret'

import { previewSecretId, readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse<string | void>,
) {
  if (!readToken) {
    res.status(500).send('Misconfigured server')
    return
  }

  const { query } = req

  const secret = typeof query.secret === 'string' ? query.secret : undefined
  const slug = typeof query.slug === 'string' ? query.slug : undefined

  if (!secret || !slug) {
    res.status(401)
    res.send('Invalid secret or missing slug')
    return
  }

  const authClient = getClient({ token: readToken }).withConfig({
    useCdn: false,
    token: readToken,
  })

  const validSecret = await isValidSecret(authClient, previewSecretId, secret)
  if (!validSecret) {
    return res.status(401).send('Invalid secret')
  }

  try {
    const document = await authClient.fetch(
      `*[slug.current == $slug][0]{ _type, contentType, slug }`,
      { slug },
    )

    if (document) {
      const actualContentType = document.contentType || document._type
      if (Object.values(siteConfig.pageURLs)) {
        res.setDraftMode({ enable: true })
        res.writeHead(307, { Location: `/${actualContentType}/${slug}` })
        res.end()
        return
      } else if (actualContentType === 'post') {
        res.setDraftMode({ enable: true })
        res.writeHead(307, { Location: `/post/${slug}` })
        res.end()
        return
      }
    }

    res
      .status(404)
      .send('Requested slug not found please check with siteconfig urls')
  } catch (error) {
    console.error('Error in preview function:', error)
    res.status(500).send('Internal Server Error')
  }
}

import React from 'react'
import { SanitizedHTML, DEFAULTS } from './components/SanitizedHTML'
import { canUseDOM } from 'vtex.render-runtime'
import { Helmet } from 'react-helmet'

const allowedTags = [
  ...DEFAULTS.allowedTags,
  'link',
  'body',
  'html',
  'style',
  'link',
  'head',
  'meta',
  'object',
  'embed',
  'script',
]

const allowedAttributes = {
  ...DEFAULTS.allowedAttributes,
  div: ['class', 'data-url', 'data-transparency', 'data-hide-headers', 'style'],
}

const NuestrasSucursales: StorefrontFunctionComponent<any> = () => {
  if (!canUseDOM) return <></>
  const script = `
    <div class="elfsight-app-2bc46e38-98e1-4cf4-b804-6a14284efd12"></div>
  `

  return (
    <>
      <SanitizedHTML
        content={script}
        allowedTags={allowedTags}
        allowedAttributes={allowedAttributes}
      />

      <Helmet>
        <script src="https://apps.elfsight.com/p/platform.js" defer />
      </Helmet>
    </>
  )
}

export default NuestrasSucursales

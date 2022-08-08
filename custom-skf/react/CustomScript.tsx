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
  'defer'
]

const allowedAttributes = {
  ...DEFAULTS.allowedAttributes,
  div: ['class', 'data-url', 'data-transparency', 'src', 'defer', 'data-hide-headers', 'style'],
}

const CustomScript: StorefrontFunctionComponent<any> = (props: any) => {
  if (!canUseDOM) return <></>

  return (
    <>
      <SanitizedHTML
        content={props.div ? props.div : ''}
        allowedTags={allowedTags}
        allowedAttributes={allowedAttributes}
      />
      
      <Helmet>
        <script src={props.script} defer/>
      </Helmet>
    </>
  )
}

export default CustomScript
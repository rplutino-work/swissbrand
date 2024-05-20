import React from 'react'
import { SanitizedHTML, DEFAULTS } from './components/SanitizedHTML'
import { canUseDOM } from 'vtex.render-runtime'
// import { Helmet } from 'react-helmet'

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
  'script'
]

const allowedAttributes = {
  ...DEFAULTS.allowedAttributes,
  div: ['class', 'data-url', 'data-transparency', 'data-hide-headers', 'style']
}

const CustomTypeformScript: StorefrontFunctionComponent<any> = (props: any) => {
  if (!canUseDOM) return <></>
  
  function renderIframe() {
    (function() { var js,q,d=document, t=Math.random(), gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; console.log(t); if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })()
    return <></>
  }
  return <>
      <SanitizedHTML
        content={props.script ? props.script : ''}
        allowedTags={allowedTags}
        allowedAttributes={allowedAttributes}
      />
      {renderIframe()}
  </>
}

export default React.memo(CustomTypeformScript)
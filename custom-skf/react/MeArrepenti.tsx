import React from 'react'
import { SanitizedHTML, DEFAULTS } from './components/SanitizedHTML'
import { canUseDOM } from 'vtex.render-runtime'

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

const MeArrepenti: StorefrontFunctionComponent = () => {
  if (!canUseDOM) return <></>
  const script = `
  <div class="typeform-widget" data-url="https://form.typeform.com/to/bQE5NnrR?typeform-medium=embed-snippet" style="width: 100%; height: 500px;"></div> 
  `

  // prettier-ignore
  function renderIframe() {
    (function() { var js,q,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })()
    return <></>
  }

  return (
    <>
      <SanitizedHTML
        content={script}
        allowedTags={allowedTags}
        allowedAttributes={allowedAttributes}
      />
      {renderIframe()}
    </>
  )
}

export default MeArrepenti

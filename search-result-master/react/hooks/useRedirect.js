import { useRuntime } from 'vtex.render-runtime'
import { useState, useEffect } from 'react'

const useRedirect = () => {
  const { navigate } = useRuntime()

  const setRedirect = redirect => {
    if (!redirect) {
      return
    }

    const urlRegex = /((http(s)?:)?\/\/|www\.)/

    if (!urlRegex.test(redirect)) {
      navigate({
        to: redirect,
      })

      return
    }

    const originRedirect = redirect.replace(urlRegex, '')
    const origin = window.location.origin.replace(/(http(s)?:)?\/\//, '')

    if (originRedirect.startsWith(origin)) {
      navigate({
        to: originRedirect.replace(origin, ''),
      })
    } else {
      window.location.replace(redirect.replace(/www\./, 'http://'))
    }
  }

  return { setRedirect }
}

export default useRedirect

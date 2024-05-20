import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'headerFixed',
  'headerNotFixed'
]

const AddClassOnHeader: StorefrontFunctionComponent<any> = () => {
  const {handles} = useCssHandles(CSS_HANDLES)
  const [scrollY, setScrollY] = useState(0)

  function scrollValue() {
    setScrollY(window.pageYOffset)
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollValue)

    return () => {
      window.removeEventListener('scroll', scrollValue)
    }
  }, [])

  
  useEffect(() => {
    if (scrollY < 50) {
      document.querySelector(
        '.vtex-store-header-2-x-headerStickyRow'
      )?.classList.add(`${handles.headerFixed}`)

      document.querySelector(
        '.vtex-store-header-2-x-headerStickyRow'
      )?.classList.remove(`${handles.headerNotFixed}`)
    } else {
      document.querySelector(
        '.vtex-store-header-2-x-headerStickyRow'
      )?.classList.remove(`${handles.headerFixed}`)

      document.querySelector(
        '.vtex-store-header-2-x-headerStickyRow'
      )?.classList.add(`${handles.headerNotFixed}`)
    }
  }, [handles.headerFixed, handles.headerNotFixed, scrollY])

  return <></>
}

export default AddClassOnHeader

import React, { useEffect, useState } from 'react'
import { canUseDOM, useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { useSearchPage } from "vtex.search-page-context/SearchPageContext";

import FadeIn from 'react-fade-in'

// @ts-ignore
import { debounce } from './utils/debounce'
import { Banner, Container } from './CustomCategoryBannerStyle'

const CSS_HANDLES = ['CustomCategoryBanner', 'CustomCategoryBannerModalImage']

const CustomCategoryBanner: React.FC<CustomCategoryBannerProps> = () => {
  const handles  = useCssHandles(CSS_HANDLES)
  const { account } = useRuntime()
  const { params } = useSearchPage();
  const [imageSrcUrl, setImageSrcUrl] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  
  if (!canUseDOM) {
    return <></>
  }

  function checkDeviceMediaQuery(callback: Function, fallback: Function) {
    if (window.matchMedia('(max-width: 640px)').matches) {
      callback()

      return
    } else {
      fallback()
    }
  }

  useEffect((): any => {
    const debouncedHandleResize = debounce(function handleResize() {
      checkDeviceMediaQuery(
        async () => {
          setIsMobile(true)
          await updateImage()
        },
        async () => {
          setIsMobile(false)
          await updateImage()
        }
      )
    }, 2000)

    window.addEventListener('resize', debouncedHandleResize as any)

    return (_: void) => {
      window.removeEventListener('resize', debouncedHandleResize as any)
    }
  })

  async function updateImage(): Promise<void> {
    let genericSrc:
      | null
      | string = `https://${account}.vteximg.com.br/arquivos/`
    let imageSrc: null | string = ''
    const searchLevels = Object.keys(params).filter(level => ["department", "category", "subcategory", "brand", "term"].includes(level));
    setImageSrcUrl('')

    for(var searchLevel of searchLevels.slice().reverse()) {
      let imageName: string = ["category", "subcategory"].includes(searchLevel) ? 
        `${searchLevel}-${params["department"]}-${formatImageName(params[searchLevel])}${isMobile ? '--mobile' : ''}.jpg?v=${getRandomHash()}`:
        `${searchLevel}-${formatImageName(params[searchLevel])}${isMobile ? '--mobile' : ''}.jpg?v=${getRandomHash()}`;

      imageSrc = genericSrc + imageName;

      if(await checkImage(imageSrc)){
        setImageSrcUrl(imageSrc)
        break;
      }

      if(["brand", "terms"].includes(searchLevel)){
        break;
      }
    }
  }

  function formatImageName(imageName: string) {
    return imageName
      .toLowerCase()
      .replace(/\ /g, '-')
      .replace(/\%20/g, '-')
  }

  function getRandomHash() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  async function checkImage(url: string) {
    return await fetch(url).then(res => {
      if (res.status === 200) {
        console.warn('banner exists', url)
        return true;
      } else {
        console.warn("banner doesn't exist", url)
        return false;
      }
    }).catch(() => {
      console.warn('banner path throws error', url)
      return false;
    })
  }

  useEffect(() => {
    checkDeviceMediaQuery(
      () => {
        if (!isMobile) setIsMobile(true)
      },
      () => {
        if (isMobile) {
          setIsMobile(false)
        }
      }
    )
  }, [])

  useEffect(() => {
    async function asyncUse() {
      await updateImage()
    }
    asyncUse()
  }, [isMobile, params])

  return (
    <>
      {imageSrcUrl ? (
        <FadeIn delay={1000}>
          <Container className={`${handles.CustomCategoryBannerModalImage}`}>
            <Banner src={imageSrcUrl} alt="" />
          </Container>
        </FadeIn>
      ) : (
        <></>
      )}
    </>
  )
}

interface CustomCategoryBannerProps {}

export default CustomCategoryBanner
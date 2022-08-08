import React, { useEffect, useState, useCallback } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import ScopedStyledComponent from './components/ScopedStyledComponent'

import styles from './BrandFlag.css'

const BrandFlag: StorefrontFunctionComponent<ProductVideoProps> = (props) => {
  const { product } = useProduct()
  const [hasImg, setHasImg] = useState(false)

  const getImageSrc = useCallback(() => {
    let brandName = product.brand.toLowerCase().replace(/ /g, '-')
    const imageSrc = `https://skf.vtexassets.com/arquivos/brand-${brandName}.png`
    return imageSrc
  }, [product.brand])

  useEffect(() => {
    const imageSrc = getImageSrc()

    fetch(imageSrc, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHasImg(true)
      })
      .catch(() => setHasImg(false))
  }, [getImageSrc, hasImg])

  return (
    <>
      {hasImg && (
        <div className={styles.BrandFlagContainer}>
          <ScopedStyledComponent COMPONENT_SCOPED_NAME="brandFlag">
            <img
              className={styles.BrandFlagImg}
              alt="brand-flag"
              width={props.width}
              height={props.height}
              src={getImageSrc()}
            />
          </ScopedStyledComponent>
        </div>
      )}
    </>
  )
}

interface ProductVideoProps {
  width?: string
  height?: string
}

export default BrandFlag

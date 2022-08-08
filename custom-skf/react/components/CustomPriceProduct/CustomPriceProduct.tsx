import React from 'react'

import styles from './CustomPriceProduct.css'

import useProduct from 'vtex.product-context/useProduct'
import { FormattedPrice } from 'vtex.formatted-price'

const CustomPriceProduct: StorefrontFunctionComponent = () => {
  const product = useProduct()
  const productInfos = product.selectedItem.sellers[0].commertialOffer

  const AvailableQuantity = productInfos.AvailableQuantity
  const listPrice = productInfos.ListPrice
  const price = productInfos.Price

  if (AvailableQuantity || (price <= 0 && listPrice <= 0)) return <></>

  return (
    <>
      <div className={styles.productCustomPriceProduct}>
        {listPrice !== price && listPrice > 0 && (
          <span className={styles.productCustomListPrice}>
            <FormattedPrice value={listPrice} />
          </span>
        )}

        <span className={styles.productCustomPrice}>
          <div className={styles.productInteiro}>
            <FormattedPrice value={price} />
          </div>
        </span>
      </div>
      <div className={styles.productParcelado}>Hasta 12 cuotas sin interes</div>
    </>
  )
}

export default CustomPriceProduct

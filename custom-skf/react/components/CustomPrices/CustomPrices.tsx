import React from 'react'

import styles from './CustomPrices.css'

import useProduct from 'vtex.product-context/useProduct'
import { FormattedPrice } from 'vtex.formatted-price'

const CustomPrices: StorefrontFunctionComponent = () => {
  const { product } = useProduct()
  const { AvailableQuantity } = product.sku.seller.commertialOffer

  const listPrice = product.sku.seller.commertialOffer.ListPrice
  const price = product.sku.seller.commertialOffer.Price

  if (AvailableQuantity || (price <= 0 && listPrice <= 0)) return <></>

  return (
    <>
      <div className={styles.customPrices}>
        {listPrice !== price && listPrice > 0 && (
          <span className={styles.customListPrice}>
            <FormattedPrice value={listPrice} />
          </span>
        )}

        <span className={styles.customPrice}>
          <div className={styles.inteiro}>
            <FormattedPrice value={price} />
          </div>
        </span>
      </div>
      {product.sku?.seller?.commertialOffer?.Installments.length == 0 ? (
             <div className={styles.parcelado}>Hasta 12 cuotas sin intéres</div>
          ) : (
            <></>
          )}
    </>
  )
}

export default CustomPrices

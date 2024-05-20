import React from 'react'

import styles from "./CustomPrices.css"

import useProduct from 'vtex.product-context/useProduct'
import { FormattedPrice } from 'vtex.formatted-price'


const CustomPrices: StorefrontFunctionComponent = () => {
  const { selectedItem } = useProduct()

  let { AvailableQuantity, ListPrice, Price } = selectedItem.sellers[0]?.commertialOffer

  if (AvailableQuantity || Price <= 0 && ListPrice <= 0) return <></>

  // ListPrice = 2500.01;
  let discount : number = Math.round(100 - (Price / ListPrice)*100);

  return <>
    <div className={styles.customPrices}>
      {discount > 0 ? (
        <span className={styles.customDiscount}>-{discount}%</span>
      ) : ``}
      <div className={styles.customPriceWrapper}>
        {ListPrice !== Price && ListPrice > 0 &&
          <span className={styles.customListPrice}>
            <FormattedPrice value={ListPrice} />
          </span>
        }
        <span className={styles.customPrice}>
          <div className={styles.inteiro}>
            <FormattedPrice value={Price} />
          </div>
        </span>
        {(ListPrice - Price) > 0 ? (
          <span className={styles.customAhorre}>Ahorre <FormattedPrice value={ListPrice - Price}/></span>
        ) : ``}     
      </div> 
      <span className={styles.customInstallments}>
        Cuotas sin interés
      </span>
    </div>
  </>
}



export default CustomPrices

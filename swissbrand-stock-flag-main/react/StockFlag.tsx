import React from 'react'

import useProduct from 'vtex.product-context/useProduct'
import { useCssHandles } from 'vtex.css-handles'

import { StockFlagProps } from './typings/global'

import ScopedStyledComponent from './components/ScopedStyledComponent'
import { StockFlagContainer, StockFlagText } from './styles'

const CSS_HANDLES = ['stockFlagContainer', 'stockFlagText']

const StockFlag: StorefrontFunctionComponent<StockFlagProps> = (props) => {
  const { product } = useProduct()
  const { AvailableQuantity } = product.sku.seller.commertialOffer
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <>
      {!AvailableQuantity && (
        <ScopedStyledComponent COMPONENT_SCOPED_NAME="stockFlag">
          <StockFlagContainer className={handles.stockFlagContainer}>
            <StockFlagText className={handles.stockFlagText}>
              {props.unavailableText || 'Unavailable'}
            </StockFlagText>
          </StockFlagContainer>
        </ScopedStyledComponent>
      )}
    </>
  )
}

export default StockFlag

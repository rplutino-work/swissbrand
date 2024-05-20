import React from 'react'
import { SimilarProductsProps } from '../../typings/global'

import { useQuery } from 'react-apollo'
import PRODUCT_SIMILARS from '../../graphql/getSimilarProducts.graphql'
import { useProduct } from 'vtex.product-context'

import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'similarImageContainer',
  'similarImageDiv',
  'similarImageSelect',
  'similarImageLink',
  'similarImage',
  'titleSimilar',
  'similarLoading',
  'similarColorText',
  'similarWrapperImageDiv',
  'similarWrapperImageNotSelect'
]

const SimilarProducts: StorefrontFunctionComponent<SimilarProductsProps> = (
  props
) => {
 
  const { handles } = useCssHandles(CSS_HANDLES)

  // Informações do produto atual

  const productContextValue = useProduct()
  let itemId: string | undefined = productContextValue?.product?.productId

  let currentImageUrl: string | undefined =
    productContextValue?.selectedItem?.images[0]?.imageUrl
  let currentName: string | undefined = productContextValue?.selectedItem?.name
  let isVisible: boolean | undefined =
    productContextValue?.skuSelector?.isVisible
    
  const productSpec  = productContextValue.product?.skuSpecifications?.filter((item: any)=> item.field.name === "Color")

  const productSpecValue = productSpec?.length ? productSpec[0].values[0].name : ""
  
  const {
    imageWidth = 50,
    imageHeight = 50,
    textTitle = `Color`,
    msgError = '',
    msgLoading = 'Cargando...',
  } = props

  // Request para obter os produtos similares

  const { loading, error, data } = useQuery(PRODUCT_SIMILARS, {
    variables: { productId: itemId },
  })

  if (loading) {
    return <div className={handles.similarLoading}>{msgLoading}</div>
  }

  if (error) {
    return <div>{msgError}</div>
  }
  let products = data?.product?.recommendations?.similars
  
  function getColorName(product: any) {
    let color = false;
    product?.items[0]?.variations?.map((variation: any) => {
      if(variation.name == "Color"){
        // console.log(variation.values[0])
        color = variation.values[0];
      }
    })
    return color;
  }

  return (
    <>
      {isVisible && (
        <>
          <div className={handles.titleSimilar}>{textTitle}</div>
          <div className={`flex items-center ${handles.similarImageContainer}`}>
            <div
              className={`${handles.similarImageDiv}`}
            >
              <div className={handles.similarImageLink} title={currentName}>
                <div className={`${handles.similarWrapperImageDiv} ${handles.similarImageSelect}`}>
                  <img
                    className={handles.similarImage}
                    src={currentImageUrl}
                    alt={currentName}
                    width={imageWidth}
                    height={imageHeight}
                  />
                </div>
                <p className={handles.similarColorText}> {productSpecValue} </p>
              </div>
            </div>
            {products?.length > 0 && (
              <>
                {products.map((product: any) => {
                  return (
                    <>
                      <div
                        className={`${handles.similarImageDiv}`}
                        key={product.productId}
                      >
                        <a
                          className={handles.similarImageLink}
                          href={product?.link.replace(
                            'https://portal.vtexcommercestable.com.br',
                            ''
                          )}
                          title={product?.titleTag}
                        >
                          <div className={`${handles.similarWrapperImageDiv} ${handles.similarWrapperImageNotSelect}`}>
                            <img
                              className={handles.similarImage}
                              src={product.items[0]?.images[0]?.imageUrl}
                              alt={product.items[0]?.images[0]?.imageLabel}
                              width={imageWidth}
                              height={imageHeight}
                            />
                          </div>
                          <p className={handles.similarColorText}> {getColorName(product)} </p>
                        </a>
                      </div>
                    </>
                  )
                })}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

SimilarProducts.schema = {
  title: 'Producto Similar Título',
  description: 'Título de producto similar ',
  type: 'object',
  properties: {
    firstBlockText: {
      title: 'Título',
      description: 'Texto que estará en el Título',
      type: 'string',
      default: null,
    },
  },
}

export default SimilarProducts

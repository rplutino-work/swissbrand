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
  'similarImageNotSelect',
  'similarImageLink',
  'similarImage',
  'similarDiagonalCross',
  'similarColorName',
  'titleSimilar'
]

const SimilarProducts: StorefrontFunctionComponent<SimilarProductsProps> = (props) => {
  const {
    imageWidth = 48,
    imageHeight = 48,
    textTitle = `Material:`,
    msgError = 'Error al cargar el material',
    msgLoading = '',
  } = props
  
  
  const { handles } = useCssHandles(CSS_HANDLES)

  // Informações do produto atual

  const productContextValue = useProduct()
  const itemId: string|undefined = productContextValue?.product?.productId
  const currentImageUrl: string|undefined = productContextValue?.selectedItem?.images[0]?.imageUrl
  const currentName: string|undefined = productContextValue?.selectedItem?.name
  const variations: any|undefined= productContextValue?.selectedItem?.variations
  const isVisible: boolean|undefined= productContextValue?.skuSelector?.isVisible 

  // Request para obter os produtos similares
  const { loading, error, data } = useQuery(PRODUCT_SIMILARS, {
    variables: { productId: itemId },
  })    
  if(loading){
    return <div>{msgLoading}</div>
  }
  if(error){
    return <div>{msgError}</div>
  }

  const products = data?.product?.recommendations?.similars

  return (
    <>
      {isVisible && ( 
        <>
          <div className={handles.titleSimilar}>{textTitle}</div>
          <div className={`flex items-center ${handles.similarImageContainer}`} >
            <div className={`${handles.similarImageDiv} ${handles.similarImageSelect}`}>
              <div className={handles.similarImageLink} title={currentName}>
                <img className={handles.similarImage} src={currentImageUrl} alt={currentName} width={imageWidth} height={imageHeight}/>
                {                        
                variations.map((variation: any) =>{
                  return <>
                    <div className={handles.similarColorName}>
                      {variation.name == "Material" && (
                        <>
                          {variation.values[0]}
                        </>
                      )}
                    </div>
                  </>
                })
              }
              </div>
            </div>
            {products?.length > 0 && ( 
              <>
                {
                  products.map((product: any)=>{
                    return <>
                      <div className={`${handles.similarImageDiv} ${handles.similarImageNotSelect}`} >
                        <a className={handles.similarImageLink} href={product?.link.replace("https://portal.vtexcommercestable.com.br", "")} title={product?.titleTag}>
                          {product.items[0]?.sellers[0]?.commertialOffer?.AvailableQuantity == 0 ? (
                            <div className={handles.similarDiagonalCross}></div>
                          ):(
                            <></>
                          )}
                          <img className={handles.similarImage} src={product.items[0]?.images[0]?.imageUrl} alt={product.items[0]?.images[0]?.imageLabel} width={imageWidth} height={imageHeight}/>
                          {                        
                            product.items[0]?.variations.map((variation: any) =>{
                              return <>
                                <div className={handles.similarColorName}>
                                  {variation.name == "Material" && (
                                    <>
                                      {variation.values[0]}
                                    </>
                                  )}
                                </div>
                              </>
                            })
                          }
                        </a>
                     </div>
                    </>
                  })
                }   
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
  description:
    'Título de producto similar ',
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

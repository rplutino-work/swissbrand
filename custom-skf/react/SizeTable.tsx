import React, { useState } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { useRuntime, canUseDOM } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import {
  Close,
  Content,
  ModalHeader,
  Open,
  Overlay,
  ModalContent,
} from './styles/size-table'
import ScopedStyledComponent from '../react/components/ScopedStyledComponent'
const CSS_HANDLES = [
  'sizeTable',
  'sizeTableActionOpen',
  'sizeTableOverlay',
  'sizeTableIcon',
  'sizeTableModalHeader',
  'sizeTableModalTitle',
  'sizeTableActionClose',
  'sizeTableModal',
  'sizeTableModalImage',
]
const SizeTable: StorefrontFunctionComponent<SizeTableProps> = () => {
  if (!canUseDOM) return <></>
  const { handles } = useCssHandles(CSS_HANDLES)
  const { account } = useRuntime()
  const { product } = useProduct()
  const [showTabla, setShowTabla] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  let openClass = isOpen ? 'active' : ''
  const productId = product.productId

  function getImagePath(): string {
    let imageSrc: null | string = null
    imageSrc = `https://${account}.vteximg.com.br/arquivos/tabla-${productId
      .toLowerCase()
      .replace(' ', '-')}.jpg`
    return imageSrc
  }
  function checkImage(url: string) {
    var request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    )
    request.setRequestHeader('Access-Control-Allow-Origin', '*')
    request.send()
    request.onload = function () {
      if (request.status == 200) {
        console.warn('image exists')
        setShowTabla(true)
      } else {
        console.warn("image doesn't exist: img name:", 'table-', productId)
        setShowTabla(false)
      }
    }
    request.onerror = function () {
      console.warn('image path throws error')
      console.warn("image doesn't exist: img name:", 'table-', productId)
      setShowTabla(false)
    }
  }
  checkImage(getImagePath())
  if (showTabla) {
    return (
      <ScopedStyledComponent COMPONENT_SCOPED_NAME="sizeTable">
        <div className={`${handles.sizeTable} `}>
          <Open
            className={`${handles.sizeTableActionOpen}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className={`${handles.sizeTableIcon}`}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="11.813"
              viewBox="0 0 16 11.813"
            >
              <defs />
              <path
                className="a"
                d="M26.545,27.412a7.975,7.975,0,0,0,1.337-.606,5.173,5.173,0,0,0,1.564-1.335v1.941Zm.987-6.368a3.229,3.229,0,0,1,1.918,2.619,3.173,3.173,0,0,1-1.895,2.6,10.641,10.641,0,0,1-9.634,0A3.229,3.229,0,0,1,16,23.642a3.177,3.177,0,0,1,1.895-2.6,9.773,9.773,0,0,1,4.811-1.154,9.868,9.868,0,0,1,4.823,1.154ZM25.263,25.3A1.96,1.96,0,0,0,26.4,23.656,1.993,1.993,0,0,0,25.263,22a5.49,5.49,0,0,0-5.053,0,1.957,1.957,0,0,0-1.133,1.642A2,2,0,0,0,20.227,25.3a5.456,5.456,0,0,0,5.036,0Zm-.333-2.737a1.4,1.4,0,0,1,.842,1.105,1.38,1.38,0,0,1-.821,1.088,4.883,4.883,0,0,1-4.421,0,1.4,1.4,0,0,1-.842-1.105,1.366,1.366,0,0,1,.819-1.095,4.854,4.854,0,0,1,4.429,0Zm-2.206,5.48a10.378,10.378,0,0,1-5.109-1.236A5.227,5.227,0,0,1,16,25.433v2.491a2.526,2.526,0,0,0,.737,1.705V27.877a5.263,5.263,0,0,0,.632.505v1.806a5.42,5.42,0,0,0,.552.36,6.585,6.585,0,0,0,.712.354V29.054c.211.086.421.166.632.238v1.857a9.7,9.7,0,0,0,1.684.411V29.692c.211.032.421.059.632.08v1.869c.375.036.758.059,1.147.059h.863V29.833h.632V31.7H32V28.044C30.526,28.044,24.307,28.046,22.724,28.042Z"
                transform="translate(-16 -19.89)"
              />
            </svg>
            <FormattedMessage id="store/sizeTable.actionOpen" />
          </Open>
          <div>
            <Overlay
              className={`${handles.sizeTableOverlay} ${openClass}`}
              onClick={() => setIsOpen(!isOpen)}
            />
            <Content className={`${openClass} ${handles.sizeTableModal}`}>
              <ModalHeader className={handles.sizeTableModalHeader}>
                <Close
                  className={`${handles.sizeTableActionClose}`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  &#x2715;
                </Close>
              </ModalHeader>
              <ModalContent className={`${handles.sizeTableModalImage}`}>
                <img src={getImagePath()} alt="" />
              </ModalContent>
            </Content>
          </div>
        </div>
      </ScopedStyledComponent>
    )
  }
  return <></>
}
interface SizeTableProps {}
export default SizeTable

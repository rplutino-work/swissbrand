import React, { useState } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { useRuntime, canUseDOM } from 'vtex.render-runtime'

import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import ScopedStyledComponent from './components/ScopedStyledComponent'
import { Open, Overlay, Content, Close } from './styles';

const CSS_HANDLES = [
  'sizeTable',
  'sizeTableActionOpen',
  'sizeTableOverlay',
  'sizeTableActionClose',
  'sizeTableModal',
  'sizeTableModalImage',
]

const SizeTable: StorefrontFunctionComponent<SizeTableProps> = () => {
  if(!canUseDOM )  return  <></>

  const handles = useCssHandles(CSS_HANDLES)
  const { account } = useRuntime()
  const { product } = useProduct()
  const [showTabla, setShowTabla] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  let openClass = isOpen ? 'active' : ''

  const productId = product.productId

  function getImagePath() {
    let imageSrc: null | string = null

    imageSrc = `https://${account}.vteximg.com.br/arquivos/tabla-${productId
      .toLowerCase()
      .replace(' ', '-')}.jpg`

    return imageSrc
  }

  function checkImage(url: string) {
    var request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send()
    request.onload = function() {
      if (request.status == 200) {
        // console.warn('image exists')
        setShowTabla(true)
      } else {
        // console.warn("image doesn't exist: img name:", "table-", productId)
        setShowTabla(false)
      }
    }
    request.onerror = function() {
      // console.warn('image path throws error')
      // console.warn("image doesn't exist: img name:", "table-",productId)
      setShowTabla(false)
    }
  }

  checkImage(getImagePath())

  if (showTabla) {
    return (
      <ScopedStyledComponent COMPONENT_SCOPED_NAME="sizeTable">
        <div className={`${handles.sizeTable} mb5`}>
          <Open
            className={`${handles.sizeTableActionOpen} f5`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <FormattedMessage id="store/sizeTable.actionOpen" />
          </Open>
          <div>
            <Overlay
              className={`${handles.sizeTableOverlay} ${openClass}`}
              onClick={() => setIsOpen(!isOpen)}
            />
            <Content className={`${openClass} ${handles.sizeTableModal}`}>
              <Close
                className={`${handles.sizeTableActionClose}`}
                onClick={() => setIsOpen(!isOpen)}
              ></Close>

              <div className={`${handles.sizeTableModalImage}`}>
                <img src={getImagePath()} alt="" />
              </div>
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

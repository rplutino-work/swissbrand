import React from 'react'
import { canUseDOM } from 'vtex.render-runtime'

const TalleAgotado: StorefrontFunctionComponent = () => {
  if (!canUseDOM) return <></>

  // Time out para que a vtex renderize as opções de tamanho
  setTimeout(() => {
    const showMoreBtn = document.querySelector(
      '.vtex-store-components-3-x-skuSelectorOptionsList .vtex-store-components-3-x-seeMoreButton'
    )
    let skuSelectorItemBtn = document.querySelectorAll(
      '.vtex-store-components-3-x-skuSelectorItem'
    )

    let allTallesAgotado = document.querySelectorAll(
      '.vtex-store-components-3-x-skuSelectorItem .vtex-store-components-3-x-diagonalCross'
    )

    if (allTallesAgotado[0] === null) {
      allTallesAgotado = document.querySelectorAll(
        '.vtex-store-components-3-x-skuSelectorItem .vtex-store-components-3-x-diagonalCross'
      )
    }

    function addClassAgotado() {
      allTallesAgotado = document.querySelectorAll(
        '.vtex-store-components-3-x-skuSelectorItem .vtex-store-components-3-x-diagonalCross'
      )
      for (let i = 0; i < allTallesAgotado.length; i++) {
        const element = allTallesAgotado[i] as any
        element.parentElement.parentElement?.classList.add(
          'skf.skf-custom-0-x-talleAgotado'
        )
      }
    }

    addClassAgotado()
    showMoreBtn?.addEventListener('click', () => {
      setTimeout(addClassAgotado, 300)
      setTimeout(() => {
        skuSelectorItemBtn = document.querySelectorAll(
          '.vtex-store-components-3-x-skuSelectorItem'
        )
      }, 300)
    })
    skuSelectorItemBtn.forEach((element) => {
      element?.addEventListener('click', () => {
        setTimeout(addClassAgotado, 0)
      })
    })
  }, 300)

  return <></>
}

export default TalleAgotado

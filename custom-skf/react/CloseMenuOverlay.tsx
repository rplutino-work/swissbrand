import React from 'react'
import { canUseDOM } from 'vtex.render-runtime'

const CloseMenuOverlay: StorefrontFunctionComponent = () => {
  if (!canUseDOM) return <></>

  function hasClass(elem: HTMLElement, className: string) {
    return elem.className.split(' ').indexOf(className) > -1
  }

  function createElementFromHTML(htmlString: string) {
    var div = document.createElement('div')
    div.innerHTML = htmlString.trim()

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild
  }

  function hideOnClickOutside() {
    const outsideClickListener = (event: any) => {
      if (
        event.target.closest('.vtex-store-drawer-0-x-drawer--mobile-menu') ===
          null &&
        event.target.closest(
          '.vtex-store-drawer-0-x-openIconContainer--mobile-menu'
        ) === null
      ) {
        removeClickListener()
        closeAll()
        setTimeout(hideOnClickOutside, 300)
      }
    }

    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener)
    }

    document.addEventListener('click', outsideClickListener)
  }

  function closeAll() {
    const body = window.document.querySelectorAll(
      'body.bg-base'
    )[0] as HTMLElement
    document
      .querySelectorAll('.vtex-store-drawer-0-x-overlay')
      .forEach((item: any) => {
        item.click()
      })
    body.style.overflow = ''
  }

  document?.addEventListener('click', (el) => {
    const { target } = el

    if (target) {
      hasClass(
        target as HTMLElement,
        'vtex-rich-text-0-x-paragraph--mobile-menu-item'
      )

      const elements = window.document.querySelectorAll(
        '.vtex-store-drawer-0-x-closeIconContainer'
      )

      elements.forEach((el) => {
        const alreadyHasButton = Array.from(el.children).some(
          ({ classList }) => {
            if (
              classList.contains(
                'vtex-store-drawer-0-x-closeIconButton--primary-tab'
              )
            ) {
              return true
            }
            return classList.contains('close-menu-button')
          }
        )

        if (alreadyHasButton) return
        const closeMenuButton = createElementFromHTML(
          `<button class="close-menu-button vtex-store-drawer-0-x-closeIconButton vtex-store-drawer-0-x-closeIconButton--mobile-menu vtex-store-drawer-0-x-closeIconButton--primary-tab pa4 pointer bg-transparent transparent bn pointer"><svg fill="none" width="30" height="30" viewBox="0 0 16 16" class=" vtex-store-drawer-0-x-closeIcon vtex-store-drawer-0-x-closeIcon--mobile-menu vtex-store-drawer-0-x-closeIcon--primary-tab" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use href="#sti-close--line" xlink:href="#sti-close--line"></use></svg></button>`
        )

        el.appendChild(closeMenuButton as any)

        closeMenuButton?.addEventListener('click', () => {
          closeAll()
        })
      })
    }
  })

  hideOnClickOutside()

  return <></>
}

export default CloseMenuOverlay

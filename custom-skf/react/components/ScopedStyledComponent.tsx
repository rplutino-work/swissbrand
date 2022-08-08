import React, { ReactNode } from 'react'
import { StyleSheetManager } from 'styled-components'

function ScopedStyledComponent({ children, COMPONENT_SCOPED_NAME }: AuxProps) {
  const STYLIS_CONTEXTS = {
    POST_PROCESS: -2,
    PREPARATION: -1,
    NEWLINE: 0,
    PROPERTY: 1,
    SELECTOR_BLOCK: 2,
    AT_RULE: 3,
  }

  const scopeClasses = () => (context: any, content: any, selectors: any) => {
    context
    selectors
    // Object.keys({ selectors })[0]

    if (context === 3) {
      console.log(content)
    }
    if (context === STYLIS_CONTEXTS.SELECTOR_BLOCK) {
      for (let i = 0; i < selectors.length; i++) {
        const selector = selectors[i]
        if (
          /^\.[\w\d-_]+$/i.test(selector) ||
          (selector.includes('.') &&
            !selector.includes(`.${COMPONENT_SCOPED_NAME} `))
        ) {
          selectors[i] = `.${COMPONENT_SCOPED_NAME} ${selector.replace(/:+.*/g, '')}${selector}`
        }
      }
    }
  }

  const scopeClassesPlugin = Object.defineProperty(scopeClasses(), 'name', {
    value: 'scopeClasses',
  })

  return (
    <div className={COMPONENT_SCOPED_NAME}>
      <StyleSheetManager stylisPlugins={[scopeClassesPlugin]}>
        {children}
      </StyleSheetManager>
    </div>
  )
}

interface AuxProps {
  children: ReactNode
  COMPONENT_SCOPED_NAME: string
}

export default ScopedStyledComponent

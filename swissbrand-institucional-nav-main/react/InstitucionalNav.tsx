import React from 'react'
import { NavContainer } from './InstitucionalNavStyled'
import { Link } from 'vtex.render-runtime'
import { canUseDOM } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'


import { InstitucionalNav, InstuticionalLink } from './typings/global'

import ScopedStyledComponent from './components/ScopedStyledComponent'
import styles from './css/styles.css'

const CSS_HANDLES = ['navContainer']

const InstitucionalNav: StorefrontFunctionComponent<InstitucionalNav> = (props:InstitucionalNav) => {
  const links = props.links
  const pathName = canUseDOM ?  window.location?.pathname :  ''
  const handles = useCssHandles(CSS_HANDLES)
  
  return (
    <ScopedStyledComponent COMPONENT_SCOPED_NAME="institucionalNav">
      <NavContainer className={handles.navContainer}>
        {canUseDOM && links.map((link: InstuticionalLink, idx: number) => 
          <Link 
            key={idx} 
            to={link.href} 
            className={link.href === pathName ? `${styles["link--ativo"]} ${styles.link}` : `${styles.link}`}
          >
            {link.label}
          </Link>
        )}
      </NavContainer>
    </ScopedStyledComponent>
  )
}

export default InstitucionalNav

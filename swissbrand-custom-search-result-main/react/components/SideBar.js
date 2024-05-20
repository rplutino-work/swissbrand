import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import OutsideClickHandler from 'react-outside-click-handler'
import Animation from 'vtex.store-components/Animation'
import classNames from 'classnames'

import searchResult from '../searchResult.css'

const OPEN_SIDEBAR_CLASS = 'overflow-hidden'

/* SideBar component */
class Sidebar extends Component {
  updateComponent() {
    if (this.props.isOpen) {
      document.body.classList.add(OPEN_SIDEBAR_CLASS)
    } else {
      document.body.classList.remove(OPEN_SIDEBAR_CLASS)
    }
  }

  componentDidMount() {
    this.updateComponent()
  }

  componentDidUpdate() {
    this.updateComponent()
  }

  componentWillUnmount() {
    document.body.classList.remove(OPEN_SIDEBAR_CLASS)
  }

  render() {
    const { isOpen, onOutsideClick } = this.props
    if (typeof document === 'undefined') {
      return null
    }
    const scrimClasses = classNames(
      'fixed dim bg-base--inverted top-0 z-9999 w-100 vh-100 o-40 left-0',
      {
        dn: !isOpen,
      }
    )

    return ReactDOM.createPortal(
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        <div
          style={{ willChange: 'opacity' }}
          className={scrimClasses}
          onClick={onOutsideClick}
        />
        <Animation
          className={classNames(
            `${searchResult.sidebar} w-auto-ns h-100 fixed top-0 right-0 z-9999 bg-base shadow-2 flex flex-column`,
            this.props.fullWidth ? 'w-100' : 'w-80'
          )}
          isActive={isOpen}
          type="drawerLeft"
        >
          {this.props.children}
        </Animation>
      </OutsideClickHandler>,
      document.body
    )
  }
}

Sidebar.propTypes = {
  /* Internationalization */
  intl: intlShape.isRequired,
  /* Set the sideBar visibility */
  isOpen: PropTypes.bool,
  /* Sidebar content */
  children: PropTypes.node,
  /* Function to be called when click in the close sidebar button or outside the sidebar */
  onOutsideClick: PropTypes.func,
  /* The SideBar will occupy the entire length of the window */
  fullWidth: PropTypes.bool,
}
export default injectIntl(Sidebar)

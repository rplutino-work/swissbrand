
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['FlexLayoutItem']

interface FlexLayoutItemProps {
  children: JSX.Element[]
}

const FlexLayoutItem = ({ children }: FlexLayoutItemProps) => {
  const handles = useCssHandles(CSS_HANDLES)
  
  const renderChildren = () => {
    if (children) {
      return children.map((child: React.ReactElement) => {
        return child
      })
    }

    return <></>
  }
  
  return (
    <div className={handles.FlexLayoutItem}>
      {renderChildren()}
    </div>
  )
}

export default FlexLayoutItem


import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['FlexLayoutChildren'] 


interface FlexLayoutProps {
  children: JSX.Element[]
}

const FlexLayout = (  {children}: FlexLayoutProps) =>{
  const { handles } = useCssHandles(CSS_HANDLES)
  
  const renderChildren = () => {
    if(children) {
      return children.map((child:React.ReactElement) => {
      return child})
    }

    return <></>
  }

  return (
    <div className={handles.FlexLayoutChildren}>
      {renderChildren()}
    </div>
  )
}

export default FlexLayout

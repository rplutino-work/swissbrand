import React, { useEffect } from "react"

const ShelfTabs: StorefrontFunctionComponent = (props:any) => {
    const children:[] = props.children ? props.children as any : []; 
    const objCategory:any = {
      "first-tab": ".vtex-flex-layout-0-x-flexRow--futbol-row",
      "second-tab": ".vtex-flex-layout-0-x-flexRow--running-row",
      "third-tab": ".vtex-flex-layout-0-x-flexRow--swimming-row",
      "fourth-tab": ".vtex-flex-layout-0-x-flexRow--training-row",
      "fifth-tab": ".vtex-flex-layout-0-x-flexRow--tenis-row",
      "sixth-tab": ".vtex-flex-layout-0-x-flexRow--hockey-row"
    }
    
    useEffect(() => {
      if(typeof window !== undefined) {
        window.document.querySelectorAll(".vtex-flex-layout-0-x-flexRow--encontralo-item").forEach((link:any, i:number) => {
          link.addEventListener("click", (event:any) => {
            event.preventDefault();
            
            const clicked = props.menuOrder[i];
            window.document.querySelectorAll(".vtex-flex-layout-0-x-flexRow--shelf-toggle").forEach((el:any) => {
              el.style.display = 'none';
            })

            window.document.querySelector(objCategory[clicked]).style.display = 'flex';
            window.document.querySelectorAll(".vtex-flex-layout-0-x-flexRowContent--encontralo-wrapper .vtex-flex-layout-0-x-flexRow--encontralo-item").forEach((elem:any) => {
            
              const lowerCaseClicked = clicked.toLowerCase()

              if(elem.className.split(' ').indexOf( `skf.skf-custom-0-x-activeTab` ) > -1){
                elem.classList.remove('skf.skf-custom-0-x-activeTab')
              }
              if(elem.className.split(' ').indexOf( `vtex-flex-layout-0-x-flexRow--encontralo-item--${lowerCaseClicked}` ) > -1){
                elem.classList.add('skf.skf-custom-0-x-activeTab')
              }
            
            })
          })
        })
      }
  
    }, [])

    

    return <>{children.map((child) => child)} </> 
}

export default ShelfTabs
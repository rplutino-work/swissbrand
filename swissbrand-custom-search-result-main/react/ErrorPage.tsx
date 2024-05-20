import React from 'react'
import { useRuntime } from 'vtex.render-runtime'

const ErrorPage: StorefrontFunctionComponent = () => {
    const runtime = useRuntime()
    const term = runtime?.query?._q

  

        if(term){
          return (
            <>
              <div className={`vtex-flex-layout-0-x-ProductErrorPage--wrapper`}>
              <h1 className={`vtex-store-components-3-x-ProductErrorPage--title`}>Su búsqueda de "{term}" no arrojó ningún resultado.</h1>
              <p className={`vtex-store-components-3-x-ProductErrorPage--subtitle`}>Compruebe los términos introducidos. Intenta utilizar una sola palabra. Utilice términos genéricos en la búsqueda. Busque utilizar sinónimos al término deseado.</p>
              <p className={`vtex-store-components-3-x-ProductErrorPage--text`}>Tambien podés visiar alguno de los productos recomendados</p>
            </div>
            </>
          )
        }

        return (
          <>
            <div className={`vtex-flex-layout-0-x-PageErrorPage--wrapper`}>
            <h1 className={`vtex-store-components-3-x-PageErrorPage--title`}>¡Perdón!, no sabemos lo que pasó.</h1>
            <p className={`vtex-store-components-3-x-PageErrorPage--text`}>La página que estás buscando no la encontramos. ¡Pero no te vayas! Te recomendamos algunos productos</p>
          </div>
          </>
        ) 
}

export default ErrorPage

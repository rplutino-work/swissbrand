import React from 'react'
import { useRuntime } from 'vtex.render-runtime'

import ScopedStyledComponent from './components/ScopedStyledComponent'
import { Title, Subtitle, Description, Button } from './styles/error-page'

const ErrorPage: StorefrontFunctionComponent = () => {
    const runtime = useRuntime()
    const term = runtime?.query?._q

    let title = term 
        ? <Title>Su búsqueda de "{term}" no arrojó ningún resultado.</Title> 
        : <Title>Su búsqueda no arrojó ningún resultado.</Title>

    return (
      <ScopedStyledComponent COMPONENT_SCOPED_NAME="errorPage">
        <>
          {title}
          <Subtitle>¿Que hago?</Subtitle>

          <Description>
              <span> Compruebe los términos introducidos.</span>
              <span>Intenta utilizar una sola palabra.</span>
              <span>Utilice términos genéricos en la búsqueda.</span>
              <span>Busque utilizar sinónimos al término deseado.</span>
          </Description>

          <Button to={"/"}>
              VOLVER
          </Button>
        </>
      </ScopedStyledComponent>
    )
}

export default ErrorPage

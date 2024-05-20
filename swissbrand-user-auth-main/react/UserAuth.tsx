import React from 'react'
import {
  ExtensionPoint,
  Session
} from 'vtex.render-runtime'

import useSessionResponse from './hook/useSessionResponse'

const UserAuth: StorefrontFunctionComponent<UserAuthProps> = () => {
  const sessionResponse = useSessionResponse()
  if(sessionResponse) {
    const isAuthenticated = (sessionResponse as Session).namespaces?.profile?.isAuthenticated
    
    if(isAuthenticated.value === "true"){
    
      return (
        <>
        <ExtensionPoint id="user-auth-content" />
        </>
      )
    }
  }
  
  
  return (
    <> 
    <ExtensionPoint id="user-auth-fallback" />
    </>
  )
}

interface UserAuthProps {}

export default UserAuth

import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginScreen from '../screens/LoginScreen'

const ProtectedRoutes = ({userInfo}) => {

  return(userInfo ? <Outlet /> : <LoginScreen/>)
  // return(userInfo ? <Outlet /> : <Navigate to='cart' replace state={{from: location}} /> )
}

export default ProtectedRoutes
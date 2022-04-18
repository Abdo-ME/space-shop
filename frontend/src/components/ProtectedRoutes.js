import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoginScreen from '../screens/LoginScreen'

const ProtectedRoutes = ({userInfo}) => {
  const location = useLocation()

  return(userInfo ? <Outlet /> : <LoginScreen/>)
  // return(userInfo ? <Outlet /> : <Navigate to='cart' replace state={{from: location}} /> )
}

export default ProtectedRoutes
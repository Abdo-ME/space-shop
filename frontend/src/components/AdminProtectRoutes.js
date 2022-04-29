import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtecteRoutes = ({userInfo}) => {

  return(userInfo.isAdmin ? <Outlet /> :<Navigate to='/'/> )
}

export default AdminProtecteRoutes
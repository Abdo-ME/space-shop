import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Footer from './components/Footer'
import Header from './components/Header'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import UserListScreen from './screens/UserListScreen';
import AdminProtecteRoutes from './components/AdminProtectRoutes';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';


const App = () => {
  const userLogin = useSelector(state=>state.userLogin)
  const { userInfo } = userLogin
  
  return (
    <BrowserRouter>
      <Header />
      
          <main className='py-3'>
          <Container>
      <Routes>
        <Route path='/'>
            <Route index element ={<HomeScreen/>}/>
            <Route path='product/:id' element ={<ProductScreen/>}/>
            <Route path='cart' element={<CartScreen />}>
              <Route path=':id' element={<CartScreen />} />
              </Route>
              {/* Admin Protected Routes */}
              <Route element={<AdminProtecteRoutes userInfo={userInfo} />}>
              <Route path='admin/userlist' element={<UserListScreen/>} />
              <Route path='admin/users/:id/edit' element={<UserEditScreen/>} />
              <Route path='admin/productlist' element={<ProductListScreen/>} />
              <Route path='admin/product/:id/edit' element={<ProductEditScreen/>} />
              </Route>
              {/* Protected Routes */}
            <Route element={<ProtectedRoutes userInfo={userInfo} />}>
                <Route path='login' element={<LoginScreen />} />
                <Route path='profile' element={<ProfileScreen/>} />
                <Route path='shipping' element={<ShippingScreen/>} />
                <Route path='payment' element={<PaymentScreen />} />
                <Route path='place_order' element={<PlaceOrderScreen />} />
                <Route path='orders/:id' element={<OrderDetailsScreen />} />
            </Route>
            <Route path='register' element ={<RegisterScreen/>}/>
        </Route>
      </Routes>
            </Container>
          </main>
        <Footer/>
    </BrowserRouter>
  )
}

export default App

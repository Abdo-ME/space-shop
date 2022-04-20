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
import Profile from './screens/Profile';


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
            <Route path='cart' element ={<CartScreen/>}/>
              <Route path='cart/:id' element={<CartScreen />} />
              {/* Protected Routes */}
              <Route element={<ProtectedRoutes userInfo={userInfo} />}>
                <Route path='login' element={<LoginScreen />} />
                <Route path='profile' element={<Profile/>} />
                
              </Route>
            {/* <Route path='login' element ={ <LoginScreen/>}/> */}
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

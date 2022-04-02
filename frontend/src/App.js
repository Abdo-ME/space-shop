import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Footer from './components/Footer'
import Header from './components/Header'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';

const App = () => {
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
            <Route path='login' element ={<SigninScreen/>}/>
        </Route>
      </Routes>
            </Container>
          </main>
        <Footer/>
    </BrowserRouter>
  )
}

export default App

import React, {  useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Form, Button,Col} from "react-bootstrap"
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from "react-redux"
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


const PlaceOrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const {shippingAddress}=cart
    

  
    
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch()
    navigate('/place_order')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Place Order </h1>
      <Form onSubmit={submitHandler}>
         
        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PlaceOrderScreen 

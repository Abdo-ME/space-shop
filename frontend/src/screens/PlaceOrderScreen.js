import React, {  useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'


const PlaceOrderScreen = () => {
  const navigate = useNavigate()
 const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const orderCreate = useSelector(state => state.cart)
  const { order, success, error } = orderCreate
  useEffect(() => {
    if (success) navigate(`/order/${order._id}`)
  },{navigate,success})
  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod : cart.paymentMethod,
      itemsPrice : cart.itemsPrice,
      shippingPrice : cart.shippingPrice,
      taxPrice : cart.taxPrice,
      totalPrice : cart.totalPrice,
    }))
  }
  // calculate prices
  const addDicimal = (num) => {
    return((num*100)/100).toFixed(2)
  }
  cart.itemsPrice = addDicimal(cart.cartItems.reduce(
    (acc,item)=>acc+item.price*item.qty,0
  ))
  cart.shippingPrice = addDicimal(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDicimal(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice =addDicimal(Number(cart.itemsPrice)+Number(cart.shippingPrice)+ Number(cart.taxPrice))
  
  return (
    <>
    <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>shipping</h2>
              <p>
                <span  style={{fontSize:'20px', color:'red',fontWeight: 'bold'}} >Address: </span>
                {cart.shippingAddress.address} , {cart.shippingAddress.city} {cart.shippingAddress.postalCode} ,{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <span  style={{fontSize:'20px', color:'red',fontWeight: 'bold'}} >Method: </span>
                {cart.paymentMethod} 
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ?
                (<Message>Your Cart is Empty</Message>) :
                (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} alt={item.name}
                            fluid rounded/>
                          </Col>
                          <Col>
                            <Link to={`/product/${item._id}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x {item.price} = ${(item.qty*item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${ cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${ cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${ cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${ cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{ error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cart.cartItems.length === 0} 
                onClick={placeOrderHandler}> Place Order</Button>
              </ListGroup.Item>

            </ListGroup>

          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen 

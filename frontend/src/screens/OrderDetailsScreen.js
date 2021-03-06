import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import {PayPalButton} from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder,deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../actions/types'


const OrederDetailsScreen = () => {
  
  const orderId = useParams().id
  const [sdkReady,setSdkReady]= useState(false)
  const navigate = useNavigate()
 const dispatch = useDispatch()
  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails
  const orderPay = useSelector(state => state.orderPay)
  const { success:successPay, loading:loadingPay } = orderPay
  const orderDeliver = useSelector(state => state.orderDeliver)
  const { success:successDeliver, loading:loadingDeliver } = orderDeliver
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo } = userLogin
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal')
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
        
      }
      
      if (!order || successPay|| successDeliver) {
        dispatch({type: ORDER_PAY_RESET})
        dispatch({type: ORDER_DELIVER_RESET})
        dispatch(getOrderDetails(orderId))
      } else if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript()
        } else {
          setSdkReady(true)
        }
      }
    }
    
  },[navigate,dispatch,orderId,order,successPay,successDeliver,userInfo])
  
    // calculate prices
  if (!loading) {
    const addDicimal = (num) => {
      return((num*100)/100).toFixed(2)
    }
    order.itemsPrice = addDicimal(order.orderItems.reduce(
      (acc,item)=>acc+item.price*item.qty,0
    ))
    order.shippingPrice = addDicimal(order.itemsPrice > 100 ? 0 : 100)
    
  }
  const successPaymentHandler = (paymentResult) => {
    
    dispatch(payOrder(orderId,paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId))
  }
  return (
    loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> :<>
    <h1>Order {order._id} </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>shipping</h2>
              <p>
              <span style={{ fontSize: '20px', color: 'red', fontWeight: 'bold' }} >Name: </span> 
              {order.user.name}
              </p>
              <p>
              <span style={{ fontSize: '20px', color: 'red', fontWeight: 'bold' }} >Email: </span> 
                <a href={`mailto:${order.user.email}`} >
                {order.user.email}
                </a>
              </p>
               
             
              <p>
                <span  style={{fontSize:'20px', color:'red',fontWeight: 'bold'}} >Address: </span>
                {order.shippingAddress.address} , {order.shippingAddress.city} {order.shippingAddress.postalCode} ,{order.shippingAddress.country}
              </p>
              {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt} </Message> :
              <Message variant='danger'>Not Delivered</Message>}

            </ListGroup.Item>
            
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <span  style={{fontSize:'20px', color:'red',fontWeight: 'bold'}} >Method: </span>
                {order.paymentMethod} 
              </p>
              {order.isPaid ? <Message variant='success'>Paid on: {order.paidAt} </Message> :
              <Message variant='danger'>Not Paid</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ?
                (<Message>Order is Empty</Message>) :
                (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
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

        
        <Col md={4} >
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
                  <Col>${ order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${ order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${ order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${ order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? <Loader /> : (
                    <PayPalButton amount={order.taxPrice } onSuccess={successPaymentHandler} />
                  )}
                </ListGroup.Item>
              )}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                  {loadingDeliver && <Loader />}
                  <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                    Mark As Deliver
                  </Button>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                
              </ListGroup.Item>

            </ListGroup>

          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrederDetailsScreen 

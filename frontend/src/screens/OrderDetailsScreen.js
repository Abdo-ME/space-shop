import React, {  useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getOrderDetails } from '../actions/orderActions'


const OrederDetailsScreen = () => {
  
  const orderId= useParams().id
  const navigate = useNavigate()
 const dispatch = useDispatch()
  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails
  useEffect(() => {
  dispatch(getOrderDetails(orderId))
  },[navigate,dispatch,orderId])
  
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
              {order.isPaid ? <Message variant='success'>Paid on {order.paidAt} </Message> :
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

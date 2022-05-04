import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {Button, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

import {getOrderList} from '../actions/orderActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate, useParams } from 'react-router-dom'


const OrderListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
   
    const orderList = useSelector(state => state.orderList)
    const {orders, error, loading,success} = orderList
    
    useEffect(() => {
        // if (success) {
          
        // } else {
            
        // }
        dispatch(getOrderList())
    }, [dispatch])
   


return (
    <>
        <h1>Order List</h1>
         
         {/* {successDelete&&<Message variant='success'>Product Deleted</Message>} */}
         {/* {loading&&<Loader/>} */}
         {/* {error&&<Message variant='danger'>{error} </Message>} */}
        
        {loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> : (

            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Total Price</th>
                    <th>Order Time</th>
                    <th>Is Paid</th>
                    <th>Is Delivered</th>
                    <th></th>
                        </tr>
                </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id} </td>
                                <td>{order.user.name} </td>
                                <td>${order.totalPrice} </td>
                                <td>{order.createdAt.slice(0, 10).replace(/-/g, "/")}</td>
                                <td>{order.isPaid?(<span style={{color:'green'}}>Order Paid</span>) :(<span style={{color:'red'}}>Not Paid</span>)}</td>
                                <td>{order.isDelivered?(<span style={{color:'green'}}>Delivered </span>) :(<span style={{color:'red'}}>Not Delivered</span>)}</td>
                                <td>
                                <LinkContainer to={`/orders/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                </LinkContainer>
                                </td>
                                
                                {/* <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                   
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                
            </Table>
        ) }
    </>
)
}

export default OrderListScreen




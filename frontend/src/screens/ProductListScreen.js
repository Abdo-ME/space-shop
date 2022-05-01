import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {Button, Table,Row,Col } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

import {deleteProduct, listProducts,createProductAction} from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate, useParams } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../actions/types'


const ProductListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const productDelete = useSelector(state => state.productDelete)
    const {success:successDelete,error:deleteError} = productDelete
   
    const productList = useSelector(state => state.productList)
    const {products, error, loading} = productList
    const createProduct = useSelector(state => state.createProduct)
    const {product:createdProduct, error:errorCreate, loading: loadingCreate,success: successCreate} = createProduct
    useEffect(() => {
        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
            dispatch({ type: PRODUCT_CREATE_RESET })
        } else {
            dispatch(listProducts())
        }
    }, [dispatch,createdProduct,navigate,successCreate,successDelete])
   
//   Create Product
    const createProductHandler = () => {
        dispatch(createProductAction())
    }
//   Delete Product
    const deleteHandler = (id) => {
        if ((window.confirm('are you sure to delete this Product'))) {
            dispatch(deleteProduct(id))
        }
      
    }
return (
    <>
        <Row className='align-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>      
         {successDelete&&<Message variant='success'>Product Deleted</Message>}
         {deleteError&&<Message variant='danger'>{deleteError} </Message>}
         {loadingCreate&&<Loader/>}
         {errorCreate&&<Message variant='danger'>{errorCreate} </Message>}
        
        {loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> : (

            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                        <th></th>
                        </tr>
                </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id} </td>
                                <td>{product.name} </td>
                                <td>${product.price} </td>
                                <td>
                                {product.category}
                                </td>
                                <td>{product.brand}</td>
                                
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                
            </Table>
        ) }
    </>
)
}

export default ProductListScreen




import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails} from '../actions/productActions'


const ProductEditScreen = () => {
    const productId = useParams().id
    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState('')
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState('')
    
    const dispatch = useDispatch()
    const productDetailes = useSelector(state=>state.productDetailes)
    const { loading, error, product } = productDetailes
    const navigate = useNavigate()
    

    useEffect(() => {
        if (!product.name || product?._id !== productId) {
            
            dispatch(listProductDetails(productId))
        }
        else {
            setName(product.name)
            setPrice(product.price)
            setBrand(product.brand)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            
        }

  }, [dispatch,product,productId,navigate])
  
  const handleSubmit = (e) => {
    e.preventDefault()
   //update product
    
  }

  return (
      <>
          <Link to='/admin/productList' className='btn btn-light my-3'>
              Go Back
          </Link>
    <FormContainer>
             <h1>Edit Product</h1>
       
              {loading ? <Loader /> : error ? <Message variant="danger" >{error} </Message> : (
        <Form onSubmit={handleSubmit}>
           
            <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text'
                placeholder='Enter Your Name'
                value={name}
                onChange={e => setName(e.target.value)}
            ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control type='number'
                placeholder='Enter price'
                value={price}
                onChange={e => setPrice(e.target.value)}
            ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='text'
                placeholder='Enter image Url'
                value={image}
                onChange={e => setImage(e.target.value)}
            ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control type='text'
                placeholder='Enter brand '
                value={brand}
                onChange={e => setBrand(e.target.value)}
            ></Form.Control>
            </Form.Group>
            

            <Form.Group controlId='countInStock'>
            <Form.Label>Count InStock</Form.Label>
            <Form.Control type='number'
                placeholder='Enter CountInStock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
            ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control type='text'
                placeholder='Enter category '
                value={category}
                onChange={e => setCategory(e.target.value)}
            ></Form.Control>
            </Form.Group>
            

            <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text'
                placeholder='Enter description '
                value={description}
                onChange={e => setDescription(e.target.value)}
            ></Form.Control>
            </Form.Group>
           
            <Button type="submit" varient='primary'>
            Update
            </Button>
        </Form>
        )}
      
      </FormContainer>
      </>

    
  )
}

export default ProductEditScreen






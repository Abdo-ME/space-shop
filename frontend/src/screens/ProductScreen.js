import React, { useEffect,useState} from 'react'
import { useParams,useNavigate  } from 'react-router-dom'
import { Link } from "react-router-dom";
import { Col, Row,ListGroup,Image,Button,Form } from 'react-bootstrap'
import Rating from "../components/Rating"
import { useDispatch,useSelector } from "react-redux";
import {listProductDetails,createProductReviewAction} from '../actions/productActions'
import {addToCartItem} from '../actions/cartActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../actions/types';


const ProductScreen = () => {
  const [qty,setQty]= useState(1)
  const [rating,setRating]= useState(0)
  const [comment,setComment]= useState('')
  const Id = useParams().id
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const productDetaile = useSelector(state => state.productDetailes)
  const { product, error, loading } = productDetaile;
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {  error:errorProductReview, success: successProductReview } = productReviewCreate;
  useEffect(() => {
    if (successProductReview) {
      alert("Review Submited")
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
      dispatch(listProductDetails(Id))
    },[dispatch,Id,successProductReview])

  
  // ADD Products To Cart
  const AddToCartHandler=() => {
    dispatch(addToCartItem(product, qty))
    navigate(`/cart/${Id}?qty=${qty}`)
  }
  // Add a Review
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReviewAction(Id,{rating,comment}))
  }
  return (
    <>
      <Link to='/' className='btn btn-light my-3' >GO Back</Link>
      
      {
        loading ?
          <Loader />
          : error ? <Message variant='danger' >{error}</Message> :
            (
              <>
                <Row>
                  <Col lg={6} md={12} sm={12} className="mb-5" >
                    <Image src={product.image} alt={product.name} fluid/>
                  </Col>
                  <Col lg={3} md={6}  sm={8}>
                    <ListGroup variant='flush' >
                      <ListGroup.Item> <h3>{product.name}</h3> </ListGroup.Item>
                      {console.log(product.numReviews)}
                      <ListGroup.Item> <Rating value={product.rating} text={`${product.numReviews} reviews`} /> </ListGroup.Item>
                      <ListGroup.Item>Price: ${product.price} </ListGroup.Item>
                      <ListGroup.Item>
                        <span>
                          Description:{product.description}
                        </span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col lg={3} md={6}  sm={4} >
                    <ListGroup>
                      <ListGroup.Item>
                        <Row>
                          <Col md={6}>
                            Price:
                          </Col>
                          <Col md={6}>
                            ${product.price}
                          </Col> 
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col md={6}>
                            Status:
                          </Col>
                          <Col md={6}>
                            {product.countInStock > 0 ?
                              "In Stock" : "Out od Stock"}
                          </Col> 
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {product.countInStock > 0 && (
                          <Row>
                            <Col>QTY: </Col>
                            <Col>
                                <Form>
                                  <Form.Group >
                                    <Form.Control value={qty} min={1} max={product.countInStock} type="number" placeholder="1" onChange={(e) => setQty(e.target.value)} />
                                  </Form.Group>
                                </Form>
                            </Col>
                          </Row>
                        )}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button
                          className="btn-block"
                          type="button"
                          disabled={product.countInStock === 0}
                          onClick={AddToCartHandler}
                        >ADD TO CART</Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message >No Reviews</Message> }
                    <ListGroup variant='flush'>
                      {product.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                          <span style={{color:"rgb(69 37 248)"}}>{review.name}</span>
                          <Rating value={review.rating} text="" />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment} </p>
                        </ListGroup.Item>
                      ))}
                      <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        {errorProductReview && <Message variant='danger'>{ errorProductReview } </Message> }
                        {userInfo ?
                          (
                            <Form onSubmit={submitHandler}>
                              <Form.Group controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control as='select' value={rating} onChange={e => setRating(e.target.value)}>
                                  <option value=''>Select...</option>
                                  <option value='1'>1 - Poor </option>
                                  <option value='2'>2 - Fair </option>
                                  <option value='3'>3 - Good </option>
                                  <option value='4'>4 - Very Good </option>
                                  <option value='5'>5 - Exelent </option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control as='textarea' row='5' value={comment} onChange={e=>setComment(e.target.value) }></Form.Control>
                              </Form.Group>
                              <Button type="submit" variant='primary'>
                                Submit
                              </Button>
                            </Form>
                          ) :
                          (<Message>Please <Link to='/login' className='strong' >sign in</Link> to write a review </Message>)
                        }
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </>
            )
      }
    </>
  )
}

export default ProductScreen

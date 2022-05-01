import React, { useEffect,useState} from 'react'
import { useParams,useNavigate  } from 'react-router-dom'
import { Link } from "react-router-dom";
import { Col, Row,ListGroup,Image,Button,Form } from 'react-bootstrap'
import Rating from "../components/Rating"
import { useDispatch,useSelector } from "react-redux";
import {listProductDetails} from '../actions/productActions'
import {addToCartItem} from '../actions/cartActions'
import Loader from '../components/Loader';
import Message from '../components/Message';


const ProductScreen = () => {
  const [qty,setQty]= useState(1)
  const Id = useParams().id
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const productDetaile = useSelector(state => state.productDetailes)
  const { product, error, loading } = productDetaile;
  useEffect(() => {
      dispatch(listProductDetails(Id))
    },[dispatch,Id])

  
  // ADD Products To Cart
  const AddToCartHandler=() => {
    dispatch(addToCartItem(product, qty))
    navigate(`/cart/${Id}?qty=${qty}`)
  }
  
  return (
    <>
      <Link to='/' className='btn btn-light my-3' >GO Back</Link>
      
      {loading
            ? <Loader/>
            : error ? <Message variant='danger' >{error}</Message>
            :<Row >
        <Col lg={6} md={12} sm={12}  className="mb-5" >
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col lg={3} md={6} sm={8}>
        <ListGroup variant='flush' >
          <ListGroup.Item> <h3>{product.name}</h3> </ListGroup.Item>
          <ListGroup.Item> <Rating value={product.rating} text={`${product.numReviews} reviews` }/> </ListGroup.Item>
          <ListGroup.Item>Price: ${product.price} </ListGroup.Item>
            <ListGroup.Item>
              <span>
                Description:{product.description}
              </span>
            </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col lg={3}  md={6} sm={4} >
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
                        {/* <Form.Control as="select" onChange={(e)=>setQty(e.target.value)}>
                          {
                            [...Array(product.countInStock).keys()].map(x => (
                              <option key={x+1} value={x+1}>
                                {x+1}
                              </option>
                            ))
                          }
            
                        </Form.Control> */}

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
      </Row>}
    </>
  )
}

export default ProductScreen

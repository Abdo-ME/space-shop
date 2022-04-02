import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import { Col, Row,ListGroup,Image,Card,Button } from 'react-bootstrap'
import Rating from "../components/Rating"
import products from '../products'

const ProductScreen = () => {
  const idParam = useParams().id
  const product = products.find(product=>product._id ===idParam)
  console.log(product,idParam);
  return (
    <>
      <Link to='/' className='btn btn-light my-3' >GO Back</Link>
      <Row >
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
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
        <Col md={3}>
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
                    "In Stock":"Out od Stock"}                </Col> 
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="btn-block"
                type="button"
                disabled={product.countInStock === 0}
              >ADD TO CART</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
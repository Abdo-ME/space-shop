
import {useNavigate  } from 'react-router-dom'
import { Link } from "react-router-dom";
import { Col, Row,ListGroup,Image,Button,Form,Card } from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import {addToCartItem, removeFromCartItem} from '../actions/cartActions'
import Message from '../components/Message';
  
const CartScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector(state => state.cart)
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo } = userLogin
 

  const removeFromCartHandler = (id) => {
   dispatch(removeFromCartItem(id))
  }
  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login')
    } else {
      navigate('/shipping')
    }
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {
          cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty <Link to='/'>Go Back Home</Link>
            </Message>
          ) : (
              <ListGroup variant='flush' >
                {cartItems.map(item => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={3}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item._id}`}>{item.name }</Link>
                      </Col>
                      <Col md={2}> ${item.price}</Col>
                      <Col md={2}>
                        <Form>
                          <Form.Group >
                            <Form.Control value={item.qty} min={1} max={item.countInStock} type="number"  onChange={(e) => dispatch(addToCartItem(item,e.target.value))} />
                          </Form.Group>
                        </Form>
                      </Col>
                      <Col md={2} >
                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)}>
                        <i  className='fas fa-trash text-danger'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
          )
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) ITEMS
              </h2>
              ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      
      </Col>
    </Row>
  )
}

export default CartScreen
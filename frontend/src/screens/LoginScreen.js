import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'


const LoginScreen = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector(state=>state.userLogin)
  const { loading, error, userInfo } = userLogin
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) { navigate(-1) }
  }, [userInfo,navigate])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password)) 

   
  }

  return (
   
    <FormContainer>
      <h1>Sign In</h1>
        {error && <Message variant="danger" >{error} </Message>}
        {loading && <Loader />}  
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email'
            placeholder='Enter email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password Address</Form.Label>
          <Form.Control type='password'
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" varient='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        New Customer?
        <Link to={'/register'}>
        {/* <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}> */}
        Register
        </Link>
      </Row>
      </FormContainer>
      )
    

  
}

export default LoginScreen
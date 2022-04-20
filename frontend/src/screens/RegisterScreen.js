
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from '../components/Message'
import Loader from '../components/Loader'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'


const RegisterScreen = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [message,setMessage] = useState('')
  const dispatch = useDispatch()
  const userRegister = useSelector(state=>state.userRegister)
  const { loading, error, userInfo } = userRegister
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) { navigate('/') }   
  }, [userInfo,navigate])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(register(name,email, password)) 
    }
    
  }

  return (

    <FormContainer>
             <h1>Sign Up</h1>
        {message && <Message variant="danger" >{message} </Message>}
        {error && <Message variant="danger" >{error} </Message>}
        {loading && <Loader />} 
          <Form onSubmit={handleSubmit}>
           
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text'
            placeholder='Enter Your Name'
            value={name}
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email'
            placeholder='Enter email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password'
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirm password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" varient='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        Have an account?
        <Link to={'/register'}>
         Login
        </Link>
      </Row>
      </FormContainer>
    

  )
}

export default RegisterScreen

// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from "react-router-dom"
// import { Form, Button, Row } from "react-bootstrap"
// import { useDispatch, useSelector } from "react-redux"
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import {register} from '../actions/userActions'
// import FormContainer from '../components/FormContainer'


// const RegisterScreen = () => {
//   const [name,setName] = useState('')
//   const [email,setEmail] = useState('')
//   const [password,setPassword] = useState('')
//   const dispatch = useDispatch()
//   const userLogin = useSelector(state=>state.userLogin)
//   const { loading, error, userInfo } = userLogin
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (userInfo) { navigate(-1) }
  
    
//   }, [userInfo, navigate,error])
  
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     dispatch(register(name,email, password)) 
//   }
//   // console.log(error)
//   return (
//     <>
//     {loading ? <Loader /> : (
//     <FormContainer>
//             { <Message variant="danger" >{error&&error } </Message>
//             }
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId='name'>
//               <Form.Label>Name</Form.Label>
//               <Form.Control type='text'
//                 placeholder='Enter Your Name'
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Form.Group controlId='email'>
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control type='email'
//                 placeholder='Enter email'
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Form.Group controlId='password'>
//               <Form.Label>Password</Form.Label>
//               <Form.Control type='password'
//                 placeholder='Enter password'
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Button type="submit" varient='primary'>
//               Register
//             </Button>
//       </Form>
//       <Row className='py-3'>
//         You have an Acount?
//         <Link to={'/login'}>
//         Login
//         </Link>
//       </Row>
//       </FormContainer>
//       )}
//     </>

//   )
// }

// export default RegisterScreen



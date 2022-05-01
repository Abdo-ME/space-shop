
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {getUserDetails,updateUser} from '../actions/userActions'
import { USER_UPDATE_RESET } from '../actions/types'


const UserEditScreen = () => {
    const navigate = useNavigate()
    const userId = useParams().id
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [isAdmin,setIsAdmin] = useState(false)
  const dispatch = useDispatch()
  const userDetails = useSelector(state=>state.userDetails)
    const { loading, error, user } = userDetails
    const userUpdate = useSelector(state => state.userUpdate)
    const {success:succsessUpdate,loading:loadingUpdate, error:errorUpdate} = userUpdate
   
    

    useEffect(() => {
        if (succsessUpdate) {
                
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        } else {
            
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            }
            else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

  }, [dispatch,user,userId,succsessUpdate,navigate])
  
  const handleSubmit = (e) => {
    e.preventDefault()
   dispatch(updateUser({_id:userId,name,email,isAdmin}))
    
  }

  return (
      <>
          <Link to='/admin/userList' className='btn btn-light my-3'>
              Go Back
          </Link>
    <FormContainer>
             <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant="danger" >{errorUpdate} </Message>}
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
            <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isadmin'>
            <Form.Check type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
            ></Form.Check>
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

export default UserEditScreen



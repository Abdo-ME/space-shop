import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {Button, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

import { deleteUser, listUsers } from '../actions/userActions'
import Loader from '../components/Loader';
import Message from '../components/Message';


const UserListScreen = () => {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList)
    const {users, error, loading} = userList
    const userDelete = useSelector(state => state.userDelete)
    const {success:successDelete,error:deleteError} = userDelete
    
    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch,successDelete])
    const deleteHandler = (id) => {
        if ((window.confirm('are you sure to delete user'))) {
            dispatch(deleteUser(id))
        }
      
    }
return (
    <>
        <h1>Users</h1>
        {successDelete&&<Message variant='success'>User Deleted</Message>}
        {deleteError&&<Message variant='danger'>{deleteError} </Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> : (

            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>ADMIN</th>
                        <th></th>
                        </tr>
                </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id} </td>
                                <td>{user.name} </td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a> </td>
                                <td>{user.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) : (
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )} </td>
                                <td>
                                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen

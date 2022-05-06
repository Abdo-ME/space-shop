import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
const SearchBox = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
    const [filter, setFilter] = useState('name')
    const submitHandler= (e)=> {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}/${filter}`)
            // setKeyword('')
           
        } else {
            navigate('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={ (e)=>setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-2 '
             
            ></Form.Control>
             <Form.Check
                inline
                label="product"
                name="filter"
                type='radio'
                id='name'
                value="name"
                style={{color:'white'}}
                onChange={ (e)=>setFilter(e.target.value)}
            />
             <Form.Check
                inline
                label="Category"
                name="filter"
                type='radio'
                id='category'
                value="category"
                style={{color:'white'}}
                onChange={ (e)=>setFilter(e.target.value)}
            />
            <Button type='submit' variant='outline-success' className='p-2' >
                Search
            </Button>
        </Form>
    )
}
export default SearchBox;
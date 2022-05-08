import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch,useSelector } from "react-redux";
import {listProducts} from '../actions/productActions'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const keyword = useParams().keyword
    const filter = useParams().filter
    
    const pageNumber= useParams().pageNumber || 1
    const productList = useSelector(state => state.productList)
    const { products, loading, error,page,pages } = productList;
    useEffect(() => {
        dispatch(listProducts(keyword,filter,pageNumber))
    },[dispatch,keyword,filter,pageNumber])
return (
    <>
        <h1 className="text-center">Latest Products</h1>
        {loading
            ? <Loader/>
            : error ? <Message variant='danger' >{error}</Message>
                : (
                    <>
                        {!keyword && <ProductCarousel />}
                        <Row>
                            {products.map(product => {
                                return (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product }/>
                                    </Col>
                                )
                            })}
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword?keyword:''} filter={filter?filter:''}/>
                    </>
                )
        }
        
    </>
)
}

export default HomeScreen

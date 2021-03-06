import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILES_SUCCESS, PRODUCT_DETAILES_FAIL, PRODUCT_DETAILES_REQUEST,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_SUCCESS,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL
} from './types'
export const listProducts = (keyword ='',filter='name',pageNumber='') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const {data} = await axios.get(`/api/products?keyword=${keyword}&filter=${filter}&pageNumber=${pageNumber}`
        )
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message
        })
        
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    
    try {
        dispatch({type: PRODUCT_DETAILES_REQUEST})
        const product = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILES_SUCCESS,
            payload : product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch,getState) => {
    
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })
        const { token } = getState().userLogin.userInfo
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        await axios.delete(`/api/products/${id}`,
        config)
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
       
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message
        })
    }
}
export const createProductAction = () => async (dispatch,getState) => {
    
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })
        const { token } = getState().userLogin.userInfo
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
        }
        // console.log(token)
        const {data}  = await axios.post(`/api/products`,
           {},
            config)
        
        
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
       
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message
        })
    }
}
export const updateProduct = (product) => async (dispatch,getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })
        const { token } = getState().userLogin.userInfo
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
        }
        const {data}  = await axios.put(`/api/products/${product._id}`,
           product,
            config)
        
        
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
       
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message
        })
    }
}


export const createProductReviewAction = (productId,review) => async (dispatch,getState) => {
    
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
        const { token } = getState().userLogin.userInfo
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
        }
     await axios.post(`/api/products/${productId}/reviews`,
           review,
            config)
        
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })
       
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message
        })
    }
}

// get Top rated Action

export const listTopProducts = () => async (dispatch) => {
    
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })
      
    const {data}= await axios.get(`/api/products/top`)
        
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
       
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message
        })
    }
}
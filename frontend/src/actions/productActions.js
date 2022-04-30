import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILES_SUCCESS,PRODUCT_DETAILES_FAIL,PRODUCT_DETAILES_REQUEST, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_SUCCESS
} from './types'
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const data = await axios.get('/api/products')
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

export const productDetailes = (id) => async (dispatch) => {
    
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
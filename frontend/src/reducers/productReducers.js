import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILES_REQUEST,PRODUCT_DETAILES_SUCCESS,PRODUCT_DETAILES_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET
} from "../actions/types"



export const productListReducer = (state = { products: [],loading: false }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.data }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
        
    }
    
}
export const productDetailesReducer = (state = { product:{reviews:[],rating:0},loading: false }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILES_REQUEST:
            return {...state, loading: true }
        case PRODUCT_DETAILES_SUCCESS:
            return { loading: false, product: action.payload.data }
        case PRODUCT_DETAILES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
        
    }
    
}

export const productDeleteReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case  PRODUCT_DELETE_REQUEST:
            return { loading: true,  success: false }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
            // return { loading: false, success: true, message:action.payload }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
    
}
export const productCreateReducer = (state = { product:[],success: false }, action) => {
    switch (action.type) {
        case  PRODUCT_CREATE_REQUEST:
            return { loading: true,  success: false }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true,product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return { product:[] }
        
        default:
            return state
    }
    
}
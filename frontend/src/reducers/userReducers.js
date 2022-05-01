import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILES_REQUEST,
    USER_DETAILES_SUCCESS,
    USER_DETAILES_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILES_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET
} from '../actions/types.js'

const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null;
export const userLoginReducer = (state = {userInfo,loading:false,error:null}, action) => {
    switch (action.type) {
       
        case  USER_LOGIN_REQUEST:
            return { ...state,loading: true }
        case  USER_LOGIN_SUCCESS:
            return { ...state,loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { ...state,loading: false, error: action.payload }
        case USER_LOGOUT:
            return {...state,userInfo: null}
        default:
            return state
        
    }
    
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
       
        case  USER_REGISTER_REQUEST:
            return { ...state,loading: true }
        case  USER_REGISTER_SUCCESS:
            return { ...state,loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
        
    }
    
}
export const userDetailsReducer = (state = {user:{}}, action) => {
    switch (action.type) {
       
        case  USER_DETAILES_REQUEST:
            return { ...state,loading: true }
        case  USER_DETAILES_SUCCESS:
            return {...state, loading: false, user: action.payload }
        case USER_DETAILES_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILES_RESET:
            return { user:{}}
        default:
            return state
        
    }
    
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case  USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case  USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false,success:true, userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
    
}

export const userListReducer = (state = {users:[]}, action) => {
    switch (action.type) {
        case  USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { }
        default:
            return state
    }
    
}
export const userDeleteReducer = (state = { success: false}, action) => {
    switch (action.type) {
        case  USER_DELETE_REQUEST:
            return { loading: true,  success: false }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
            // return { loading: false, success: true, message:action.payload }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
    
}


export const userUpdateReducer = (state = {success:false,user:{}}, action) => {
    switch (action.type) {
       
        case  USER_UPDATE_REQUEST:
            return {loading: true }
        case  USER_UPDATE_SUCCESS:
            return {success:true, loading: false }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return { user:{}}
        default:
            return state
        
    }
    
}

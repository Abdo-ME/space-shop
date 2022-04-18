import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
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
            return { }
        
        default:
            return state
        
    }
    
}
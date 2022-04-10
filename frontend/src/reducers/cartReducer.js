import { CART_ADD_ITEM,CART_REMOVE_ITEM } from "../actions/types";
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
}


export const cartItermReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            return { ...state,cartItems: action.payload }
        
        case CART_REMOVE_ITEM:
            return { ...state,cartItems: action.payload }
        
        default:
            return state;
    }
}
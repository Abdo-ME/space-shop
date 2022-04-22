import { CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS } from "../actions/types";
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || {},
}


export const cartItermReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            return { ...state,cartItems: action.payload }
        
        case CART_REMOVE_ITEM:
            return { ...state,cartItems: action.payload }
        
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state,shippingAddress: action.payload }
        
        default:
            return state;
    }
}
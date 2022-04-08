import { CART_ADD_ITEM } from "../actions/types";
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
}


export const cartItermReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            return {cartItems:action.payload}
        default:
            return state;
    }
}
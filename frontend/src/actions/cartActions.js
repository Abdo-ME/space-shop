// import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "./types"

export const addToCartItem = (product, qty) =>  (dispatch, getState) => {
    const cartItemsClone = getState().cart.cartItems;
    
    try {
        const productClone =  {...product}
        const isExist = cartItemsClone.some(item => {
            return item._id === product._id
        })
        if (isExist) {
            const productFound= cartItemsClone.find(p=>p._id===product._id)
            productFound.qty =  +qty
        } else {
            productClone.qty= +qty
            cartItemsClone.push(productClone)
        }
        localStorage.setItem("cartItems",JSON.stringify(cartItemsClone))
        
        dispatch({
            type: CART_ADD_ITEM,
            payload: cartItemsClone
        })

    } catch (error) {
        console.log(error);
        
    }
}


//Remove a Product
export const removeFromCartItem = (id) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems;
    const newCartItems = cartItems.filter(p => id !== p._id)
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: newCartItems
    })
    localStorage.setItem('cartItems',JSON.stringify(newCartItems))
}

//Save Shipping Address
export const saveShippingAddress = (data) => (dispatch, getState) => {
   
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}

//Save Payment Method
export const savePaymentMethod = (data) => (dispatch, getState) => {
   
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod',JSON.stringify(data))
}
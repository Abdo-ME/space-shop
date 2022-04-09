import { CART_ADD_ITEM } from "./types"

export const addToCartItem = (product, qty) => async (dispatch, getState) => {
    const cartItemsClone =   getState().cart.cartItems;
    
    try {
        const productClone =  {...product}
    
        const isExist = cartItemsClone.some(item => {
            return item._id === product._id
        })
        if (isExist) {
            const productFound= cartItemsClone.find(p=>p._id===product._id)
            productFound.qty = productFound.qty + +qty
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
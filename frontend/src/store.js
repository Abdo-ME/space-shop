   
import { createStore,applyMiddleware,combineReducers,compose } from "redux";
import reduxThunk from "redux-thunk"
import { cartItermReducer } from "./reducers/cartReducer";
import {productListReducer,productDetailesReducer, productDeleteReducer, productCreateReducer, productUpdateReducer} from './reducers/productReducers'
import {orderDetailsReducer, orderCreateReducer, orderPayReducer, myOrdersListReducer, ordersListReducer, orderDeliverReducer} from './reducers/orderReducer'
import { userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from "./reducers/userReducers";
const reducer = combineReducers({
    productList: productListReducer,
    productDetailes: productDetailesReducer,
    productDelete: productDeleteReducer,
    createProduct: productCreateReducer,
    productUpdate: productUpdateReducer ,
    cart: cartItermReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userDelete: userDeleteReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderMyList: myOrdersListReducer,
    orderList: ordersListReducer,
    

   
})
const initialState = {}
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, enhancer(applyMiddleware(reduxThunk)));

export default store;
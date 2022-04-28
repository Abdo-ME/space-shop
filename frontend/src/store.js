   
import { createStore,applyMiddleware,combineReducers,compose } from "redux";
import reduxThunk from "redux-thunk"
import { cartItermReducer } from "./reducers/cartReducer";
import {productListReducer,productDetailesReducer} from './reducers/productReducers'
import {orderDetailsReducer, orderCreateReducer, orderPayReducer, myOrdersListReducer} from './reducers/orderReducer'
import { userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer, userListReducer, userDeleteReducer } from "./reducers/userReducers";
const reducer = combineReducers({
    productList: productListReducer,
    productDetailes: productDetailesReducer,
    cart: cartItermReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: myOrdersListReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer
})
const initialState = {}
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, enhancer(applyMiddleware(reduxThunk)));

export default store;
   
import { createStore,applyMiddleware,combineReducers,compose } from "redux";
// import reducer from "./reducers/reducer";
import reduxThunk from "redux-thunk"
import { cartItermReducer } from "./reducers/cartReducer";
import {productListReducer,productDetailesReducer} from './reducers/productReducers'
const reducer = combineReducers({
    productList: productListReducer,
    productDetailes: productDetailesReducer,
    cart: cartItermReducer
})
const initialState = {}
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, enhancer(applyMiddleware(reduxThunk)));

export default store;
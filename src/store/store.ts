import { applyMiddleware, combineReducers, createStore } from "redux";

import cityInfoListReducer from "./cityInfoList-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

// import cityListReducer from './cityList-reducer'



let reducers = combineReducers({
    // cityList: cityListReducer,
    cityInfoList: cityInfoListReducer,
})

let initialState = {
//    cityList: {
//     cityList: []
//    },
   cityInfoList: {
    cityList: [],
    cityInfoList: []
   }
}

let store = createStore(reducers, localStorage.reduxState ? JSON.parse(localStorage.reduxState) : initialState,composeWithDevTools(applyMiddleware(thunkMiddleware)));

store.subscribe(() => localStorage.reduxState = JSON.stringify(store.getState()));

export default store;
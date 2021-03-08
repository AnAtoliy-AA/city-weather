import { applyMiddleware, combineReducers, createStore } from "redux";

import autoCompleteReducer from "./autoComplete-reducer";
import cityInfoListReducer from "./cityInfoList-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  autoCompleteInfo: autoCompleteReducer,
  cityInfoList: cityInfoListReducer,
});

let initialState = {
  autoComplete: {},
  cityInfoList: {
    cityList: [],
    cityInfoList: [],
  },
};

let store = createStore(
  reducers,
  localStorage.reduxState ? JSON.parse(localStorage.reduxState) : initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

store.subscribe(
  () => (localStorage.reduxState = JSON.stringify(store.getState()))
);

export default store;

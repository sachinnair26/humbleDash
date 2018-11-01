import { createStore, applyMiddleware, compose } from "redux";
import combineReducer from "./rootReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import createHistory from "history/createBrowserHistory";
const initialState = {};
const allEnhancers = compose(
  applyMiddleware(thunk, logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(combineReducer, initialState, allEnhancers);
console.log(store.getState());
export default store;

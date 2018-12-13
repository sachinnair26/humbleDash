import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Reducer from './Components/Reducers/Reducer';
const initialState = {
  data:{},
  device:[],
  report:{},
  user:null,
};
const allEnhancers = compose(
  applyMiddleware(thunk, logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(Reducer, initialState, allEnhancers);
console.log(store.getState());
export default store;

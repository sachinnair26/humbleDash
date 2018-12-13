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
);
const store = createStore(Reducer, initialState, allEnhancers);
console.log(store.getState());
export default store;

import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import combinedReducers from './Components/Reducers';
const initalState = {};

const allEnhancers =  compose(
    applyMiddleware(thunk),
);

const Store = createStore(combinedReducers,initalState,allEnhancers);

export default Store;
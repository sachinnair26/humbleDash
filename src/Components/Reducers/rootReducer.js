import { combineReducers } from "redux";
import fetchDataReducer from "./fetchDataReducer";
const combineReducer = combineReducers({
  
  Data: fetchDataReducer
});
export default combineReducer;
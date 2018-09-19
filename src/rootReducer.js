import {combineReducers} from 'redux';
import fetchReducer from './fetchReducer';
import ReportDataReducer from './ReportDataReducer';
import fetchDataReducer from './fetchDataReducer';

const combineReducer = combineReducers({
  fetch:fetchReducer,
  report:ReportDataReducer,
  Data:fetchDataReducer,
})
export default combineReducer;

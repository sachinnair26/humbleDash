import { combineReducers } from "redux";
import fetchDeviceReducer from "./fetchDeviceReducer";
import ReportDataReducer from "./ReportDataReducer";
import fetchDataReducer from "./fetchDataReducer";
const combineReducer = combineReducers({
  fetchDevice: fetchDeviceReducer,
  report: ReportDataReducer,
  Data: fetchDataReducer
});
export default combineReducer;

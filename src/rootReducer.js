import { combineReducers } from "redux";
import fetchReducer from "./fetchReducer";
import ReportDataReducer from "./ReportDataReducer";
import fetchDataReducer from "./fetchDataReducer";
import fetchOrgDataReducer from "./fetchOrganisationReducer";
const combineReducer = combineReducers({
  fetch: fetchReducer,
  report: ReportDataReducer,
  Data: fetchDataReducer,
  organisationData: fetchOrgDataReducer
});
export default combineReducer;

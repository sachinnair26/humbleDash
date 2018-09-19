import {REPORT_DATA} from './actionCreator';

const initialState = {
  dataReport:{},
};
export default function ReportDataReducer(state = initialState,action) {
  switch (action.type) {
    case REPORT_DATA:
    return{
      ...state,
      dataReport:action.ReportData
    }
    default:
    return state;

  }
}

import {FETCH_DATA,FETCH_DEVICE,REPORT_DATA,AUTH_USER} from '../ActionCreators/ActionCreators';

const initialState = {
    
};

export default function Reducer(state = initialState,action) {

switch (action.type) {
  case FETCH_DATA:
  return{
    ...state,
    data:action.data
  }
  case FETCH_DEVICE:
  return{
    ...state,
    device:action.deviceData
  }
  case REPORT_DATA:
  return{
    ...state,
    report:action.Report
  }
  case AUTH_USER:
  return{
    ...state,
    user:action.user
  }
  default:
  return state;
}

}

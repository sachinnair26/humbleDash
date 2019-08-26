import {combineReducers} from 'redux';
import FetchDailyDataReducer from './FetchDailyDataReducer';
import ChangeDateReducer from './ChangeDateReducer';
import FetchDeviceReducer from './FetchDeviceReducer';
import ChangeDeviceReducer from './ChangeDeviceReducer';
import FetchReportReducer from './FetchReportReducer';
import Fetch7DaysReducer from './Fetch7DaysReducer';
import UserLoginReducer from './UserLoginReducer';
 const combinedReducers = combineReducers( {
     UserLoginReducer,
    FetchDailyDataReducer,
    FetchDeviceReducer,
    ChangeDateReducer,
    ChangeDeviceReducer,
    FetchReportReducer,
    Fetch7DaysReducer,
});

export default combinedReducers;
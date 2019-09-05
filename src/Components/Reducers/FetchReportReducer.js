import {FETCH_REPORT,USER_LOGOUT} from '../ActionCreator';

const InitialState  ={ 
    date_list:[],
    report_device:"",
    report_good:{},
    report_bad:{},
    report_average:{}
}
export default  function FetchReportReducer(state=InitialState,action){
    
    switch(action.type){
        case FETCH_REPORT:
            var report_data = action.report_data
            return {...state,...report_data}
        case USER_LOGOUT:
            return {...InitialState};
        default:
            return state;
    }
}
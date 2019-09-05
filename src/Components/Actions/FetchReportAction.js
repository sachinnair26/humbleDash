import {FETCH_REPORT} from '../ActionCreator';
import FetchReportForDays from './FetchReportForDays';
export default function FetchReportAction(dateList,device){
      return (dispatch,getState) => {
        var organisation = getState().UserLoginReducer.organisation
          
          FetchReportForDays(dateList,device,organisation).then(poi =>{
            var report_data = {
              date_list:dateList,
              report_device:device,
              report_good:poi.good,
              report_bad:poi.bad,
              report_average:poi.average
          }
            dispatch({
                type:FETCH_REPORT,
                report_data
            });
            
          })
        
        
      
            
          
      };
}
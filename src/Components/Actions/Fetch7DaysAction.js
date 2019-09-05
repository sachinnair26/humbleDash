import {FETCH_7_DAYS} from '../ActionCreator';
import FetchReportForDays from './FetchReportForDays';
import moment from 'moment';


export default function Fetch7DaysAction(device){

    return (dispatch,getState) =>{
        var organisation = getState().UserLoginReducer.organisation

        var dateList = []
        var report7days = {}
        var todays_date = moment(new Date()).subtract(1, 'days')
        var weekpast = moment(todays_date).subtract(6, 'days')
        while (weekpast <= todays_date) {
            dateList.push(moment(weekpast).format('YYYY-MM-DD'))
            weekpast = moment(weekpast).add(1, 'days')
        }
        
        FetchReportForDays(dateList,device,organisation).then(value =>{
            report7days[device] = {...value , device,dateList}
        }).then(tim =>{
            dispatch({
                type:FETCH_7_DAYS,
                report7days
            })
        })
    }

}
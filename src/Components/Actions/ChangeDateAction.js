import {CHANGE_DATE} from '../ActionCreator';
import FetchDailyDataAction from './FetchDailyDataAction';
import FetchDeviceAction from './FetchDeviceAction';


export default function ChangeDateAction(selected_date) {
    var changed_date =  new Date(selected_date).toDateString('YYYY-MM-DD')

    return dispatch => {
            dispatch(FetchDailyDataAction(changed_date,'msrtcbox',
            'msrtc')
            )
            dispatch(FetchDeviceAction(changed_date,"msrtc"))
            dispatch({type:CHANGE_DATE,
            selected_date:changed_date})
    }
}
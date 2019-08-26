import {CHANGE_DEVICE} from '../ActionCreator';
import FetchDailyDataAction from './FetchDailyDataAction';
export default function ChangeDeviceAction(current_device,location)
{   

    return (dispatch,getState) =>{
        var todays_date = getState().ChangeDateReducer.selected_date
        var device_details = {
            current_device:current_device,
            device_location:location
        }
        dispatch({
            type:CHANGE_DEVICE,
            device_details:device_details
        })
        dispatch(FetchDailyDataAction(todays_date,current_device))
    }
}
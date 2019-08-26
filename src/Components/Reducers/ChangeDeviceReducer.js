import {CHANGE_DEVICE,USER_LOGOUT} from '../ActionCreator';
const InitialState ={
    current_device:'',
    device_location:''
}
export default function ChangeDeviceReducer(state=InitialState,action){
    switch(action.type){
        case CHANGE_DEVICE:
            var current_device = action.device_details 
            return {...state,...current_device};
        case USER_LOGOUT:
            return {...InitialState};
        default:
            return state;
    }
}
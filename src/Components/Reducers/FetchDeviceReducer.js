import {FETCH_DEVICE,USER_LOGOUT} from '../ActionCreator';


const InitialState = {
    device_list:[],
    loading:true
}

export default function FetchDeviceReducer(state=InitialState,action){
    switch(action.type){
        case FETCH_DEVICE:
            var device_list=action.device_data.device_list
             var loading = action.device_data.loading
            return {...state,...{device_list,loading}};
        case USER_LOGOUT:
            return {...InitialState};
        default:
            return state;
    }
}
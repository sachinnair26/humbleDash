import {USER_LOGIN,USER_LOGOUT} from '../ActionCreator';

const InitialState = {
    organisation:"",
      logged_in:false,
      uid:"",   
      err:""
}

export default function UserLoginReducer(state=InitialState,action){
    switch(action.type){
        case USER_LOGIN:
           
        
            return {
                ...state,
                ...action.login_data,

            }
        case USER_LOGOUT:
        
            return {...state,...InitialState};
        default:
            return state;
    }
}
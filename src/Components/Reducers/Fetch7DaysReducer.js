import {FETCH_7_DAYS,USER_LOGOUT} from '../ActionCreator';


const InitialState ={
    
}

export default function Fetch7DaysReducer(state=InitialState,action){
    switch(action.type){
        case FETCH_7_DAYS:
            return{
                ...state,
                ...action.report7days
            } 
        case USER_LOGOUT:
            return {...InitialState};
        default:
            return state;
    }
}
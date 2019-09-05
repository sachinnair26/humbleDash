import {CHANGE_DATE,USER_LOGOUT} from '../ActionCreator';

const InitialState = {
    selected_date:new Date().toDateString('YYYY-MM-DD')

}

export default function ChangeDateReducer(state=InitialState,action){
    switch(action.type){
        case CHANGE_DATE:
            var selected_date = action.selected_date
            return {...state,selected_date
                
            }
            case USER_LOGOUT:
            return {...InitialState};
        default:
            return state
    }
}
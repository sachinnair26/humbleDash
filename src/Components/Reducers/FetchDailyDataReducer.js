import {FETCH_DAILY_DATA,USER_LOGOUT} from '../ActionCreator';

const InitialState = {
    good: [],
    bad: [],
    average: [],
    userdelight: [],
    foot:[],
    goodCount: 0,
    badCount: 0,
    avgCount: 0,
    total: 0,
    UserDelightCount: 0,

}

export default function FetchDailyDataReducer(state=InitialState,action){

    switch (action.type){
        case FETCH_DAILY_DATA:
            var daily_data = action.daily_data
            return {...state,...daily_data};
        case USER_LOGOUT:
            return {...InitialState};
        default:
            return state;
    }
}
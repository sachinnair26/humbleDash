import {FETCH_DATA} from './actionCreator';

const initialState = {
    dataVal:[]
};

export default function fetchDataReducer(state = initialState,action) {

switch (action.type) {
  case FETCH_DATA:
  return{
    ...state,
    dataVal:action.data
  }
  default:
  return state;
}

}

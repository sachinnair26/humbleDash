import { FETCH_DEVICE } from "./actionCreator";

const initialState = {
  data: []
};

export default function fetchDeviceReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DEVICE:
      return {
        ...state,
        data: action.value
      };
    default:
      return state;
  }
}

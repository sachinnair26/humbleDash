import { FETCH_ORGANISATION } from "./actionCreator";

const initialState = {
  organisationName: []
};

export default function fetchOrgDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORGANISATION:
      return {
        ...state,
        organisationName: action.organisationData
      };
    default:
      return state;
  }
}

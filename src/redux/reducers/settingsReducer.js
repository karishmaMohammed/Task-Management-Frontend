// profileReducer.js
import { UPDATE_PROFILE, GET_PROFILE_INFO, PROFILE_ERROR } from '../actionTypes';

const initialState = {
  profile: null,
  loading: true,
  error: null,
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE_INFO:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: null,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

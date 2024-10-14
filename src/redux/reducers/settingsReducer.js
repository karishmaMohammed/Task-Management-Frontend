// profileReducer.js
import { UPDATE_PROFILE, GET_PROFILE_INFO, PROFILE_ERROR, CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE, } from '../actionTypes';

const initialState = {
  profile: null,
  loading: true,
  error: null,
  passwordLoading: false,  // Tracks the loading state for the password change process
  passwordError: null,     // Stores any error from password change
  passwordSuccessMessage: '', // Stores success message from password change
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

      case CHANGE_PASSWORD_REQUEST:
        return {
          ...state,
          passwordLoading: true,
          passwordError: null,        // Clear previous errors on new request
          passwordSuccessMessage: '', // Clear previous success message
        };
  
      case CHANGE_PASSWORD_SUCCESS:
        return {
          ...state,
          passwordLoading: false,
          passwordSuccessMessage: payload, // Set success message
        };
  
      case CHANGE_PASSWORD_FAILURE:
        return {
          ...state,
          passwordLoading: false,
          passwordError: payload, // Set error message
        };
  
    default:
      return state;
  }
}

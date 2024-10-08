// src/redux/reducers/memberReducer.js
import { FETCH_MEMBER_DETAILS_REQUEST,
     FETCH_MEMBER_DETAILS_SUCCESS,
     FETCH_MEMBER_DETAILS_FAILURE } from '../actionTypes';

const initialState = {
    member_details: {},
    notification_count: 0,
    loading: false,
    error: "",
};

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MEMBER_DETAILS_REQUEST:
        return { ...state, loading: true };
      case FETCH_MEMBER_DETAILS_SUCCESS:
        return {
          ...state,
          member_details: action.payload.member_details,
          notification_count: action.payload.notification_count,
          loading: false,
        };
      case FETCH_MEMBER_DETAILS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

export default memberReducer;

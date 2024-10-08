import {
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAILURE,
    MARK_READ_NOTIFICATION_REQUEST,
    MARK_READ_NOTIFICATION_SUCCESS,
    MARK_READ_NOTIFICATION_FAILURE,
    GET_ACTIVITY_LOGS_REQUEST,
    GET_ACTIVITY_LOGS_SUCCESS,
    GET_ACTIVITY_LOGS_FAILURE,
  } from "../actionTypes";
  
  const initialState = {
    loading: false,
    notifications: [],
    activityLogs: [],
    error: null,
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_NOTIFICATION_REQUEST:
      case MARK_READ_NOTIFICATION_REQUEST:
      case GET_ACTIVITY_LOGS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_NOTIFICATION_SUCCESS:
        return {
          ...state,
          loading: false,
          notifications: action.payload, // Set notifications from the API
        };
      case MARK_READ_NOTIFICATION_SUCCESS:
        return {
          ...state,
          loading: false,
          notifications: state.notifications.map((notification) =>
            notification.id === action.payload.id
              ? { ...notification, read: true } // Mark the specific notification as read
              : notification
          ),
        };
      case GET_ACTIVITY_LOGS_SUCCESS:
        return {
          ...state,
          loading: false,
          activityLogs: action.payload, // Set activity logs from the API
        };
      case GET_NOTIFICATION_FAILURE:
      case MARK_READ_NOTIFICATION_FAILURE:
      case GET_ACTIVITY_LOGS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload, // Set error message
        };
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  
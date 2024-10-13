// src/redux/notificationReducer.js
import {
  FETCH_ALL_NOTIFICATIONS_REQUEST,
  FETCH_ALL_NOTIFICATIONS_SUCCESS,
  FETCH_ALL_NOTIFICATIONS_FAILURE,
  FETCH_UNREAD_NOTIFICATIONS_REQUEST,
  FETCH_UNREAD_NOTIFICATIONS_SUCCESS,
  FETCH_UNREAD_NOTIFICATIONS_FAILURE,
  MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST,
  MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
  MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE,
  SET_ACTIVE_ELEMENT,
  RESET_NOTIFICATIONS,
} from '../actionTypes';

const initialState = {
  activeElement: 'notif-all',           // Active tab for notifications
  unReadNotification: [],               // Store for unread notifications
  allNotification: [],                  // Store for all notifications
  allUnreadNotification: 0,             // Count of unread notifications
  allNotificationCount: 0,              // Total notifications count
  activePage: 1,                        // Current active page for notifications
  loading: false,                       // Loading state
  error: null,                          // Error state
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_NOTIFICATIONS_REQUEST:
    case FETCH_UNREAD_NOTIFICATIONS_REQUEST:
    case MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        allNotification: action.payload.all_notification || [], // Safeguard against undefined
        allNotificationCount: action.payload.all_count || 0,   // Default to 0 if undefined
        activePage: state.activePage + 1,                      // Increment active page
        loading: false,
      };

    case FETCH_UNREAD_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        unReadNotification: action.payload.un_read_notification || [], // Safeguard against undefined
        allUnreadNotification: action.payload.un_read_count || 0,      // Default to 0 if undefined
        loading: false,
      };

    case MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
      return {
        ...state,
        unReadNotification: [],               // Clear unread notifications
        allUnreadNotification: 0,              // Reset unread count
        loading: false,
      };

    case FETCH_ALL_NOTIFICATIONS_FAILURE:
    case FETCH_UNREAD_NOTIFICATIONS_FAILURE:
    case MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || 'An error occurred', // Default error message
      };

    case SET_ACTIVE_ELEMENT:
      return {
        ...state,
        activeElement: action.payload,        // Set active element based on user interaction
      };

    case RESET_NOTIFICATIONS:
      return initialState;                   // Reset notifications to initial state

    default:
      return state;                         // Return current state if action type is not recognized
  }
};

export default notificationReducer;

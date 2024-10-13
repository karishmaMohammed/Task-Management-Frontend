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
  GET_ACTIVITY_LOGS_REQUEST,
  GET_ACTIVITY_LOGS_SUCCESS,
  GET_ACTIVITY_LOGS_FAILURE,
} from "../actionTypes";
import axios from "axios";
import { BASE_URL } from "../../constant";
import Cookies from "js-cookie";




// Action to fetch all notifications
export const fetchAllNotifications = (page) => async (dispatch) => {
  dispatch({ type: FETCH_ALL_NOTIFICATIONS_REQUEST });
  
  try {
    const headers = {
      'task-auth-token': Cookies.get('user_task_token'),
    };

    const response = await axios.get(`${BASE_URL}/notification/get-notifications`, {
      params: { page, size: 20 },
      headers: headers,
    });

    dispatch({
      type: FETCH_ALL_NOTIFICATIONS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_NOTIFICATIONS_FAILURE,
      payload: error.message,
    });
  }
};



// Action to mark all notifications as read
export const markAllNotificationsAsRead = () => async (dispatch) => {
  dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST });

  try {
    const headers = {
      'task-auth-token': Cookies.get('user_task_token'),
    };

    await axios.post(`${BASE_URL}/notification/mark-all-as-read`, {}, {
      headers: headers,
    });

    dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS });
  } catch (error) {
    dispatch({
      type: MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE,
      payload: error.message,
    });
  }
};

// Action to set the active element
export const setActiveElement = (activeElement) => ({
  type: SET_ACTIVE_ELEMENT,
  payload: activeElement,
});

// Action to reset notifications
export const resetNotifications = () => ({
  type: RESET_NOTIFICATIONS,
});

  
  // need to take comment id
export const getTaskActivityLogs = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVITY_LOGS_REQUEST });
  
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };
  
      const response = await axios.get(
        BASE_URL + "/notification/get-task-acti-logs",
        {
          headers,
        }
      );
  
      dispatch({
        type: GET_ACTIVITY_LOGS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVITY_LOGS_FAILURE,
        payload: error.message,
      });
    }
  };
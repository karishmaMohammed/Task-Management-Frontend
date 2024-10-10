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
import axios from "axios";
import { BASE_URL } from "../../constant";
import Cookies from "js-cookie";


export const getNotifications = () => async (dispatch) => {
    try {
      dispatch({ type: GET_NOTIFICATION_REQUEST });
  
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };
  
      const response = await axios.get(
        BASE_URL + "/notification/get-notifications",
        {
          headers,
        }
      );
  
      dispatch({
        type: GET_NOTIFICATION_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_NOTIFICATION_FAILURE,
        payload: error.message,
      });
    }
  };
  
export const markNotificationsRead = () => async (dispatch) => {
    try {
      dispatch({ type: MARK_READ_NOTIFICATION_REQUEST });
  
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };
  
      const response = await axios.get(BASE_URL + "/notification/mark-read", {
        headers,
      });
  
      dispatch({
        type: MARK_READ_NOTIFICATION_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: MARK_READ_NOTIFICATION_FAILURE,
        payload: error.message,
      });
    }
  };
  
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
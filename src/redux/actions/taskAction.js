// actions/taskActions.js
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constant";
import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  FETCH_TASK_DETAILS_REQUEST,
  FETCH_TASK_DETAILS_SUCCESS,
  FETCH_TASK_DETAILS_FAILURE,
} from "../actionTypes";

export const createTask = (taskData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_TASK_REQUEST });

    try {
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };
      const response = await axios.post(
        BASE_URL + "/task/create-task",
        taskData,
        {
          headers,
        }
      ); // Adjust the API endpoint as needed
      dispatch({
        type: CREATE_TASK_SUCCESS,
        payload: response.data.data, // The response data from the API
      });
    } catch (error) {
      dispatch({
        type: CREATE_TASK_FAILURE,
        payload: error.response
          ? error.response.data.meta.message
          : error.message, // Handle error messages
      });
    }
  };
};

export const fetchTasks = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TASKS_REQUEST });
    try {
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };
      const response = await axios.get(BASE_URL + "/task/get-task-list", {
        headers,
      });
      const taskList = response.data.data.task_list;
      dispatch({
        type: FETCH_TASKS_SUCCESS,
        payload: taskList,
      });
    } catch (error) {
      dispatch({
        type: FETCH_TASKS_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchTaskDetails = (task_sequence_id) => {
  console.log(task_sequence_id);
  return async (dispatch) => {
    dispatch({ type: FETCH_TASK_DETAILS_REQUEST });

    try {
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };

      const response = await axios.get(`${BASE_URL}/task/${task_sequence_id}`, {
        headers,
      });

      dispatch({
        type: FETCH_TASK_DETAILS_SUCCESS,
        payload: response.data.data.task_details,
      });
    } catch (error) {
      dispatch({
        type: FETCH_TASK_DETAILS_FAILURE,
        payload: error.response
          ? error.response.data.meta.message
          : error.message,
      });
    }
  };
};

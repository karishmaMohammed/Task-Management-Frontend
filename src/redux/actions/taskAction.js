// actions/taskActions.js
import axios from "axios";
import { BASE_URL } from "../../constant";
import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
} from "./actionTypes";


export const createTask = (taskData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_TASK_REQUEST });

    try {
      const response = await axios.post( BASE_URL + "/task/create-task", taskData); // Adjust the API endpoint as needed
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

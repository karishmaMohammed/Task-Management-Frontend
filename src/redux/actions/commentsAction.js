import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "../actionTypes";
import axios from "axios";
import { BASE_URL } from "../../constant";
import Cookies from "js-cookie";

//need to add payload
export const createComments = ( comment_message, task_id) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COMMENT_REQUEST });

    const headers = {
      "task-auth-token": Cookies.get("user_task_token"),
    };

    const response = await axios.post(
      BASE_URL + "/comment/create-comment",
      { comment_message, task_id},
      {
        headers,
      }
    );

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: response.data.meta.success,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAILURE,
      payload: error.message,
    });
  }
};

export const getComments = (task_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENT_REQUEST });

    const headers = {
      "task-auth-token": Cookies.get("user_task_token"),
    };

    const response = await axios.get(BASE_URL + "/comment/get-comment", {
      headers,
      params: { task_id },
    });

    dispatch({
      type: GET_COMMENT_SUCCESS,
      payload: response.data.data.comment_list,
    });
  } catch (error) {
    dispatch({
      type: GET_COMMENT_FAILURE,
      payload: error.message,
    });
  }
};

// need to take comment id
export const deleteComments = (comment_id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });

    const headers = {
      "task-auth-token": Cookies.get("user_task_token"),
    };

    const response = await axios.post(
      BASE_URL + "/comment/del-comment",
      {comment_id},
      {
        headers,
      }
    );

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: response.data.meta.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAILURE,
      payload: error.message,
    });
  }
};

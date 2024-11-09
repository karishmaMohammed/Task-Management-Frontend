import axios from "axios";
import { BASE_URL } from "../../constant";
import Cookies from "js-cookie";
import {
  UPDATE_PROFILE,
  GET_PROFILE_INFO,
  PROFILE_ERROR,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from "../actionTypes";

// Action to update profile details
export const updateProfile = (name, phone, gender) => async (dispatch) => {
  try {
    const headers = {
      "task-auth-token": Cookies.get("user_task_token"),
    };
    const res = await axios.post(
      BASE_URL + "/member/edit-details",
      {
        name,
        phone,
       gender,
        action: "update",
      },
      { headers }
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data.details,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: error.message,
    });
  }
};

// Action to get profile info
export const getProfileInfo = () => async (dispatch) => {
  try {
    const headers = {
      "task-auth-token": Cookies.get("user_task_token"),
    };
    const res = await axios.post(
      BASE_URL + "/member/edit-details",
      { action: "get_info" },
      { headers }
    );

    dispatch({
      type: GET_PROFILE_INFO,
      payload: res.data.data.details,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: error.message,
    });
  }
};

// Action to change password
export const changePassword =
  (oldPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    try {

      console.log("Old Password:", oldPassword);  // Add logs to check the parameters
      console.log("New Password:", newPassword);
      console.log("Confirm New Password:", confirmNewPassword);
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };
      const res = await axios.post(
        BASE_URL + "/member/change-password",
        {
          oldPassword, newPassword, confirmNewPassword
        },
        { headers }
      );
      dispatch({ type: CHANGE_PASSWORD_SUCCESS });
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAILURE,
        payload: error.message,
      });
    }
  };

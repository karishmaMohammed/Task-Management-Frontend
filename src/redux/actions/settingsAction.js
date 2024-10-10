import axios from "axios";
import { BASE_URL } from "../../constant";
import Cookies from "js-cookie";
import {
  UPDATE_PROFILE,
  GET_PROFILE_INFO,
  PROFILE_ERROR,
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
    const res = await axios.post( BASE_URL + "/member/edit-details", 
      { action: "get_info" }, { headers });

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

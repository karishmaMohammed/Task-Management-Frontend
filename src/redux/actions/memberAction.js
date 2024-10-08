import {
  FETCH_MEMBER_DETAILS_REQUEST,
  FETCH_MEMBER_DETAILS_SUCCESS,
  FETCH_MEMBER_DETAILS_FAILURE,
} from "../actionTypes";
import axios from "axios";
import { BASE_URL } from "../../constant";
import Cookies from "js-cookie";

export const fetchMemberDetails = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MEMBER_DETAILS_REQUEST });

    const headers = {
      "x-auth-token": Cookies.get("user_token"),
    };

    const response = await axios.get(BASE_URL + "/member/get-member-details", {
      headers,
    });

    dispatch({
      type: FETCH_MEMBER_DETAILS_SUCCESS,
      payload: response.data.data, // member_details and notification_count
    });
  } catch (error) {
    dispatch({
      type: FETCH_MEMBER_DETAILS_FAILURE,
      payload: error.message,
    });
  }
};

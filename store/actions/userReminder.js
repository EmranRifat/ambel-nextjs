import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
  USERREMINDER_GET_FAIL,
  USERREMINDER_GET_SUCCESS,
  USERREMINDER_POST_FAIL,
  USERREMINDER_LOADING,
  USERREMINDER_POST_SUCCESS,
} from "../actions/types";


export const getUserReminder = () => async (dispatch) => {
  dispatch({ type: USERREMINDER_LOADING });
  const res = await axios.get("/userreminder", {
    withCredentials: true,
    headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
  });
  if (res.data.status === "success") {
    dispatch({ type: USERREMINDER_GET_SUCCESS, payload: res.data.data });
  } else {
    dispatch({ type: USERREMINDER_GET_FAIL });
  }
};

export const updateUserReminder =
  (userRemidnerData, userReminderID) => async (dispatch) => {
    dispatch({ type: USERREMINDER_LOADING });
    const res = userReminderID
      ? await axios.patch(`/userreminder/${userReminderID}`, userRemidnerData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      })
      : await axios.post(`/userreminder`, userRemidnerData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      });
    if (res.data.status === "success") {
      dispatch({
        type: USERREMINDER_POST_SUCCESS,
        // department: res.data.data.doc,
      });
    } else {
      dispatch({ type: USERREMINDER_POST_FAIL });
    }
  };

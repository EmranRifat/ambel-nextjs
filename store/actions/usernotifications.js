import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
  USERNOTIFICATION_GET_FAIL,
  USERNOTIFICATION_GET_SUCCESS,
  USERNOTIFICATION_POST_FAIL,
  USERNOTIFICATION_LOADING,
  USERNOTIFICATION_POST_SUCCESS,
} from "../actions/types";


export const onCancelAction = () => async (dispatch) => {
  dispatch({ type: USERNOTIFICATION_POST_FAIL });
};

export const getUserNotification = () => async (dispatch) => {
  dispatch({ type: USERNOTIFICATION_LOADING });
  const res = await axios.get("/usernotification", {
    withCredentials: true,
    headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
  });
  if (res.data.status === "success") {
    dispatch({ type: USERNOTIFICATION_GET_SUCCESS, payload: res.data.data });
  } else {
    dispatch({ type: USERNOTIFICATION_GET_FAIL });
  }
};

export const updateUserNotification =
  (userNotifyData, userNotifyID) => async (dispatch) => {
    dispatch({ type: USERNOTIFICATION_LOADING });
    const res = userNotifyID
      ? await axios.put(`/usernotification/${userNotifyID}`, userNotifyData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      })
      : await axios.post(`/usernotification`, userNotifyData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      });
    if (res.data.status === "success") {
      dispatch({
        type: USERNOTIFICATION_POST_SUCCESS,
        // department: res.data.data.doc,
      });
    } else {
      dispatch({ type: USERNOTIFICATION_POST_FAIL });
    }
  };

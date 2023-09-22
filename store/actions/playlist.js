import axios from "../../utils/axios";
import cookie from "js-cookie";

import {
  PLAYLIST_LOADING,
  PLAYLIST_GET_SUCCESS,
  PLAYLIST_GET_FAIL,
  PLAYLIST_POST_FAIL,
  PLAYLIST_POST_SUCCESS,
  SINGLEPLAYLIST_GET_SUCCESS,
} from "./types";

export const onCancelAction = () => async (dispatch) => {
  dispatch({ type: PLAYLIST_POST_FAIL });
};

export const getPlayList = (businessId) => async (dispatch) => {
  dispatch({ type: PLAYLIST_LOADING });
  const res = await axios.get(`videoplaylist?businessId=${businessId}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
  });
  if (res.data.status === "success") {
    console.log(res.data.data);
    dispatch({ type: PLAYLIST_GET_SUCCESS, payload: res.data.data });
  } else {
    dispatch({ type: PLAYLIST_GET_FAIL });
  }
};

export const playListUpdate =
  (playListData, playListId) => async (dispatch) => {
    dispatch({ type: PLAYLIST_LOADING });
    const res = playListId
      ? await axios.patch(`/videoplaylist/${playListId}`, playListData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      })
      : await axios.post(`/videoplaylist`, playListData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      });
    if (res.data.status === "success") {
      // dispatch({
      // 	type: TASK_POST_SUCCESS,
      // 	task: res.data.data.doc,
      // });
    } else {
      dispatch({ type: PLAYLIST_POST_SUCCESS });
    }
  };

export const getSinglePlayList = (playListId) => async (dispatch) => {
  dispatch({ type: PLAYLIST_LOADING });
  const res = await axios.get(`videoplaylist/${playListId}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
  });
  if (res.data.status === "success") {
    console.log(res.data.data);
    dispatch({ type: SINGLEPLAYLIST_GET_SUCCESS, payload: res.data.data });
  } else {
    dispatch({ type: PLAYLIST_GET_FAIL });
  }
};

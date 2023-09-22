import axios from "../../utils/axios";
import cookie from "js-cookie";

import {
  VIDEOS_LOADING,
  VIDEOS_GET_SUCCESS,
  VIDEOS_GET_FAIL,
  VIDEOS_POST_FAIL,
  VIDEOS_POST_SUCCESS,
  SINGLEVIDEO_GET_SUCCESS,
} from "./types";

export const onCancelAction = () => async (dispatch) => {
  dispatch({ type: VIDEOS_POST_FAIL });
};

export const getVideos = (businessId) => async (dispatch) => {
  dispatch({ type: VIDEOS_LOADING });
  const res = await axios.get(`videos?businessId=${businessId}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
  });
  if (res.data.status === "success") {
    // console.log(res.data.data);
    dispatch({ type: VIDEOS_GET_SUCCESS, payload: res.data.data });
  } else {
    dispatch({ type: VIDEOS_GET_FAIL });
  }
};

export const videosUpdate = (videosData, videoId) => async (dispatch) => {
  dispatch({ type: VIDEOS_LOADING });
  const res = videoId
    ? await axios.patch(`/videos/${videoId}`, videosData, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    })
    : await axios.post(`/videos`, videosData, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    });
  if (res.data.status === "success") {
    // dispatch({
    // 	type: TASK_POST_SUCCESS,
    // 	task: res.data.data.doc,
    // });
  } else {
    dispatch({ type: VIDEOS_POST_SUCCESS });
  }
};

export const getSingleVideo = (videoId) => async (dispatch) => {
  dispatch({ type: VIDEOS_LOADING });
  const res = await axios.get(`videos/${videoId}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
  });
  if (res.data.status === "success") {
    // console.log(res.data.data);
    dispatch({ type: SINGLEVIDEO_GET_SUCCESS, payload: res.data.data });
  } else {
    dispatch({ type: VIDEOS_GET_FAIL });
  }
};

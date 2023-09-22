import {
  VIDEOS_GET_FAIL,
  VIDEOS_GET_SUCCESS,
  SINGLEVIDEO_GET_SUCCESS,
  VIDEOS_POST_FAIL,
  VIDEOS_LOADING,
  VIDEOS_POST_SUCCESS,
} from "../actions/types";

const videos = (state = { videos: null, singleVideo: null }, action) => {
  switch (action.type) {
    case VIDEOS_LOADING:
      return { ...state, loading: true };
    case VIDEOS_GET_SUCCESS:
      return { ...state, videos: action.payload, loading: false };
    case SINGLEVIDEO_GET_SUCCESS:
      return { ...state, singleVideo: action.payload, loading: false };
    case VIDEOS_GET_FAIL:
      return { videos: null, loading: false };
    case VIDEOS_POST_SUCCESS:
      return { ...state, videos: action.videos, loading: false };
    case VIDEOS_POST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default videos;

import {
  PLAYLIST_GET_FAIL,
  PLAYLIST_GET_SUCCESS,
  SINGLEPLAYLIST_GET_SUCCESS,
  PLAYLIST_POST_FAIL,
  PLAYLIST_LOADING,
  PLAYLIST_POST_SUCCESS,
} from "../actions/types";

const playlist = (state = { playlist: null, singleplaylist: null }, action) => {
  switch (action.type) {
    case PLAYLIST_LOADING:
      return { ...state, loading: true };
    case PLAYLIST_GET_SUCCESS:
      return { ...state, playlist: action.payload, loading: false };
    case SINGLEPLAYLIST_GET_SUCCESS:
      return { ...state, singleplaylist: action.payload, loading: false };
    case PLAYLIST_GET_FAIL:
      return { playlist: null, loading: false };
    case PLAYLIST_POST_SUCCESS:
      return { ...state, playlist: action.playlist, loading: false };
    case PLAYLIST_POST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default playlist;

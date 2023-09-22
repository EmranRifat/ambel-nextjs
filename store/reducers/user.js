import {
  USER_INFO_GET_FAIL,
  USER_INFO_LOADING,
  USER_INFO_GET_SUCCESS,
  USER_INFO_POST_SUCCESS,
  USER_INFO_POST_FAIL,
} from "../actions/types";

const user = (state = { info: null }, action) => {
  switch (action.type) {
    case USER_INFO_LOADING:
      return { ...state, loading: true };
    case USER_INFO_GET_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case USER_INFO_GET_FAIL:
      return { info: null, loading: false };
    case USER_INFO_POST_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case USER_INFO_POST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default user;

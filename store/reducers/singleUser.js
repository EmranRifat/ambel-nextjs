import {
  SINGLE_USER_FAIL,
  SINGLE_USER_GET_SUCCESS,
  SINGLE_USER_GET_FAIL,
  SINGLE_USER_LOADING,
  SINGLE_USER_SUCCESS,
  USER_SCHEDULE_SETTING_GET_FAIL,
  USER_SCHEDULE_SETTING_GET_SUCCESS,
  USER_SCHEDULE_SETTING_LOADING,
  USER_SCHEDULE_SETTING_POST_SUCCESS,
  USER_SCHEDULE_SETTING_POST_FAIL,
} from "../actions/types";
const singleUser = (state = { user: null }, action) => {
  switch (action.type) {
    case SINGLE_USER_LOADING:
      return { ...state, loading: true };
    case SINGLE_USER_GET_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case SINGLE_USER_GET_FAIL:
      return { user: null, loading: false };
    case SINGLE_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case SINGLE_USER_FAIL:
      return { ...state, loading: false };
      
    case USER_SCHEDULE_SETTING_LOADING:
      return { ...state, loading: true };
    case USER_SCHEDULE_SETTING_GET_SUCCESS:
      return { ...state, userScheduleSetting: action.payload, loading: false };
    case USER_SCHEDULE_SETTING_GET_FAIL:
      return { ...state, loading: false };
    case USER_SCHEDULE_SETTING_POST_SUCCESS:
      return { ...state, userScheduleSetting: action.payload, loading: false };
    case USER_SCHEDULE_SETTING_POST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}
export default singleUser;

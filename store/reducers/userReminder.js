import {
  USERREMINDER_GET_FAIL,
  USERREMINDER_GET_SUCCESS,
  USERREMINDER_POST_FAIL,
  USERREMINDER_LOADING,
  USERREMINDER_POST_SUCCESS,
} from "../actions/types";

const userReminder = (state = { info: null }, action) => {
  switch (action.type) {
    case USERREMINDER_LOADING:
      return { ...state, loading: true };
    case USERREMINDER_GET_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case USERREMINDER_GET_FAIL:
      return { info: null, loading: false };
    case USERREMINDER_POST_SUCCESS:
      return { ...state, userReminder: action.userReminder, loading: false };
    case USERREMINDER_POST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default userReminder;

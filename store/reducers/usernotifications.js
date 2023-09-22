import {
  USERNOTIFICATION_GET_FAIL,
  USERNOTIFICATION_GET_SUCCESS,
  USERNOTIFICATION_POST_FAIL,
  USERNOTIFICATION_LOADING,
  USERNOTIFICATION_POST_SUCCESS,
} from "../actions/types";


const userNotification = (state = { info: null }, action) => {
  switch (action.type) {
    case USERNOTIFICATION_LOADING:
      return { ...state, loading: true };
    case USERNOTIFICATION_GET_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case USERNOTIFICATION_GET_FAIL:
      return { info: null, loading: false };
    case USERNOTIFICATION_POST_SUCCESS:
      return { ...state, userReminder: action.userReminder, loading: false };
    case USERNOTIFICATION_POST_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};
export default userNotification;

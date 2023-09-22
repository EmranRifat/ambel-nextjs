import {
  PRACTITIONER_INFO_GET_FAIL,
  PRACTITIONER_INFO_LOADING,
  PRACTITIONER_INFO_GET_SUCCESS,
  PRACTITIONER_INFO_POST_SUCCESS,
  PRACTITIONER_INFO_POST_FAIL,
  PRACTITIONER_INFO_FILTER_SUCCESS,
} from "../actions/types";

const practitioner = (state = { info: null }, action) => {
  switch (action.type) {
    case PRACTITIONER_INFO_LOADING:
      return { ...state, loading: true };
    case PRACTITIONER_INFO_GET_SUCCESS:
      // console.log(action.payload);
      return { ...state, info: action.payload, loading: false };
    case PRACTITIONER_INFO_GET_FAIL:
      return { info: null, loading: false };
    case PRACTITIONER_INFO_POST_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case PRACTITIONER_INFO_POST_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};
export default practitioner;

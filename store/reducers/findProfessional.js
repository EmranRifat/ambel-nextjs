import {
  FINDPROFESSIONAL_GET_FAIL,
  FINDPROFESSIONAL_GET_SUCCESS,
  FINDPROFESSIONAL_POST_FAIL,
  FINDPROFESSIONAL_LOADING,
  FINDPROFESSIONAL_POST_SUCCESS,
} from "../actions/types";

const findProfessional = (state = { info: null }, action) => {
  switch (action.type) {
    case FINDPROFESSIONAL_LOADING:
      return { ...state, loading: true };
    case FINDPROFESSIONAL_GET_SUCCESS:
      // console.log(action.payload);
      return { ...state, info: action.payload, loading: false };
    case FINDPROFESSIONAL_GET_FAIL:
      return { info: null, loading: false };
    case FINDPROFESSIONAL_POST_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case FINDPROFESSIONAL_POST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default findProfessional;

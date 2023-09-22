import {
  FAMILYORGANIZATION_GET_FAIL,
  FAMILYORGANIZATION_GET_SUCCESS,
  FAMILYORGANIZATION_POST_FAIL,
  FAMILYORGANIZATION_LOADING,
  FAMILYORGANIZATION_POST_SUCCESS,
} from "../actions/types";

const familyOrganization = (state = { info: null }, action) => {
  switch (action.type) {
    case FAMILYORGANIZATION_LOADING:
      return { ...state, loading: true };
    case FAMILYORGANIZATION_GET_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case FAMILYORGANIZATION_GET_FAIL:
      return { info: null, loading: false };
    case FAMILYORGANIZATION_POST_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case FAMILYORGANIZATION_POST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default familyOrganization;

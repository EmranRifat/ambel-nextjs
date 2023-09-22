import {
  PACKAGEMEMBERSHIP_GET_FAIL,
  PACKAGEMEMBERSHIP_GET_SUCCESS,
  PACKAGEMEMBERSHIP_POST_FAIL,
  PACKAGEMEMBERSHIP_LOADING,
  PACKAGEMEMBERSHIP_POST_SUCCESS,
} from "../actions/types";

const packageMembership = (state = { info: null }, action) => {
  switch (action.type) {
    case PACKAGEMEMBERSHIP_LOADING:
      return { ...state, loading: true };
    case PACKAGEMEMBERSHIP_GET_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case PACKAGEMEMBERSHIP_GET_FAIL:
      return { info: null, loading: false };
    case PACKAGEMEMBERSHIP_POST_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case PACKAGEMEMBERSHIP_POST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default packageMembership;

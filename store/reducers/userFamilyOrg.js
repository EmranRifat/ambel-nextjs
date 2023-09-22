import {
  USERFAMILYORG_GET_FAIL,
  USERFAMILYORG_GET_SUCCESS,
  USERFAMILYORG_POST_FAIL,
  USERFAMILYORG_LOADING,
  USERFAMILYORG_POST_SUCCESS,
  FAMILYORGMEMBER_POST_FAIL,
  FAMILYORGMEMBER_LOADING,
  FAMILYORGMEMBER_POST_SUCCESS,
} from "../actions/types";

const userFamilyOrg = (state = { info: null }, action) => {
  switch (action.type) {
    case USERFAMILYORG_LOADING:
      return { ...state, loading: true };
    case FAMILYORGMEMBER_LOADING:
      return { ...state, loading: true };
    case USERFAMILYORG_GET_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case USERFAMILYORG_GET_FAIL:
      return { info: null, loading: false };
    case USERFAMILYORG_POST_SUCCESS:
      return { ...state, userFamilyOrg: action.userFamilyOrg, loading: false };
    case FAMILYORGMEMBER_POST_SUCCESS:
      return {
        ...state,
        familyOrgMember: action.familyOrgMember,
        loading: false,
      };
    case USERFAMILYORG_POST_FAIL:
      return { ...state, loading: false };
    case FAMILYORGMEMBER_POST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default userFamilyOrg;

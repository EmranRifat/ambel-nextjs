import {
	BUSINESS_INFO_GET_FAIL,
	BUSINESS_INFO_LOADING,
	BUSINESS_INFO_GET_SUCCESS,
	BUSINESS_INFO_POST_SUCCESS,
	BUSINESS_INFO_POST_FAIL,
	BRANCH_INFO_GET_FAIL,
	BRANCH_INFO_GET_SUCCESS,
	BRANCH_INFO_LOADING,
	BRANCH_INFO_POST_SUCCESS,
	BRANCH_INFO_POST_FAIL,
} from "../actions/types";

const business = (state = { info: null }, action) => {
	switch (action.type) {
		case BUSINESS_INFO_LOADING:
			return { ...state, loading: true };
		case BUSINESS_INFO_GET_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case BUSINESS_INFO_GET_FAIL:
			return { info: null, loading: false };
		case BUSINESS_INFO_POST_SUCCESS:
			return {
				...state,
				info: action.payload,
				loading: false,
				status: "success",
			};
		case BUSINESS_INFO_POST_FAIL:
			return {
				...state,
				loading: false,
				message: "Some Internal Error",
				status: "failed",
				error: action.error,
			};

		case BRANCH_INFO_LOADING:
			return { ...state, loading: true };
		case BRANCH_INFO_GET_SUCCESS:
			return { ...state, branch: action.payload, loading: false };
		case BRANCH_INFO_GET_FAIL:
			return { branch: null, loading: false };
		case BRANCH_INFO_POST_SUCCESS:
			return {
				...state,
				branch: action.payload,
				loading: false,
				status: "success",
			};
		case BRANCH_INFO_POST_FAIL:
			return {
				...state,
				loading: false,
				message: "Some Internal Error",
				status: "failed",
				error: action.error,
			};
		// case "BUSINESS_BRANCH_CREATE_SUCCESS":
		//   return {
		//     ...state,
		//     info: action.payload,
		//     loading: false,
		//     status: "success",
		//   };
		default:
			return state;
	}
};
export default business;

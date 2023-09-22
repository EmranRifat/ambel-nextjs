import {
	EMAIL_FORMAT_GET_FAIL,
	EMAIL_FORMAT_LOADING,
	EMAIL_FORMAT_GET_SUCCESS,
	EMAIL_FORMAT_POST_SUCCESS,
	EMAIL_FORMAT_POST_FAIL,
} from "../actions/types";

const emailFormat = (state = { info: null }, action) => {
	switch (action.type) {
		case EMAIL_FORMAT_LOADING:
			return { ...state, loading: true };
		case EMAIL_FORMAT_GET_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case EMAIL_FORMAT_GET_FAIL:
			return { info: null, loading: false };
		case EMAIL_FORMAT_POST_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case EMAIL_FORMAT_POST_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
export default emailFormat;

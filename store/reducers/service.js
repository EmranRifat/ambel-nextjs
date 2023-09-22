import {
	SERVICE_GET_FAIL,
	SERVICE_GET_SUCCESS,
	SERVICE_POST_FAIL,
	SERVICE_LOADING,
	SERVICE_POST_SUCCESS,
} from "../actions/types";

const service = (state = { info: null }, action) => {
	switch (action.type) {
		case SERVICE_LOADING:
			return { ...state, loading: true };
		case SERVICE_GET_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case SERVICE_GET_FAIL:
			return { info: null, loading: false };
		case SERVICE_POST_SUCCESS:
			return { ...state, service: action.service, loading: false };
		case SERVICE_POST_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
export default service;

import {
	SCHEDULE_GET_FAIL,
	SCHEDULE_GET_SUCCESS,
	SCHEDULE_POST_FAIL,
	SCHEDULE_LOADING,
	SCHEDULE_POST_SUCCESS,
} from "../actions/types";

const schedule = (state = { info: null }, action) => {
	switch (action.type) {
		case SCHEDULE_LOADING:
			return { ...state, loading: true };
		case SCHEDULE_GET_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case SCHEDULE_GET_FAIL:
			return { info: null, loading: false };
		case SCHEDULE_POST_SUCCESS:
			return {
				...state,
				info: action.payload,
				loading: false,
			};
		case SCHEDULE_POST_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
export default schedule;

import {
	ONLINEBOOKING_GET_FAIL,
	ONLINEBOOKING_GET_SUCCESS,
	ONLINEBOOKING_POST_FAIL,
	ONLINEBOOKING_LOADING,
	ONLINEBOOKING_POST_SUCCESS,
} from "../actions/types";

const onlineBooking = (state = { info: null }, action) => {
	switch (action.type) {
		case ONLINEBOOKING_LOADING:
			return { ...state, loading: true };
		case ONLINEBOOKING_GET_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case ONLINEBOOKING_GET_FAIL:
			return { info: null, loading: false };
		case ONLINEBOOKING_POST_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case ONLINEBOOKING_POST_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
export default onlineBooking;

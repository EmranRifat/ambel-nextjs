import {
	STAFF_GET_FAIL,
	STAFF_GET_SUCCESS,
	STAFF_POST_FAIL,
	STAFF_LOADING,
	STAFF_POST_SUCCESS,
} from "../actions/types";

const staff = (state = { staff: null }, action) => {
	switch (action.type) {
		case STAFF_LOADING:
			return { ...state, loading: true };
		case STAFF_GET_SUCCESS:
			return { ...state, staff: action.payload, loading: false };
		case STAFF_GET_FAIL:
			return { staff: null, loading: false };
		case STAFF_POST_SUCCESS:
			return { ...state, staff: action.staff, loading: false };
		case STAFF_POST_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
export default staff;

import {
	SCHEDULESETTINGS_GET_FAIL,
	SCHEDULESETTINGS_GET_SUCCESS,
	SCHEDULESETTINGS_POST_FAIL,
	SCHEDULESETTINGS_LOADING,
	SCHEDULESETTINGS_POST_SUCCESS,
} from "../actions/types";

const scheduleSettings = (state = { info: null }, action) => {
	switch (action.type) {
		case SCHEDULESETTINGS_LOADING:
			return { ...state, loading: true };
		case SCHEDULESETTINGS_GET_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case SCHEDULESETTINGS_GET_FAIL:
			return { info: null, loading: false };
		case SCHEDULESETTINGS_POST_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case SCHEDULESETTINGS_POST_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
export default scheduleSettings;

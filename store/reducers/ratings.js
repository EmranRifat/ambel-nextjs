import {
	RATINGS_GET_FAIL,
	RATINGS_GET_SUCCESS,
	RATINGS_POST_FAIL,
	RATINGS_LOADING,
	RATINGS_POST_SUCCESS,
} from "../actions/types";

const ratings = (state = { info: null }, action) => {
	switch (action.type) {
		case RATINGS_LOADING:
			return { ...state, loading: true };
		case RATINGS_GET_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case RATINGS_GET_FAIL:
			return { info: null, loading: false };
		case RATINGS_POST_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case RATINGS_POST_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
export default ratings;

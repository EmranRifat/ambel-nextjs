import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	HAS_TOKEN,
	LOADING,
} from "../actions/types";

const auth = (
	state = { token: null, authUser: null, isAuthenticated: false },
	action
) => {
	switch (action.type) {
		case LOADING:
			return { ...state, isLoading: true };
		case HAS_TOKEN:
			return {
				...state,
				token: action.payload,
				authUser: action.authUser,
				isAuthenticated: true,
				isLoading: false,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				token: action.payload,
				authUser: action.authUser,
				isAuthenticated: true,
				isLoading: false,
			};
		case LOGIN_FAIL:
			return {
				token: null,
				authUser: null,
				isAuthenticated: false,
				isLoading: false,
				error: action.error,
			};
		default:
			return state;
	}
};

export default auth;

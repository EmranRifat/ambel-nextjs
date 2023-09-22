import {
	DEPARTMENT_GET_FAIL,
	DEPARTMENT_GET_SUCCESS,
	DEPARTMENT_POST_FAIL,
	DEPARTMENT_LOADING,
	DEPARTMENT_POST_SUCCESS,
} from "../actions/types";

const department = (state = { info: null }, action) => {
	switch (action.type) {
		case DEPARTMENT_LOADING:
			return { ...state, loading: true };
		case DEPARTMENT_GET_SUCCESS:
			return { ...state, info: action.payload, loading: false };
		case DEPARTMENT_GET_FAIL:
			return { info: null, loading: false };
		case DEPARTMENT_POST_SUCCESS:
			return { ...state, department: action.department, loading: false };
		case DEPARTMENT_POST_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
export default department;

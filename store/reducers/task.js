import {
	TASK_GET_FAIL,
	TASK_GET_SUCCESS,
	TASK_POST_FAIL,
	TASK_LOADING,
	TASK_POST_SUCCESS,
} from "../actions/types";

const task = (state = { task: null }, action) => {
	switch (action.type) {
		case TASK_LOADING:
			return { ...state, loading: true };
		case TASK_GET_SUCCESS:
			return { ...state, task: action.payload, loading: false };
		case TASK_GET_FAIL:
			return { task: null, loading: false };
		case TASK_POST_SUCCESS:
			return { ...state, task: action.task, loading: false };
		case TASK_POST_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
export default task;

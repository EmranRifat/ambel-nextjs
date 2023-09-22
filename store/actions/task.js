import axios from "../../utils/axios";
import cookie from "js-cookie";

import {
	TASK_LOADING,
	TASK_GET_SUCCESS,
	TASK_GET_FAIL,
	TASK_POST_FAIL,
	TASK_POST_SUCCESS,
} from "./types";

export const onCancelAction = () => async (dispatch) => {
	dispatch({ type: TASK_POST_FAIL });
};

export const getTask = () => async (dispatch) => {
	dispatch({ type: TASK_LOADING });
	const res = await axios.get("task", {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		// console.log(res.data.data);
		dispatch({ type: TASK_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: TASK_GET_FAIL });
	}
};

export const taskUpdate = (taskData, taskSettingId) => async (dispatch) => {
	dispatch({ type: TASK_LOADING });
	const res = taskSettingId
		? await axios.patch(`/task/${taskSettingId}`, taskData, {
			withCredentials: true,
			headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		})
		: await axios.post(`/task`, taskData, {
			withCredentials: true,
			headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		});
	if (res.data.status === "success") {
		// dispatch({
		// 	type: TASK_POST_SUCCESS,
		// 	task: res.data.data.doc,
		// });
	} else {
		dispatch({ type: TASK_POST_FAIL });
	}
};

export const updateSubTask = (subTaskStatus, taskId, subTaskId) => async (dispatch) => {
	dispatch({ type: TASK_LOADING });
	const res = await axios.patch(
		`/task/subtask/${taskId}`,
		{ subTaskStatus, subTaskId },
		{
			withCredentials: true,
			headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		}
	);

	if (res.data.status === "success") {
		// dispatch({
		// 	type: TASK_POST_SUCCESS,
		// 	task: res.data.data.doc,
		// });
	} else {
		dispatch({ type: TASK_POST_FAIL });
	}
};
import axios from "../../utils/axios";
import cookie from "js-cookie";

import {
	SCHEDULE_LOADING,
	SCHEDULE_GET_SUCCESS,
	SCHEDULE_GET_FAIL,
	SCHEDULE_POST_FAIL,
	SCHEDULE_POST_SUCCESS,
} from "./types";

export const getSchedule = () => async (dispatch) => {
	dispatch({ type: SCHEDULE_LOADING });
	const res = await axios.get("/schedule/getScheduleByUser", {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		dispatch({ type: SCHEDULE_GET_SUCCESS, payload: res.data?.data?.data });
	} else {
		dispatch({ type: SCHEDULE_GET_FAIL });
	}
};

export const scheduleCreateOrUpdate = (scheduleData) => async (dispatch) => {
	dispatch({ type: SCHEDULE_LOADING });
	const res = scheduleData._id
		? await axios.patch(`/schedule/${scheduleData._id}`, scheduleData, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		  })
		: await axios.post(`/schedule`, scheduleData, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		  });
	if (res.data.status === "success") {
		dispatch({
			type: SCHEDULE_POST_SUCCESS,
			payload: res.data?.data?.data,
		});
	} else {
		dispatch({ type: SCHEDULE_POST_FAIL });
	}
};

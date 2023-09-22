import {
	SINGLE_USER_GET_SUCCESS,
	SINGLE_USER_FAIL,
	SINGLE_USER_GET_FAIL,
	SINGLE_USER_LOADING,
	SINGLE_USER_SUCCESS,
	USER_SCHEDULE_SETTING_GET_FAIL,
	USER_SCHEDULE_SETTING_GET_SUCCESS,
	USER_SCHEDULE_SETTING_LOADING,
	USER_SCHEDULE_SETTING_POST_SUCCESS,
	USER_SCHEDULE_SETTING_POST_FAIL,
} from "./types";
import axios from "../../utils/axios";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";


export const getSingleUser = () => async (dispatch) => {
	dispatch({ type: SINGLE_USER_LOADING });
	try {
		if (cookie.get("jwt")) {
			// @ts-ignore
			const id = jwtDecode(cookie.get("jwt"))?.id;
			axios
				.get(`/users/${id}`, {
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				})
				.then((res) => {
					if (res?.data?.status === "success") {
						dispatch({
							type: SINGLE_USER_GET_SUCCESS,
							payload: res?.data?.data,
						});
					} else {
						dispatch({ type: SINGLE_USER_GET_FAIL });
					}
				})
				.catch((err) => {
					dispatch({
						type: SINGLE_USER_GET_FAIL,
					});
				});
		}
	} catch (error) {
		dispatch({ type: SINGLE_USER_GET_FAIL });
	}
};

export const updateSingleUser = (data) => async (dispatch) => {
	dispatch({ type: SINGLE_USER_LOADING });
	try {
		if (cookie.get("jwt")) {
			axios
				.patch(`/users/updateUser`, data, {
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${cookie.get("jwt")}`,
					},
				})
				.then((res) => {
					if (res?.data?.status === "success") {
						dispatch({
							type: SINGLE_USER_SUCCESS,
							payload: res.data?.data?.user,
						});
					} else {
						dispatch({ type: SINGLE_USER_FAIL });
					}
				})
				.catch((err) => {
					dispatch({
						type: SINGLE_USER_FAIL,
					});
				});
		}
	} catch (error) {
		dispatch({ type: SINGLE_USER_FAIL });
	}
};

export const getUserScheduleSetting = () => async (dispatch) => {
	dispatch({ type: USER_SCHEDULE_SETTING_LOADING });
	try {
		if (cookie.get("jwt")) {
			// @ts-ignore
			const id = jwtDecode(cookie.get("jwt"))?.id;
			axios
				.get(`/userschedulesetting`, {
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				})
				.then((res) => {
					if (res?.data?.status === "success") {
						dispatch({
							type: USER_SCHEDULE_SETTING_GET_SUCCESS,
							payload: res?.data?.data,
						});
					} else {
						dispatch({ type: USER_SCHEDULE_SETTING_GET_FAIL });
					}
				})
				.catch((err) => {
					dispatch({
						type: USER_SCHEDULE_SETTING_GET_FAIL,
					});
				});
		}
	} catch (error) {
		dispatch({ type: USER_SCHEDULE_SETTING_GET_FAIL });
	}
};

export const updateUserScheduleSetting = (data) => async (dispatch) => {
	dispatch({ type: USER_SCHEDULE_SETTING_LOADING });
	try {
		if (cookie.get("jwt")) {
			// @ts-ignore
			const id = jwtDecode(cookie.get("jwt"))?.id;
			axios
				.patch(`/userschedulesetting`, data, {
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${cookie.get("jwt")}`,
					},
				})
				.then((res) => {
					if (res?.data?.status === "success") {
						dispatch({
							type: USER_SCHEDULE_SETTING_POST_SUCCESS,
							payload: res?.data?.data,
						});
					} else {
						dispatch({ type: USER_SCHEDULE_SETTING_POST_FAIL });
					}
				})
				.catch((err) => {
					dispatch({
						type: USER_SCHEDULE_SETTING_POST_FAIL,
					});
				});
		}
	} catch (error) {
		dispatch({ type: USER_SCHEDULE_SETTING_POST_FAIL });
	}
};

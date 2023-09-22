import axios from "../../utils/axios";
import cookie from "js-cookie";

import {
	SCHEDULESETTINGS_LOADING,
	SCHEDULESETTINGS_GET_SUCCESS,
	SCHEDULESETTINGS_GET_FAIL,
	SCHEDULESETTINGS_POST_FAIL,
	SCHEDULESETTINGS_POST_SUCCESS,
} from "./types";


export const onCancelAction = () => async (dispatch) => {
	dispatch({ type: SCHEDULESETTINGS_POST_FAIL });
};

export const getScheduleSettings = (businessId) => async (dispatch) => {
	dispatch({ type: SCHEDULESETTINGS_LOADING });
	const res = await axios.get(`view/schedulesetting?business=${businessId}`, {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		dispatch({ type: SCHEDULESETTINGS_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: SCHEDULESETTINGS_GET_FAIL });
	}
};

export const scheduleSettingsUpdate =
	(onlineBookData, onlineBookDataID) => async (dispatch) => {
		dispatch({ type: SCHEDULESETTINGS_LOADING });
		const res = onlineBookDataID
			? await axios.patch(
				`/schedulesettings/${onlineBookDataID}`,
				onlineBookData,
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				}
			)
			: await axios.post(`/schedulesettings`, onlineBookData, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
		if (res.data.status === "success") {
			// console.log(res.data.data);
			dispatch({
				type: SCHEDULESETTINGS_POST_SUCCESS,
				payload: {
					scheduleSetting: res.data.data.doc,
				},
			});
		} else {
			dispatch({ type: SCHEDULESETTINGS_POST_FAIL });
		}
	};

import axios from "../../utils/axios";
import cookie from "js-cookie";

import {
	STAFF_LOADING,
	STAFF_GET_SUCCESS,
	STAFF_GET_FAIL,
	STAFF_POST_FAIL,
	STAFF_POST_SUCCESS,
} from "./types";


export const onCancelAction = () => async (dispatch) => {
	dispatch({ type: STAFF_POST_FAIL });
}

export const getStaff = () => async (dispatch) => {
	dispatch({ type: STAFF_LOADING });
	const res = await axios.get("staff", {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		dispatch({ type: STAFF_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: STAFF_GET_FAIL });
	}
};

export const staffUpdate =
	(staffData, staffSettingId) => async (dispatch) => {
		dispatch({ type: STAFF_LOADING });
		const res = staffSettingId
			? await axios.patch(
				`/staff/${staffSettingId}`,
				staffData,
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				}
			)
			: await axios.post(`/staff`, staffData, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
		if (res.data.status === "success") {
			dispatch({
				type: STAFF_POST_SUCCESS,
				staff: res.data.data.doc,
			});
		} else {
			dispatch({ type: STAFF_POST_FAIL });
		}
	};

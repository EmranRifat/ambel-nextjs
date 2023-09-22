import axios from "../../utils/axios";
import cookie from "js-cookie";

import {
	RATINGS_LOADING,
	RATINGS_GET_SUCCESS,
	RATINGS_GET_FAIL,
	RATINGS_POST_FAIL,
	RATINGS_POST_SUCCESS,
} from "./types";

export const onCancelAction = () => async (dispatch) => {
	dispatch({ type: RATINGS_POST_FAIL });
};

export const getRatingSettings = () => async (dispatch) => {
	dispatch({ type: RATINGS_LOADING });
	const res = await axios.get("view/ratingsetting", {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		dispatch({ type: RATINGS_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: RATINGS_GET_FAIL });
	}
};

export const ratingSettingsUpdate =
	(ratingsData, ratingsSettingId) => async (dispatch) => {
		dispatch({ type: RATINGS_LOADING });
		const res = ratingsSettingId
			? await axios.patch(`/ratingsetting/${ratingsSettingId}`, ratingsData, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			})
			: await axios.post(`/ratingsetting`, ratingsData, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
		if (res.data.status === "success") {
			// console.log(res.data.data);
			dispatch({
				type: RATINGS_POST_SUCCESS,
				payload: {
					ratingsSetting: res.data.data.doc,
				},
			});
		} else {
			dispatch({ type: RATINGS_POST_FAIL });
		}
	};

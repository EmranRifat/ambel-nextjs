import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
	ONLINEBOOKING_GET_FAIL,
	ONLINEBOOKING_GET_SUCCESS,
	ONLINEBOOKING_POST_FAIL,
	ONLINEBOOKING_LOADING,
	ONLINEBOOKING_POST_SUCCESS,
} from "./types";


export const onCancelAction = () => async (dispatch) => {
	dispatch({ type: ONLINEBOOKING_POST_FAIL });
};

export const onlineBookingInfo = () => async (dispatch) => {
	dispatch({ type: ONLINEBOOKING_LOADING });
	const res = await axios.get("view/onlinebookingsetting", {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	// console.log(res.data.data);
	if (res.data.status === "success") {
		dispatch({ type: ONLINEBOOKING_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: ONLINEBOOKING_GET_FAIL });
	}
};

export const onlineBookingUpdate =
	(onlineBookData, onlineBookDataID) => async (dispatch) => {
		dispatch({ type: ONLINEBOOKING_LOADING });
		const res = onlineBookDataID
			? await axios.patch(
				`/onlinebookingsetting/${onlineBookDataID}`,
				onlineBookData,
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				}
			)
			: await axios.post(`/onlinebookingsetting`, onlineBookData, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
		if (res.data.status === "success") {
			// console.log(res.data.data);
			dispatch({
				type: ONLINEBOOKING_POST_SUCCESS,
				payload: {
					bookingData: res.data.data,
				},
			});
		} else {
			dispatch({ type: ONLINEBOOKING_POST_FAIL });
		}
	};

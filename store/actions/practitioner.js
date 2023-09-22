import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
	PRACTITIONER_INFO_GET_FAIL,
	PRACTITIONER_INFO_GET_SUCCESS,
	PRACTITIONER_INFO_LOADING
} from "./types";


export const getPractitionerInfo = () => async (dispatch) => {
	dispatch({ type: PRACTITIONER_INFO_LOADING });
	try {
	} catch (error) {
		dispatch({ type: PRACTITIONER_INFO_GET_FAIL });
	}
	if (cookie.get("jwt")) {
		axios
			.get("view/practitionerinfo", {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			})
			.then((res) => {
				if (res?.data?.status === "success") {
					dispatch({
						type: PRACTITIONER_INFO_GET_SUCCESS,
						payload: res?.data?.data,
					});
				} else {
					dispatch({ type: PRACTITIONER_INFO_GET_FAIL });
				}
			})
			.catch((err) => {
				dispatch({
					type: PRACTITIONER_INFO_GET_FAIL,
				});
			});
	} else {
		dispatch({ type: PRACTITIONER_INFO_GET_FAIL });
	}
};
import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
	USER_INFO_GET_FAIL,
	USER_INFO_GET_SUCCESS,
	USER_INFO_LOADING,
	USER_INFO_POST_FAIL,
	USER_INFO_POST_SUCCESS,
} from "./types";

export const onCancelAction = () => async (dispatch) => {
	dispatch({ type: USER_INFO_POST_FAIL });
};

export const getUserInfo = () => async (dispatch) => {
	// console.log("getUserInfo");
	dispatch({ type: USER_INFO_LOADING });
	try {
	} catch (error) {
		dispatch({ type: USER_INFO_GET_FAIL });
	}
	if (cookie.get("jwt")) {
		axios
			.get("users/getSingleUser", {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			})
			.then((res) => {
				if (res?.data?.status === "success") {
					// console.log(res?.data?.data);
					dispatch({
						type: USER_INFO_GET_SUCCESS,
						payload: res?.data?.data,
					});
				} else {
					dispatch({ type: USER_INFO_GET_FAIL });
				}
			})
			.catch((err) => {
				// console.log(err);
				dispatch({
					type: USER_INFO_GET_FAIL,
				});
			});
	} else {
		dispatch({ type: USER_INFO_GET_FAIL });
	}
};

export const updateUserInfo = (userData) => async (dispatch) => {
	dispatch({ type: USER_INFO_LOADING });
	const res = await axios.patch(`/users/updateUser`, userData, {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		dispatch({
			type: USER_INFO_POST_SUCCESS,
			payload: {
				user: res.data?.data?.user,
			},
		});
	} else {
		dispatch({ type: USER_INFO_POST_FAIL });
	}
};

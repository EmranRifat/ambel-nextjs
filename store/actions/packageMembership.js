import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
	PACKAGEMEMBERSHIP_GET_FAIL,
	PACKAGEMEMBERSHIP_GET_SUCCESS,
	PACKAGEMEMBERSHIP_POST_FAIL,
	PACKAGEMEMBERSHIP_LOADING,
	PACKAGEMEMBERSHIP_POST_SUCCESS,
} from "./types.js";


export const onCancelAction = () => async (dispatch) => {
	dispatch({ type: PACKAGEMEMBERSHIP_POST_FAIL });
};

export const getPackages = () => async (dispatch) => {
	dispatch({ type: PACKAGEMEMBERSHIP_LOADING });
	const res = await axios.get(`/package?_id=${cookie.get("currentOrganization")}`, {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		dispatch({ type: PACKAGEMEMBERSHIP_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: PACKAGEMEMBERSHIP_GET_FAIL });
	}
};

export const packageMembershipInfo = () => async (dispatch) => {
	dispatch({ type: PACKAGEMEMBERSHIP_LOADING });
	const res = await axios.get("URL for Getting info", {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	// console.log(res.data.data);
	if (res.data.status === "success") {
		dispatch({ type: PACKAGEMEMBERSHIP_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: PACKAGEMEMBERSHIP_GET_FAIL });
	}
};
export const  createPackage = (packageData) => async (dispatch) => {
	dispatch({ type: PACKAGEMEMBERSHIP_LOADING });
	const res = await axios.post(`/package?_id=${cookie.get("currentOrganization")}`, packageData, {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		// console.log(res.data.data);
		dispatch({
			type: PACKAGEMEMBERSHIP_POST_SUCCESS,
			payload: {
				packageData: res.data.data,
			},
		});
	} else {
		dispatch({ type: PACKAGEMEMBERSHIP_POST_FAIL });
	}
};
export const packageMembershipUpdate =
	(packageMemebershipData, packageMemebershipDataID) => async (dispatch) => {
		dispatch({ type: PACKAGEMEMBERSHIP_LOADING });
		const res = packageMemebershipDataID
			? await axios.patch(
				`/URL for patch/${packageMemebershipDataID}`,
				packageMemebershipData,
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				}
			)
			: await axios.post("/URL for post", packageMemebershipData, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
		if (res.data.status === "success") {
			// console.log(res.data.data);
			dispatch({
				type: PACKAGEMEMBERSHIP_POST_SUCCESS,
				payload: {
					packageMemebershipData: res.data.data,
				},
			});
		} else {
			dispatch({ type: PACKAGEMEMBERSHIP_POST_FAIL });
		}
	};

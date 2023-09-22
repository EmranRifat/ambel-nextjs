import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
	USERFAMILYORG_GET_FAIL,
	USERFAMILYORG_GET_SUCCESS,
	USERFAMILYORG_POST_FAIL,
	USERFAMILYORG_LOADING,
	USERFAMILYORG_POST_SUCCESS,
	FAMILYORGMEMBER_POST_FAIL,
	FAMILYORGMEMBER_LOADING,
	FAMILYORGMEMBER_POST_SUCCESS,
} from "./types.js";


export const getUserFamilyOrg = () => async (dispatch) => {
	dispatch({ type: USERFAMILYORG_LOADING });
	const res = await axios.get("/userfamilyorg", {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		dispatch({ type: USERFAMILYORG_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: USERFAMILYORG_GET_FAIL });
	}
};

export const updateFamilyOrg =
	(familyOrgData, familyOrgId) => async (dispatch) => {
		dispatch({ type: USERFAMILYORG_LOADING });
		const res = familyOrgId
			? await axios.patch(`/userfamilyorg/${familyOrgId}`, familyOrgData, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			})
			: await axios.post(`/userfamilyorg`, familyOrgData, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
		if (res.data.status === "success") {
			dispatch({
				type: USERFAMILYORG_POST_SUCCESS,
				// department: res.data.data.doc,
			});
		} else {
			dispatch({ type: USERFAMILYORG_POST_FAIL });
		}
	};

// create
export const addFaimlyOrgMember = (member, familyOrgID) => async (dispatch) => {
	dispatch({ type: FAMILYORGMEMBER_LOADING });
	const res = await axios.post(`/userfamilyorg/${familyOrgID}`, member, {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		dispatch({
			type: FAMILYORGMEMBER_POST_SUCCESS,
			familyOrgMember: res.data.data,
		});
	} else {
		dispatch({ type: FAMILYORGMEMBER_POST_FAIL });
	}
};
// get family or Organization's members....
export const getUserFamilyOrgMember = (familyOrgId) => async (dispatch) => {
	dispatch({ type: FAMILYORGMEMBER_LOADING });
	const res = await axios.get(`/userfamilyorg/${familyOrgId}`, {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	if (res.data.status === "success") {
		dispatch({ type: USERFAMILYORG_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: USERFAMILYORG_GET_FAIL });
	}
};
// update
export const updateFaimlyOrgMember = (member, memberId) => async (dispatch) => {
	dispatch({ type: USERFAMILYORG_LOADING });
	const res = await axios.put(`/userfamilyorg/${memberId}`, member, {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});

	if (res.data.status === "success") {
		dispatch({
			type: FAMILYORGMEMBER_POST_SUCCESS,
			// department: res.data.data.doc,
		});
	} else {
		dispatch({ type: FAMILYORGMEMBER_POST_FAIL });
	}
};
export const deleteFaimlyOrgMember =
	(memberId, familyOrgId) => async (dispatch) => {
		dispatch({ type: USERFAMILYORG_LOADING });
		const res = await axios.delete(
			`/userfamilyorg/${familyOrgId}/${memberId}`,
			{
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			}
		);
		// if (res.data.status === "success") {
		//   dispatch({
		//     type: FAMILYORGMEMBER_POST_SUCCESS,
		//     // department: res.data.data.doc,
		//   });
		// } else {
		//   dispatch({ type: FAMILYORGMEMBER_POST_FAIL });
		// }
	};

// get single member
export const getSingleMember = (memberId) => async (dispatch) => {
	dispatch({ type: USERFAMILYORG_LOADING });
	const res = await axios.get(`/userfamilyorg/${memberId}`, {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	// console.log(res.data);
	if (res.data.status === "success") {
		dispatch({ type: USERFAMILYORG_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: USERFAMILYORG_GET_FAIL });
	}
};

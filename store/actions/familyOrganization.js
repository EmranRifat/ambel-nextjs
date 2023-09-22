import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
	FAMILYORGANIZATION_GET_FAIL,
	FAMILYORGANIZATION_GET_SUCCESS,
	FAMILYORGANIZATION_POST_FAIL,
	FAMILYORGANIZATION_LOADING,
	FAMILYORGANIZATION_POST_SUCCESS,
} from "./types";


export const onCancelAction = () => async (dispatch) => {
	dispatch({ type: FAMILYORGANIZATION_POST_FAIL });
};

export const familyOrganiztionInfo = () => async (dispatch) => {
	dispatch({ type: FAMILYORGANIZATION_LOADING });
	const res = await axios.get("/familysetting", {
		withCredentials: true,
		headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
	});
	// console.log(res.data.data);
	if (res.data.status === "success") {
		dispatch({ type: FAMILYORGANIZATION_GET_SUCCESS, payload: res.data.data });
	} else {
		dispatch({ type: FAMILYORGANIZATION_GET_FAIL });
	}
};

export const familyOrganizationUpdate =
	(familyOrganizationData, familyOrganizationDataID) => async (dispatch) => {
		dispatch({ type: FAMILYORGANIZATION_LOADING });
		const res = familyOrganizationDataID
			? await axios.patch(
				`/familysetting/${familyOrganizationDataID}`,
				familyOrganizationData,
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				}
			)
			: await axios.post("/familysetting", familyOrganizationData, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
		if (res.data.status === "success") {
			dispatch({
				type: FAMILYORGANIZATION_POST_SUCCESS,
				payload: {
					familyOrganizationData: res.data.data,
				},
			});
		} else {
			dispatch({ type: FAMILYORGANIZATION_POST_FAIL });
		}
	};

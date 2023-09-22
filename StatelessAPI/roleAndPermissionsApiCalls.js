import axios from "../utils/axios";
import cookie from "js-cookie";

export const getRoleList = async (businessId) => {
	try {
		const res = await axios.post(
			`/roleAndPermissions/getRoleList`,
			{
				organizationId: businessId,
			},
			{
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			}
		);

		const reversedData = res.data.data.roleList;
		// console.log(reversedData);
		return reversedData;
	} catch (error) {
		// console.log(error);
		return [];
	}
};

export const createRole = async (role) => {
	try {
		const res = await axios.post(`/roleAndPermissions/createRole`, role, {
			withCredentials: true,
			headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		});

		return res;
	} catch (error) {
		// console.log(error);
		return [];
	}
};

export const updateRole = async (role, roleId) => {
	const newRole = {
		...role,
	};
	// console.log(roleId);
	try {
		const res = await axios.put(
			`/roleAndPermissions/updateRole/${roleId}`,
			newRole,
			{
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			}
		);
		return res;
	} catch (error) {
		// console.log(error);
		return [];
	}
};

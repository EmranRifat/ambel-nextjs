import axios from "../utils/axios";
import cookie from "js-cookie";

export const getStaffs = async (businessId) => {
	try {
		const res = await axios.get(`/staff?organization=${businessId}`, {
			withCredentials: true,
			headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		});

		const reversedData = res.data.data.reverse();
		// console.log(reversedData);
		return reversedData;
	} catch (error) {
		// console.log(error);
		return [];
	}
};

export const getEmployees = async (businessId) => {
	try {
		const res = await axios.get(
			`/staff/getEmployees?organization=${businessId}`,
			{
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			}
		);

		const reversedData = res.data.data.reverse();
		// console.log(res.data);
		return reversedData;
	} catch (error) {
		// console.log(error);
		return [];
	}
};
export const inviteStaff = async (data) => {
	try {
		const res = await axios.post("/staff/invite", data, {
			withCredentials: true,
			headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		});
		// console.log(res.data);
		return res.data;
	} catch (error) {
		return {
			status: "error",
			message: error.response.statusText || "Something went wrong",
		};
	}
};

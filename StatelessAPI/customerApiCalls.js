import axios from "../utils/axios";
import cookie from "js-cookie";

export const getCustomers = async (businessId) => {
	try {
		const res = await axios.get(
			`/customer/getCustomers?organization=${businessId}`,
			{
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			}
		);

		const reversedData = res.data.data.reverse();
		// console.log(reversedData);
		return reversedData;
	} catch (error) {
		// console.log(error);
		return [];
	}
};

export const inviteCustomer = async (data) => {
	try {
		const res = await axios.post("/customer/invite", data, {
			withCredentials: true,
			headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		});
		if (res.data.status === "success") {
			return res.data.data;
		}
		return null;
	} catch (error) {
		// console.log(error);
		return null;
	}
};

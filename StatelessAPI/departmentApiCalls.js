import axios from "../utils/axios";
import cookie from "js-cookie";

export const getAllDepartments = async (businessId) => {
  try {
    const res = await axios.get(`/department?id=${businessId}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    });
    const reversedData = res?.data?.data?.data?.doc || [];
    return reversedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

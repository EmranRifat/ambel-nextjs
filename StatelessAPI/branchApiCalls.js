import axios from "../utils/axios";
import cookie from "js-cookie";
export const getBranches = async (businessId) => {
  try {
    const res = await axios.get(`/branch?business=${businessId}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    });

    const reversedData = res.data.data.data.reverse();
    // console.log(reversedData);
    return reversedData;
  } catch (error) {
    // console.log(error);
    return [];
  }
};

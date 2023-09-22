import axios from "../utils/axios";
import cookie from "js-cookie";

export const getPractitioners = async (businessId) => {
  try {
    const res = await axios.get(`/practitioner?organization=${businessId}`, {
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

export const invitePractitioner = async (data) => {
  try {
    const res = await axios.post("/practitioner/invite", data, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    });
    return res.data;
  } catch (error) {
    return {
      status: "error",
      message: error.response.statusText || "Something went wrong",
    };
  }
};

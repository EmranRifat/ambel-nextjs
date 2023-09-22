import axios from "../utils/axios";
import cookie from "js-cookie";

export const getAllDiscounts = async (businessId) => {
  try {
    const res = await axios.get(`/payment/getAllDiscount?organization=${businessId}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    });
    const reversedData = res?.data?.data?.discounts || [];
    return reversedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createDiscount = async (discount) => {
  try {
    const res = await axios.post(`/payment/createDiscount`, discount, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    });

    return res;
  } catch (error) {
    // console.log(error);
    return [];
  }
};
export const updateDiscount = async (discount, discountId) => {
  try {
    const res = await axios.put(`/payment/updateDiscount/${discountId}`, discount, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    });

    return res;
  } catch (error) {
    // console.log(error);
    return [];
  }
};
export const deleteDiscount = async (discountId) => {
  try {
    const res = await axios.delete(`/payment/deleteDiscount/${discountId}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    });

    return res;
  } catch (error) {
    // console.log(error);
    return [];
  }
};
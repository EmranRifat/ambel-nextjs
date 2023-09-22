import axios from "../../utils/axios";
import cookie from "js-cookie";
import Axios from "axios";
import {
  BRANCH_INFO_LOADING,
  BRANCH_INFO_POST_FAIL,
  BRANCH_INFO_POST_SUCCESS,
  BUSINESS_INFO_GET_FAIL,
  BUSINESS_INFO_GET_SUCCESS,
  BUSINESS_INFO_LOADING,
  BUSINESS_INFO_POST_FAIL,
  BUSINESS_INFO_POST_SUCCESS,
} from "./types";
import { setCookie } from "./auth";
import jwtDecode from "jwt-decode";
import Router from "next/router";

export const onCancelAction = () => async (dispatch) => {
  dispatch({ type: BUSINESS_INFO_POST_FAIL });
};

export const getBusinessInfo = () => async (dispatch) => {
  // console.log("getBusinessInfo called");
  dispatch({ type: BUSINESS_INFO_LOADING });
  try {
  } catch (error) {
    dispatch({ type: BUSINESS_INFO_GET_FAIL });
  }
  if (cookie.get("jwt") && cookie.get("currentOrganization")) {
    axios
      .get(`view/businessinfo?_id=${cookie.get("currentOrganization")}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          dispatch({
            type: BUSINESS_INFO_GET_SUCCESS,
            payload: res?.data?.data,
          });
        } else {
          dispatch({ type: BUSINESS_INFO_GET_FAIL });
        }
      })
      // @ts-ignore
      .catch((err) => {
        dispatch({
          type: BUSINESS_INFO_GET_FAIL,
        });
      });
  } else {
    dispatch({ type: BUSINESS_INFO_GET_FAIL });
  }
};

const uploadToServer = (requests) => async (dispatch) => {
  dispatch({ type: BUSINESS_INFO_LOADING });
  Axios.all(requests)
    .then(async (response) => {
      // console.log(response);
      dispatch({ type: BUSINESS_INFO_POST_SUCCESS });
      const token = response[0]?.data?.data?.token;
      setCookie("jwt", token);
      // console.log(response[0]?.data?.data);
      if (response[0].data.data.user.userType == "User or Member") {
        Router.push("/user-dashboard");
      }

      // redirect to dashboard after successful login
    })
    .catch((error) => {
      // console.log(error);
      dispatch({ type: BUSINESS_INFO_POST_FAIL });
    });
};

export const upadateBusiness =
  (type, userData, businessId, practitionerId) => async (dispatch) => {
    const requests = [];
    userData["User or Member"].userType = type;
    userData["User or Member"].registrationComplete = true;

    if (
      type !== "Professionalist" &&
      type !== "Practitioner" &&
      type !== "Business" &&
      type !== "Organization"
    ) {
      requests.push(
        axios.patch(`/users/updateUser`, userData["User or Member"], {
          withCredentials: true,
          headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
        })
      );
      dispatch(uploadToServer(requests));
    } else {
      requests.push(
        axios.patch(`/users/updateUser`, userData["User or Member"], {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookie.get("jwt")}`,
          },
        })
      );

      if (businessId || practitionerId) {
        requests.push(
          axios.put(
            `/${type === "Business" || type === "Organization"
              ? "business"
              : "practitioner"
            }/${businessId ? businessId : practitionerId}`,
            userData[type],
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${cookie.get("jwt")}`,
              },
            }
          )
        );
      } else {
        requests.push(
          axios.post(
            `/${type === "Business" || type === "Organization"
              ? "business"
              : "practitioner"
            }`,
            userData[type],
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${cookie.get("jwt")}`,
              },
            }
          )
        );
      }
      dispatch(uploadToServer(requests));
    }
  };
export const updateBusinessInfo =
  (businessInfo, businessId) => async (dispatch) => {
    dispatch({ type: BUSINESS_INFO_LOADING });
    const res = await axios.put(`/business/${businessId}`, businessInfo, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    });
    if (res.data.status === "success") {
      dispatch({
        type: BUSINESS_INFO_POST_SUCCESS,
        payload: {
          business: res.data.data.doc,
        },
      });
    } else {
      dispatch({ type: BUSINESS_INFO_POST_FAIL });
    }
  };

export const updateBusinessIntegration =
  (businessInfo, businessId) => async (dispatch) => {
    dispatch({ type: BUSINESS_INFO_LOADING });
    const res = await axios.put(`/business/inte/${businessId}`, businessInfo, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    });
    if (res.data.status === "success") {
      dispatch({
        type: BUSINESS_INFO_POST_SUCCESS,
        payload: {
          business: res.data.data.doc,
        },
      });
    } else {
      dispatch({ type: BUSINESS_INFO_POST_FAIL });
    }
  };

export const getAllBranches = (businessId) => async (dispatch) => { };

export const createBusinessBranch = (branchInfo) => async (dispatch) => {
  dispatch({ type: BRANCH_INFO_LOADING });
  // console.log(branchInfo);
  try {
    let res;
    if (branchInfo._id) {
      res = await axios.put(
        `/branch/update-branch/${branchInfo._id}`,
        branchInfo,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
        }
      );
    } else {
      res = await axios.post(`/branch/create-branch`, branchInfo, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      });
    }

    if (res.data.status === "success") {
      dispatch({
        type: BRANCH_INFO_POST_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({ type: BRANCH_INFO_POST_FAIL });
    }
  } catch (e) {
    dispatch({
      type: BRANCH_INFO_POST_FAIL,
      error: "error",
    });
  }
};

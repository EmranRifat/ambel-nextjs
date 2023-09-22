import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
  FINES_GET_FAIL,
  FINES_GET_SUCCESS,
  FINES_LOADING,
  FINES_PATCH_FAIL,
  FINES_PATCH_SUCCESS,
  FINES_POST_FAIL,
  FINES_POST_SUCCESS,
} from "./types";
import { getBranches } from "../../StatelessAPI/branchApiCalls";

export const getFines = () => async (dispatch) => {
  dispatch({ type: FINES_LOADING });
  const res = await axios.get(
    `/fines?id=${cookie.get("currentOrganization")}`,
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    }
  );
  const tempBranch = await getBranches(cookie.get("currentOrganization"));
  let branches = tempBranch.map((branch) => {
    return { name: branch.name, _id: branch._id };
  });
  if (res.data.status === "success") {
    let data = res.data.data;
    data.branches = branches;
    dispatch({ type: FINES_GET_SUCCESS, payload: data });
  } else {
    dispatch({ type: FINES_GET_FAIL });
  }
};

export const finesCreate = (finesData) => async (dispatch) => {
  dispatch({ type: FINES_LOADING });
  const res = await axios.post(
    `/fines?id=${cookie.get("currentOrganization")}`,
    finesData,
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    }
  );
  if (res.data.status === "success") {
    let data = res.data.data;
    dispatch({ type: FINES_POST_SUCCESS, payload: data });
  } else {
    dispatch({ type: FINES_POST_FAIL });
  }
};

export const deleteFines = (id) => async (dispatch) => {
  dispatch({ type: FINES_LOADING });
  const res = await axios.delete(
    `/fines/${id}?id=${cookie.get("currentOrganization")}`,
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    }
  );
  if (res.data.status === "success") {
    dispatch({ type: FINES_PATCH_SUCCESS, payload: res.data.data });
  } else {
    dispatch({ type: FINES_PATCH_FAIL });
  }
};

export const updateFines = (id, finesData) => async (dispatch) => {
  dispatch({ type: FINES_LOADING });
  const res = await axios.patch(
    `/fines/${id}?id=${cookie.get("currentOrganization")}`,
    finesData,
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    }
  );
  if (res.data.status === "success") {
    return
  } else {
    dispatch({ type: FINES_PATCH_FAIL });
  }
};

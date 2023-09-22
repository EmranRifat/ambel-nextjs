import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
  TAX_LOADING,
  TAX_GET_SUCCESS,
  TAX_GET_FAIL,
  TAX_POST_FAIL,
  TAX_POST_SUCCESS,
  TAX_PATCH_FAIL,
  TAX_PATCH_SUCCESS,
} from "./types";
import { getBranches } from "../../StatelessAPI/branchApiCalls";

export const getTax = () => async (dispatch) => {
  dispatch({ type: TAX_LOADING });
  const res = await axios.get(
    `tax/get-taxs?id=${cookie.get("currentOrganization")}`,
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    }
  );
  const tempBranch = await getBranches(cookie.get("currentOrganization"));
  // map only name and id of branches
  let branches = tempBranch.map((branch) => {
    return { name: branch.name, _id: branch._id };
  });
  if (res.data.status === "success") {
    let data = res.data.data;
    data.branches = branches;
    dispatch({ type: TAX_GET_SUCCESS, payload: data });
  } else {
    dispatch({ type: TAX_GET_FAIL });
  }
};

export const taxCreate = (taxData) => async (dispatch) => {
  dispatch({ type: TAX_LOADING });
  const res = await axios.post(
    `tax/create-tax?id=${cookie.get("currentOrganization")}`,
    taxData,
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    }
  );
  if (res.data.status === "success") {
    let data = res.data.data;

    dispatch({ type: TAX_POST_SUCCESS, payload: data });
  } else {
    dispatch({ type: TAX_POST_FAIL });
  }
};
export const onCancelAction = () => async (dispatch) => {
  dispatch({ type: TAX_POST_FAIL });
};

export const deleteTax = (id) => async (dispatch) => {
  dispatch({ type: TAX_LOADING });
  const res = await axios.delete(`tax/delete-tax/${id}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
  });
  if (res.data.status === "success") {
    dispatch({ type: TAX_PATCH_SUCCESS, payload: res.data.data });
  } else {
    dispatch({ type: TAX_PATCH_FAIL });
  }
};

export const updateTax = (taxData) => async (dispatch) => {
  dispatch({ type: TAX_LOADING });
  const res = await axios.patch(`tax/update-tax/${taxData._id}`, taxData, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
  });
  if (res.data.status === "success") {
    dispatch({ type: TAX_PATCH_SUCCESS, payload: res.data.data });
  } else {
    dispatch({ type: TAX_PATCH_FAIL });
  }
};

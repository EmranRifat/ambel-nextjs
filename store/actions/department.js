import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
  DEPARTMENT_LOADING,
  DEPARTMENT_GET_SUCCESS,
  DEPARTMENT_GET_FAIL,
  DEPARTMENT_POST_FAIL,
  DEPARTMENT_POST_SUCCESS,
} from "./types";
import { getPractitioners } from "../../StatelessAPI/practitionerApiCalls";
import { getBranches } from "../../StatelessAPI/branchApiCalls";

export const onCancelAction = () => async (dispatch) => {
  dispatch({ type: DEPARTMENT_POST_FAIL });
};

export const getDepartments = () => async (dispatch) => {
  dispatch({ type: DEPARTMENT_LOADING });
  const res = await axios.get(
    `department?id=${cookie.get("currentOrganization")}`,
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
  const tempPractitioner = await getPractitioners(
    cookie.get("currentOrganization")
  );

  let practitioners = tempPractitioner.map((practitioner) => {
    return { name: practitioner.name, _id: practitioner._id };
  });
  if (res.data.status === "success") {
    let data = res.data.data;
    data.branches = branches;
    data.practitioners = practitioners;
    dispatch({ type: DEPARTMENT_GET_SUCCESS, payload: data });
  } else {
    dispatch({ type: DEPARTMENT_GET_FAIL });
  }
};

export const createDepartment = (departmentData) => async (dispatch) => {
  dispatch({ type: DEPARTMENT_LOADING });
  console.log(cookie.get("currentOrganization"))
  const res = await axios.post(`/department?id=${cookie.get("currentOrganization")}`, departmentData, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
  });
  if (res.data.status === "success") {
    dispatch({
      type: DEPARTMENT_POST_SUCCESS,
      payload: res.data.data.doc,
    });
  } else {
    dispatch({ type: DEPARTMENT_POST_FAIL });
  }
};

export const departmentUpdate =
  (departmentData, departmentSettingId) => async (dispatch) => {
    dispatch({ type: DEPARTMENT_LOADING });
    const res = departmentSettingId
      ? await axios.put(`/department/${departmentSettingId}`, departmentData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      })
      : await axios.post(`/department`, departmentData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      });
    if (res.data.status === "success") {
      dispatch({
        type: DEPARTMENT_POST_SUCCESS,
        department: res.data.data.doc,
      });
    } else {
      dispatch({ type: DEPARTMENT_POST_FAIL });
    }
  };

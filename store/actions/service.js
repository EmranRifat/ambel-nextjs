import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
  SERVICE_LOADING,
  SERVICE_GET_SUCCESS,
  SERVICE_GET_FAIL,
  SERVICE_POST_FAIL,
  SERVICE_POST_SUCCESS,
} from "./types";
import { getPractitioners } from "../../StatelessAPI/practitionerApiCalls";
import { getAllDepartments } from "../../StatelessAPI/departmentApiCalls";

export const onCancelAction = () => async (dispatch) => {
  dispatch({ type: SERVICE_POST_FAIL });
};

export const getService = () => async (dispatch) => {
  dispatch({ type: SERVICE_LOADING });
  const res = await axios.get(
    `service?id=${cookie.get("currentOrganization")}`,
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    }
  );
  let taxes = await axios.get(
    `tax/get-taxs?id=${cookie.get("currentOrganization")}`,
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    }
  );

  const tempBranch = await getPractitioners(cookie.get("currentOrganization"));
  const tempDepartment = await getAllDepartments(
    cookie.get("currentOrganization")
  );

  let branches = tempBranch.map((branch) => {
    return { name: branch.name, _id: branch._id };
  });
  let departments = tempDepartment.map((department) => {
    return { name: department.name, _id: department._id };
  });
  let taxs = taxes?.data?.data?.taxs || [];
  taxs.map((tax) => {
    return { name: tax.name, _id: tax._id };
  });
  if (res.data.status === "success") {
    dispatch({
      type: SERVICE_GET_SUCCESS,
      payload: {
        data: res.data.data,
        practitioners: branches,
        departments: departments,
        taxs: taxs,
      },
    });
  } else {
    dispatch({ type: SERVICE_GET_FAIL });
  }
};

export const serviceUpdate =
  (serviceData, serviceSettingId) => async (dispatch) => {
    dispatch({ type: SERVICE_LOADING });
    const res = serviceSettingId
      ? await axios.patch(`/service/${serviceSettingId}`, serviceData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      })
      : await axios.post(`/service`, serviceData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      });
    if (res.data.status === "success") {
      dispatch({
        type: SERVICE_POST_SUCCESS,
        service: res.data.data.doc,
      });
    } else {
      dispatch({ type: SERVICE_POST_FAIL });
    }
  };

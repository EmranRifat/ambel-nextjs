import axios from "../../utils/axios";
import cookie from "js-cookie";
import {
  FINDPROFESSIONAL_GET_FAIL,
  FINDPROFESSIONAL_GET_SUCCESS,
  FINDPROFESSIONAL_POST_FAIL,
  FINDPROFESSIONAL_LOADING,
  FINDPROFESSIONAL_POST_SUCCESS,
} from "./types";


export const onCancelAction = () => async (dispatch) => {
  dispatch({ type: FINDPROFESSIONAL_POST_FAIL });
};

export const findProfessionalInfo = (queryString) => async (dispatch) => {

  dispatch({ type: FINDPROFESSIONAL_LOADING });
  const res = await axios.get(`/practitioner/search${queryString ?? ""}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
  });
  if (res.data.status === "success") {
    dispatch({ type: FINDPROFESSIONAL_GET_SUCCESS, payload: res.data.data });
  } else {
    dispatch({ type: FINDPROFESSIONAL_GET_FAIL });
  }
};

export const filterProfessionalInfo = (filterParams) => async (dispatch) => {
  dispatch({ type: FINDPROFESSIONAL_LOADING });
  const { selectedCategories, selectedSubCategories } = filterParams;

  const res = await axios.post(`/practitioner/filter`, {
    withCredentials: true,

    data: {
      categories: selectedCategories,
      subcategories: selectedSubCategories,
    },
  });
  if (res.data.status === "success") {
    dispatch({ type: FINDPROFESSIONAL_GET_SUCCESS, payload: res.data.data });
  } else {
    // console.log("Hei");
    dispatch({ type: FINDPROFESSIONAL_GET_FAIL });
  }
};

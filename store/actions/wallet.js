import {
  WALLET_BALACE_GET_SUCCESS,
  WALLET_BALANCE_LOADING,
  WALLET_BALANCE_GET_FAILURE,
} from "./types";
import { setCookie } from "./auth";
import jwtDecode from "jwt-decode";
import cookie from "js-cookie";
import axios from "../../utils/axios";
export const getWalletBalance = () => async (dispatch) => {
  dispatch({ type: WALLET_BALANCE_LOADING });
  // console.log(cookie.get("jwt"));
  if (cookie.get("jwt")) {
    axios
      .get("/wallet", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      })
      .then((res) => {
        // console.log(res?.data?.data.wallet.amount);
        if (res?.data?.status === "success") {
          dispatch({
            type: WALLET_BALACE_GET_SUCCESS,
            payload: res?.data?.data,
          });
        } else {
          dispatch({ type: WALLET_BALANCE_GET_FAILURE });
        }
      })
      // @ts-ignore
      .catch((err) => {
        dispatch({
          type: WALLET_BALANCE_GET_FAILURE,
        });
      });
  } else {
    dispatch({ type: WALLET_BALANCE_GET_FAILURE });
  }
};

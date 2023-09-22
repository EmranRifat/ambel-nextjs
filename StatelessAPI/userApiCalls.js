import axios from "../utils/axios";
import cookie from "js-cookie";
import { removeCookie } from '../store/actions/auth';

export const findUserByUsername = async (username) => {
  try {
    const res = await axios.get(`/users/findUserByUsername?userName=${username}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },

    });

    const data = res.data;

    return data;

  } catch (error) {
    // console.log(error);
    return [];
  }
}

export const updateUsername = async (username) => {
  try {
    const res = await axios.post('/users/updateUsername', { userName: username }, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },

    });

    const data = res.data;

    return data;

  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updatePassword = async (oldPassword, newPassword) => {
  try {
    const res = await axios.post('/users/updatePassword', { oldPassword, newPassword }, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },

    });

    const data = res.data;

    return data;

  } catch (error) {
    console.log(error);
    return null;
  }
}

export const sendMail = async (email, subject, body) => {
  try {
    const res = await axios.post('/users/sendmail', { to: email, subject, body }, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },

    });

    const data = res.data;

    return data;

  } catch (error) {
    console.log(error);
    return null;
  }
}

export const signOut = async () => {
  let result = false;
  await axios
    .get("/users/signout", {
      withCredentials: true,
      headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
    })
    .then(() => {

      removeCookie("jwt");

      result = true
    })
    .catch((err) => {
      console.log(err);
      //removeCookie("jwt");
      result = false;
    });

  return result;
}
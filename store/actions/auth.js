import Router from "next/router";
import cookie from "js-cookie";
import {
	LOGIN_SUCCESS,
	HAS_TOKEN,
	LOGIN_FAIL,
	LOADING,
} from "./types";
import axios from "../../utils/axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { unAuthorizedProtectedPaths } from "../../constants";

// @ts-ignore
export const reavlidateUser =
	(practitionerInvited = false) =>
		(dispatch) => {
			// console.log("reavlidateUser called");
			dispatch({ type: LOADING });

			if (cookie.get("jwt")) {
				axios
					.get("users/revalidateUser", {
						withCredentials: true,
						headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
					})
					.then((res) => {
						if (res.data.status === "success") {
							// console.log(res.data)
							setCookie("jwt", res.data.token);
							const user = jwtDecode(res.data.token);
							// res.data.token = cookie.get("jwt");
							dispatch({
								type: HAS_TOKEN,
								payload: cookie.get("jwt"),
								authUser: res.data?.data?.user,
							});
							if (!res.data?.data?.user?.registrationComplete) {
								Router.push(
									`/profile/setup-profile${practitionerInvited === true
										? "?practitionerInvited=true"
										: ""
									}`
								);
							}
						} else {
							dispatch({ type: LOGIN_FAIL });
							removeCookie("jwt");
							removeCookie("dashboardType");
							removeCookie("actingUserType");
							removeCookie("currentOrganization");
							removeCookie("currentPractitioner");
							removeCookie("currenUser");
							// deauthenticate();
							if (unAuthorizedProtectedPaths.some((path) =>
								Router.pathname.includes(path)
							)) {
								Router.push("/?requireLogin=true", "/");
							}
						}
					})
					// @ts-ignore
					.catch((err) => {
						dispatch({ type: LOGIN_FAIL });
						// deauthenticate();
						removeCookie("jwt");
						removeCookie("dashboardType");
						removeCookie("actingUserType");
						removeCookie("currentOrganization");
						removeCookie("currentPractitioner");
						removeCookie("currenUser");
						// deauthenticate();
						if (unAuthorizedProtectedPaths.some((path) =>
							Router.pathname.includes(path)
						)) {
							Router.push("/?requireLogin=true", "/");
						}

					});
			} else {
				dispatch({ type: LOGIN_FAIL });
				// deauthenticate();
				if (unAuthorizedProtectedPaths.some((path) =>
					Router.pathname.includes(path)
				)) {
					Router.push("/?requireLogin=true", "/");
				}
			}
		};

export const authenticate =
	(user, invitation = null) =>
		(dispatch) => {
			// console.log(window.navigator);


			dispatch({ type: LOADING });

			axios
				.post("users/signin", user)
				.then((data) => data.data)
				.then((response) => {
					if (response.status == "success") {
						// console.log(response.data.user.userRoles);
						toast.success("Logged in Succesfully", {
							position: "top-right",
							autoClose: 2000,
						});
						setCookie("jwt", response.token);
						const user = jwtDecode(response.token);

						if (invitation?.inviteType == "Staff") {
							axios.put(
								`/staff/${invitation.staffId}`,
								// @ts-ignore
								{ status: "active", user: user.id },
								{
									withCredentials: true,
									headers: { Authorization: `Bearer ${response.token}` },
								}
							);
						} else if (invitation?.inviteType == "Practitioner") {
							axios.put(
								`/practitioner/acceptInvitation/${invitation.practitionerId}`,
								// @ts-ignore
								{ userId: user._id },
								{
									withCredentials: true,
									headers: { Authorization: `Bearer ${response.token}` },
								}
							);
						} else if (invitation?.inviteType == "Customer") {
							axios.put(
								`/customer/acceptInvitation/${invitation.customerId}`,
								// @ts-ignore
								{ email: user.email },
								{
									withCredentials: true,
									headers: { Authorization: `Bearer ${response.token}` },
								}
							);
						}

						dispatch({
							type: LOGIN_SUCCESS,
							payload: response.token,
							authUser: response.data.user,
						});
						// @ts-ignore

						const { from } = Router.query;
						if (from) {
							Router.back();
						} else {
							Router.push("/user-dashboard");
						}

						if (invitation?.inviteType == "Practitioner") {
							dispatch(reavlidateUser(true));
						} else {
							dispatch(reavlidateUser());
						}
					} else {
						removeCookie("jwt");
						removeCookie("dashboardType");
						removeCookie("actingUserType");
						removeCookie("currentOrganization");
						removeCookie("currentPractitioner");
						removeCookie("currenUser");
						dispatch({ type: LOGIN_FAIL, error: response.error.message });
					}
				})
				.catch((err) => {
					removeCookie("jwt");
					removeCookie("dashboardType");
					removeCookie("actingUserType");
					removeCookie("currentOrganization");
					removeCookie("currentPractitioner");
					removeCookie("currenUser");
					dispatch({
						type: LOGIN_FAIL,
						error: err.response.data?.message || err.message,
					});
				});
		};

export const scoialLogin = (url) => (dispatch) => {
	dispatch({ type: LOADING });
	axios
		.get(url)
		.then((data) => data.data)
		.then((response) => {
			if (response.status == "success") {
				setCookie("jwt", response.token);
				const user = jwtDecode(response.token);

				dispatch({ type: LOGIN_SUCCESS, payload: response.token });

				Router.replace("/user-dashboard");

				dispatch(reavlidateUser());
			} else {
				removeCookie("jwt");
				removeCookie("dashboardType");
				removeCookie("actingUserType");
				removeCookie("currentOrganization");
				removeCookie("currentPractitioner");
				removeCookie("currenUser");
				dispatch({ type: LOGIN_FAIL, error: response.error.message });
			}
		})
		.catch((err) => {
			removeCookie("jwt");
			dispatch({
				type: LOGIN_FAIL,
				error: err.response.data?.message || err.message,
			});
		});
};

// gets the token from the cookie and saves it in the store
export const reauthenticate = (token) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_SUCCESS, payload: token });
	};
};

// removing the token
export const deauthenticate = () => (dispatch) => {
	axios
		.get("users/signout", {
			withCredentials: true,
			headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		})
		.then(() => {
			toast.info("Successfully logged out", {
				position: "top-right",
				autoClose: 2000,
			});
			removeCookie("jwt");
			removeCookie("dashboardType");
			removeCookie("actingUserType");
			removeCookie("currentOrganization");
			removeCookie("currentPractitioner");
			removeCookie("currenUser");
			Router.push("/");
			dispatch({ type: LOGIN_FAIL });
		})
		.catch((err) => {
			// console.log(err);
			removeCookie("jwt");
			removeCookie("dashboardType");
			removeCookie("actingUserType");
			removeCookie("currentOrganization");
			removeCookie("currentPractitioner");
			removeCookie("currenUser");
			Router.push("/");
		});
};

// @ts-ignore
export const checkServerSideCookie = (ctx) => {
	const token = getCookie("jwt");
	if (token) {
		reauthenticate(token);
	}
};
/**
 * cookie helper methods
 */

export const setCookie = (key, value) => {
	if (process.browser) {
		cookie.set(key, value, {
			expires: 1,
			path: "/",
		});
	}
};

export const removeCookie = (key) => {
	if (process.browser) {
		cookie.remove(key, {
			expires: 1,
		});
	}
};

// @ts-ignore
export const getCookie = (key, req) => {
	return getCookieFromBrowser(key);
};

export const getCookieFromBrowser = (key) => {
	return cookie.get(key);
};

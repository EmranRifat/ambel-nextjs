import { useRouter } from "next/router";
import React, { useEffect } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import cookie from "js-cookie";

const GoogleAuth = () => {
	const router = useRouter();
	const { error, code } = router.query;
	//   console.log(error, code);
	const successNotify = () => {
		toast.info("Succesfully Connected", {
			progress: 0,
		});
		router.push("/business-dashboard/setup");
	};
	const errorNotify = (msg) => {
		toast.warn(msg, {
			progress: 0,
		});
		router.push("/business-dashboard/setup");
	};
	useEffect(() => {
		// console.log("in useEffect", error, code);
		const serverCall = async () => {
			if (error) {
				try {
					// console.log("in serverCall", error, code);
					const result = await axios.post(
						"/storage/googleauth",
						{
							error,
						},
						{
							withCredentials: true,
							headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
						}
					);

					// console.log(result);
					if (result.data.status === "failed") {
						errorNotify("Access denieed by you");
					}
				} catch (err) {
					errorNotify("Something went very wrong. Try later");
					// console.log(err);
				}
			} else if (code) {
				try {
					// console.log("in serverCall", error, code);
					const result = await axios.post(
						"/storage/googleauth",
						{
							code,
						},
						{
							withCredentials: true,
							headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
						}
					);

					// console.log(result);
					if (result.data.status === "success") {
						successNotify();
					}
				} catch (err) {
					errorNotify("Something went very wrong. Try later");
					// console.log(err);
				}
			}
		};
		serverCall();
	}, [error, code]);

	return <></>;
};

export default GoogleAuth;

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import cookie from "js-cookie";

const DropboxAuth = () => {
	const router = useRouter();
	const { error, error_description, code } = router.query;
	// console.log(error,code);

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
						"/storage/dbxauth",
						{
							error,
							error_description,
						},
						{
							withCredentials: true,
							headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
						}
					);

					// console.log(result);
					if (result.data.status === "failed") {
						errorNotify(result.data.message);
					}
				} catch (err) {
					errorNotify("Something went very wrong. Try later");
					// console.log(err);
				}
			} else if (code) {
				try {
					// console.log("in serverCall", error, code);
					const result = await axios.post(
						"/storage/dbxauth",
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
			// router.push("/business-dashboard/setup");
		};
		serverCall();
	}, [error, code]);

	return (
		<></>
	);
};

export default DropboxAuth;

import { async } from "@firebase/util";
import cookie from "js-cookie";
import { values } from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { scoialLogin } from "../store/actions/auth";
import axios from "../utils/axios";

const Social = (props) => {
	const router = useRouter();
	const { id, param } = router.query;
	// console.log(id, param);
	const updateLinkedAccount = async (type, value) => {
		try {
			const field = `linkedAccounts.${type}`
			const response = await axios.put("/users/updateuser", {
				[field]: value
			}, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			})
			console.log(response.data);
			if (response.data.status == "success") {
				successNotify("Successfully Connected")
			} else {
				errorNotify("Something went very wrong. Try Later")
			}

		} catch (err) {
			console.log(err)
			errorNotify("Something went very wrong. Try Later")
		}
	}

	const errorNotify = (msg) => {
		router.push("/user-dashboard");
		toast.warn(msg, {
			progress: 0,
		});

	};
	const successNotify = (msg) => {
		router.push("/user-dashboard");
		toast.warn(msg, {
			progress: 0,
		});
	};

	useEffect(() => {
		if (!router.isReady) return;
		console.log(router.query);
		if (router.query.failed) {
			return errorNotify("Something went wrong");
		}
		if (router.query.sociallink) {
			console.log("called from update link")
			updateLinkedAccount(router.query?.type, router.query?.value);
		}
		// props.scoialLogin(`users/social/${id}/${param}`);
	}, [router.isReady]);

	useEffect(() => {
		// console.log(props.isLoading, props.error);
		if (!props.isLoading && props.error) errorNotify(props.error);
	}, [props.error]);
	return (
		<></>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		error: state.auth.error,
		isLoading: state.auth.isLoading,
	};
};

export default connect(mapStateToProps, { scoialLogin })(Social);

import { useRouter } from "next/router";
import React from "react";
import ResetPasswordPage from "../components/ResetPassword/ResetPassword";

const ResetPass = () => {
	const router = useRouter();
	const resetToken = router.query.resetToken;
	return (
		<div className="mx-auto">
			<ResetPasswordPage resetToken={resetToken} />
		</div>
	);
};

export default ResetPass;

import React from "react";
import styles from "../setup.module.css";
import Image from "next/image";
import InputGroup from "../AccountForm/InputGroup";
import FormGroup from "../AccountForm/FormGroup";
import axios from "../../utils/axios";
import { useRouter } from "next/router";
import { notifySuccess } from "../../utils/toast";
import PulseLoader from "react-spinners/PulseLoader";

const ResetPasswordPage = (props) => {
	const [isFocused, setIsFocused] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [password, setPassword] = React.useState("");
	const [passwordConfirm, setPasswordConfirm] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	const router = useRouter();

	const _sendPasswordReset = async () => {
		setLoading(true);
		if (password !== passwordConfirm) {
			setError("Passwords do not match");
			return;
		}
		try {
			const res = await axios.post("/users/resetPassword", {
				resetToken: props.resetToken,
				password,
			});
			if (res.status === 200) {
				setLoading(false);
				notifySuccess("Password reset successfully");
				router.push("/" + `?requireLogin=true`, "/");
			}
		} catch (error) {
			setLoading(false);
			setError(error.response?.data?.message);
		}
	};

	return (
		<div className={styles.PageContainer}>
			{props.resetToken ? (
				<div className="w-[440px] mt-[10%] flex flex-col my-12 py-6 px-6 z-50 bg-white shadow mx-auto rounded-2xl">
					<div className="w-full flex flex-col justify-center items-center">
						<Image
							src="/img/resetpass.png"
							height={80}
							width={80}
							alt="forgot"
						/>
						<span className="text-[#19525A] text-[24px] font-[500]">
							Reset Password
						</span>
					</div>
					<div className="w-full flex flex-col mt-3">
						<FormGroup>
							<InputGroup
								type="password"
								name="password"
								autoComplete="new-password"
								required={true}
								// value={password}
								label="New Password"
								placeholder="New Password"
								onChange={(e) => {
									setPassword(e.target.value);
									setError(null);
								}}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								className="rounded-lg h-10 mt-4"
							/>
							{isFocused && (
								<span className="text-[10px] text-[#5B5B5BCC] mt-1">
									*Try to use combination of small letter, capital lettter,
									special charecter and number
								</span>
							)}
							<div className="h-5" />
							<InputGroup
								type="password"
								name="passwordConfirm"
								autoComplete="new-password"
								required={true}
								// value={password}
								label="Confirm Password"
								placeholder="Confirm Password"
								onChange={(e) => {
									setPasswordConfirm(e.target.value);
									setError(null);
								}}
								className="rounded-lg h-10 mt-4"
							/>
						</FormGroup>
					</div>

					<div className="w-full flex flex-col items-center mt-2">
						{error && (
							<span className="text-[#FF0000] text-[14px] mb-2">{error}</span>
						)}
						<button
							onClick={(e) => _sendPasswordReset()}
							className="w-full h-[40px] rounded-lg bg-[#19525A] text-white"
						>
							{loading ? (
								<div className="p-2 flex items-center justify-center">
									<PulseLoader color="#ffffff" size={12} />
								</div>
							) : (
								"Reset password"
							)}
						</button>
					</div>
				</div>
			) : (
				<div className="w-full mx-auto mt-[20%] text-center">
					<h1 className="text-3xl">No Reset Token Provideed</h1>
				</div>
			)}
		</div>
	);
};

export default ResetPasswordPage;

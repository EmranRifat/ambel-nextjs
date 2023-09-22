import Image from "next/image";
import React from "react";
import axios from "../../utils/axios";
import { notifySuccess } from "../../utils/toast";
import PulseLoader from "react-spinners/PulseLoader";

const ForgotPassword = (props) => {
	const [email, setEmail] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const _sendEmail = async () => {
		setLoading(true);
		try {
			const res = await axios.post("/users/forgotPassword", {
				email,
			});
			if (res.status === 200) {
				setLoading(false);
				props.setOpenForgotPassModal(false);
				notifySuccess("Email sent successfully");
			} else {
				setLoading(false);
				setError(res.data.message);
			}
		} catch (error) {
			setLoading(false);
			// console.log(error);
			setError(error.response.data.message);
		}
	};

	return (
		<React.Fragment>
			<div className="w-[440px] h-[520px] flex flex-col my-12 py-6 px-6 z-50 bg-white shadow mx-auto rounded-2xl">
				<div className="w-full flex justify-center">
					<Image
						src="/img/forgotPass.png"
						height={80}
						width={80}
						alt="forgot"
					/>
				</div>
				<div className="w-full flex flex-col items-start mt-5">
					<h3 className="text-[#19525A] text-[24px] font-[500]">
						Forget your Password
					</h3>
					<p className="text-[#5B5B5B] text-[16px] mt-3 py-2">
						Please enter your email address you’d like your password reset
						information send to
					</p>
				</div>
				<div className="w-full flex flex-col mt-3">
					<span className="text-[#5B5B5B] text-[14px]">
						Enter email address
					</span>
					<input
						type="text"
						placeholder="Email"
						name="email"
						onChange={(e) => {
							setError(null);
							setEmail(e.target.value);
						}}
						className="w-full h-[40px] border border-gray-300 px-4 py-5 rounded-lg outline-none transition-colors duration-150 ease-in-out mt-2 focus:ring-2 focus:ring-[#19525A8C]"
					/>
				</div>

				<div className="w-full flex flex-col items-center mt-8">
					{error && (
						<span className="text-[#FF0000] text-[14px] mb-2">{error}</span>
					)}
					<button
						onClick={() => _sendEmail()}
						className="w-full h-[40px] rounded-lg bg-[#19525A] text-white"
					>
						{loading ? (
							<div className="p-2 flex items-center justify-center">
								<PulseLoader color="#ffffff" size={12} />
							</div>
						) : (
							"Send Email"
						)}
					</button>
					<span className="text-[#525252] text-[12px] py-5">
						Got the password?
					</span>
					<button
						onClick={() => {
							props.setLoginModal(true);
							props.setOpenForgotPassModal(false);
						}}
						className="w-full h-[40px] rounded-lg bg-gradient-to-r from-[#2175FE] to-[#20C6FD] text-white"
					>
						SIGN IN
					</button>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ForgotPassword;

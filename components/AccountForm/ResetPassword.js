import Image from "next/image";
import React from "react";

const ResetPassword = (props) => {
	const [isFocused, setIsFocused] = React.useState(false);
	return (
		<React.Fragment>
			<div className="w-[440px] flex flex-col my-12 py-6 px-6 z-50 bg-white shadow mx-auto rounded-2xl">
				<div className="w-full flex flex-col justify-center items-center">
					<Image src="/img/resetpass.png" height={80} width={80} alt="forgot" />
					<span className="text-[#19525A] text-[24px] font-[500]">
						Reset Password
					</span>
				</div>
				<div className="w-full flex flex-col mt-3">
					<span className="text-[#5B5B5B] text-[14px]">New password</span>
					<input
						type="text"
						placeholder="New Password"
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						className="w-full h-[40px] border border-gray-300 px-4 py-5 rounded-lg outline-none transition-colors duration-150 ease-in-out mt-2 focus:ring-2 focus:ring-[#19525A8C]"
					/>
					{isFocused && (
						<span className="text-[10px] text-[#5B5B5BCC] mt-1">
							*Try to use combination of small letter, capital lettter, special
							charecter and number
						</span>
					)}
				</div>
				<div className="w-full flex flex-col mt-3">
					<span className="text-[#5B5B5B] text-[14px]">Confirm password</span>
					<input
						type="text"
						placeholder="Confirm password"
						className="w-full h-[40px] border border-gray-300 px-4 py-5 rounded-lg outline-none transition-colors duration-150 ease-in-out mt-2 focus:ring-2 focus:ring-[#19525A8C]"
					/>
				</div>

				<div className="w-full flex flex-col items-center mt-8">
					<button
						onClick={() => props.setResetPasswordModal(false)}
						className="w-full h-[40px] rounded-lg bg-[#19525A] text-white"
					>
						Reset password
					</button>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ResetPassword;

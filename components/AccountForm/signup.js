import React, { useEffect, useState } from "react";
import throttle from "lodash.throttle";
import axios from "../../utils/axios";

import FormGroup from "./FormGroup";
import InputGroup from "./InputGroup";
import { PulseLoader, ScaleLoader } from "react-spinners";
import Image from "next/image";
import Dropdown from "../Dropdown";
import { toast } from "react-toastify";

function SignUp(props) {
	const [fullName, setFullName] = useState("");
	const [userType, setUserType] = useState("Select a type of your account");
	const [password, setPassword] = useState("");
	// const [userName, setUserName] = useState("");
	const [agree, setUserAgree] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [disableEditing, setDisableEditing] = useState(false);

	const isFilledAll =
		!fullName ||
		!props.email ||
		!password ||
		!userType ||
		userType === "Select a type of your account";

	const signUpHandler = throttle(
		async (event) => {
			const body = document.body;
			const userName = props.email?.split("@")[0];
			event.preventDefault();
			try {
				if (isFilledAll) {
					setError("Please fill all the fields.");
					return;
				}
				setIsLoading(true);
				const device_name = navigator.platform;
				const result = await axios.post("users/signup", {
					fullName,
					email: props.email,
					userName,
					password,
					userType,
					device_name,
				});
				if (result.data.status == "success") {
					setError(null);
					toast.success("Account created successfully", {
						position: "top-right",
						autoClose: 2000,
					});
					body.classList.remove("overflow-hidden");
					props.setSignupModal(false);
					props.setOpenVerificationModal(true);
					setIsLoading(false);
				} else {
					setError(result.data.err.message);
					setIsLoading(false);
				}
			} catch (err) {
				setError(err.response?.data?.message || err.message);
				setIsLoading(false);
				toast.error(error, {
					position: "top-right",
					autoClose: 2000,
				});
			}
		},
		5000,
		{
			leading: true,
			trailing: false,
		}
	);

	useEffect(() => {
		if (props.invitation) {
			setDisableEditing(true);
			console.log(props.invitation);
			if (props.invitation.inviteType == "Staff") {
				setUserType("User or Member");
				axios.get(`staff/${props.invitation.staffId}`).then((res) => {
					if (res.data.status == "success") {
						// console.log(res.data.data);
						props.setEmail(res.data.data.data.email);
					}
				});
			} else if (props.invitation.inviteType == "Practitioner") {
				axios
					.get(`practitioner/${props.invitation.practitionerId}`)
					.then((res) => {
						if (res.data.status == "success") {
							// console.log(res.data.data);
							props.setEmail(res.data.data.user.email);
						}
					});
			} else if (props.invitation.inviteType == "Customer") {
				setUserType("User or Member");
				props.setEmail(props.invitation.email);
			}
		}
	}, []);

	function getTwitterOauthUrl() {
		const rootUrl = "https://twitter.com/i/oauth2/authorize";
		const options = {
			redirect_uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/twitter`, // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
			client_id: "NF9RdjdaS2JKbllOS3VLcHpia3A6MTpjaQ",
			state: "state",
			response_type: "code",
			code_challenge: "challenge",
			code_challenge_method: "plain",
			scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(
				" "
			),
		};
		const qs = new URLSearchParams(options).toString();
		return `${rootUrl}?${qs}`;
	}

	return (
		<div className="w-[440px] h-fit relative my-12 py-6 px-6 z-50 bg-white shadow mx-auto rounded-2xl">
			{!props.invitation && (
				<div className="absolute top-5 right-5">
					<span
						onClick={() => props.setSignupModal(false)}
						className="text-xl text-[#5B5B5B] cursor-pointer"
					>
						✖
					</span>
				</div>
			)}
			<form className="w-full mx-auto text-center">
				<h1 className="font-medium text-xl">Register With</h1>
				<div className="mt-4">
					{props.invitation ? (
						<div className="inline-flex justify-center gap-2 text-2xl mb-4">
							<a className="border cursor-not-allowed border-gray-200 h-12 w-16 text-[#4267b2] rounded-md flex items-center justify-center hover:text-white hover:border-[#4267b2]">
								<Image
									src="/img/facebook.png"
									height={23}
									width={24}
									alt="fb"
								/>
							</a>
							<a className="border cursor-not-allowed border-gray-200 h-12 w-16 text-[#c03427] rounded-md flex items-center justify-center hover:text-white hover:border-[#c03427]">
								<Image
									src="/img/google.png"
									height={23}
									width={24}
									alt="google"
								/>
							</a>
							<a className="border cursor-not-allowed border-gray-200 h-12 w-16 text-[#049cd8] rounded-md flex items-center justify-center hover:text-white hover:border-[#049cd8]">
								<Image
									src="/img/twitter.png"
									height={23}
									width={24}
									alt="twitter"
								/>
							</a>
						</div>
					) : (
						<div className="inline-flex justify-center gap-2 text-2xl mb-4">
							<a
								href={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/facebook`}
								className="border border-gray-200 h-12 w-16 text-[#4267b2] rounded-md flex items-center justify-center hover:text-white hover:border-[#4267b2]"
							>
								<Image
									src="/img/facebook.png"
									height={23}
									width={24}
									alt="fb"
								/>
							</a>
							<a
								href={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google`}
								className="border border-gray-200 h-12 w-16 text-[#c03427] rounded-md flex items-center justify-center hover:text-white hover:border-[#c03427]"
							>
								<Image src="/img/google.png" height={23} width={24} alt="fb" />
							</a>
							<a
								href={getTwitterOauthUrl()}
								className="border border-gray-200 h-12 w-16 text-[#049cd8] rounded-md flex items-center justify-center hover:text-white hover:border-[#049cd8]"
							>
								<Image src="/img/twitter.png" height={23} width={24} alt="fb" />
							</a>
						</div>
					)}
					<div className="flex justify-center items-center">
						<span className="h-[0.7px] w-[119px] bg-[#707070B2]"></span>
						<p className="text-center text-[16px] text-[#5B5B5BB2] mx-2">or</p>
						<span className="h-[0.7px] w-[119px] bg-[#707070B2]"></span>
					</div>
					<FormGroup>
						<InputGroup
							type="name"
							name="name"
							placeholder="Your Name"
							required
							value={fullName}
							onChange={(e) => {
								setError(null);
								setFullName(e.target.value);
							}}
							className="rounded-lg h-10"
						/>
						<div className="w-full flex justify-center mt-4">
							<Dropdown
								width={"400px"}
								items={["User or Member", "Practitioner", "Organization"]}
								selected={userType}
								disabled={disableEditing}
								onSelected={(selected) => {
									setUserType(selected);
								}}
							/>
						</div>
						<InputGroup
							type="email"
							name="email"
							placeholder="Your Email Address"
							value={props.email}
							disabled={disableEditing}
							required
							autoComplete="off"
							onChange={(e) => {
								setError(null);
								props.setEmail(e.target.value);
							}}
							className={`rounded-lg h-10 mt-4 ${disableEditing && "cursor-not-allowed"
								}`}
						/>
						{/* </FormGroup>
          <FormGroup> */}
						<InputGroup
							type="password"
							name="password"
							required
							placeholder="Your Password"
							autoComplete="new-password"
							description="Try to use combination of small letter, capital lettter, special charecter and number"
							value={password}
							onChange={(e) => {
								setError(null);
								setPassword(e.target.value);
							}}
							className="rounded-lg h-10 mt-4"
						/>
					</FormGroup>
					{/* <div className="text-left"> */}
					<div className="flex justify-between w-full">
						<div className="inline-flex">
							<div className="flex items-center mt-1 mb-4">
								<input
									id="default-checkbox"
									type="checkbox"
									onChange={(e) => {
										setError(null);
										setUserAgree(e.currentTarget.checked);
									}}
									className="w-4 h-4 mt-1 text-blue-600 bg-gray-100 rounded border-gray-300"
								/>
								<label
									htmlFor="default-checkbox"
									className="ml-2 text-sm font-medium text-gray-900 "
								>
									<h1 className="pt-1 text-slate-500">
										I agree the{" "}
										<a href="#" className="text-slate-800">
											<span className="text-[#0089C9]">Terms</span> and{" "}
											<span className="text-[#0089C9]">Conditions</span>
										</a>
									</h1>
								</label>
							</div>
						</div>
					</div>
					{/* </div> */}

					<FormGroup className="my-2">
						{error && <p className="mb-3 text-rose-700">{error}</p>}
						{isLoading ? (
							<div className="flex justify-center">
								<ScaleLoader height={20} color="#4267b2" />
							</div>
						) : (
							<button
								type="button"
								onClick={
									agree
										? signUpHandler
										: () => {
											setError("Please agree the terms and conditions");
										}
								}
								style={{ color: "#ffffff" }}
								className="w-full rounded-lg text-white text-sm h-10 bg-[#19525A]"
							>
								{isLoading ? (
									<div className="p-2 flex items-center justify-center">
										<PulseLoader color="#ffffff" size={12} />
									</div>
								) : (
									<p className="inline-block " style={{ color: "#ffffff" }}>
										SIGN UP
									</p>
								)}
							</button>
						)}
					</FormGroup>
					{!disableEditing && (
						<h1 className="pt-1 text-[12px]">
							Already have account ?
							<a
								href="#"
								className="text-[#0089C9] ml-2"
								onClick={() => {
									props.setLoginModal(true);
									props.setSignupModal(false);
								}}
							>
								Sign In
							</a>
						</h1>
					)}
				</div>
			</form>
		</div>
	);
}

export default SignUp;

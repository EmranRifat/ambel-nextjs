/* eslint-disable @next/next/no-img-element */
import React from "react";
import { PulseLoader } from "react-spinners";
import { useState } from "react";
import { inviteCustomer } from "../../../StatelessAPI/customerApiCalls";

const AddNewCustomerModal = (props) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [nameError, setNameError] = useState("");
	const [emailError, setEmailError] = useState("");

	const handleCreateStaff = async () => {
		if (!name) {
			setNameError("Name is required");
		}
		if (!email) {
			setEmailError("Email is required");
		} else {
			const emailRegex = new RegExp(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
			if (!emailRegex.test(email)) {
				setEmailError("Invalid email");
			}
		}
		if (!name || !email) return;

		setIsLoading(true);

		const invitedCustomer = await inviteCustomer({
			name,
			email,
			organization: props.organizationId,
		});

		props.getCustomers();
		setIsLoading(false);
		props.setOpenNewCustomerModal(false);
	};

	return (
		<>
			<div className="w-[440px] h-[320px] z-50 bg-white my-[10%] py-4 shadow m-auto rounded-md">
				<div className="w-full flex flex-col items-center bg-white rounded-md">
					{/* all fields... */}
					<div className="w-full flex border-b-[1px] pb-4 border-[#76767680] justify-center text-[#19525A] text-[20px]">
						<span>Add New Customer</span>
					</div>
					<div className="w-full flex flex-col justify-center items-center p-3">
						<div className="flex flex-col mb-3">
							<span className="text-[16px] text-[#5B5B5B]">Customer Name</span>
							<input
								type="text"
								className={`w-[410px] h-[40px] text-gray-700 text-[16px] px-2 outline-none border-[1px] ${
									nameError ? "border-rose-500" : "border-[#19525A80]"
								} mt-1 rounded-md shadow-sm`}
								value={name}
								onChange={(val) => {
									setNameError("");
									setName(val.target.value);
								}}
							/>
						</div>
						<div className="flex flex-col  mt-3">
							<span className="text-[16px] text-[#5B5B5B]">Email</span>
							<input
								type="email"
								className={`w-[410px] text-gray-700 h-[40px] text-[16px] px-2 outline-none border-[1px] ${
									emailError ? "border-rose-500" : "border-[#19525A80]"
								} mt-1 rounded-md shadow-sm`}
								value={email}
								onChange={(val) => {
									setEmailError("");
									setEmail(val.target.value);
								}}
							/>
						</div>
						<div className="w-full flex justify-end items-end px-3 pt-5">
							<button
								onClick={() => props.setOpenNewCustomerModal(false)}
								className="h-[32px] text-gray-700 w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
							>
								Cancel
							</button>
							<button
								className="h-[32px] w-[80px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
								onClick={handleCreateStaff}
							>
								{isLoading ? (
									<PulseLoader color="#ffffff" size={12} />
								) : (
									<span>Invite</span>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddNewCustomerModal;

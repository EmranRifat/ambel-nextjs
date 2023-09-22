/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { useState } from "react";
import { invitePractitioner } from "../../../../StatelessAPI/practitionerApiCalls";
import { getBranches } from "../../../../StatelessAPI/branchApiCalls";
import DropDownWithId from "../../../Dropdown/DropDownId";
const AddPractitionerModal = (props) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [branch, setBranch] = useState("Select Branch");
	const [isLoading, setIsLoading] = useState(false);
	const [branches, setBranches] = useState([]);
	const [nameError, setNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [branchError, setBranchError] = useState("");
	const [responseError, setResponseError] = useState("");

	const handleCreatePractitioner = async () => {
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
		if (branch == "Select Branch") {
			setBranchError("Branch is required");
		}
		if (!name || !email || branch == "Select Branch") return;

		setIsLoading(true);

		const invitedPractitioner = await invitePractitioner({
			name,
			email,
			branch: branch,
			organization: props.businessId,
		});
		if (invitedPractitioner.status === "success") {
			props.getPractitioners();
			setIsLoading(false);
			props.setOpenPractitionerModal(false);
		} else if (invitedPractitioner.status === "failed") {
			setIsLoading(false);
			setResponseError(invitedPractitioner.message);
		} else if (invitedPractitioner.status === "error") {
			setIsLoading(false);
			setResponseError(invitedPractitioner.message);
		}
	};

	const _getBranches = async () => {
		setBranches([]);
		// console.log(props.businessId);
		const fetchBranches = await getBranches(props.businessId);
		// console.log({ fetchBranches });
		setBranches((prevState) => [...prevState, ...fetchBranches]);
	};

	useEffect(() => {
		_getBranches();
	}, []);

	return (
		<>
			<div className="w-[440px] h-[380px] z-50 bg-white my-[10%] py-4 shadow m-auto rounded-md">
				<div className="w-full flex flex-col items-center bg-white rounded-md">
					{/* all fields... */}
					<div className="w-full flex border-b-[1px] pb-4 border-[#76767680] justify-center text-[#19525A] text-[20px]">
						<span>Add New Practitioner Member</span>
					</div>
					<div className="w-full flex flex-col justify-center items-center p-3">
						<div className="flex flex-col mb-3">
							<span className="text-[16px] text-[#5B5B5B]">
								Practitioner Name
							</span>
							<input
								type="text"
								className={`w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] ${
									nameError ? "border-rose-500" : "border-[#19525A80]"
								} mt-1 rounded-md shadow-sm`}
								value={name}
								onChange={(val) => {
									setNameError("");
									setName(val.target.value);
								}}
							/>
						</div>
						<div className="w-full">
							<span className="block text-[16px] text-[#5B5B5B] mb-[5px]">
								Branch
							</span>
							<div className="shadow-sm">
								<DropDownWithId
									height="40px"
									borderColor={
										branchError ? "border-rose-500" : "border-[#19525A80]"
									}
									items={branches.map((brnc) => {
										return { id: brnc._id, name: brnc.name };
									})}
									selected={branch}
									onSelected={(selected) => {
										// console.log(selected);
										setBranchError("");
										setBranch(selected);
									}}
								/>
							</div>
						</div>

						<div className="flex flex-col  mt-3">
							<span className="text-[16px] text-[#5B5B5B]">Email</span>
							<input
								type="email"
								className={`w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] ${
									emailError ? "border-rose-500" : "border-[#19525A80]"
								} mt-1 rounded-md shadow-sm`}
								value={email}
								onChange={(val) => {
									setEmailError("");
									setEmail(val.target.value);
								}}
							/>
						</div>
						{responseError && (
							<div className="w-full flex justify-center items-center mt-3">
								<span className="text-[12px] text-rose-500">
									{responseError}
								</span>
							</div>
						)}
						<div className="w-full flex justify-end items-end px-3 pt-5">
							<button
								onClick={() => props.setOpenPractitionerModal(false)}
								className="h-[32px] w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
							>
								Cancel
							</button>
							<button
								className="h-[32px] w-[80px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
								onClick={handleCreatePractitioner}
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

export default AddPractitionerModal;

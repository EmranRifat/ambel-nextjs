import React, { useEffect, useState } from "react";
import {
	getAllCountries,
	getCityByCountryCode,
} from "../../../utils/int_phone_code";
import Dropdown from "../../Dropdown";
import PhoneCodeDropdown from "../../Dropdown/PhoneCodeDropdown";
import Modal from "../../Modal";
import Input from "./Input";
import VerificationModal from "./VerificationModal";

const BasinInfoRightSide = (props) => {
	const [verifyModal, setVerifyModal] = useState(false);
	const [countryCode, setCountryCode] = React.useState("");

	useEffect(() => {
		setCountryCode(
			getAllCountries().find((item) => item.name === props.userData?.country)
				?.isoCode ?? "CA"
		);
		var code = getAllCountries().find(
			(item) => item.name === props.userData?.country
		)?.phonecode;
		props.onChangeUserData({ target: { name: "phoneCode", value: code } });
	}, [props.userData?.country]);

	return (
		<React.Fragment>
			{verifyModal && (
				<Modal onClick={setVerifyModal}>
					<VerificationModal setVerifyModal={setVerifyModal} />
				</Modal>
			)}
			<div className="w-[800px] flex flex-col">
				<div className="h-[538px] w-full  border-2 border-gray-300 shadow-md rounded-md">
					<Input
						label="Full Name"
						name="fullName"
						onChangeUserData={props.onChangeUserData}
						value={props.userData?.fullName}
					/>
					<Input
						label="Email"
						name="email"
						value={props.userData?.email}
						onChangeUserData={props.onChangeUserData}
					/>
					<Input
						label="Ocupation"
						name="ocupation"
						value={props.userData?.ocupation}
						onChangeUserData={props.onChangeUserData}
					/>
					<div className="flex justify-between items-center px-4 h-[60px] border-b-[1px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">Country</span>
						<Dropdown
							width={"350px"}
							items={getAllCountries().map((item) => item.name)}
							selected={props.userData?.country}
							onSelected={(selected) => {
								props.onChangeUserData({
									target: { name: "country", value: selected },
								});
							}}
						/>
					</div>
					<div className="flex justify-between items-center px-4 h-[60px] border-b-[1px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">City</span>
						{countryCode && (
							<Dropdown
								width={"350px"}
								items={getCityByCountryCode(countryCode).map(
									(item) => item.name
								)}
								selected={props.userData?.city}
								onSelected={(selected) => {
									props.onChangeUserData({
										target: { name: "city", value: selected },
									});
								}}
							/>
						)}
					</div>
					<Input
						label="Zip"
						name="zipCode"
						value={props.userData?.zipCode}
						onChangeUserData={props.onChangeUserData}
					/>
					<Input
						label="Address"
						name="address"
						value={props.userData?.address}
						onChangeUserData={props.onChangeUserData}
					/>
					<div className="flex justify-between items-center px-4 py-2 border-b-[1px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">Phone</span>
						<div className="flex">
							<PhoneCodeDropdown
								width={"90px"}
								items={getAllCountries()}
								selected={props.userData?.phoneCode ?? "1"}
								onSelected={(selected) => {
									props.onChangeUserData({
										target: { name: "phoneCode", value: selected },
									});
								}}
							/>
							<input
								type="text"
								name="phoneNumber"
								value={props.userData?.phoneNumber}
								onChange={props.onChangeUserData}
								required
								placeholder={props.label}
								className="text-[14px] w-[256px] ml-1 h-[40px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
							/>
						</div>
					</div>
					<div className="flex justify-between items-center px-4 py-2 border-b-[1px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">Language</span>
						<Dropdown
							width={"350px"}
							items={["English", "Bengali"]}
							selected={
								props.userData?.language ? props.userData?.language : "English"
							}
							onSelected={(selected) => {
								props.onChangeUserData({
									target: { name: "language", value: selected },
								});
							}}
						/>
					</div>
				</div>

				<div className=" w-full  border-2 border-gray-300 shadow-md rounded-md mt-10">
					<div className="w-full flex justify-between px-4 py-2 border-b-2 border-gray-300">
						<span className="text-[#5B5B5B] text-[20px] font-[500]">
							Verification
						</span>
						<button
							onClick={() => setVerifyModal(true)}
							className="w-[160px] h-[36px] text-white rounded-md bg-[#19525A]"
						>
							Get started
						</button>
					</div>
					<div className="w-full flex flex-col px-4 py-2 border-b-2 border-gray-300">
						<h2 className="text-[#5B5B5B] text-[16px]">
							1.Verified your govt issued ID
						</h2>
						<p className="text-[#5B5B5B] text-[14px] p-2">
							Upload an official government ID to verify your profile
							information. Your ID will never share with any of your
							practitioner and non government organization.
							<span className="text-[#00A455]">Learn More</span>
						</p>
					</div>
					<div className="w-full flex flex-col px-4 py-2 border-b-2 border-gray-300">
						<h2 className="text-[#5B5B5B] text-[16px]">
							2. Visual verification
						</h2>
						<p className="text-[#5B5B5B] text-[14px] p-2">
							Have a quick video call with ambel support, so we can verify
							you’re really you. Learn More
							<span className="text-[#00A455]">Learn More</span>
						</p>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default BasinInfoRightSide;

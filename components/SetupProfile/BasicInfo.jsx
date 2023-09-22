import React, { useEffect } from "react";
import {
	getAllCountries,
	getCityByCountryCode,
	getPhoneWithoutCode,
} from "../../utils/int_phone_code";
import Dropdown from "../Dropdown";
import PhoneCodeDropdown from "../Dropdown/PhoneCodeDropdown";
import Input from "./Input";

const BasicInfo = (props) => {
	const [countryCode, setCountryCode] = React.useState("");

	useEffect(() => {
		setCountryCode(
			getAllCountries().find((item) => item.name === props.userData?.country)
				?.isoCode ?? "CA"
		);
		var code = getAllCountries().find(
			(item) => item.name === props.userData?.country
		)?.phonecode;
		props.onChangeUserData({ name: "phoneCode", value: code });
	}, [props.userData?.country]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		props.setFillError((prevstate) => {
			prevstate.userName = false;
			return { ...prevstate };
		});
		props.onChangeUserData({ name, value });
	};

	return (
		<React.Fragment>
			<div className="w-full flex flex-col ">
				<div className="w-full flex justify-center items-center my-2">
					<span className="text-[#19525A] text-[20px] font-[500]">
						Let’s start with Basic Information
					</span>
				</div>
				<div className="w-full mt-4">
					<span className="text-[#5B5B5B] text-[14px]">
						User Type <b className="text-rose-600">*</b>
					</span>
					<div className="w-full mt-2">
						<Dropdown
							width={"390px"}
							items={["User or Member", "Practitioner", "Organization"]}
							selected={props.userType}
							disabled={props.disableEdit}
							onSelected={(selected) => {
								props.setUserType(selected);
							}}
						/>
					</div>
				</div>
				<Input
					title="Username"
					star={true}
					name="userName"
					placeholder="Username"
					disabled={props.disableEdit}
					value={props.userData?.userName}
					fillError={props.fillError}
					onChange={handleChange}
				/>
				{props.fillError.userName ? <small>Fill in the username</small> : <></>}
				<div className="w-full mt-2">
					<span className="text-[#5B5B5B] text-[14px]">
						Country <b className="text-rose-600">*</b>
					</span>
					<div className="w-full mt-2">
						<Dropdown
							width={"390px"}
							items={getAllCountries().map((item) => item.name)}
							selected={props.userData?.country}
							onSelected={(selected) => {
								handleChange({
									target: { name: "country", value: selected },
								});
							}}
						/>
						{props.fillError.country ? <small>Select Country</small> : <></>}
					</div>
				</div>
				<div className="w-full mt-2">
					<span className="text-[#5B5B5B] text-[14px]">
						City <b className="text-rose-600">*</b>
					</span>
					{countryCode && (
						<Dropdown
							width={"390px"}
							items={getCityByCountryCode(countryCode).map((item) => item.name)}
							selected={props.userData?.city}
							onSelected={(selected) => {
								handleChange({
									target: { name: "city", value: selected },
								});
							}}
						/>
					)}
				</div>
				{props.fillError.city ? <small>Select City</small> : <></>}
				<Input
					title="Address"
					name="address"
					placeholder="Address"
					value={props.userData?.address}
					onChange={handleChange}
				/>
				{props.fillError.address ? <small>Fill in the address</small> : <></>}
				<Input
					title="ZIP Code"
					name="zipCode"
					placeholder="ZIP Code"
					value={props.userData?.zipCode}
					onChange={handleChange}
				/>
				{props.fillError.zipCode ? <small>Fill in the zip code</small> : <></>}
				<div className="w-full flex flex-col mt-3">
					<span className="text-[#5B5B5B] text-[14px] mb-2">
						Phone number
						<b className="text-rose-600"> *</b>
					</span>
					<div className="w-full flex items-center justify-between">
						<PhoneCodeDropdown
							width={"90px"}
							items={getAllCountries()}
							selected={props.userData?.phoneCode ?? "+1"}
							onSelected={(selected) => {
								handleChange({
									target: { name: "phoneCode", value: selected },
								});
							}}
						/>
						<input
							type="text"
							name="phoneNumber"
							value={props.userData?.phoneNumber}
							onChange={handleChange}
							required
							placeholder={props.label}
							className="text-[14px] w-[256px] ml-1 h-[40px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
						/>
					</div>
					{props.fillError.phoneNumber ? (
						<small>Fill in the phone number</small>
					) : (
						<></>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default BasicInfo;

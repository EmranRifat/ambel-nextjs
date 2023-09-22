import React, { useEffect, useState } from "react";
import Dropdown from "../../Dropdown";
import Input from "../Input";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import {
	getSingleUser,
	updateSingleUser,
} from "../../../store/actions/singleUser";
import { objMatch } from "../../../utils/utility";
import {
	gatLangugeList,
	getAllCountries,
	getCityByCountryCode,
	getCountryByCode,
} from "../../../utils/int_phone_code";

const BasicInfo = (props) => {
	const [change, setChange] = useState(false);
	const [countryCode, setCountryCode] = React.useState("");
	const [user, setUser] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		address: "",
		language: "Select Language",
		city: "Select City",
		zipCode: "",
		country: "Select Country",
		timeZone: "Select Timezone",
	});

	useEffect(() => {
		const f = async () => {
			const data = await props.getSingleUser();
		};
		if (props.user) {
			setChange(false);
			setUser({ ...user, ...props.user?.user });
		} else f();
	}, [props.user]);

	const onChangeValue = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (user && props.user) {
			setChange(!objMatch(user, props.user?.user));
		}
	}, [user]);

	useEffect(() => {
		setCountryCode(
			getAllCountries().find((item) => item.name === user.country)?.isoCode ??
				"CA"
		);
	}, [user.country]);

	return (
		<React.Fragment>
			<div className="pb-8 flex flex-col">
				<div className="flex justify-between">
					<span className="text-[#5B5B5B] text-[32px] font-[700]">
						Basic Info
					</span>
				</div>
				<div className="bg-white py-2 flex flex-col w-full rounded-lg shadow-md mt-5 pb-8">
					<Input
						label="Full Name"
						name="fullName"
						value={user.fullName}
						onChangeValue={onChangeValue}
					/>
					<Input
						label="Email"
						name="email"
						value={user.email}
						onChangeValue={onChangeValue}
					/>
					<Input
						label="Phone number"
						name="phoneNumber"
						value={user.phoneNumber}
						onChangeValue={onChangeValue}
					/>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Country<b className="text-rose-600">*</b>
						</span>
						<Dropdown
							width={"240px"}
							items={getAllCountries().map((item) => item.name)}
							selected={user.country}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "country", value: selected },
								});
							}}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							City<b className="text-rose-600">*</b>
						</span>
						{countryCode && (
							<Dropdown
								width={"240px"}
								items={getCityByCountryCode(countryCode).map(
									(item) => item.name
								)}
								selected={user.city}
								onSelected={(selected) => {
									onChangeValue({
										target: { name: "city", value: selected },
									});
								}}
							/>
						)}
					</div>
					<Input
						label="Zip Code"
						name="zipCode"
						value={user.zipCode}
						onChangeValue={onChangeValue}
					/>
					<Input
						label="Address"
						name="address"
						value={user.address}
						onChangeValue={onChangeValue}
					/>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Time zone<b className="text-rose-600">*</b>
						</span>
						<Dropdown
							width={"240px"}
							items={getCountryByCode(countryCode)?.timezones.map(
								(item) => item.zoneName + " " + item.gmtOffsetName
							)}
							selected={user.timeZone}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "timeZone", value: selected },
								});
							}}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Language<b className="text-rose-600">*</b>
						</span>
						<Dropdown
							width={"240px"}
							items={gatLangugeList.map((item) => item.name)}
							selected={user.language}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "language", value: selected },
								});
							}}
						/>
					</div>
				</div>
				{change && (
					<div className="fixed bottom-0 inset-x-2 ml-10 pl-5 h-12 w-[93%] bg-white rounded-lg shadow-lg p-2 items-center flex justify-between">
						<span className="">Do you want to save changes?</span>
						<div>
							<button
								type="submit"
								onClick={() => {
									setChange(false);
									setUser({ ...user, ...props.user?.user });
								}}
								className="w-[86px] mr-5 h-[36px] px-2 py-1 rounded-lg border-2 text-gray-600"
							>
								<span>Cancel</span>
							</button>
							<button
								type="submit"
								onClick={() => {
									props.updateSingleUser(user);
								}}
								className="w-[86px] h-[36px] px-2 py-1 rounded-lg border-2 text-white bg-teal-700"
							>
								{props.loading ? (
									<PulseLoader color="#ffffff" size={12} />
								) : (
									<span>Save</span>
								)}
							</button>
						</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};
const mapStateToProps = (state) => {
	return {
		user: state.singleUser?.user,
		loading: state.singleUser?.loading,
	};
};

export default connect(mapStateToProps, { getSingleUser, updateSingleUser })(
	BasicInfo
);

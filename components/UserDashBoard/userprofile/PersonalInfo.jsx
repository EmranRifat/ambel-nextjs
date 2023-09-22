import Image from "next/image";
import React, { useState } from "react";
import Dropdown from "../../Dropdown";
import { getAllCountries } from "../../../utils/int_phone_code";

const PersonalInfo = ({ setVerification, verification }) => {
	const [nationality, setNationality] = useState("Bangladeshi");
	// const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [date, setDate] = useState(null);

	// console.log(getAllCountries());
	const handleInput = () => {
		setVerification(() => {});
	};

	return (
		<React.Fragment>
			<div className="w-full flex justify-center items-center px-5 border-b-2 border-gray-300">
				<span className="text-[#5B5B5B] text-[32px]">Personal Information</span>
			</div>
			<div className="w-full flex justify-between px-4 mt-3">
				<span className="text-[#5B5B5B] text-[16px]">Identity Information</span>
				<div className="flex items-center mr-2">
					{/* <span className="text-[#5B5B5B] text-[14px] mr-3">Auto fill</span> */}
					{/* <Image
            src="/icons/circletick.png"
            height={20}
            width={21}
            alt="tick"
          /> */}
				</div>
			</div>
			<div className="w-full fle flex-col px-4 items-start mt-8">
				<span className="text-[#5B5B5B] text-[16px]">Nationality</span>
				<div className="w-full mt-2">
					<Dropdown
						width={"538px"}
						items={getAllCountries().map((item) => item.name)}
						selected={nationality}
						onSelected={(selected) => {
							setNationality(selected);
							setVerification({ ...verification, nationality: selected });
						}}
					/>
				</div>
			</div>

			<div className="w-full flex justify-between items-center px-4 mt-8">
				<div className=" flex flex-col">
					<span className="text-[#5B5B5B] text-[16px]">First Name</span>
					<input
						type="text"
						// name={props.name}
						// onChange={onChangeValue}
						// value={}
						required
						// placeholder={props.label}
						className="text-[14px] w-[266px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
						onChange={(e) => {
							e.preventDefault();
							// console.log(e.target.value);
							// setVerification({ ...verification, firstName: e.target.value });
							// setFirstName(val.currentTarget.value);
							// setVerification((prevState) => {
							//   console.log(val.currentTarget.value);

							//   return {
							//     ...prevState,
							//     firstName: val.target.value,
							//   };
							// });
							setVerification((prevState) => {
								return {
									...prevState,
									firstName: e.target.value,
								};
							});
						}}
					/>
				</div>
				<div className=" flex flex-col">
					<span className="text-[#5B5B5B] text-[16px]">Last Name</span>
					<input
						type="text"
						// name={props.name}
						// onChange={onChangeValue}
						// value={}
						required
						// placeholder={props.label}
						className="text-[14px] w-[266px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
						onChange={(e) => {
							// setLastName(e.currentTarget.value);
							setVerification((prevState) => {
								return {
									...prevState,
									lastName: e.target.value,
								};
							});
						}}
					/>
				</div>
			</div>
			<div className="w-full flex justify-between items-center px-4 mt-8">
				<div className=" flex flex-col">
					<span className="text-[#5B5B5B] text-[16px]">Middle Name</span>
					<input
						type="text"
						// name={props.name}
						// onChange={onChangeValue}
						// value={}
						required
						// placeholder={props.label}
						className="text-[14px] w-[266px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
						onChange={(e) => {
							setMiddleName(e.currentTarget.value);
							setVerification((prevState) => {
								return {
									...prevState,
									middleName: e.target.value,
								};
							});
						}}
					/>
				</div>
				<div className=" flex flex-col">
					<span className="text-[#5B5B5B] text-[16px]">Date of Birth</span>
					<input
						type="Date"
						// name={props.name}
						// onChange={onChangeValue}
						// value={}
						required
						// placeholder={props.label}
						className="text-[14px] w-[266px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
						onChange={(e) => {
							// console.log(
							//   val.currentTarget.value,
							//   new Date(val.currentTarget.value)
							// );
							// setDate(val.currentTarget.value);
							setVerification((prevState) => {
								return {
									...prevState,
									dateOfBirth: new Date(e.target.value),
								};
							});
						}}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default PersonalInfo;

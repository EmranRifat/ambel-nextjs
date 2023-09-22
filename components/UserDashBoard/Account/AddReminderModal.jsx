import React, { useState } from "react";
import Dropdown from "../../Dropdown";
import { connect } from "react-redux";
import {
	getUserReminder,
	updateUserReminder,
} from "../../../store/actions/userReminder";

const AddReminderModal = (props) => {
	const [userRemidnerData, setUserReminderData] = useState({
		name: "",
		reminderSystem: "Email",
		reminderOn: "",
		reminderTime: "",
		status: "Active",
	});

	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setUserReminderData({
			...userRemidnerData,
			[name]: value,
		});
	};
	return (
		<React.Fragment>
			<div className="w-[440px] z-50 bg-white my-[10%] py-4 shadow m-auto rounded-md">
				<div className="w-full flex flex-col items-center bg-white rounded-md">
					{/* all fields... */}
					<div className="w-full flex border-b-[1px] pb-4 border-[#76767680] justify-center text-[#19525A] text-[20px]">
						<span>Add a new Reminder</span>
					</div>
					<div className="w-full flex flex-col justify-center items-center p-3">
						<div className="flex flex-col mb-3">
							<span className="text-[16px] text-[#5B5B5B]">
								Name of the Reminder
							</span>
							<input
								type="text"
								name="name"
								value={userRemidnerData.name}
								onChange={onChangeValue}
								className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
							/>
						</div>
						<div className="flex flex-col items-start w-full mb-3">
							<span className="text-[16px] text-[#5B5B5B] mb-2">
								Reminder system
							</span>
							<Dropdown
								width={"410px"}
								items={["Email", "SMS", "Whatsapp", "Call"]}
								selected={userRemidnerData.reminderSystem}
								onSelected={(selected) => {
									onChangeValue({
										target: { name: "reminderSystem", value: selected },
									});
								}}
							/>
						</div>
						<div className="flex flex-col mb-3">
							<span className="text-[16px] text-[#5B5B5B]">Reminder On</span>
							<input
								type="text"
								name="reminderOn"
								value={userRemidnerData.reminderOn}
								onChange={onChangeValue}
								className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
							/>
						</div>
						<div className="flex flex-col items-start w-full mb-3">
							<span className="text-[16px] text-[#5B5B5B] mt-2">
								Reminder time
							</span>
							<span className="text-[16px] text-[#5B5B5B] mt-2">Before</span>
							<div className="w-full flex items-center">
								<input
									type="text"
									name="reminderTime"
									value={userRemidnerData.reminderTime}
									onChange={onChangeValue}
									className="w-[380px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-l-md shadow-lg"
								/>
								<div className="w-[72px] h-[40px] bg-[#19525A] text-white flex justify-center items-center rounded-r-[8px]">
									Min
								</div>
							</div>
						</div>
						<div className="flex flex-col items-start w-full mb-3">
							<span className="text-[16px] text-[#5B5B5B] mb-2">Status</span>
							<Dropdown
								width={"410px"}
								items={["Active", "Inactive"]}
								selected={userRemidnerData.status}
								onSelected={(selected) => {
									onChangeValue({
										target: { name: "status", value: selected },
									});
								}}
							/>
						</div>
						<div className="w-full flex justify-end items-end px-3 pt-10">
							<button
								onClick={() => props.setAddReminderModal(false)}
								className="h-[32px] w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
							>
								Cancel
							</button>
							<button
								onClick={() => {
									props
										.updateUserReminder(
											userRemidnerData,
											props.userFamilyOrg ? props.userFamilyOrg?._id : null
										)
										.then((res) => {
											// console.log(res);
											props.getUserReminder();
											props.setAddReminderModal(false);
										});
								}}
								className="h-[32px] w-[80px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		userRemidnerData: state?.userReminder?.info?.allUSerReminder,
		loading: state?.userReminder?.loading,
	};
};
export default connect(mapStateToProps, {
	getUserReminder,
	updateUserReminder,
})(AddReminderModal);

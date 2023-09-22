import React, { useEffect } from "react";
import { useState } from "react";
import Dropdown from "../../Dropdown";
import Toggle from "../../Toggle";
import { connect } from "react-redux";
import {
	updateFamilyOrg,
	getUserFamilyOrg,
	deleteFaimlyOrgMember,
	updateFaimlyOrgMember,
	getSingleMember,
} from "../../../store/actions/userFamilyOrg";

const MemberSettingsModal = (props) => {
	// console.log(props.familyOrgData);
	const [memberData, setMemberData] = useState({
		relationWithUser: "brother",
		addMemberInFamiyOrg: false,
		rmMemeberFamilyOrg: false,
		seeOthersFamilyOrg: false,
		useUserCreditCard: false,
		manageUserAppointmentIntake: false,
		receiveUserStatReciptEmail: false,
		receiveUserNotifReminder: false,
		seeUserSchedules: false,
		seeUserActivity: false,
	});

	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setMemberData({
			...memberData,
			[name]: value,
		});
	};
	useEffect(() => {
		props.getSingleMember(props.memberId);
	}, []);
	useEffect(() => {
		setMemberData(props?.familyOrgData);
	}, [props?.familyOrgData]);
	return (
		<div className="w-[440px] z-50 bg-white mt-[50px] py-4 shadow m-auto rounded-md">
			<div className="w-full flex flex-col items-center bg-white rounded-md">
				{/* all fields... */}
				<div className="w-full flex border-b-[1px] pb-4 border-[#76767680] justify-center text-[#19525A] text-[20px]">
					<span>Md. Delware Hossain Settings </span>
				</div>
				<div className="w-full flex flex-col justify-center items-center mt-4">
					<div className="w-full flex justify-center mb-3">
						<div className="flex flex-col">
							<span className="text-[16px] text-[#5B5B5B] mb-3">
								Tazul Relation with Delware
							</span>
							<Dropdown
								width={"410px"}
								items={["brother", "Nephew", "Uncle"]}
								selected={memberData?.relationWithUser}
								onSelected={(selected) => {
									onChangeValue({
										target: { name: "relationWithUser", value: selected },
									});
								}}
							/>
						</div>
					</div>
					{/* <div className="w-full flex justify-center mb-3">
            <div className="flex flex-col">
              <span className="text-[16px] text-[#5B5B5B] mb-3">
                Delware Relation with Tazul
              </span>
              <Dropdown
                width={"410px"}
                items={["", "brother", "Nephew", "Uncle"]}
                selected={"brother"}
                onSelected={(selected) => {
                  // onChangeValue({
                  //   target: { name: "location", value: selected },
                  // });
                }}
              />
            </div>
          </div> */}

					{/* global permissions */}
					<div className="w-full mt-5">
						<div className="px-3 py-2 border-b-[2px] border-gray-300 flex justify-start">
							<span className="text-[14px] text-[#5B5B5B]">
								Delware global permission on the Family
							</span>
						</div>
						<div className="w-full flex justify-between items-center px-3 py-2 border-b-[2px] border-gray-300">
							<span className="text-[14px] text-[#5B5B5B]">
								Add member in this family
							</span>
							<Toggle
								checked={memberData?.addMemberInFamiyOrg}
								setChecked={(checked) => {
									onChangeValue({
										target: { name: "addMemberInFamiyOrg", value: checked },
									});
								}}
							/>
						</div>
						<div className="w-full flex justify-between items-center px-3 py-2 border-b-[2px] border-gray-300">
							<span className="text-[14px] text-[#5B5B5B]">
								Remove member in this family
							</span>
							<Toggle
								checked={memberData?.rmMemeberFamilyOrg}
								setChecked={(checked) => {
									onChangeValue({
										target: { name: "rmMemeberFamilyOrg", value: checked },
									});
								}}
							/>
						</div>
						<div className="w-full flex justify-between items-center px-3 py-2 border-b-[2px] border-gray-300">
							<span className="text-[14px] text-[#5B5B5B]">
								See others member in this family
							</span>
							<Toggle
								checked={memberData?.seeOthersFamilyOrg}
								setChecked={(checked) => {
									onChangeValue({
										target: { name: "seeOthersFamilyOrg", value: checked },
									});
								}}
							/>
						</div>
					</div>

					{/* family member what can */}
					<div className="w-full mt-5">
						<div className="px-3 py-2 border-b-[2px] border-gray-300 flex justify-start">
							<span className="text-[14px] text-[#5B5B5B]">Delware can</span>
						</div>
						<div className="w-full flex justify-between items-center px-3 py-2 border-b-[2px] border-gray-300">
							<span className="text-[14px] text-[#5B5B5B]">
								Use Tazul Islam credit card
							</span>
							<Toggle
								checked={memberData?.useUserCreditCard}
								setChecked={(checked) => {
									onChangeValue({
										target: { name: "useUserCreditCard", value: checked },
									});
								}}
							/>
						</div>
						<div className="w-full flex justify-between items-center px-3 py-2 border-b-[2px] border-gray-300">
							<span className="text-[14px] text-[#5B5B5B]">
								Manage Tazul Islam appointment and intake form
							</span>
							<Toggle
								checked={memberData?.manageUserAppointmentIntake}
								setChecked={(checked) => {
									onChangeValue({
										target: {
											name: "manageUserAppointmentIntake",
											value: checked,
										},
									});
								}}
							/>
						</div>
						<div className="w-full flex justify-between items-center px-3 py-2 border-b-[2px] border-gray-300">
							<span className="text-[14px] text-[#5B5B5B]">
								Receive a copy of Tazul Islam recipt, statement and financial
								emails
							</span>
							<Toggle
								checked={memberData?.receiveUserStatReciptEmail}
								setChecked={(checked) => {
									onChangeValue({
										target: {
											name: "receiveUserStatReciptEmail",
											value: checked,
										},
									});
								}}
							/>
						</div>
						<div className="w-full flex justify-between items-center px-3 py-2 border-b-[2px] border-gray-300">
							<span className="text-[14px] text-[#5B5B5B]">
								Receive a copy of Tazul Islam notification and reminders
							</span>
							<Toggle
								checked={memberData?.receiveUserNotifReminder}
								setChecked={(checked) => {
									onChangeValue({
										target: {
											name: "receiveUserNotifReminder",
											value: checked,
										},
									});
								}}
							/>
						</div>
						<div className="w-full flex justify-between items-center px-3 py-2 border-b-[2px] border-gray-300">
							<span className="text-[14px] text-[#5B5B5B]">
								Able to see Tazul Islam schedules
							</span>
							<Toggle
								checked={memberData?.seeUserSchedules}
								setChecked={(checked) => {
									onChangeValue({
										target: { name: "seeUserSchedules", value: checked },
									});
								}}
							/>
						</div>
						<div className="w-full flex justify-between items-center px-3 py-2 border-b-[2px] border-gray-300">
							<span className="text-[14px] text-[#5B5B5B]">
								Able to see Tazul Islam activity
							</span>
							<Toggle
								checked={memberData?.seeUserActivity}
								setChecked={(checked) => {
									onChangeValue({
										target: { name: "seeUserActivity", value: checked },
									});
								}}
							/>
						</div>
					</div>
					<div className="w-full flex justify-end items-end px-3 pt-10">
						<button
							onClick={() => {
								props.setMemberSettingsModal(false);
								props.getUserFamilyOrg();
							}}
							className="h-[32px] w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
						>
							Cancel
						</button>
						<button
							onClick={() => {
								props.updateFaimlyOrgMember(memberData, props.memberId);
								props.getUserFamilyOrg();
								props.setMemberSettingsModal(false);
							}}
							className="h-[32px] w-[80px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	// console.log(state)
	return {
		familyOrgData: state?.userFamilyOrg?.info?.members,
		loading: state?.userFamilyOrg?.loading,
	};
};
export default connect(mapStateToProps, {
	getUserFamilyOrg,
	getSingleMember,
	updateFamilyOrg,
	updateFaimlyOrgMember,
})(MemberSettingsModal);

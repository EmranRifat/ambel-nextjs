import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BiDotsVerticalRounded, BiEdit } from "react-icons/bi";
import AddStaffModal from "./AddStaffModal";
import { connect } from "react-redux";
import moment from "moment";
import { getStaffs } from "../../../../StatelessAPI/staffApiCall";
import { getRoleList } from "../../../../StatelessAPI/roleAndPermissionsApiCalls";
import { getBranches } from "../../../../StatelessAPI/branchApiCalls";
import Modal from "../../../Modal";
import ActivitiesModal from "../ActivitiesModal";
import Dropdown from "../../../Dropdown";
import { getBusinessInfo } from "../../../../store/actions/business";
import StaffTaskModal from "./StaffTaskModal";
import cookie from "js-cookie";
import axios from "../../../../utils/axios";
import { useRouter } from "next/router";
import OutsideClickHandler from 'react-outside-click-handler';
const StaffList = (props) => {
	const [openStaffModal, setOpenStaffModal] = useState(false);
	const [openActivitiesModal, setOpenActivitiesModal] = useState(false);
	const [openTaskModal, setOpenTaskModal] = useState(false);
	const [staffs, setStaffs] = useState([]);
	const [prev, setPrev] = useState([]);
	const [roles, setRoles] = useState([]);
	const [branchs, setBranches] = useState([]);
	const [selectedBranch, setSelectedBranch] = useState("All Branches");
	const [selectedRole, setSelectedRole] = useState("All Roles");
	const editOptions = useRef(null);
	const [showEditOptions, setShowEditOptions] = useState(false);
	const [clicked, setClicked] = useState(-1);
	const router = useRouter();

	const _getStaffs = async () => {
		setStaffs([]);
		setRoles([]);
		setBranches([]);
		const fetchStaffs = await getStaffs(props.info?.business?._id);
		setStaffs([...fetchStaffs]);
		setPrev([...fetchStaffs]);

		let fetchRols = await getRoleList(props.info?.business?._id);
		fetchRols = fetchRols.filter((r) => r.name !== "Owner");
		setRoles([...fetchRols]);

		const fetchBranches = await getBranches(props.info?.business?._id);
		setBranches([...fetchBranches]);
	};

	const handleRoleSearch = (role) => {
		setSelectedRole(role);
		if (role.includes("All Roles")) {
			setPrev(staffs);
		} else if (roles.length > 0 && staffs.length > 0) {
			const r = roles.filter((r) => r.name === role);

			setPrev(staffs.filter((s) => s.permissionRole === r[0]._id));
		}
	};

	const handleBranchSearch = (item) => {
		setSelectedBranch(item);
		if (item.includes("All Branches")) {
			setPrev(staffs);
		} else if (branchs.length > 0 && staffs.length > 0) {
			setPrev(
				staffs.filter((s) => {
					let sb = [];
					sb = s.branches.filter((b) =>
						b.name.toLowerCase().includes(item.toLowerCase())
					);
					if (sb.length > 0) return s;
					else[];
				})
			);
		}
	};

	const handleNameSearch = (e) => {
		let val = e.target.value;
		setPrev(
			staffs.filter((s) => s.name.toLowerCase().includes(val.toLowerCase()))
		);
	};

	useEffect(() => {
		if (!props.info?.business) {
			props.getBusinessInfo();
		} else {
			_getStaffs();
		}
	}, [props.info?.business]);

	const createNewChat = async (recieverId) => {
		try {
			const url = "/conversations/createConversation";
			const res = await axios.post(
				url,
				{
					conversationType: "oneToOne",
					participants: [recieverId],
				},
				{
					headers: {
						Authorization: `Bearer ${cookie.get("jwt")}`,
					},
				}
			);

			const conversationId =
				res.data.conversationId ?? res.data.conversation?._id;

			router.push(
				`/business-dashboard/message?conversationId=${conversationId}`,
				"/business-dashboard/message"
			);
		} catch (error) {
			//console.log(error.response.data.message);
		}
	};

	return (
		<div className="h-fit relative">
			<div className="w-full flex justify-between">
				{openStaffModal && (
					<Modal onClick={setOpenStaffModal}>
						<AddStaffModal
							getStaffs={_getStaffs}
							setOpenStaffModal={setOpenStaffModal}
							businessId={props.info?.business?._id}
						/>
					</Modal>
				)}
				{openActivitiesModal && (
					<Modal onClick={setOpenActivitiesModal} closeOnOutsideClick={true}>
						<ActivitiesModal setOpenActivitiesModal={setOpenActivitiesModal} />
					</Modal>
				)}
				{openTaskModal && (
					<Modal onClick={setOpenTaskModal} closeOnOutsideClick={true}>
						<StaffTaskModal setOpenTaskModal={setOpenTaskModal} />
					</Modal>
				)}
				<span className="text-[32px] font-[700] text-[#5B5B5B]">All Staff</span>
				<button
					onClick={() => {
						setOpenStaffModal(true);
					}}
					className="w-[172px] h-[40px] bg-[#19525A] text-[20px] text-white rounded-md"
				>
					Add New Staff
				</button>
			</div>
			<div className="w-full flex justify-between bg-[#F0F3FC] shadow-xl p-3 mt-3 rounded-md">
				<div className="flex justify-between gap-3">
					<Dropdown
						items={
							branchs.length > 0 && [
								"All Branches",
								...branchs.map((b) => b.name),
							]
						}
						selected={selectedBranch}
						onSelected={(item) => handleBranchSearch(item)}
						width={"136px"}
					/>
					<Dropdown
						items={["All Staffs", "Patient", "Practitioner", "Staff"]}
						selected={"All Staffs"}
						onSelected={(item) => {
							// console.log(item);
						}}
						width={"136px"}
					/>
					<Dropdown
						items={
							roles.length > 0 && [
								"All Roles",
								...roles.map((role) => role.name),
							]
						}
						selected={selectedRole}
						onSelected={(item) => handleRoleSearch(item)}
						width={"136px"}
					/>
				</div>
				<div className="flex justify-between items-center">
					<input
						type="text"
						placeholder="Search name"
						className="w-[358px] h-[32px] rounded-2xl px-2 outline-none focus:border-gray-400 border-[1px] border-[#42424280]"
						onChange={handleNameSearch}
					/>
					<BiDotsVerticalRounded className="text-3xl text-[#8F8A8A]" />
				</div>
			</div>
			<div className="bg-white shadow-md mb-4 py-1 h-full">
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead className="text-gray-600 border-b-2 border-gray-200">
							<tr className="px-4">
								<th className="py-3 pl-4 text-[#5B5B5B] text-[16px]">Name</th>
								<th className="py-3 text-[#5B5B5B] text-[16px]">Branch</th>
								<th className="py-3 text-[#5B5B5B] text-[16px]">Role</th>
								<th className="py-3 px-5 text-center text-[#5B5B5B] text-[16px]">
									Task
								</th>
								<th className="py-3 text-[#5B5B5B] text-[16px]">Employed</th>
								<th className="py-3 px-5 text-center text-[#5B5B5B] text-[16px]">
									Activities
								</th>
								<th className="py-3 text-[#5B5B5B] text-[16px]">Actions</th>
							</tr>
						</thead>
						<tbody>
							{prev.length > 0 &&
								prev.map((staff, index) => {
									let bgColor = "";
									switch (staff.status) {
										case "pending":
											bgColor = "bg-orange-50 hover:bg-orange-100";
											break;
										case "active":
											bgColor = "bg-emerald-50 hover:bg-emerald-100";
											break;
										case "inactive":
											bgColor = "bg-rose-50 hover:bg-rose-100";
											break;
										default:
											bgColor = "bg-gray-50 hover:bg-gray-100";
											break;
									}
									return (
										<tr className={`${bgColor} px-2 border-b-2`} key={index}>
											<td className="py-4 max-w-[200px] min-w-[150px] pl-1 font-normal text-gray-700">
												<div className="flex items-center h-full">
													{staff?.user?.photo ? (
														<Image
															src={staff?.user?.photo}
															alt="patient"
															height={40}
															width={40}
															className="object-cover rounded-full"
														/>
													) : (
														<div className="flex h-10 w-10 font-bold rounded-full justify-center items-center text-[18px] bg-[#5b5b5b] text-white">
															{staff.name[0].toUpperCase()}
														</div>
													)}
													<div className="ml-2">
														<p className="text-md font-normal text-gray-700">
															{staff.name}
														</p>
													</div>
												</div>
											</td>
											<td className="py-4 max-w-[200px] min-w-[150px] font-normal text-gray-700">
												{staff.branches.map((branch, index) => {
													return (
														<span
															className="py-1 text-sm font-medium text-gray-700"
															key={index}
														>
															{branch.name}
															{index !== staff.branches.length - 1 && ", "}
														</span>
													);
												})}
											</td>
											<td className="py-4 font-normal text-gray-700">
												{roles.length > 0 &&
													roles.filter((r) => r._id === staff.permissionRole)[0]
														?.name}
											</td>
											<td
												onClick={() => setOpenTaskModal(true)}
												className="py-4 px-5 text-center cursor-pointer font-normal text-[#008BDA] text-[14px] "
											>
												View
											</td>
											<td
												className={`py-4 font-normal ${staff.status == "pending"
													? "text-orange-500"
													: "text-gray-700"
													}  text-center`}
											>
												{staff.status == "pending"
													? "Pending"
													: moment(staff.createdAt, moment.ISO_8601).format(
														"D MMM, YYYY"
													)}
											</td>
											<td
												onClick={() => {
													setOpenActivitiesModal(true);
												}}
												className="py-4 px-5 text-center cursor-pointer font-normal text-[#008BDA] text-[14px] "
											>
												View
											</td>

											<td className="absolute">
												{showEditOptions &&
													clicked == index &&
													clicked !== -1 && (

														<OutsideClickHandler
															onOutsideClick={() => {
																setShowEditOptions(!showEditOptions)
															}
															}
														>

															<div className="absolute flex flex-col bottom-0 right-11 h-fit rounded-md w-[130px] bg-white shadow border">
																<div
																	onClick={(e) => router.push(`/business-dashboard/setup?show=5&name=${staff?.name}&organization=${staff?.organization}&staffEmail=${staff?.email}`)}
																	className="p-[6px] text-sm hover:bg-slate-100 cursor-pointer"
																>
																	Send Email
																</div>
																<div
																	onClick={(e) => {
																		createNewChat(staff.user?._id);
																	}}
																	className="p-[6px] text-sm hover:bg-slate-100 cursor-pointer"
																>
																	Message
																</div>
																<div
																	onClick={(e) => {
																		// console.log("clicked change branch");
																	}}
																	className="p-[6px] text-sm hover:bg-slate-100 cursor-pointer"
																>
																	Change Branch
																</div>
																<div
																	onClick={(e) => {
																		// console.log("clicked pause activity");
																	}}
																	className="p-[6px] text-sm hover:bg-slate-100 cursor-pointer"
																>
																	Pause Activity
																</div>
																<div
																	onClick={(e) => {
																		// console.log("clicked remove staff");
																	}}
																	className="p-[6px] text-sm hover:bg-slate-100 cursor-pointer"
																>
																	Remove Staff
																</div>
															</div>
														</OutsideClickHandler>
													)}
												{staff.status !== "pending" &&
													<div
														ref={editOptions}
														onClick={(event) => {
															setClicked(index);
															setShowEditOptions(!showEditOptions);
														}}
														className="py-6 cursor-pointer font-normal flex items-center justify-center text-gray-700 hover:text-sky-400"
													>
														<BiEdit />
														<span className="ml-1"> Edit</span>
													</div>
												}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		info: state?.business?.info,
		loading: state?.business?.loading,
		// branchLoading:state?.busin
	};
};
export default connect(mapStateToProps, {
	getBusinessInfo,
})(StaffList);

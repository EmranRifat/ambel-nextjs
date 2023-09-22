import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded, BiEditAlt } from "react-icons/bi";
import Modal from "../../Modal";
import AddRoleModal from "./AddRoleModal";
import { getRoleList } from "../../../StatelessAPI/roleAndPermissionsApiCalls";
import { connect } from "react-redux";
import { getBusinessInfo } from "../../../store/actions/business";
import { HiOutlineTrash } from "react-icons/hi";
import { getEmployees } from "../../../StatelessAPI/staffApiCall";
import { BsPersonPlusFill } from "react-icons/bs";
import AssignAssistantModal from "./AssignAssistantModal";

const RoleandPermission = (props) => {
	const [openRoleModal, setOpenRoleModal] = useState(false);
	const [openAssistantModal, setOpenAssistantModal] = useState(false);
	const [roles, setRoles] = useState([]);
	const [prev, setPrev] = useState([]);

	const _getRoleList = async () => {
		setRoles([]);
		const fetchRoles = await getRoleList(props.info?.business?._id);
		setRoles([...fetchRoles]);
		setPrev([...fetchRoles]);
	};

	useEffect(() => {
		if (!props.info?.business) props.getBusinessInfo();
		_getRoleList();
		_getEmployees();
	}, [props.info?.business]);

	const [employees, setEmployees] = useState([]);

	const _getEmployees = async () => {
		setEmployees([]);
		const fetchEmployees = await getEmployees(props.info?.business?._id);
		setEmployees([...fetchEmployees]);
	};

	const [editRole, setEditRole] = useState(null);

	const handleRoleSearch = (e) => {
		let val = e.target.value;
		val = val.toLowerCase();
		setPrev([
			...roles.filter((r) => {
				let users = [];
				if (r.users && r.users.length > 0) {
					users = r.users.filter(
						(u) => u.name && u.name.toLowerCase().includes(val)
					);
				}
				if (r.name.toLowerCase().includes(val) || users.length > 0) return r;
			}),
		]);
	};

	return (
		<div className=" overflow-y-auto">
			{openRoleModal && (
				<Modal onClick={setOpenRoleModal}>
					<AddRoleModal
						employees={employees}
						businessId={props.info?.business?._id}
						getEmployees={_getEmployees}
						role={editRole}
						getRoleList={_getRoleList}
						setOpenRoleModal={setOpenRoleModal}
					/>
				</Modal>
			)}
			{openAssistantModal && (
				<Modal onClick={setOpenAssistantModal}>
					<AssignAssistantModal
						setOpenAssistantModal={setOpenAssistantModal}
						businessId={props.info?.business?._id}
						authUser={props.authUser}
					/>
				</Modal>
			)}
			<div className="w-full flex justify-between">
				<span className="text-[32px] font-[700] text-[#5B5B5B]">
					Role and Permissions
				</span>
				<button
					onClick={() => {
						setEditRole(null);
						setOpenRoleModal(true);
					}}
					className="w-[172px] h-[40px] bg-[#19525A] text-[20px] text-white rounded-md"
				>
					Add New Role
				</button>
			</div>
			<div className="w-full flex justify-end bg-[#F0F3FC] shadow-xl p-3 mt-3 rounded-md">
				<div className="flex justify-between  gap-3">
					<input
						type="text"
						placeholder="Search role"
						className="w-[358px] h-[32px] rounded-2xl px-2 outline-none focus:border-gray-400 border-[1px] border-[#42424280]"
						onChange={handleRoleSearch}
					/>
					{/* <Dropdown
						items={roles.length>0&&["All Roles",...roles.map(role=>role.name)]}
						selected={selectedRole}
						onSelected={(item) => handleRoleSearch(item)}
						width={"136px"}
					/> */}
				</div>
				<div className="flex justify-between items-center">
					<BiDotsVerticalRounded className="text-3xl text-[#8F8A8A]" />
				</div>
			</div>
			<div className="bg-white shadow-md mb-4 px-4 py-1 h-full">
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead className="text-gray-600 border-b-2 border-gray-200">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Name of Role
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Permitted To
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Permissions
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-[#5B5B5B] text-[16px]"
								>
									Settings
								</th>
							</tr>
						</thead>
						<tbody>
							{prev.length > 0 &&
								prev.map((role, index) => {
									return (
										<tr
											className={`bg-white  border-b hover:bg-gray-50`}
											key={index}
										>
											<td
												scope="row"
												className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
											>
												<div className="flex items-center h-full">
													<div className="ml-3 truncate">
														<p className="text-[16px] font-normal text-gray-700">
															{role.name}
														</p>
														<p className="text-[10px]">
															{role.createdBy == "Default"
																? `By`
																: `Created By`}{" "}
															{role.createdBy}
														</p>
													</div>
												</div>
											</td>
											<td
												scope="row"
												className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
											>
												{role.slug == "owner"
													? "Organization"
													: role.slug == "practitioner"
														? "All Practitioner"
														: role.slug == "assistant"
															? "All Assistant"
															: role.userCount == 1
																? role.users[0].fullName || role.users[0].name
																: `${role.userCount} Members`}
											</td>
											<td
												scope="row"
												className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
											>
												{role.slug == "owner"
													? "All Permissions"
													: role.permissionCount > 0
														? `${role.permissionCount} Permissions`
														: "No Permissions"}
											</td>
											<td
												scope="row"
												className="px-6 py-8 flex items-center justify-start gap-3 font-normal text-gray-700 whitespace-nowrap"
											>
												<div
													className={`${role.createdBy == "Default" && (role.slug === "owner")
														? "opacity-50"
														: "cursor-pointer hover:text-[#0453e4]"
														} gap-1 flex justify-start items-center`}
													onClick={() => {
														if (role.slug !== "owner") {
															setEditRole(role);
															setOpenRoleModal(true);
														}
													}}
												>
													<BiEditAlt size={18} />
													Edit
												</div>
												{role.slug === "assistant" ?
													<div
														className={`cursor-pointer`}
														onClick={() => {
															setOpenAssistantModal(true);
															setEditRole(role);
														}}
													>
														<BsPersonPlusFill size={18} />
													</div> : <div
														className={`text-rose-500 ${role.createdBy == "Default"
															? "opacity-50"
															: "cursor-pointer"
															}`}
													>
														<HiOutlineTrash size={18} />
													</div>}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
				{/* <div className="mt-5 mb-2 text-sm flex w-full items-center justify-center">
          <button className="py-2 px-5 text-gray-500 border border-gray-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition rounded-full">
            Show all
          </button>
        </div> */}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		info: state?.business?.info,
		loading: state?.business?.loading,
		authUser: state?.auth?.authUser,
		// branchLoading:state?.busin
	};
};
export default connect(mapStateToProps, {
	getBusinessInfo,
})(RoleandPermission);

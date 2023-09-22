/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import MultiSelectDropdown from "../../Dropdown/MultiSelectDropdown";
import {
	createRole,
	updateRole,
} from "../../../StatelessAPI/roleAndPermissionsApiCalls";

const AddRoleModal = (props) => {
	const [click, setClick] = useState("");
	const [show, setShow] = useState(false);
	const [shouldShoAssignTo, setShouldShowAssignTo] = useState(true);
	const [role, setRole] = useState({
		name: "",
		slug: "",
		users: [],
		permissions: [
			{
				slug: "dashboard",
				name: "Dashboard",
				read: false,
				write: false,
			},
			{
				slug: "customers",
				name: "Customers",
				read: false,
				write: false,
			},
			{
				slug: "schedule",
				name: "Schedule",
				read: false,
				write: false,
			},
			{
				slug: "staffs",
				name: "Staffs",
				read: false,
				write: false,
			},
			{
				slug: "staffs_list",
				name: "Staff List",
				read: false,
				write: false,
			},
			{
				slug: "staffs_practitioners",
				name: "Practitioners",
				read: false,
				write: false,
			},
			{
				slug: "staffs_rolesPermissions",
				name: "Roles and Permissions",
				read: false,
				write: false,
			},
			{
				slug: "staffs_tasks",
				name: "Tasks",
				read: false,
				write: false,
			},
			{
				slug: "resources",
				name: "Resources",
				read: false,
				write: false,
			},
			{
				slug: "resources_documents",
				name: "Documents",
				read: false,
				write: false,
			},
			{
				slug: "resources_chart",
				name: "Chart",
				read: false,
				write: false,
			},
			{
				slug: "resources_prescriptions",
				name: "Prescriptions",
				read: false,
				write: false,
			},
			{
				slug: "resources_reports",
				name: "Reports",
				read: false,
				write: false,
			},
			{
				slug: "resources_videos",
				name: "Videos",
				read: false,
				write: false,
			},
			{
				slug: "resources_files",
				name: "Files",
				read: false,
				write: false,
			},
			{
				slug: "payment",
				name: "Payment",
				read: false,
				write: false,
			},
			{
				slug: "payment_account",
				name: "Account",
				read: false,
				write: false,
			},
			{
				slug: "payment_sales",
				name: "Sales",
				read: false,
				write: false,
			},
			{
				slug: "payment_staffPayment",
				name: "Staff Payment",
				read: false,
				write: false,
			},
			{
				slug: "payment_transactions",
				name: "Transactions",
				read: false,
				write: false,
			},
			{
				slug: "payment_fee",
				name: "Fee",
				read: false,
				write: false,
			},
			{
				slug: "payment_tax",
				name: "Tax",
				read: false,
				write: false,
			},
			{
				slug: "payment_discount",
				name: "Discount",
				read: false,
				write: false,
			},
			{
				slug: "payment_refund",
				name: "Refund",
				read: false,
				write: false,
			},
			{
				slug: "payment_commision",
				name: "Commision",
				read: false,
				write: false,
			},
			{
				slug: "payment_settings",
				name: "Settings",
				read: false,
				write: false,
			},
			{
				slug: "settings",
				name: "Settings",
				read: false,
				write: false,
			},
			{
				slug: "settings_business",
				name: "Business",
				read: false,
				write: false,
			},
			{
				slug: "settings_offerings",
				name: "Offerings",
				read: false,
				write: false,
			},
			{
				slug: "settings_email",
				name: "Email",
				read: false,
				write: false,
			},
			{
				slug: "settings_eforms",
				name: "E-Forms",
				read: false,
				write: false,
			},
			{
				slug: "settings_appointmentSchedule",
				name: "Appointment and Schedule",
				read: false,
				write: false,
			},
			{
				slug: "settings_widgets",
				name: "Website Widgets",
				read: false,
				write: false,
			},
			{
				slug: "settings_global",
				name: "Global Practice",
				read: false,
				write: false,
			},
			{
				slug: "settings_google",
				name: "Google Setup",
				read: false,
				write: false,
			},
			{
				slug: "settings_intregrations",
				name: "Intregrations",
				read: false,
				write: false,
			},
			{
				slug: "settings_backup",
				name: "Backup",
				read: false,
				write: false,
			},
			{
				slug: "support",
				name: "Support",
				read: false,
				write: false,
			},
			{
				slug: "support_receptionist",
				name: "Receptionist",
				read: false,
				write: false,
			},
			{
				slug: "support_emailMessages",
				name: "Email and Messages",
				read: false,
				write: false,
			},
			{
				slug: "report",
				name: "Report",
				read: false,
				write: false,
			},
			{
				slug: "report_appointment",
				name: "Appointment",
				read: false,
				write: false,
			},
			{
				slug: "report_sales",
				name: "Sales",
				read: false,
				write: false,
			},
			{
				slug: "report_customers",
				name: "Customers",
				read: false,
				write: false,
			},
			{
				slug: "report_email",
				name: "Email",
				read: false,
				write: false,
			},
			{
				slug: "report_practitioner",
				name: "Practitioner",
				read: false,
				write: false,
			},
			{
				slug: "report_staff",
				name: "Staff",
				read: false,
				write: false,
			},
			{
				slug: "report_products",
				name: "Products",
				read: false,
				write: false,
			},
			{
				slug: "report_services",
				name: "Services",
				read: false,
				write: false,
			},
			{
				slug: "report_packagesmembership",
				name: "Packages and Membership",
				read: false,
				write: false,
			},
			{
				slug: "report_transactions",
				name: "Transactions",
				read: false,
				write: false,
			},
			{
				slug: "report_fee",
				name: "Fee",
				read: false,
				write: false,
			},
			{
				slug: "report_waitlist",
				name: "Waitlist",
				read: false,
				write: false,
			},
			{
				slug: "report_requestlist",
				name: "Requestlist",
				read: false,
				write: false,
			},
			{
				slug: "report_calls",
				name: "Calls",
				read: false,
				write: false,
			},
			{
				slug: "report_ratingreviews",
				name: "Rating and Reviews",
				read: false,
				write: false,
			},
			{
				slug: "report_support",
				name: "Support",
				read: false,
				write: false,
			},
			{
				slug: "report_activity",
				name: "Activity",
				read: false,
				write: false,
			},
		],
		scope: "organization",
		createdBy: props.authUser?.fullName,
		organizationId: props.businessId,
	});

	useEffect(() => {
		if (props.role) {
			setRole({
				...role,
				...props.role,
				permissions: [...props.role.permissions],
				users: props.role.users.map((item) => {
					if (props.employees.find((user) => user._id === item.user)) {
						return item.user;
					}
				}),
			});
			if (props.role.createdBy === "Default") {
				setShouldShowAssignTo(false);
			}
		}
	}, [props.role]);

	const [roleNameError, setRoleNameError] = useState("");

	const menus = role.permissions.filter((item) => !item.slug.includes("_"));
	const subMenuOfMenu = (menu) => {
		return role.permissions.filter(
			(item) => item.slug.includes("_") && item.slug.startsWith(menu + "_")
		);
	};

	const handleCreateRole = async (passedRole) => {
		if (passedRole.name === "") {
			setRoleNameError("Role name is required");
			return;
		}
		setRoleNameError("");
		// console.log(passedRole);
		const res = await createRole(passedRole);
		// @ts-ignore
		if (res.data.status === "success") {
			props.setOpenRoleModal(false);
			props.getRoleList();
		}
	};

	const handleUpdateRole = async (passedRole) => {
		if (passedRole.name === "") {
			setRoleNameError("Role name is required");
			return;
		}
		setRoleNameError("");
		// console.log(passedRole);
		const res = await updateRole(passedRole, passedRole._id);
		// @ts-ignore
		if (res.data.status === "success") {
			props.setOpenRoleModal(false);
			props.getRoleList();
		}
	};
	return (
		<div className="max-w-[440px] sm:min-w-full lg:min-w-[440px] h-fit mt-5 mb-3 mx-auto bg-white py-2 rounded-md">
			<div className="w-full flex justify-end items-start">
				<span
					onClick={() => props.setOpenRoleModal(false)}
					className="text-2xl text-[#5B5B5B] cursor-pointer mr-3"
				>
					✖
				</span>
			</div>
			{/* all fields... */}
			<div className="w-full flex border-b-[1px] border-[#76767680] justify-center text-[#19525A] text-[20px] pb-3">
				<span>Add New Role</span>
			</div>
			<div className="w-full flex flex-col justify-center items-center p-3">
				{shouldShoAssignTo && (
					<div className="flex flex-col">
						<span className="text-[16px] text-[#5B5B5B]">Role Name</span>
						<input
							type="text"
							value={role.name}
							onChange={(e) => {
								setRole({
									...role,
									name: e.target.value,
									slug: e.target.value.toLowerCase().replace(/ /g, "_"),
								});
							}}
							className={`w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] ${roleNameError ? "border-rose-500" : "border-[#19525A80]"
								}  mt-1 rounded-md shadow-md`}
						/>
					</div>
				)}

				{shouldShoAssignTo && (
					<div className="w-full flex flex-col justify-center items-center p-3">
						<div className="flex flex-col">
							<span className="text-[16px] text-[#5B5B5B]">Assign To</span>
							<div className="w-full flex justify-center">
								<MultiSelectDropdown
									items={props.employees.map((item) => {
										return {
											id: item?._id,
											name: item?.fullName,
										};
									})}
									selectedList={role.users}
									width={"410px"}
									itemName="Employees"
									onSelectedItem={(selected) => {
										//add or remove selected item from role.users
										// console.log(selected);
										if (role.users.includes(selected)) {
											setRole({
												...role,
												users: role.users.filter((item) => item !== selected),
											});
										} else {
											setRole({
												...role,
												users: [...role.users, selected],
											});
										}
									}}
								/>
							</div>
						</div>
					</div>
				)}
				<div className="border-b-[2px] w-full border-gray-300 px-2 py-2 flex justify-between">
					<span className="text-[16px] text-[#0D0D0D]  font-[500]">
						Permissions
					</span>
					<div className="flex justify-between w-[35%]">
						<span className="text-[16px] text-[#0D0D0D]  font-[500]">Read</span>
						<span className="text-[16px] text-[#0D0D0D]  font-[500]">
							Write
						</span>
					</div>
				</div>
				{menus.map((permission, idx) => {
					return (
						<div
							key={permission.slug}
							className="flex flex-col w-full border-b-[2px] border-gray-300"
						>
							<div className="flex justify-between items-center px-2 py-2  w-full">
								<div
									onClick={() => {
										if (click === permission.slug && show) setShow(false);
										else setShow(true);
										setClick(permission.slug);
									}}
									className="flex items-center cursor-pointer"
								>
									<span className="text-[16px] text-[#5B5B5B]">
										{permission.name}
									</span>
									{subMenuOfMenu(permission.slug).length > 0 && (
										<BiChevronDown className="ml-1 text-xl text-[#5B5B5B]" />
									)}
								</div>

								<div className="flex justify-between w-[32%] px-2">
									<input
										id="default-checkbox"
										type="checkbox"
										checked={permission.read}
										onChange={(event) => {
											setRole((prevRole) => {
												const updatedPermissions = prevRole.permissions.map(
													(prmsn) => {
														if (prmsn.slug.startsWith(permission.slug)) {
															if (prmsn.write) {
																return {
																	...prmsn,
																	read: true,
																};
															} else {
																return {
																	...prmsn,
																	read: event.target.checked,
																};
															}
														}
														return prmsn;
													}
												);
												return {
													...prevRole,
													permissions: updatedPermissions,
												};
											});
										}}
										className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
									/>
									<input
										id="default-checkbox"
										type="checkbox"
										checked={permission.write}
										onChange={(event) => {
											setRole((prevRole) => {
												const updatedPermissions = prevRole.permissions.map(
													(prmsn) => {
														if (prmsn.slug.startsWith(permission.slug)) {
															return {
																...prmsn,
																write: event.target.checked,
																read: event.target.checked,
															};
														}
														return prmsn;
													}
												);
												return {
													...prevRole,
													permissions: updatedPermissions,
												};
											});
										}}
										className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
									/>
								</div>
							</div>
							<div
								className={`${show && click === permission.slug ? "block" : "hidden"
									}`}
							>
								{subMenuOfMenu(permission.slug).map((ele) => (
									<div
										key={ele.slug}
										className="w-full flex justify-between items-center px-2 py-1"
									>
										<span className="text-[#898989] text-[14px]">
											{ele.name}
										</span>
										<div className="flex justify-between w-[32%] px-2">
											<input
												id="default-checkbox"
												type="checkbox"
												checked={ele.read}
												onChange={(event) => {
													setRole((prevRole) => {
														const updatedPermissions = prevRole.permissions.map(
															(psn) => {
																if (psn.slug === ele.slug) {
																	if (psn.write || permission.read) {
																		return {
																			...psn,
																			read: true,
																		};
																	} else {
																		return {
																			...psn,
																			read: event.target.checked,
																		};
																	}
																}
																return psn;
															}
														);
														return {
															...prevRole,
															permissions: updatedPermissions,
														};
													});
												}}
												className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
											/>
											<input
												id="default-checkbox"
												type="checkbox"
												checked={ele.write}
												onChange={(event) => {
													setRole((prevRole) => {
														const updatedPermissions = prevRole.permissions.map(
															(psn) => {
																if (psn.slug === ele.slug) {
																	if (permission.write) {
																		return {
																			...psn,
																			write: true,
																			read: true,
																		};
																	} else {
																		return {
																			...psn,
																			write: event.target.checked,
																			read: psn.write
																				? true
																				: event.target.checked,
																		};
																	}
																}
																return psn;
															}
														);
														return {
															...prevRole,
															permissions: updatedPermissions,
														};
													});
												}}
												className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					);
				})}
				<div className="w-full flex justify-end items-end px-3 pt-5">
					<button
						onClick={(e) => {
							props.setOpenRoleModal(false);
						}}
						className="h-[32px] w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
					>
						Cancel
					</button>
					<button
						onClick={(e) => {
							if (props.role) {
								handleUpdateRole(role);
							} else {
								handleCreateRole(role);
							}
						}}
						className="h-[32px] w-[80px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
					>
						{props.role ? "Update" : "Save"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddRoleModal;

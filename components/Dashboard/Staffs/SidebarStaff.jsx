import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { hasPermission } from "../../../utils/permissions";
import Cookies from "js-cookie";
import { connect } from "react-redux";
export const staffItems = [
	{
		id: 1,
		title: "Staff List",
		icon: "StaffList",
		iconHeight: 26,
		iconWidth: 36,
		slug: "staffs_list",
	},
	{
		id: 2,
		title: "Practitioner List",
		icon: "PractitionerList",
		iconHeight: 29,
		iconWidth: 36,
		slug: "staffs_practitioners",
	},
	{
		id: 3,
		title: "Role and Permissions",
		icon: "RoleandPermission",
		iconHeight: 36,
		iconWidth: 36,
		slug: "staffs_rolesPermissions",
	},
	{
		id: 4,
		title: "Task",
		icon: "Task",
		iconHeight: 40,
		iconWidth: 30,
		slug: "staffs_tasks",
	},
	{
		id: 5,
		title: "Staff settings",
		icon: "StaffSettings",
		iconHeight: 36,
		iconWidth: 36,
		slug: "staffs_settings",
	},
];

const SidebarStaff = ({ show, setShow, scrollToTop, user }) => {
	const [collapsed, setCollapsed] = React.useState(false);
	const sidebar = useRef(null);
	const [tabItems, setTabItems] = React.useState([]);
	const [active, setActive] = React.useState(1);

	useEffect(() => {
		scrollToItem();
	}, [active]);

	const scrollToItem = () => {
		sidebar.current.scrollTo({
			top: active * 70 - 70,
			behavior: "smooth",
		});
	};


	useEffect(() => {
		let items = staffItems.filter((itm) =>
			hasPermission(
				user?.userRoles.find(
					(itm) => itm._id == Cookies.get("actingUserType")
				)?.permissionRole?.permissions,
				itm.slug,
				"read"
			)
		);
		setTabItems(items);

		if (items.length > 0) {
			setShow(items[0].id);
			setActive(1);
		}
	}, []);
	return (
		<React.Fragment>
			{/* ${styles.scrollbar}  */}
			<div ref={sidebar} className={`hidden md:block bg-[#F2F2F2] mt-5`}>
				<div
					className={`bg-white ${collapsed ? "w-[67px]" : "w-[281px]"
						} shadow-md shadow-slate-600 border-[#19525a49] rounded-[9px] border-[1px] mr-3`}
				>
					{tabItems.map((staffItem, idx) => (
						<div className="" key={idx}>
							{idx !== 0 && show + 1 !== staffItem.id && (
								<div className="border-t-2 border-gray-300 mx-2"></div>
							)}
							<div
								className={
									show === staffItem.id
										? `bg-[#003F48E5] text-white px-2 mx-[1px] rounded-lg shadow-md shadow-slate-500 flex justify-between ${collapsed ? "" : "items-center"
										}`
										: `hover:bg-[#929ea333] text-[#5B5B5B] px-2 rounded-lg flex justify-between ${collapsed ? "" : "items-center"
										}`
								}
							>
								<div
									onClick={() => {
										setActive(idx + 1);
										setShow(staffItem.id);
										scrollToTop();
									}}
									className="h-[65px] inline-flex items-center relative cursor-pointer"
								>
									<div className="w-[45px] m-1 justify-center inline-flex items-center relative">
										<Image
											src={
												show === staffItem.id
													? `/icons/light/${staffItem.icon}.png`
													: `/icons/dark/${staffItem.icon}.png`
											}
											height={staffItem.iconHeight}
											width={staffItem.iconWidth}
											alt="icons"
										/>
									</div>

									{!collapsed && (
										<div className="items-center w-[195px] px-1 text-left font-normal text-[18px]">
											<span>{staffItem.title}</span>
										</div>
									)}
								</div>
								{idx == 0 && (
									<div
										onClick={() => setCollapsed(!collapsed)}
										className={`h-5 cursor-pointer ${collapsed
											? "transform rotate-180 absolute w-[53px] text-end"
											: " w-6 "
											}`}
									>
										<HiChevronDoubleLeft />
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</React.Fragment>
	);
};


const mapStateToProps = (state) => {
	// console.log(state.auth);
	return {
		info: state?.business?.info,
		user: state?.auth?.authUser,
	};
};

export default connect(mapStateToProps)(SidebarStaff);
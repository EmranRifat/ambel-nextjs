import React, { useRef } from "react";
import Image from "next/image";
import { sidebarItems } from "./sidebarItems";
import { useRouter } from "next/router";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { useEffect } from "react";

const AccountSidebar = ({ show, setShow }) => {
	const [collapsed, setCollapsed] = React.useState(false);
	const sidebar = useRef(null);
	return (
		<React.Fragment>
			<div
				ref={sidebar}
				className={`h-[68vh] overflow-y-scroll  hidden md:block bg-[#F2F2F2] pb-2`}
			>
				<div
					className={`bg-white ${
						collapsed ? "w-[70px]" : "w-[281px]"
					} shadow-md shadow-slate-600 border-[#19525a49] rounded-[9px] border-[1px] mr-3`}
				>
					{sidebarItems.map((setUpOption, idx) => (
						<div key={idx}>
							{idx !== 0 && show + 1 !== setUpOption.id && (
								<div className="border-t-2 border-gray-300 mx-2"></div>
							)}
							<div
								key={setUpOption.id}
								className={
									show === setUpOption.id
										? `bg-[#003F48E5] text-white px-2 mx-[1px] rounded-lg shadow-md shadow-slate-500 flex justify-between ${
												collapsed ? "" : "items-center"
										  }`
										: `hover:bg-[#929ea333] text-[#5B5B5B] px-2 rounded-lg flex justify-between ${
												collapsed ? "" : "items-center"
										  }`
								}
							>
								<div
									onClick={() => {
										setShow(setUpOption.id);
									}}
									className="h-[70px] inline-flex items-center relative cursor-pointer "
								>
									<div className="h-[42px] w-[43px] items-center flex">
										<Image
											src={
												show === setUpOption.id
													? `/icons/light/practitioner/${setUpOption.icon}.png`
													: `/icons/dark/practitioner/${setUpOption.icon}.png`
											}
											height={setUpOption.iconHeight}
											width={setUpOption.iconWidth}
											alt="icons"
										/>
									</div>
									{!collapsed && (
										<div className="items-center w-[205px] px-1 text-left font-normal text-[18px]">
											<span>{setUpOption.title}</span>
										</div>
									)}
								</div>
								{idx == 0 && (
									<div
										onClick={() => setCollapsed(!collapsed)}
										className={`h-5 cursor-pointer ${
											collapsed
												? "transform rotate-180 absolute w-[56px] text-end"
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

export default AccountSidebar;

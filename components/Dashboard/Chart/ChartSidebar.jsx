import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { connect } from "react-redux";
import { chartSidebaritem } from "./chartSidebarItem";

const ChartSidebar = ({
	show,
	setShow,
	scrollToTop,
	info,
}) => {
	const [collapsed, setCollapsed] = React.useState(false);
	const [existIntegration, setExistIntegration] = useState([]);

	useEffect(() => {
		let items = chartSidebaritem.filter((itm) =>
			info?.business?.integrations?.includes(itm.slug)
		);
		setExistIntegration(items);

		if (items.length > 0) {
			setShow(items[0].id);
			scrollToTop();
		}
	}, [info?.business]);
	return (
		<React.Fragment>
			<div className={`hidden md:block bg-[#F2F2F2] mt-5`}>
				<div
					className={`bg-white ${collapsed ? "w-[67px]" : "w-[281px]"
						} shadow-md shadow-slate-600  rounded-[9px] mr-3`}
				>
					{existIntegration.length > 0 && existIntegration.map((item, idx) => {
						return (
							<div className="" key={idx}>
								<div
									className={
										show === item.id
											? `bg-[#003F48E5] text-white px-2 mx-[1px] rounded-lg border-b-[1px] border-b-[#1A535B80] shadow-md shadow-slate-500 flex justify-between ${collapsed ? "" : "items-center"
											}`
											: `hover:bg-[#929ea333] text-[#5B5B5B] border-b-[1px] border-b-[#1A535B80] px-2 rounded-lg flex justify-between ${collapsed ? "" : "items-center"
											}`
									}
								>
									<div
										onClick={() => {
											setShow(item.id);
											scrollToTop();
										}}
										className="h-[65px] inline-flex items-center relative cursor-pointer"
									>
										<div className="w-[45px] m-1 justify-center inline-flex items-center relative">
											<Image
												src={
													show === item.id
														? `/icons/light/${item.icon}.png`
														: `/icons/dark/${item.icon}.png`
												}
												height={item.iconHeight}
												width={item.iconWidth}
												alt="icons"
											/>
										</div>

										{!collapsed && (
											<div className="items-center w-[195px] px-1 text-left font-normal text-[18px]">
												<span>{item.title}</span>
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
						);
					})}
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		info: state?.business?.info,
		// loading: state?.business?.loading,
		// branchLoading:state?.busin
	};
};
export default connect(mapStateToProps)(ChartSidebar);

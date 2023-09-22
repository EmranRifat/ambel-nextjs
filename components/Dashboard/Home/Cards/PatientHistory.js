import React, { useEffect } from "react";
import patient from "./icons/patients.png";
import performance from "./icons/performance.png";
import visitors from "./icons/visitors.png";
import sales from "./icons/sales.png";
import Image from "next/image";
import { connect } from "react-redux";
import { getBusinessInfo } from "../../../../store/actions/business";

const PatentHistory = (props) => {
	const [historyData, setHistoryData] = React.useState([
		{
			title: "Total Patients",
			icon: patient,
			value: "222",
			color: "bg-[#003F48]",
			rate: {
				value: "45",
				percent: "w-[45%]",
			},
		},
		{
			title: "Total Visit",
			icon: visitors,
			value: "1010",
			color: "bg-[#FD7E15]",
			rate: {
				value: "67",
				percent: "w-[67%]",
			},
		},
		{
			title: "Total Sales",
			icon: sales,
			value: "$" + "5600",
			color: "bg-[#188754]",
			rate: {
				value: "95",
				percent: "w-[95%]",
			},
		},
		{
			title: "Performance",
			icon: performance,
			value: "33.50" + "%",
			color: "bg-[#0089C9]",
			rate: {
				value: "35",
				percent: "w-[35%]",
			},
		},
	]);

	const [businessData, setBusinessData] = React.useState({
		customerAlias: "Customers",
		serviceAlias: "Service",
	});

	useEffect(() => {
		props.getBusinessInfo();
	}, []);

	useEffect(() => {
		if (props.info?.business) {
			setBusinessData({ ...businessData, ...props.info?.business });
		}
	}, [props.info]);

	const historyCard = (history, index) => {
		return (
			<div
				key={index}
				className="h-28 w-full lg:w-72 2xl:w-[24%] md:w-[48%] my-2 bg-white rounded-lg p-3 shadow"
			>
				<div className="flex items-center h-full">
					<div className={`p-3 ${history.color} h-14 w-14 rounded-full`}>
						<Image src={history.icon} alt="patient" height={60} width={60} />
					</div>
					<div className="ml-3 w-[70%]">
						<h6 className="text-xlg text-gray-900">
							{index == 0 || index == 2
								? `Total ${
										index == 0
											? businessData.customerAlias
											: businessData.serviceAlias
								  }` ?? history.title
								: history.title}
						</h6>
						<h6 className="text-lg text-gray-600">{history.value}</h6>
						<div className="w-full bg-gray-200 rounded h-1 my-0">
							<div
								className={`${history.color} h-1 rounded ${history.rate.percent}`}
							></div>
						</div>
						<small className="text-xs text-gray-600">
							{history.rate.value}% increase
						</small>
					</div>
				</div>
			</div>
		);
	};

	return (
		<React.Fragment>
			<div className="flex flex-wrap items-center justify-between mb-3">
				{historyData.map((history, index) => {
					return historyCard(history, index);
				})}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	info: state?.business?.info,
});

export default connect(mapStateToProps, { getBusinessInfo })(PatentHistory);

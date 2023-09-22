import Image from "next/image";
import React, { useEffect } from "react";
import { connect } from "react-redux";

const professional = [
	"5 practitioner",
	"Online Booking",
	"Online Appointment",
	"Online Payment",
	"All scheduling features",
	"Custom Invoicing & Receipts",
	"Unlimited File Storage",
	"Unlimited Email & SMS Reminders",
	"Financial Reporting",
	"Task, Note, Video Documentation",
	"24/7 support",
];
const Subscriptions = (props) => {
	const [info, setInfo] = React.useState({
		logo: "",
		name: "",
		prfileImage: "",
	});

	// useEffect(() => {
	// 	props.getBusinessInfo();
	// }, []);

	useEffect(() => {
		if (props.info?.business) {
			setInfo({ ...info, ...props.info?.business });
		}
	}, [props.info]);

	return (
		<>
			<div className=" flex flex-col items-center">
				<div className="shadow-lg w-full flex flex-col bg-white rounded-[8px] px-4 py-3">
					<p className="text-[24px] text-[#0D0D0D] font-[300]">
						You are running your organization under{" "}
					</p>
					<p className="text-[32px] text-[#01261C] font-[600] ">
						Professional Subscription
					</p>
					<div className="flex">
						<p className="text-[20px] text-[#0D0D0D]">Expiring on : </p>
						<span className="text-[#006F88] text-[20px] ml-2">
							10th August, 2022
						</span>
					</div>
					<button className="px-2 py-2 w-[196px] h-[48px] mt-6 mb-3 text-[16px] bg-[#19525A] text-white rounded-[8px]">
						Update Subscription
					</button>
				</div>
				<div className="w-full flex flex-col lg:flex-row justify-start pb-10">
					<div className="md:w-[40%] w-[90%] flex flex-col m-6">
						<span className="text-[24px] text-[#4B4B4B] font-[700]">
							Your Subscription
						</span>
						<div className="w-full h-[540px] shadow-lg bg-white rounded-[16px] p-3 mt-4">
							<span className="text-[24px] text-[#01261C] font-[500]">
								Professional
							</span>
							<div className="border-b-2 border-b-black text-[#01261C] text-[36px] font-[700] pb-3">
								$50
							</div>
							<div className="flex flex-col">
								{professional.map((prof, i) => (
									<span key={i} className="text-[16px] text-[#01261C] mt-2">
										✔ {prof}{" "}
									</span>
								))}
							</div>
						</div>
					</div>
					<div className="md:w-[40%] w-[90%] flex flex-col m-5">
						<span className="text-[24px] text-[#4B4B4B] font-[700] ">
							Your Organization Status
						</span>
						<div className="w-full h-[550px] shadow-lg bg-white rounded-[16px] p-3 mt-4">
							<div className="flex items-center border-b-2 border-b-black pb-3">
								<Image
									src={info.logo ?? "/icons/Ellipse75.png"}
									alt="hello"
									height={90}
									width={90}
								/>
								<span className="text-[24px] ml-4 font-[600]">
									{info?.name}
								</span>
							</div>
							<div className="flex flex-col">
								{professional.map((prof, i) => (
									<span key={i} className="text-[16px] text-[#01261C] mt-2">
										✔ {prof}{" "}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		info: state?.business?.info,
		loading: state?.business?.loading,
	};
};
export default connect(mapStateToProps)(Subscriptions);

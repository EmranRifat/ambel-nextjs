import React from "react";
import Dropdown from "../../Dropdown";
import { BiDotsVerticalRounded } from "react-icons/bi";

const services = [1, 2, 3, 4];
const ServicesModal = (props) => {
	return (
		<>
			<div className="max-w-[720px] lg:min-w-[720px] absolute top-10 left-[30%] flex flex-col items-center bg-white rounded-md">
				<div className="w-full flex justify-start p-4">
					<h3 className="text-[#5B5B5B] text-[20px]">
						Services of <span>Md Tazul Islam</span>
					</h3>
				</div>
				<div className="w-full flex justify-between bg-[#F0F3FC] shadow-sm p-3 rounded-md">
					<div className="flex justify-between gap-3">
						<Dropdown
							items={["All Branches", "Sylhet", "Dhaka"]}
							selected={"All Branches"}
							onSelected={(item) => console.log(item)}
							width={"136px"}
						/>
						<Dropdown
							items={["24-08-2022", "25-08-2022", "26-08-2022", "27-08-2022"]}
							selected={"24-08-2022"}
							onSelected={(item) => console.log(item)}
							width={"136px"}
						/>
					</div>
					<div className="flex justify-between items-center">
						<BiDotsVerticalRounded className="text-3xl text-[#8F8A8A]" />
					</div>
				</div>
				<div className="w-full border-b-[2px] border-gray-400 px-3 pt-3">
					<h3 className="text-[#19525A] text-[16px]">
						4 services listed for MD. Tazul Islam
					</h3>
				</div>

				{services.map((service, i) => (
					<>
						<div
							key={i}
							className=" w-full flex justify-between border-b-[2px] border-gray-400 px-5"
						>
							<div className="flex p-5">
								<span className="p-2 bg-[#C4DBCC] text-center h-10 w-10 rounded-full text-lg font-bold ">
									{service}
								</span>
								<div className="flex flex-col ml-5">
									<span className="text-[20px] text-[#196947]">
										Cardiology consaltent
									</span>
									<span className="text-[#5B5B5B]">Normal Follow Up </span>
									<p className="text-[#5B5B5B]">
										Appointment length:
										<span className="text-[#008AC5]">30 minutes</span>
									</p>
									<span className="mt-3 text-[#5B5B5B]">
										Service Fee: $30 (Included GST, PST)
									</span>
									<p className="text-[#5B5B5B]">
										Payment: <span className="text-[#AF1010]">Pre-Paid</span>
									</p>
									<span className="text-[#5B5B5B]">
										Assign for 2 Practitioner and 2 supportive staff
									</span>
									<span className="text-[#5B5B5B]">Capacity: 1 Person</span>

									<span className="text-[#5B5B5B]">Way of service: Online</span>
									<span className="text-[#5B5B5B]">
										Online Booking : Enable
									</span>
									<span className="text-[#5B5B5B]">Status: Active</span>
									<p className="text-[#5B5B5B]">
										Status : <span className="text-[#19525A]">Active</span>
									</p>
								</div>
							</div>
							<div className="mt-5">
								<button className="h-[28px] w-[77px] text-[12px] bg-[#19525A] text-white rounded-[8px]">
									Edit
								</button>
							</div>
						</div>
					</>
				))}
			</div>
		</>
	);
};

export default ServicesModal;

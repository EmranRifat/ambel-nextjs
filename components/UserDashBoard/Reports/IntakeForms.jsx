import React, { forwardRef } from "react";
import Dropdown from "../../Dropdown";
import Delete from "../../../public/icons/delete.png";
import calendar from "../../../public/icons/calendar.png";
import arrowdown from "../../../public/icons/arrowdown.png";
import dot from "../../../public/icons/dot3.png";
import uparrow from "../../../public/icons/uparrow.png";
import downarrow from "../../../public/icons/downarrow.png";
import edit from "../../../public/icons/edit.png";
import CustomComponent from "./CustomComponent.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useState } from "react";

const IntakeForms = () => {
	const [date, setDate] = useState("");
	const [range, setRange] = useState("");
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	const handleSelect = (date) => {
		// console.log(date);
	};

	const DateComponent = CustomComponent("Date of Send", "w-[163px]");
	const RangeComponent = CustomComponent("Range of Date", "w-[163px]");

	return (
		<>
			<div className="pb-20">
				<span className="text-[#5B5B5B] text-[32px] font-[700]">
					Intake Form
				</span>
				<div className="bg-white rounded-lg flex flex-col mt-2 shadow-md">
					<div className="flex w-full bg-[#E4E7ED] rounded-[8px] pt-[12px] pb-[14px] shadow-[0_0px_0px_6px_rgba(0, 0, 0, 0.25)]">
						<DatePicker
							selected={date}
							onChange={(date) => {
								// console.log(date);
								setDate(date);
							}}
							customInput={<DateComponent />}
							withPortal
						/>
						<DatePicker
							selected={startDate}
							onChange={(update) => {
								setDateRange(update);
							}}
							customInput={<RangeComponent />}
							startDate={startDate}
							endDate={endDate}
							selectsRange
							withPortal
						/>
						<div
							className={`flex justify-between w-[136px] h-8 bg-white border-[1px] border-[#19525A80]/50 rounded-[8px] p-2 leading-[18px] ml-[17px]`}
						>
							<span className="text-[12px] text-[#5B5B5BB2]/70 font-normal shrink">
								Form Status
							</span>
							<img src={arrowdown.src} className="py-[4px] " />
						</div>
						<div className="flex flex-col grow mr-[34px] mt-[8px]">
							<div className="w-[5px] h-[5px] mb-[2px] bg-[#8F8A8A] self-end">
								<img src={dot.src} />
							</div>
							<div className="w-[5px] h-[5px] mb-[2px] bg-[#8F8A8A] self-end">
								<img src={dot.src} />
							</div>
							<div className="w-[5px] h-[5px] mb-[2px] bg-[#8F8A8A] self-end">
								<img src={dot.src} />
							</div>
						</div>
					</div>
					<div className="w-full flex flex-col px-5">
						<div className="w-full flex justify-items-start items-start mx-auto border-b-2 border-gray-300 pt-3 pb-2">
							<div className="text-[14px] w-16% self-start m-auto text-[#5B5B5B]">
								Date
								<div className="inline-block ml-[5px] relative top-[3px]">
									<img src={uparrow.src} className="py-[3px]" />
									<img src={downarrow.src} />
								</div>
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								Form Name
							</div>
							<div className="text-[14px] text-center w-16% self-start m-auto text-[#5B5B5B]">
								Sender
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								Organization Name
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								Status
							</div>

							<div className="text-[14px]  w-15% self-start m-auto text-[#5B5B5B]">
								<text className="pl-[15px]">Action</text>
							</div>
						</div>
						<div className="w-full flex justify-items-start items-start mx-auto border-b-2 border-gray-300 py-3">
							<div className="text-[14px] w-16% self-start  m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								Basic Information <br />{" "}
								<span className="text-[12px] italic ">For</span>{" "}
								<span className="text-[#0089C9]">Service Name</span>
							</div>
							<div className="text-[14px] text-center w-16% self-start m-auto text-[#5B5B5B]">
								Md. Tazul Islam
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								Mount adora Hopital <br />
								Akhalia, Sylhet
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								Pending
							</div>
							<div className="text-[14px] w-15% self-start m-auto text-[#5B5B5B]">
								<button className="w-[84px] h-[28px] bg-[#19525A] rounded-[21px] text-[#FFFFFF]">
									View
								</button>
								<img
									src={Delete.src}
									className="inline-block relative -top-[px] ml-[25px]"
								/>
							</div>
						</div>
						<div className="w-full flex justify-items-start items-start mx-auto border-b-2 border-gray-300 py-3">
							<div className="text-[14px] w-16% self-startself-start  m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								Basic Information <br />{" "}
								<span className="text-[12px] italic ">For</span>{" "}
								<span className="text-[#0089C9]">Service Name</span>
							</div>
							<div className="text-[14px] text-center w-16% self-start m-auto text-[#5B5B5B]">
								Md. Tazul Islam
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								Mount adora Hopital <br />
								Akhalia, Sylhet
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								Submitted
							</div>
							<div className="text-[14px] w-15% self-start m-auto text-[#5B5B5B]">
								<button className="w-[84px] h-[28px] bg-[#19525A] rounded-[21px] text-[#FFFFFF]">
									View
								</button>
								<img
									src={Delete.src}
									className="inline-block relative -top-[px] ml-[25px]"
								/>
							</div>
						</div>
						<div className="w-full flex justify-items-start items-start mx-auto border-b-2 border-gray-300 py-3">
							<div className="text-[14px] w-16% self-startself-start  m-auto text-[#5B5B5B]">
								10 Aug, 2022 <br />
								10:00 AM (EDT)
							</div>
							<div className="text-[14px] w-18% self-start m-auto text-[#5B5B5B]">
								Basic Information <br />{" "}
								<span className="text-[12px] italic ">For</span>{" "}
								<span className="text-[#0089C9]">Service Name</span>
							</div>
							<div className="text-[14px] text-center w-16% self-start m-auto text-[#5B5B5B]">
								Md. Tazul Islam
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								Mount adora Hopital <br />
								Akhalia, Sylhet
							</div>
							<div className="text-[14px] text-center w-20% self-start m-auto text-[#5B5B5B]">
								Submitted
							</div>
							<div className="text-[14px] w-15% self-start m-auto text-[#5B5B5B]">
								<button className="w-[84px] h-[28px] bg-[#19525A] rounded-[21px] text-[#FFFFFF]">
									View
								</button>
								<img
									src={Delete.src}
									className="inline-block relative -top-[px] ml-[25px]"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default IntakeForms;

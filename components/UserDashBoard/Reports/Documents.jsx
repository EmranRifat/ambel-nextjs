import React, { useState, forwardRef } from "react";
import plus from "../../../public/icons/plus.svg";
import calendar from "../../../public/icons/calendar.png";
import search from "../../../public/icons/search.svg";
import arrowmenu from "../../../public/icons/arrowmenu.svg";
import CustomComponent from "./CustomComponent.js";

import DatePicker from "react-datepicker";

const Documents = () => {
	const [date, setDate] = useState("");

	const DateComponent = CustomComponent("Date of upload", "w-[163px]");

	return (
		<>
			<div>
				<div>
					<span className="text-[#5B5B5B] text-[32px] font-[700]">
						Documents
					</span>
					<button className="w-[86px] h-[36px] bg-[#19525A] text-[#FFF] rounded-[8px] shadow-[0_0px_0px_6px_rgba(0, 0, 0, 0.25)] float-right mt-[5px]">
						<img
							src={plus.src}
							className="inline-block text-[#FFF] h-[12px] w-[12px] mr-[8px]"
						/>
						<text className="text-[#FFF] text-[14px] leading-[17px]">New</text>
					</button>
				</div>
				<div className="relative bg-white rounded-lg flex flex-col mt-2 shadow-md">
					<div className="flex w-full bg-[#E4E7ED] rounded-[8px] pt-[12px] pb-[14px] shadow-[0_0px_0px_6px_rgba(0, 0, 0, 0.25)]">
						<DatePicker
							selected={date}
							onChange={(date) => {
								//console.log(date);
								setDate(date);
							}}
							customInput={<DateComponent value={undefined} onClick={undefined} />}
							withPortal
						/>
						<div className="relative ml-[16px] w-[296px] h-[32px] border-[1px]  border-[#19525A80]/50 bg-[#FFF] rounded-[24px] p-[1px]">
							<input
								type={"text"}
								className="w-[92%]  pl-[10px] focus:outline-none text-[12px] text-[#5B5B5BB2]/70 leading-[18px] rounded-[24px]"
								placeholder="Search"
							></input>
							<img
								src={search.src}
								className="text-[#5B5B5BB2]/70 w-[20px] h-[20px] absolute top-[5px] left-[92%]"
							/>
						</div>
						<img
							src={arrowmenu.src}
							className="inline-block w-[2opx] h-[20px] absolute left-[95%] top-[20px]"
						/>
					</div>
					<div className="w-full h-[350px] flex flex-col justify-center items-center px-5">
						<text className="text-[#5B5B5BB2]/70 text-[32px]">
							Same As Drive
						</text>
					</div>
				</div>
			</div>
		</>
	);
};

export default Documents;

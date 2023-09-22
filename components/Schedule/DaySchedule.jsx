import Image from "next/image";
import React, { useRef, useState } from "react";
import Dropdown from "../Dropdown";
import { BiSearch } from "react-icons/bi";
import InputWithDropdown from "../Dropdown/InputWithDropdown";
import moment from "moment";


const days = [
	{
		id: "sun",
		day: "S",
	},
	{
		id: "mon",
		day: "M",
	},
	{
		id: "tue",
		day: "T",
	},
	{
		id: "wed",
		day: "W",
	},
	{
		id: "thu",
		day: "T",
	},
	{
		id: "fri",
		day: "F",
	},
	{
		id: "sat",
		day: "S",
	},
];
const DaySchedule = ({ schedule, setSchedule, selectedRepeatDays, setSelectedRepeatDays }) => {

	const timePickerRef = useRef(null);
	const [showTimeRange, setShowTimeRange] = useState(false);
	return (
		<React.Fragment>
			<div className="w-full flex justify-start items-center mt-3 px-2">
				<div className=" w-full flex flex-col">
					<div className="flex"><span className="text-[16px] text-[#5B5B5B]">Date</span><span className="text-rose-500">*</span></div>
					<div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 rounded-md">
						<input
							type="date"
							placeholder="DD/MM"
							className="outline-none w-full px-2"
						/>
					</div>
				</div>
				<div
					ref={timePickerRef}
					className="flex flex-col w-full ml-2 relative"
				>
					<div className="flex"><span className="text-[16px] text-[#5B5B5B]">Time</span><span className="text-rose-500">*</span></div>
					<p
						onClick={(e) => {
							setShowTimeRange(!showTimeRange);
						}}
						className="h-[36px] whitespace-nowrap text-xs flex items-center text-clip w-full outline-none text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md"
					>
						{moment("", "HH:mm").format("hh:mm A") +
							" - " +
							moment("", "HH:mm").format("hh:mm A")}
					</p>
					{showTimeRange && (
						<div className="flex items-center gap-2 absolute right-0 -bottom-10 border-2 bg-white p-1 shadow-sm">
							<input
								className="text-xs focus:outline-none"
								type="time"
								// value={startTime}
								onChange={(e) => {
									// console.log(e.target);
									// setStartTime(e.target.value);
								}}
							/>
							-
							<input
								className="text-xs focus:outline-none"
								type="time"
								// value={endTime}
								onChange={(e) => {
									// setEndTime(e.target.value);
								}}
							/>
						</div>
					)}
				</div>
			</div>
			<div className="mt-3">
				<span className="text-[16px] text-[#5B5B5B]">Name of Schedule</span>
				<InputWithDropdown
					items={["Class", "Event"]}
					selected={schedule.class}
					onSelected={(selected) => {
						setSchedule({ ...schedule, class: selected });
					}} />
			</div>
			<div className=" w-[280px] flex flex-col mt-3">
				<span className="text-[16px] text-[#5B5B5B]">Repeat schedule</span>
				<Dropdown
					width={"280px"}
					items={["No repeat", "Everyday", "Same day in every week", "Custom"]}
					selected={"Select repeat schedule"}
					onSelected={(selected) => {
						// onChangeValue({
						//   target: { name: "location", value: selected },
						// });
					}}
				/>
			</div>
			<div className="w-full flex justify-start items-center mt-3 px-2">
				<div className=" w-[135px] flex flex-col">
					<span className="text-[16px] text-[#5B5B5B]">From*</span>
					<div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
						<input
							type="text"
							placeholder="DD/MM"
							className="outline-none w-[100px]"
						/>
						<Image
							src="/calendar.png"
							height={16}
							width={16}
							alt="clendar"
							className="cursor-pointer"
						/>
					</div>
				</div>
				<div className=" w-[135px] flex flex-col ml-2">
					<span className="text-[16px] text-[#5B5B5B]">To*</span>
					<div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
						<input
							type="text"
							placeholder="DD/MM"
							className="outline-none w-[100px]"
						/>
						<Image
							src="/calendar.png"
							height={16}
							width={16}
							alt="clendar"
							className="cursor-pointer"
						/>
					</div>
				</div>
			</div>
			<div className="w-full flex justify-between items-center px-2 mt-3">
				{days.map((day, i) => (
					<div
						key={i}
						onClick={() => {
							if (selectedRepeatDays.includes(day.id)) {
								setSelectedRepeatDays(
									selectedRepeatDays.filter((d) => d !== day.id)
								);
							} else {
								setSelectedRepeatDays([...selectedRepeatDays, day.id]);
							}
						}}

						className={`${selectedRepeatDays.includes(day.id)
							? "bg-[#19525A] text-white"
							: "none"
							} cursor-default h-[25.5px] w-[25.5px] rounded-full flex justify-center items-center border-[1px] border-[#19525A] text-[10px]`}
					>
						{day.day}
					</div>
				))}
			</div>
			<div className=" w-[280px] flex flex-col mt-3">
				<span className="text-[16px] text-[#5B5B5B]">Choose an action</span>
				<Dropdown
					width={"280px"}
					items={["Action-1", "Action-2"]}
					selected={"Choose an action"}
					onSelected={(selected) => {
						// onChangeValue({
						//   target: { name: "location", value: selected },
						// });
					}}
				/>
			</div>
			<div className="flex flex-col items-start w-full mt-3">
				<span className="text-[16px] text-[#5B5B5B] mb-2">Service</span>
				<Dropdown
					width={"280px"}
					items={["Service 1", "Service 2", "Service 3"]}
					selected={"Select a service"}
					onSelected={(selected) => {
						// onChangeValue({
						//   target: { name: "location", value: selected },
						// });
					}}
				/>
			</div>
			<div className="flex flex-col mt-3">
				<span className="text-[16px] text-[#5B5B5B]">Patient Name</span>
				<div className="w-[280px] h-[40px] flex justify-between items-center px-2 border-[1px] border-gray-300  mt-1 rounded-md">
					<input
						type="text"
						placeholder="Enter or search patient name"
						className=" border-none text-[16px] px-2 outline-none "
					/>
					<BiSearch className="text-lg opacity-30" />
				</div>
			</div>
			<div className=" w-[280px] flex flex-col mt-3">
				<span className="text-[16px] text-[#5B5B5B]">Time*</span>
				<div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
					<input
						type="text"
						placeholder="00:00 AM-00:00 AM"
						className="outline-none w-full"
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default DaySchedule;

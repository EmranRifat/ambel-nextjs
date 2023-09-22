import React from "react";
import { forwardRef } from "react";
import Image from "next/image";
import { BiCopy } from "react-icons/bi";
import { FiMonitor } from "react-icons/fi";
import ReactDOM from "react-dom";
import {
	AiFillHome,
	AiOutlinePhone,
	AiOutlinePlusCircle,
} from "react-icons/ai";
import { useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import calendar from "../../../public/icons/calendar.png";
import { MdEdit } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import Dropdown from "../../Dropdown";
import index from "../../../pages/user-dashboard";

const days = [
	{
		id: 1,
		name: "Sunday",
	},
	{
		id: 2,
		name: "Monday",
	},
	{
		id: 3,
		name: "Tuesday",
	},
	{
		id: 4,
		name: "Wednesday",
	},
	{
		id: 5,
		name: "Thursday",
	},
	{
		id: 6,
		name: "Friday",
	},
	{
		id: 7,
		name: "Saturday",
	},
];

const CustomDropdown = ({ child, index, isOpen }) => {
	return (
		<>
			<div className="flex flex-col group relative">
				<div data-copy-index={index}>
					<BiCopy
						className="h-7 w-7 ml-auto z-0 text-[#5f5f5f]"
						data-copy-index={index}
					/>
				</div>

				{isOpen ? child : <></>}
			</div>
		</>
	);
};

const CopyShiftComponent = (
	state,
	setDaysShiftState,
	setCopyTimesOpen,
	dayIndex
) => {
	// console.log(dayIndex);
	const daysToBeCopied = Array(7).fill(false, 0);
	return (
		<div
			className="w-[170px] bg-[#ffffff]  border-[1px] p-[15px] rounded-[10px] border-[#19525A80]/50 absolute -left-[20px] top-[22px] z-[1000]"
			onClick={(event) => {
				event.stopPropagation();
				// event.preventDefault();
			}}
		>
			<p className="pb-[10px] text-[#5f5f5f] font-bold">Copy Times to....</p>

			{days.map((day, index) => {
				if (index == dayIndex) return <></>;
				else if (state[day.name].length) return <></>;
				else
					return (
						<div className="pb-[10px] flex justify-between" key={day.id}>
							<span className="inline-block mr-[12px] text-[16px]">
								{day.name}
							</span>
							<input
								type="checkbox"
								className="p-[5px] mr-0"
								onChange={(val) => {
									daysToBeCopied[index] = !daysToBeCopied[index];
									// console.log(daysToBeCopied);
								}}
							/>
						</div>
					);
			})}
			<button
				className="w-full bg-[#19525a] text-[#fff] px-[10px] py-[8px] rounded-[10px]"
				onClick={() => {
					setDaysShiftState((prevState) => {
						const newObj = { ...prevState };
						daysToBeCopied.map((val, i) => {
							if (val) {
								newObj[days[i].name] = newObj[days[dayIndex].name];
							}
						});
						return newObj;
					});
					setCopyTimesOpen(Array(7).fill(false, 0));
				}}
			>
				Copy Times
			</button>
		</div>
	);
};

const CreateScheduleModal = () => {
	const daysRef = useRef([]);
	// console.log(daysRef);
	// const daysArray=["saturDay","sunDay","monDay","tuesDay","" ]
	const [isCopyTimesOpen, setCopyTimesOpen] = useState(Array(7).fill(false, 0));

	const [daysShiftState, setDaysShiftState] = useState({
		Sunday: [
			{
				startTime: new Date(),
				endTime: new Date(),
			},
			// {
			//   startTime: "9.00 AM",
			//   endTime: "9.30 AM",
			// },
		],
		Monday: [],
		Tuesday: [],
		Wednesday: [],
		Thursday: [],
		Friday: [],
		Saturday: [],
	});

	const [showModal, setShowModal] = React.useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [startHour, setStartHour] = useState(new Date());

	const handleCopyTimeDropdown = (event) => {
		// console.log(event.target);
		let index = event.target.getAttribute("data-copy-index");
		// console.log("clicked index 1 ", index);
		if (!index && index != 0) {
			index = event.target.parentNode.getAttribute("data-copy-index");
		}
		// console.log("clicked index 2 ", index);
		if (index == null) {
			const newArr = Array(7).fill(false, 0);
			setCopyTimesOpen(newArr);
		} else {
			if (isCopyTimesOpen[+index]) {
				const newArr = Array(7).fill(false, 0);
				// console.log("1st log: ", newArr, +index);
				setCopyTimesOpen(newArr);
			} else {
				const newArr = Array(7).fill(false, 0);
				newArr[+index] = true;
				// console.log("2nd log: ", newArr, +index);
				setCopyTimesOpen(newArr);
			}
		}
	};

	const CustomComponent = (placeHolder, style = "w-[101px]") => {
		const cstmcomp = ({ value, onClick }, ref) => {
			return (
				<div
					className={`flex justify-between ${style} h-[38px] bg-white border-[1px] border-[#19525A80]/50 rounded-[8px] p-3 leading-[18px]`}
					onClick={onClick}
					ref={ref}
				>
					<span className="text-[14px] text-[#5B5B5BB2]/70 font-normal">
						{value == "" ? placeHolder : value}
					</span>
					<img src={calendar.src} className="w-[12px] h-[15px] py-[2px]" />
				</div>
			);
		};
		cstmcomp.displayName = "cstmcomp";
		return forwardRef(cstmcomp);
	};
	const TimeComponent = () => {
		const cstmcomp = ({ value, onClick }, ref) => {
			return (
				<div
					className={`flex justify-between w-[80px] h-[40px] bg-white border-[1px] border-[#19525A80]/50 rounded-[8px] px-[8px] py-[10px] leading-[18px]`}
					onClick={onClick}
					ref={ref}
				>
					<span className="text-[14px] text-[#5B5B5BB2]/70 font-normal">
						{value == "" ? "8.00 AM" : value}
					</span>
				</div>
			);
		};
		cstmcomp.displayName = "cstmcomp";
		return forwardRef(cstmcomp);
	};
	const DateComponent = CustomComponent("Start Date", "w-[128px]");

	const TimePicker = TimeComponent();

	const AddTimeShiftComponent = ({ timeState }) => (
		<div className="flex mt-[10px]">
			<div className="flex">
				<DatePicker
					selected={daysShiftState[timeState.day][timeState.index]["startTime"]}
					onChange={(value) => {
						// console.log(
						//   "start time",
						//   value.getHours(),
						//   value.getMinutes(),
						//   value.getTime()
						// );
						setDaysShiftState((prevState) => {
							const newArray = [...prevState[timeState.day]];
							// console.log(newArray);
							newArray[timeState.index] = {
								...newArray[timeState.index],
								startTime: value,
							};
							// console.log(newArray[timeState.index]);
							return { ...prevState, [timeState.day]: newArray };
						});
					}}
					showTimeSelect
					customInput={<TimePicker value={undefined} onClick={undefined} />}
					showTimeSelectOnly
					timeIntervals={30}
					dateFormat="h:mm aa"
				/>
				<span className="text-[18px] mx-[10px]">to</span>
				<DatePicker
					selected={daysShiftState[timeState.day][timeState.index]["endTime"]}
					onChange={(value) => {
						// console.log(
						//   "start time",
						//   value.getHours(),
						//   value.getMinutes(),
						//   value.getTime()
						// );
						setDaysShiftState((prevState) => {
							const newArray = [...prevState[timeState.day]];
							// console.log(newArray);
							newArray[timeState.index] = {
								...newArray[timeState.index],
								endTime: value,
							};
							// console.log(newArray[timeState.index]);
							return { ...prevState, [timeState.day]: newArray };
						});
					}}
					customInput={<TimePicker value={undefined} onClick={undefined} />}
					showTimeSelect
					showTimeSelectOnly
					timeIntervals={30}
					dateFormat="h:mm aa"
				/>
			</div>
			<div className="ml-[15px]">
				<Dropdown
					width={"220px"}
					items={[
						"Not Bookable Online",
						"Connect Us to Book Online",
						"Bookable Online",
					]}
					selected={"Connect Us to Book Online"}
					onSelected={(selected) => {}}
				/>
			</div>
			<div>
				<RxCrossCircled
					className="w-[20px] h-[20px] relative left-[10px] top-[8px]"
					onClick={() => {
						setDaysShiftState((prevState) => {
							const newArray = [...prevState[timeState.day]];
							newArray.splice(timeState.index, 1);
							return { ...prevState, [timeState.day]: newArray };
						});
					}}
				/>
			</div>
		</div>
	);
	// const AddTimeNode = document.createElement("div");
	// ReactDOM.render(AddTimeShiftComponent, AddTimeNode);
	// console.log(AddTimeNode);
	return (
		<>
			<button
				className="text-[16px] w-[160px] h-[49px] bg-[#19525A] text-white rounded-[8px]"
				type="button"
				onClick={() => setShowModal(true)}
			>
				Add new shift
			</button>
			{showModal ? (
				<>
					<div
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
						onClick={handleCopyTimeDropdown}
					>
						<div className="lg:min-w-[700px] flex flex-col items-center bg-white py-2 px-5 rounded-md">
							<div className="w-full flex justify-end items-start">
								<span
									onClick={() => setShowModal(false)}
									className="text-2xl text-[#5B5B5B] cursor-pointer"
								>
									✖
								</span>
							</div>
							{/* create schedule text */}
							<div className="w-full flex justify-start border-b-2 border-black pb-5">
								<span className="text-[#5B5B5B] text-[32px] font-[600]  mt-5">
									Create new shift
								</span>
							</div>
							{/* create schedule div */}
							<div className="w-full flex justify-between ">
								{/* left div */}
								<div className="flex flex-col w-full border-r-2 border-black px-2 mt-4">
									{days.map((day, i) => (
										<div
											key={day.id}
											className="w-full flex justify-between border-b-2 border-[#5B5B5B] pt-1 pb-3"
										>
											<div className="w-[450px] flex flex-col">
												<span className="text-[18px] text-[#5B5B5B]">
													{day.name}
												</span>
												<div>
													<div
														className=""
														ref={(el) => {
															// console.log(el);
															daysRef.current[i] = el;
															// console.log(daysRef);
														}}
													>
														{daysShiftState[day.name].map((item, index) => {
															return (
																<AddTimeShiftComponent
																	timeState={{ item, index, day: day.name }}
																	key={index}
																/>
															);
														})}
													</div>

													<div
														className="inline-block mt-2"
														onClick={() => {
															// console.log(daysRef.current[i]);
															// console.log(day.name);
															// console.log(daysRef.current[i]);
															// daysRef.current[i].appendChild(
															//   AddTimeShiftComponent
															// );

															setDaysShiftState((prevState) => {
																return {
																	...prevState,
																	[day.name]: [
																		...prevState[day.name],
																		{
																			startTime: new Date(),
																			endTime: new Date(),
																		},
																	],
																};
															});
														}}
													>
														<AiOutlinePlusCircle className="inline text-lg text-[#19525A]" />
														<span className="inline text-[#19525A] ml-1">
															Time
														</span>
													</div>
												</div>
											</div>
											<CustomDropdown
												child={CopyShiftComponent(
													daysShiftState,
													setDaysShiftState,
													setCopyTimesOpen,
													i
												)}
												index={i}
												isOpen={isCopyTimesOpen[i]}
											/>
										</div>
									))}
								</div>
								{/* right div */}
								<div className="flex flex-col w-full px-3">
									<div className="w-full mt-3">
										<span className="text-[18px] text-[#5B5B5B]">
											Shift name
										</span>
										<input
											type="text"
											className="w-full outline-none rounded-md border-2 border-[#19525A] mt-2 py-2 px-4"
										/>
									</div>

									<div className="flex flex-col">
										<span className="text-[#5B5B5B] text-[16px]">
											Use these shift times for the upcoming dates.
										</span>
										<div className="flex justify-between items-center mt-2">
											<DatePicker
												selected={startDate}
												onChange={(value) => {
													setStartDate(value);
												}}
												className="mr-5"
												// @ts-ignore
												customInput={<DateComponent />}
												dateFormat="dd MMM, yyyy"
												minDate={new Date()}
												withPortal
											/>
											<span className="text-[18px]">to</span>
											<DatePicker
												selected={endDate}
												onChange={(value) => {
													setEndDate(value);
												}}
												// className="-mr-5"
												// @ts-ignore
												customInput={<DateComponent />}
												dateFormat="dd MMM, yyyy"
												minDate={new Date()}
												withPortal
											/>
										</div>
									</div>
									<div className="flex flex-col mt-5 text-[16px] text-[#5B5B5B]">
										<span>Apply this shifts for the following Branches</span>
										<select className="outline-none rounded-[8px] w-full mt-2 p-2 border-2 border-gray-300">
											<option>All branches</option>
											<option>Branch one</option>
											<option>Branch two</option>
										</select>
									</div>
									<div className="flex flex-col mt-5 text-[16px] text-[#5B5B5B]">
										<span>
											Apply this shifts for the following Practitioners
										</span>
										<select className="outline-none rounded-[8px] w-full mt-2 p-2 border-2 border-gray-300">
											<option>Tazul Islam</option>
											<option>Delware Hossain </option>
											<option>Moksedur Rahman</option>
										</select>
									</div>
								</div>
							</div>
							<div className="w-full flex justify-end items-end px-3 py-5">
								<button
									className="px-5 py-2 text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
									onClick={() => {
										setShowModal(false);
										setDaysShiftState({
											Sunday: [],
											Monday: [],
											Tuesday: [],
											Wednesday: [],
											Thursday: [],
											Friday: [],
											Saturday: [],
										});
										setCopyTimesOpen(Array(7).fill(false, 0));
									}}
								>
									Cancel
								</button>
								<button className="px-5 py-2 text-[16px]  bg-[#1A535B] rounded-[8px] text-white">
									Save
								</button>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
};

export default CreateScheduleModal;

import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import DetailWaitlList from "./DetailWaitlList";
import Drawer from "./Drawer";
import styles from "../setup.module.css";
import moment from "moment";
import { BiCheckCircle, BiCollapse, BiDollar, BiExpand } from "react-icons/bi";
import Selecto from "react-selecto";
import { useRef } from "react";
import ReactDOM from "react-dom";
import { BsPeopleFill } from "react-icons/bs";
import { GoCheck } from "react-icons/go";
import axios from "../../utils/axios";

const ScheduleTable = ({
	dateRange,
	setDateRange,
	setOpenCreate,
	openCreate,
	slotData,
	schedules = [],
	setSlotData,
}) => {
	const workdHours = ["10:00", "18:00"];
	const slotStep = 15; //in minutes
	const startTime = moment(workdHours[0], "HH:mm");

	const endTime = moment(workdHours[1], "HH:mm");
	const slotCount = endTime.diff(startTime, "minutes") / slotStep;
	const previuosDateRange = useMemo(() => dateRange, []);

	const slotRows = Array.from({ length: slotCount }, (_, i) =>
		moment(startTime)
			.add(i * slotStep, "minutes")
			.format("hh:mm a")
	);

	const formattedTime = (ISOString, endDTime = false) => {
		const myMoment = endDTime
			? moment(ISOString, moment.ISO_8601).add(slotStep, "minutes")
			: moment(ISOString, moment.ISO_8601);
		return myMoment.format("hh:mm a");
	};

	const getBookedSlotCount = (startISOString, endISOString) => {
		const startMoment = moment(startISOString, moment.ISO_8601);
		const endMoment = moment(endISOString, moment.ISO_8601);

		return endMoment.diff(startMoment, "minutes") / slotStep;
	};

	const timeLabelStep = 60; //in minutes

	const [appoinments, setAppoinments] = useState([]);
	const previousAppointments = schedules;

	const [waitListForBook, setWaitListForBook] = useState(false);
	const [columns, setColumns] = useState([]);
	const [fullRow, setFullRow] = useState(false);
	const [selectionStartFrom, setSelectionStart] = useState("");

	const [startDate, endDate] = dateRange;

	function addMinutes(date, minutes) {
		date.setMinutes(date.getMinutes() + minutes);

		return date;
	}

	const getDatesBetween = (startDate, endDate, includeEndDate) => {
		const myDates = [];
		const currentDate = new Date(startDate);
		const lastDate = new Date(endDate);
		while (currentDate.getTime() < lastDate.getTime()) {
			myDates.push({
				id: currentDate.toISOString(),
				date: currentDate,
				dateString: currentDate.toLocaleString("en-us", {
					weekday: "short",
					month: "short",
					day: "numeric",
				}),
				name: "Tazul Islam",
			});
			currentDate.setDate(currentDate.getDate() + 1);
		}
		if (includeEndDate)
			myDates.push({
				id: lastDate.toISOString(),
				date: lastDate,
				dateString: lastDate.toLocaleString("en-us", {
					weekday: "short",
					month: "short",
					day: "numeric",
				}),
				name: "Tazul Islam",
			});
		return myDates;
	};

	useEffect(() => {
		if (!startDate || !endDate) return;
		let shallowDates = getDatesBetween(startDate, endDate, true);
		setColumns(shallowDates);
	}, [dateRange]);

	useEffect(() => {
		if (document) {
			previousAppointments.forEach((element, idx) => {
				const startAt = element.timeRange?.startTime;
				const endAt = element.timeRange?.endTime;
				const elementById = document.getElementById(startAt);
				const container = document.createElement("div");

				const numOfSlotInApt = getBookedSlotCount(startAt, endAt);

				Object.assign(container.style, {
					position: "absolute",
					zIndex: "1",
					top: `${elementById?.offsetTop}px`,
					left: `0px`,
					width: `${elementById?.offsetWidth}px`,
					height: `${elementById?.offsetHeight * numOfSlotInApt}px`,
					backgroundColor: "#089700",
					cursor: "pointer",
					borderRadius: "4px",
					color: "white",
				});

				const formattedStartAt = formattedTime(startAt);
				const formattedEndAt = formattedTime(endAt);

				const patientTitle =
					element.patients.length > 0
						? element.patients.length == 1
							? element.patients[0].fullName
							: `${element.patients.length} Patients`
						: "No Patient";

				const serviceTitle = element.service?.name;
				const packageTitle = element.package?.name;

				const overLayContainer = (
					<div
						onClick={() => {
							setSlotData({
								...slotData,
								...element,
								price: element.price ?? element.service?.price ?? "0.0",
							});
							setOpenCreate(true);
						}}
						className="flex-col w-full h-full"
					>
						<div className="flex justify-between items-center">
							<p className="text-[10px] text-white px-1">
								{formattedStartAt}-{formattedEndAt}
							</p>
							<div className="flex items-center gap-[2px] z-10">
								<GoCheck size={18} color="white" />
								<BsPeopleFill
									onClick={(e) => {
										// console.log("Clicked on Icon");
										e.stopPropagation();
									}}
									size={15}
									color="white"
								/>
								<BiDollar size={15} color="white" />
							</div>
							{idx == 0 && (
								<div
									className={`absolute opacity-50 w-full top-0 left-0 flex justify-center h-full items-center`}
								>
									<BiCheckCircle color="white" size={50} />
								</div>
							)}
						</div>
						<p className="text-[10px] text-white px-1 text-start">
							{patientTitle ?? "No Patients"} - {serviceTitle ?? packageTitle}
						</p>
					</div>
				);

				ReactDOM.render(overLayContainer, container);
				elementById?.appendChild(container);
				// elementById?.classList.add(
				// 	"bg-[#19525A]",
				// 	"border-none",
				// 	"cursor-pointer"
				// );
				// elementById?.classList.remove("bg-[#E3EAE3]", "border-[.01px]");
			});
		}
	}, [columns, previousAppointments]);

	useEffect(() => {
		if (!openCreate) {
			if (document) {
				appoinments.forEach((element) => {
					const elementById = document.getElementById(element);
					// console.log(elementById);
					elementById?.classList.remove(
						"bg-[#19525A]",
						"border-none",
						"cursor-pointer"
					);
					elementById?.classList.add("bg-[#E3EAE3]", "border-[.01px]");
				});
				setAppoinments([]);
			}
		}
	}, [openCreate]);

	// console.log(previousAppointments);
	// console.log(appoinments);

	return (
		<React.Fragment>
			<Drawer isOpen={waitListForBook} setIsOpen={setWaitListForBook}>
				<DetailWaitlList setWaitListForBook={setWaitListForBook} />
			</Drawer>

			<div className="w-full flex h-[65vh] flex-col mt-5 pb-3">
				<div
					className={`w-full h-full ${styles.scrollbar} overflow-x-scroll flex`}
				>
					{/* <div className="w-6 flex flex-col items-start justify-between mt-16">
						{timeLabels.map((sTime) => (
							<span key={sTime.id} className="text-[#5B5B5B] text-[12px] mt-3">
								{sTime.time}
							</span>
						))}
					</div> */}
					<table className="w-full m-2 border-separate border-spacing-x-[5px]  border-slate-500 ">
						<thead>
							<tr>
								<th className="w-1"></th>
								{columns.map((dat) => (
									<th
										key={dat.id}
										scope="col"
										className={`text-center bg-[#D9D9D9] text-[#5B5B5B] text-[14px] p-2 rounded-[4px] shadow-inner`}
									>
										<div className="flex justify-between items-center">
											<span>{dat.dateString}</span>
											<div className=" flex items-center justify-between">
												<div className="mr-2">
													<Image
														onClick={() => setWaitListForBook(true)}
														src={"/schead.png"}
														height={20}
														width={20}
														alt="none"
														className="cursor-pointer"
													/>
												</div>
												<div>
													<Image
														src={"/schuser.png"}
														height={20}
														width={20}
														alt="none"
														className="cursor-pointer"
													/>
												</div>
											</div>
										</div>
										<div className="flex justify-between items-center mt-2">
											<span>{dat.name}</span>

											<div className="cursor-pointer">
												{fullRow ? (
													<BiCollapse
														onClick={() => {
															setFullRow(false);
															setDateRange(previuosDateRange);
														}}
														size={18}
														color="#19525A"
													/>
												) : (
													<BiExpand
														onClick={() => {
															var newStart = new Date(
																dat.dateString + " " + dat.date.getFullYear()
															);
															setDateRange([newStart, newStart]);
															setFullRow(true);
														}}
														size={18}
														color="#19525A"
													/>
												)}
											</div>
										</div>
									</th>
								))}
							</tr>
						</thead>
						<div className="h-[13px]"></div>
						<tbody className="mb-5 elements">
							{!openCreate && (
								<Selecto
									dragContainer={".elements"}
									selectableTargets={[".slots"]}
									onSelectEnd={(e) => {
										// console.log(e.added);
										let addedIds = e.added.map((item) => item?.id);
										let start = e.added.at(0)?.id;
										let end = e.added.at(-1)?.id;
										let startDateTime = start > end ? end : start;
										let endDateTime = start > end ? start : end;
										if (
											!previousAppointments.some((item) =>
												addedIds.includes(item.timeRange?.startTime.toString())
											)
										) {
											try {
												endDateTime = addMinutes(
													new Date(endDateTime),
													slotStep
												)?.toISOString();

												setSlotData({
													...slotData,
													timeRange: {
														startTime: startDateTime,
														endTime: endDateTime,
													},
													_id: null,
													class: "",
													scheduleType: "dedicated_appointment",
													package: null,
													service: [],
													patients: [],
													discount: "0",
													price: "0",
													paymentType: "Select a payment type",
													appointmentType: "Select appointment type",
													note: "",
													copiedSlot: null,
													repeat: "",
													participantsCount: "",
												});
												setOpenCreate(true);
											} catch (e) { }
										}
									}}
									onSelectStart={(e) => {
										setSelectionStart(e.added[0]?.id);
										// const start = e.added.at(0)
										// const end = e.added.at(-1)
									}}
									onSelect={(e) => {
										// console.log(e)
										e.added.forEach((el) => {
											// console.log(el?.id+" added")
											// console.log(
											// 	moment(selectionStartFrom, moment.ISO_8601).format(
											// 		"ddd/MM/yyyy"
											// 	) ==
											// 		moment(el?.id, moment.ISO_8601).format("ddd/MM/yyyy")
											// );
											// console.log(moment(el?.id, moment.ISO_8601).format("ddd/MM/yyyy"))

											if (
												moment(el?.id, moment.ISO_8601).format(
													"ddd/MM/yyyy"
												) ===
												moment(selectionStartFrom, moment.ISO_8601).format(
													"ddd/MM/yyyy"
												)
											) {
												setAppoinments((prev) => [...prev, el?.id]);
												if (
													!appoinments.includes(el?.id) &&
													!previousAppointments
														.map((itm) => itm.timeRange?.startTime.toString())
														.includes(el?.id)
												) {
													el.classList.add(
														"bg-[#19525A]",
														"border-none",
														"cursor-pointer"
													);
													el.classList.remove("bg-[#E3EAE3]", "border-[.01px]");
												}
											}
										});
										e.removed.forEach((el) => {
											// console.log(el?.id+" removed")
											setAppoinments((prev) =>
												prev.filter((e) => e !== el?.id)
											);
											if (
												appoinments.includes(
													el?.id &&
													!previousAppointments
														.map((itm) => itm.timeRange?.startTime.toString())
														.includes(el?.id)
												)
											) {
												el.classList.remove(
													"bg-[#19525A]",
													"border-none",
													"cursor-pointer"
												);
												el.classList.add("bg-[#E3EAE3]", "border-[.01px]");
											}
										});
									}}
									hitRate={0}
									selectByClick={true}
									selectFromInside={true}
									continueSelect={false}
									continueSelectWithoutDeselect={true}
									toggleContinueSelect={"shift"}
									toggleContinueSelectWithoutDeselect={[["ctrl"], ["meta"]]}
									ratio={0}
								></Selecto>
							)}
							{slotRows.map((row, i) => {
								const timelabel =
									i % (timeLabelStep / slotStep) === 0 || i == slotCount - 1
										? row
										: "";
								return (
									<tr key={row} className="relative">
										<td
											className={`${timelabel ? "text-sm text-emerald-500 align-top" : ""
												} whitespace-nowrap`}
										>
											{timelabel}
										</td>
										{columns.map((dat) => {
											let dateId = new Date(
												dat.dateString +
												" " +
												dat.date.getFullYear() +
												" " +
												row.toString()
											).toISOString();
											return (
												<td
													key={dat.id + row.toString()}
													id={dateId}
													// id={dat.dateString + " 2022 " + row.toString()}
													className={`slots ${styles.CellWithComment} ${appoinments.includes(
														dat.dateString + " 2022 " + row.toString()
													)
														? "bg-[#19525A] disabled"
														: "bg-[#E3EAE3]"
														} border-[.01px] ${i == 0
															? "rounded-t-[4px]"
															: i == slotRows.length - 1
																? "rounded-b-[4px]"
																: ""
														} border-[#5b5b5b] text-xs border-opacity-20 text-center h-7 min-w-[150px]`}
												>
													<p className={styles.CellComment}>
														{dat.name} <br />
														{dat.dateString + " " + row}
													</p>
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
						<div className="h-[10px]"></div>
					</table>
				</div>

				<div className="w-full flex justify-start items-center mt-3">
					<FiChevronLeft className="bg-[#D9D9D9] h-[26px] w-[26px] flex items-center justify-center rounded-sm ml-4 text-[#19525A]" />
					<button className="bg-[#D9D9D9] rounded-sm text-[#19525A] text-[14px] h-[26px] w-[64px] ml-3">
						Today
					</button>
					<FiChevronRight className="bg-[#D9D9D9] h-[26px] w-[26px] flex items-center justify-center rounded-sm ml-4 text-[#19525A]" />
				</div>
			</div>
		</React.Fragment>
	);
};

export default ScheduleTable;

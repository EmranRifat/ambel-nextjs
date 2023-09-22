import React, { useEffect, useMemo, useRef } from "react";
import { BiSearch, BiWallet, BiXCircle } from "react-icons/bi";
import Image from "next/image";
import Dropdown from "../Dropdown";
import DaySchedule from "./DaySchedule";
import { useState } from "react";
import axios from "../../utils/axios";
import cookie from "js-cookie";
import debounce from "lodash.debounce";

import moment from "moment";
import PulseLoader from "react-spinners/PulseLoader";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import DropdownWithId from "../Dropdown/DropDownId";
import { toast } from "react-toastify";
import MultiSelectDropdown from "../Dropdown/MultiSelectDropdown";
import InputWithDropdown from "../Dropdown/InputWithDropdown";

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

const conflicts = [
	{
		id: 1,
		date: "Wednesday Dec 20, 2022",
	},
	{
		id: 2,
		date: "Wednesday Dec 20, 2022",
	},
	{
		id: 3,
		date: "Wednesday Dec 20, 2022",
	},
];

const ScheduleTypes = ({
	scheduleTypes,
	setConflict,
	setOpenCreate,
	schedule,
	setSchedule,
	businessId,
	business,
	scheduleSettings,
	onChangeValue,
	loading,
	scheduleCreateOrUpdate,
}) => {
	const [fix, setFix] = useState(false);
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [searchName, setSearchName] = useState("");
	const [discountPacks, setDiscountPacks] = useState([]);
	const [services, setServices] = useState([]);
	const [patients, setPatients] = useState([]);
	const [itemsLoading, setItemsLoading] = useState(false);
	const [showTimeRange, setShowTimeRange] = useState(false);
	const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
	const timePickerRef = useRef(null);
	const patientsRef = useRef(null);

	const [selectedRepeatDays, setSelectedRepeatDays] = useState([]);

	const addOrRemovePatientsArray = (patient) => {

		if (schedule.patients.includes(patient)) {
			schedule.patients.splice(schedule.patients.indexOf(patient), 1);
		} else {
			if (scheduleSettings?.doubleBooking == false) {
				if (schedule.patients.length > 0) {
					toast.error("Multiple booking is not allowed");
					return
				} else {
					schedule.patients.push(patient);
				}
			} else {
				schedule.patients.push(patient);
			}
		}
		onChangeValue({
			target: { name: "patients", value: schedule.patients },
		});
	};

	useEffect(() => {
		_getSevices();
		_getPatients();
		_getDiscounts();
	}, []);

	useEffect(() => {
		if (schedule.timeRange) {
			// console.log(schedule.timeRange)
			setDate(
				moment(schedule.timeRange?.startTime, moment.ISO_8601).format(
					"yyyy-MM-DD"
				) == "Invalid date"
					? moment().format("yyyy-MM-DD")
					: moment(schedule.timeRange?.startTime, moment.ISO_8601).format(
						"yyyy-MM-DD"
					)
			);
			setStartTime(
				moment(schedule.timeRange?.startTime, moment.ISO_8601).format(
					"HH:mm"
				) == "Invalid date"
					? "00:00"
					: moment(schedule.timeRange?.startTime, moment.ISO_8601).format(
						"HH:mm"
					)
			);
			setEndTime(
				moment(schedule.timeRange?.endTime, moment.ISO_8601).format("HH:mm") ==
					"Invalid date"
					? "00:00"
					: moment(schedule.timeRange?.endTime, moment.ISO_8601).format("HH:mm")
			);
		}
	}, [schedule.timeRange]);

	React.useEffect(() => {
		document.addEventListener("click", _handleClickOutside, false);
		return () => {
			document.removeEventListener("click", _handleClickOutside, false);
		};
	}, []);

	const _handleClickOutside = (event) => {
		if (
			timePickerRef.current &&
			!timePickerRef.current.contains(event.target)
		) {
			setShowTimeRange(false);
		}
		if (patientsRef.current && !patientsRef.current.contains(event.target)) {
			setShowSearchSuggestion(false);
		}
	};

	const _getSevices = async () => {
		const url = `/service?id=${businessId}`;
		try {
			setItemsLoading(true);
			const response = await axios.get(url, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
			setItemsLoading(false);
			if (response?.data?.status === "success") {
				// console.log(response?.data?.data)
				const srvcs = response?.data?.data?.services;
				setServices(srvcs);
			} else {
			}
		} catch (e) { }
	};

	const _getPatients = async () => {
		const url = `/users`;
		try {
			const response = await axios.get(url, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
			setItemsLoading(false);
			if (response?.data?.status === "success") {
				const patns = response?.data?.data?.users;
				setPatients([...patns]);
			} else {
			}
		} catch (e) {
			setItemsLoading(false);
		}
	};

	const _postNewSchedule = () => {
		const newSchedule = {
			...schedule,
			user: schedule.user?._id,
			service: schedule.service?._id,
			discount: schedule.discount?._id,
			discountAmount: schedule.discount?.amount,
			patients: schedule.patients?.map((item) => item._id),
			timeRange: {
				startTime: new Date(date + " " + startTime).toISOString(),
				endTime: new Date(date + " " + endTime).toISOString(),
			},
		};
		// console.log(newSchedule);
		scheduleCreateOrUpdate(newSchedule).then((res) => {
			setOpenCreate(false);
		});
	};

	const _getDiscounts = async () => {
		const url = `/payment/getAllDiscount?organization=${businessId}`;
		try {
			const response = await axios.get(url, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});

			if (response?.data?.status === "success") {
				setDiscountPacks(response?.data?.data?.discounts)
			}
		} catch (e) { }


	}

	console.log(schedule.service, services)


	const debouncedResults = useMemo(() => {
		setItemsLoading(true);
		return debounce(_getPatients, 1000);
	}, []);

	return (
		<React.Fragment>
			{scheduleTypes === "day_schedule" && (
				<DaySchedule schedule={schedule} setSchedule={setSchedule} selectedRepeatDays={selectedRepeatDays} setSelectedRepeatDays={setSelectedRepeatDays} />
			)}
			{scheduleTypes === "class_schedule" && (
				<div className="mt-3">
					<span className="text-[16px] text-[#5B5B5B]">Class Name</span>
					<InputWithDropdown
						items={["Class", "Event"]}
						selected={schedule.class}
						onSelected={(selected) => {
							setSchedule({ ...schedule, class: selected });
						}} />
				</div>
			)}
			{scheduleTypes !== "break" && (
				<div className="flex flex-col items-start w-full mt-3">
					<span className="text-[16px] text-[#5B5B5B] mb-2">Service</span>
					<MultiSelectDropdown
						width={"full"}
						items={services.map((item) => {
							return { id: item._id, name: item.name };
						})}
						selectedList={schedule.service}
						itemName="Service"
						loadingItems={itemsLoading}
						onSelectedItem={(selected) => {
							const service = services.find((itm) => itm._id == selected);
							if (schedule.service.includes(selected)) {
								const sc = schedule.service.filter((itm) => itm != selected)
								setSchedule({
									...schedule,
									service: [...sc],
									price: service.price.toString(),
								});
							} else {
								setSchedule({
									...schedule,
									service: [...schedule.service, selected],
									price: service.price.toString(),
								});
							}

						}}
						onClick={() => {
							if (businessId) {
								_getSevices();
							}
						}}
					/>
				</div>
			)}
			{scheduleTypes === "dedicated_appointment" && (
				<div className="flex flex-col mt-3">
					<span className="text-[16px] text-[#5B5B5B]">{business?.customerAlias ?? "Customer"} Name</span>
					<div ref={patientsRef} className="relative">
						<div className="w-full h-[40px] flex justify-between items-center px-2 border-[1px] border-gray-300  mt-1 rounded-md">
							<input
								type="text"
								placeholder="Enter or search patient? name"
								className=" border-none text-[16px] px-2 outline-none "
								value={searchName}
								onFocus={() => {
									debouncedResults();
									setShowSearchSuggestion(true);
								}}
								onChange={(e) => {
									setSearchName(e.target.value);
									debouncedResults();
								}}
							/>
							<BiSearch className="text-lg opacity-30" />
						</div>
						{showSearchSuggestion && (
							<div className="w-full overflow-auto max-h-[250px] z-[1] absolute left-0 top-[45px] border-2 bg-white shadow-sm">
								<div>
									{patients.length > 0 ? (
										patients.map((item) => {
											if (
												item.fullName
													.toLowerCase()
													.match(searchName.toLowerCase()) &&
												!schedule.patients
													.map((itm) => itm._id)
													.includes(item._id)
											)
												return (
													<div
														onClick={() => {
															addOrRemovePatientsArray(item);
															setShowSearchSuggestion(false);
															setSearchName("");
														}}
														className="py-2 w-full border-b-[0.5px] border-[#5B5B5B80] overflow-hidden p-1 cursor-pointer text-[#5B5B5B] hover:bg-[#19525A] hover:text-white"
														key={"ptnt" + item._id}
													>
														<div className="flex justify-between items-start">
															<span className="font-semibold text-[14px]">
																{item.fullName}
															</span>
														</div>
														<div className="flex justify-between items-center">
															<div className="flex justify-start items-center py-1">
																<FaPhoneAlt className="mr-1" size={12} />
																<span className="text-[12px]">
																	{item.phoneNumber
																		? item.phoneCode + item.phoneNumber
																		: "Not Provided"}
																</span>
															</div>
															<div className="flex justify-start items-center py-1">
																<GoMail className="mr-1" size={16} />
																<span className="text-[12px]">
																	{item.email ?? "Not Provided"}
																</span>
															</div>
														</div>
														<div className="flex justify-start items-center py-1">
															<FaHome className="mr-1" size={16} />
															<span className="text-[12px]">
																{item.address ?? "Not Provided"}
															</span>
														</div>
													</div>
												);
										})
									) : itemsLoading ? (
										<div className="flex items-center justify-center bg-[#19525A] py-1">
											<PulseLoader color="#ffffff" size={8} />
										</div>
									) : (
										<p className="text-white px-2">No items found</p>
									)}
								</div>
								{/* Hello test */}
							</div>
						)}
						{schedule.patients.length > 0 && (
							<div>
								{schedule.patients.map((patient) => {
									return (
										<div
											className="py-2 border-b-[0.5px] border-[#5B5B5B80]"
											key={"ptnt" + patient?._id}
										>
											<div className="flex justify-between items-start">
												<span className="font-semibold text-[14px] text-[#5B5B5B]">
													{patient?.fullName}
												</span>
												<BiXCircle
													onClick={() => {
														addOrRemovePatientsArray(patient);
													}}
													color="#5B5B5B"
													className="cursor-pointer"
												/>
											</div>
											<div className="flex justify-between items-center">
												<div className="flex justify-start items-center py-1">
													<FaPhoneAlt
														className="mr-1"
														size={12}
														color="#19525A"
													/>
													<span className="text-[12px] text-[#5B5B5B]">
														{patient?.phoneNumber
															? patient?.phoneCode + patient?.phoneNumber
															: "Not Provided"}
													</span>
												</div>
												<div className="flex justify-start items-center py-1">
													<GoMail className="mr-1" size={16} color="#19525A" />
													<span className="text-[12px] text-[#5B5B5B]">
														{patient?.email ?? "Not Provided"}
													</span>
												</div>
											</div>
											<div className="flex justify-start items-center py-1">
												<FaHome className="mr-1" size={16} color="#19525A" />
												<span className="text-[12px] text-[#5B5B5B]">
													{patient?.address ?? "Not Provided"}
												</span>
											</div>
											<div className="flex justify-between items-center">
												<div className="flex justify-start items-center py-1">
													<BiWallet
														className="mr-1"
														size={16}
														color="#19525A"
													/>
													<span className="text-[12px] text-[#5B5B5B]">
														Previuos Due
													</span>
												</div>
												<div className="flex justify-start items-center py-1">
													<span className="text-[12px] text-[#5B5B5B]">
														$ 0.0
													</span>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			)}
			{(scheduleTypes !== "day_schedule") && (
				<div className="w-full flex items-center mt-3 pr-1">
					<div className="w-full flex flex-col">
						<div className="flex"><span className="text-[16px] text-[#5B5B5B]">Date</span><span className="text-rose-500">*</span></div>
						<div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-1 rounded-md">
							<input
								required
								type="date"
								value={date}
								onChange={(e) => {
									// console.log(e.target.value);
									setDate(e.target.value);
								}}
								className="outline-none w-full text-sm"
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
							{moment(startTime, "HH:mm").format("hh:mm A") +
								" - " +
								moment(endTime, "HH:mm").format("hh:mm A")}
						</p>
						{showTimeRange && (
							<div className="flex items-center gap-2 absolute right-0 -bottom-10 border-2 bg-white p-1 shadow-sm">
								<input
									className="text-xs focus:outline-none"
									type="time"
									value={startTime}
									onChange={(e) => {
										// console.log(e.target);
										setStartTime(e.target.value);
									}}
								/>
								-
								<input
									className="text-xs focus:outline-none"
									type="time"
									value={endTime}
									onChange={(e) => {
										setEndTime(e.target.value);
									}}
								/>
							</div>
						)}
					</div>
				</div>
			)}
			{scheduleTypes !== "break" && (
				<div className="flex flex-col items-start w-full mt-3">
					<span className="text-[16px] text-[#5B5B5B] mb-2">
						Discount Pack
					</span>
					<DropdownWithId
						width={"full"}
						items={discountPacks.map((item) => {
							return { id: item._id, name: item.name };
						})}
						selected={schedule.discount?._id}
						onSelected={(selected) => {
							const discountPack = discountPacks.find((itm) => itm._id == selected);
							console.log(discountPack)
							setSchedule({
								...schedule,
								discount: discountPack,
							});
						}}
						onClick={() => {
							if (businessId) {
								_getDiscounts();
							}
						}}
					/>
				</div>
			)}
			{scheduleTypes === "open_slot" && (
				<div className="w-full flex justify-between gap-2 items-center mt-3">
					<div className="w-full flex flex-col">
						<div className="flex"><span className="text-[16px] text-[#5B5B5B]">Number of Slots</span><span className="text-rose-500">*</span></div>
						<div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
							<input
								type="number"
								placeholder="Enter a number"
								className="outline-none w-full"
							/>
						</div>
					</div>
					<div className="flex flex-col w-[138px]">
						<span className="text-[16px] text-[#5B5B5B]">Time/slot*</span>
						<input
							type="number"
							placeholder="In minutes"
							className="h-[36px] w-full outline-none text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md"
						/>
					</div>
				</div>
			)}
			{scheduleTypes === "class_schedule" && (
				<div className=" w-[90%] flex flex-col mt-3">
					<div className="flex"><span className="text-[16px] text-[#5B5B5B]">Number of Participaants</span><span className="text-rose-500">*</span></div>
					<div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
						<input
							type="number"
							placeholder="Enter a number"
							value={schedule.participantsCount}
							onChange={onChangeValue}
							className="outline-none w-full"
						/>
					</div>
				</div>
			)}
			{scheduleTypes !== "break" && (
				<div className="w-full flex justify-start items-center mt-3">
					<div className=" w-full flex flex-col">
						<span className="text-[16px] text-[#5B5B5B]">Discount</span>
						<div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
							<input
								type="number"
								step="0.01"
								placeholder="$00.00"
								name="discount"
								value={schedule.discount?.amount ?? "0"}
								onChange={onChangeValue}
								className="outline-none w-full"
							/>
						</div>
					</div>
					<div className="flex flex-col w-full ml-2">
						<span className="text-[16px] text-[#5B5B5B]">Price</span>
						{schedule.service.length == 0 ? <input
							type="number"
							step="0.01"
							placeholder="$00.00"
							name="price"
							value={
								schedule.service
									? (
										parseFloat(schedule.service.price) -
										parseFloat(schedule.discount?.amount ?? "0")
									).toFixed(2)
									: schedule.price
							}
							onChange={onChangeValue}
							className="h-[36px] w-full outline-none text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md"
						/> : <div className="h-[36px] flex justify-start items-center w-full outline-none text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md"
						>{schedule.service.length == 1 ? services.find(itm => itm._id === schedule.service[0])?.price : services.find(itm => itm._id === schedule.service[0])?.price + " to " + services.find(itm => itm._id === schedule.service[1])?.price}</div>}
					</div>
				</div>
			)}
			{scheduleTypes !== "break" && (
				<div className="flex flex-col items-start w-full mt-3">
					<span className="text-[16px] text-[#5B5B5B] mb-2">Payment type</span>
					<Dropdown
						width={"100%"}
						items={[
							"Pre-paid ",
							"Post-paid ",
							"Partial payment",
							"Free booking",
						]}
						selected={schedule.paymentType}
						onSelected={(selected) => {
							onChangeValue({
								target: { name: "paymentType", value: selected },
							});
						}}
					/>
				</div>
			)}
			{scheduleTypes !== "break" && (
				<div className="flex flex-col items-start w-full mt-3">
					<span className="text-[16px] text-[#5B5B5B] mb-2">
						Appointment type
					</span>
					<Dropdown
						width={"100%"}
						items={["Online meeting", "Offline meeting", "Patient choice"]}
						selected={schedule.appointmentType}
						onSelected={(selected) => {
							onChangeValue({
								target: { name: "appointmentType", value: selected },
							});
						}}
					/>
				</div>
			)}
			{scheduleTypes !== "day_schedule" && <div className="flex flex-col items-start w-full mt-3">
				<span className="text-[16px] text-[#5B5B5B] mb-2">
					Repeat schedule
				</span>
				<DropdownWithId
					width={"100%"}
					items={[
						{ id: "0", name: "No repeat" },
						{ id: "1", name: "Every day" },
						{ id: "7", name: "Every week" },
						{ id: "14", name: "Every 2 weeks" },
						{ id: "21", name: "Every 3 weeks" },
						{ id: "28", name: "Every 4 weeks" },
						{ id: "35", name: "Every 5 weeks" },
						{ id: "42", name: "Every 6 weeks" },
						{ id: "49", name: "Every 7 weeks" },
						{ id: "56", name: "Every 8 weeks" },
						{ id: "63", name: "Every 9 weeks" },
						{ id: "90", name: "Every 3 months" },
						{ id: "180", name: "Every 6 months" },
					]}
					selected={schedule.repeat}
					onSelected={(selected) => {
						onChangeValue({
							target: { name: "repeat", value: selected },
						});
					}}
				/>
			</div>}
			{(scheduleTypes !== "day_schedule" &&
				<div>
					{schedule.repeat !== "0" && <div className="w-full flex gap-2 justify-between items-center mt-3">
						<div className=" w-full flex flex-col">
							<div className="flex"><span className="text-[16px] text-[#5B5B5B]">From</span><span className="text-rose-500">*</span></div>
							<div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
								<input
									type="date"
									placeholder="DD/MM"
									className="outline-none w-full"
								/>
							</div>
						</div>
						<div className=" w-full flex flex-col">
							<div className="flex"><span className="text-[16px] text-[#5B5B5B]">To</span><span className="text-rose-500">*</span></div>
							<div className="w-full flex justify-between items-center h-[36px] text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md">
								<input
									type="date"
									placeholder="DD/MM"
									className="outline-none w-full"
								/>
							</div>
						</div>
					</div>}
					{schedule.repeat === "7" && <div className="w-full flex justify-between items-center px-2 mt-3">
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
					</div>}
					{schedule.repeat !== "0" && <div className="w-full flex items-center justify-start mt-2">
						<p className="text-[10px] text-[#5B5B5B]">
							1 Schedule is <span className="text-[#FF0000]">conflict</span>. 2
							schedule is
							<span className="text-[#FF0000]"> Staff unavailable!!</span>
							<span
								onClick={() => setFix(!fix)}
								className="cursor-pointer text-[#0089C9] ml-1"
							>
								Fix This
							</span>
						</p>
					</div>}

					{/* fix this problems... */}
					{fix && (
						<div className="w-full flex flex-col justify-start items-start mt-2 p-1">
							{conflicts.map((conflict) => (
								<div key={conflict.id} className="mt-2 p-1">
									<div className="w-full flex items-center justify-between">
										<div className="flex items-center justify-start">
											<Image
												src="/conflict.png"
												height={20}
												width={20}
												alt="conflict"
											/>
											<span className="ml-1 text-[#5B5B5B] text-[16px]">
												{conflict.date}
											</span>
										</div>
										<Image
											src="/overwrite.png"
											height={16}
											width={16}
											alt="overwrite"
										/>
									</div>
									<span className="text-[12px] text-[#5B5B5B]">
										Service Name with Practitioner name
									</span>
									<input
										type="text"
										value={"Conflict 00:00 AM to 00:00 PM"}
										className="outline-none border-[1px] border-[#19525A80] text-[12px] text-[#5B5B5B] rounded-md p-1"
									/>
								</div>
							))}
						</div>
					)}
				</div>
			)}
			<div className="flex flex-col w-[100%] mt-3">
				<span className="text-[16px] text-[#5B5B5B]">Note</span>
				<input
					type="text"
					name="note"
					value={schedule.note}
					onChange={onChangeValue}
					className="h-[44px] w-full outline-none text-[14px] border-[1px] border-gray-300  mt-1 px-2 rounded-md"
				/>
			</div>

			<div className="flex flex-col mt-3">
				<button
					onClick={() => {
						_postNewSchedule();
					}}
					className="h-[32px] w-[100%] rounded-md text-white shadow-lg text-center text-[16px] bg-[#19525A]"
				>
					{loading ? (
						<div className="flex items-center justify-center bg-[#19525A] py-1">
							<PulseLoader color="#ffffff" size={10} />
						</div>
					) : schedule._id ? (
						"Update Schedule"
					) : (
						scheduleTypes == "dedicated_appointment" ? "Book an Appointment" : scheduleTypes == "open_slot" ? "Create a Slot" : scheduleTypes == "class_schedule" ? "Create a Class" : "Create a Schedule"
					)}
				</button>
				{schedule._id && (
					<button className="h-[32px] w-[90%] rounded-md text-white shadow-lg text-center text-[16px] bg-[#CD3434] mt-2">
						Remove appointment
					</button>
				)}
			</div>
		</React.Fragment>
	);
};

export default ScheduleTypes;

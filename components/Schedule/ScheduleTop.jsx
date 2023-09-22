import Image from "next/image";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import Modal from "../Modal";
import ConflictModal from "./ConflictModal";
import CreateSchedule from "./CreateSchedule";
import Drawer from "./Drawer";
import RequestListDrawer from "./RequestListDrawer";
import ScheduleRejectModal from "./ScheduleRejectModal";
import ScheduleSettings from "./ScheduleSettings";
import "react-datepicker/dist/react-datepicker.css";
import WaitListDrawer from "./WaitListDrawer";
import DatePicker from "react-datepicker";
import CustomDateRange from "./CustomeDateRange";
import jwtDecode from "jwt-decode";

import cookie from "js-cookie";

const ScheduleTop = ({
	dateRange,
	setDateRange,
	setOpenCreate,
	openCreate,
	slotData,
	setSlotData,
}) => {
	const [requestList, setRequestList] = useState(false);
	const [rejectList, setRejectList] = useState(false);
	const [waitList, setWaitList] = useState(false);
	const [conflict, setConflict] = useState(false);
	const [openSettings, setOpenSettings] = useState(false);
	const [startDate, endDate] = dateRange;
	const RangeComponent = CustomDateRange();
	return (
		<React.Fragment>
			<Drawer isOpen={openCreate} setIsOpen={setOpenCreate}>
				<CreateSchedule
					setOpenCreate={setOpenCreate}
					setConflict={setConflict}
					slotData={slotData}
					setSlotData={setSlotData}
				/>
			</Drawer>

			<Drawer isOpen={requestList} setIsOpen={setRequestList}>
				<RequestListDrawer
					setRequestList={setRequestList}
					rejectList={rejectList}
					setRejectList={setRejectList}
				/>
			</Drawer>

			<Drawer isOpen={waitList} setIsOpen={setWaitList}>
				<WaitListDrawer setWaitList={setWaitList} />
			</Drawer>

			<Drawer isOpen={openSettings} setIsOpen={setOpenSettings}>
				<ScheduleSettings setOpenSettings={setOpenSettings} />
			</Drawer>

			{rejectList && (
				<Modal>
					<ScheduleRejectModal setRejectList={setRejectList} />
				</Modal>
			)}
			{conflict && (
				<Modal>
					<ConflictModal setConflict={setConflict} />
				</Modal>
			)}
			<div className="w-full flex justify-between items-center z-10">
				<DatePicker
					selected={startDate}
					onChange={(update) => {
						setDateRange(update);
					}}
					onCalendarClose={() => {
						if (!endDate) {
							setDateRange([startDate, startDate]);
						}
					}}
					className="-mr-5"
					// @ts-ignore
					customInput={<RangeComponent />}
					startDate={startDate}
					dateFormat="dd MMM, yyyy"
					// minDate={new Date()}
					endDate={endDate}
					selectsRange
					withPortal
				/>

				<div className="flex items-center mr-5">
					<button
						onClick={() => {
							setSlotData({
								...slotData,
								timeRange: {
									startTime: "",
									endTime: "",
								},
								_id: null,
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
						}}
						className="flex justify-center items-center bg-[#19525A] h-[26px] w-[80px] text-white rounded-md mr-3"
					>
						<AiOutlinePlusCircle className="text-[16px] mr-1" />
						<span className="text-[14px]"> Create</span>
					</button>
					<button
						onClick={() => setRequestList(true)}
						className=" bg-[#19525A] h-[26px] w-[90px] text-[14px] text-white rounded-md mr-3"
					>
						Request list
					</button>
					<button
						onClick={() => setWaitList(true)}
						className=" bg-[#19525A] h-[26px] w-[68px] text-[14px] text-white rounded-md mr-3"
					>
						Wait list
					</button>
					<button className=" bg-[#19525A] h-[26px] w-[51px] text-[14px] text-white rounded-md mr-3">
						Shifts
					</button>
					<FiSettings
						onClick={() => setOpenSettings(true)}
						className="mr-3 text-[22px] text-[#19525A] cursor-pointer"
					/>
					<Image
						src="/bar.png"
						height={17}
						width={20}
						alt="bar"
						className="cursor-pointer"
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ScheduleTop;

import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import ScheduleTypes from "./ScheduleTypes";
import { MdClear } from "react-icons/md";
import { connect } from "react-redux";
import {
	getSchedule,
	scheduleCreateOrUpdate,
} from "../../store/actions/schedule";
import { getScheduleSettings } from "../../store/actions/schedulesettings";
import DropdownWithId from "../Dropdown/DropDownId";

const CreateSchedule = (props) => {
	// const [scheduleTypes, setScheduleType] = useState("Dedicated appointment");
	const [schedule, setSchedule] = useState({
		_id: null,
		scheduleType: "dedicated_appointment",
		service: [],
		class: "",
		timeRange: {
			startTime: "",
			endTime: "",
		},
		patients: [],
		discount: null,
		discountAmount: "0",
		price: "0",
		paymentType: "Select a payment type",
		appointmentType: "Select appointment type",
		note: "",
		copiedSlot: null,
		repeat: "",
		participantsCount: "",
	});

	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setSchedule({
			...schedule,
			[name]: value,
		});
	};

	useEffect(() => {
		// props.getSchedule();
		setSchedule({
			...schedule,
			...props.slotData,
		});
	}, [props.slotData]);


	useEffect(() => {
		if (props.business) props.getScheduleSettings(props.business?._id);
	}, []);
	return (
		<React.Fragment>
			<div className="w-full flex flex-col mb-10 p-1">
				<div className="w-full flex justify-between items-center p-2 border-b-[1px] border-gray-400 pb-1">
					<span className="text-[#19525A] text-[16px]">
						Create new schedule
					</span>
					<MdClear
						onClick={() => props.setOpenCreate(false)}
						className="text-xl text-[#5B5B5BB2]"
					/>
				</div>
				<div className="w-full px-2 mt-3">
					<div className="flex flex-col items-start w-full">
						<div className="flex"><span className="text-[16px] text-[#5B5B5B]">Schedule Type</span><span className="text-rose-500">*</span></div>
						<DropdownWithId
							width={"100%"}
							items={
								[{
									id: "dedicated_appointment",
									name: "Dedicated Appointment"
								},
								{
									id: "open_slot",
									name: "Open for Slot"
								},
								{
									id: "day_schedule",
									name: "Day schedule",
								},
								{
									id: "class_schedule",
									name: "Class schedule",
								},
								{
									id: "break",
									name: "Break",
								},

								]
							}
							selected={schedule.scheduleType}
							onSelected={(selected) => {
								setSchedule({
									...schedule,
									scheduleType: selected,
									_id: null,
									class: "",
									service: [],
									timeRange: {
										startTime: "",
										endTime: "",
									},
									patients: [],
									discount: null,
									discountAmount: "0",
									price: "0",
									paymentType: "Select a payment type",
									appointmentType: "Select appointment type",
									note: "",
									copiedSlot: null,
									repeat: "",
									participantsCount: "",
								});
							}}
						/>
					</div>
					<ScheduleTypes
						scheduleTypes={schedule.scheduleType}
						setOpenCreate={props.setOpenCreate}
						setConflict={props.setConflict}
						schedule={schedule}
						setSchedule={setSchedule}
						business={props.business}
						businessId={props.business?._id}
						scheduleSettings={props.scheduleSettings}
						onChangeValue={onChangeValue}
						loading={props.loading}
						scheduleCreateOrUpdate={props.scheduleCreateOrUpdate}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		scheduleSettings: state?.scheduleSettings?.info?.scheduleSetting,
		business: state.business?.info?.business,
		loading: state?.schedule?.loading,
	};
};

export default connect(mapStateToProps, {
	getSchedule,
	scheduleCreateOrUpdate,
	getScheduleSettings,
})(CreateSchedule);

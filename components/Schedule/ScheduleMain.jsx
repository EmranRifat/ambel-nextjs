import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSchedule, scheduleCreateOrUpdate } from "../../store/actions/schedule";
import ScheduleTable from "./ScheduleTable";
import ScheduleTop from "./ScheduleTop";

const ScheduleMain = (props) => {
	const [dateRange, setDateRange] = useState([
		new Date(),
		addDays(new Date(), 6),
	]);
	const [openCreate, setOpenCreate] = useState(false);
	const [slotData, setSlotData] = useState({
		timeRange: {
			startTime: "",
			endTime: "",
		},
	});

	function addDays(date, number) {
		const newDate = new Date(date);
		return new Date(newDate.setDate(newDate.getDate() + number));
	}

	useEffect(() => {
		props.getSchedule()
	}, [])

	return (
		<React.Fragment>
			<ScheduleTop
				dateRange={dateRange}
				setDateRange={setDateRange}
				setOpenCreate={setOpenCreate}
				openCreate={openCreate}
				slotData={slotData}
				setSlotData={setSlotData}
			/>
			<ScheduleTable
				dateRange={dateRange}
				setDateRange={setDateRange}
				setOpenCreate={setOpenCreate}
				openCreate={openCreate}
				schedules={props.schedules ?? []}
				slotData={slotData}
				setSlotData={setSlotData}
			/>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	// console.log(state?.schedule?.info);
	return {
		schedules: state?.schedule?.info,
		loading: state?.schedule?.loading,
	};
};

export default connect(mapStateToProps, {
	getSchedule,
	scheduleCreateOrUpdate,
})(ScheduleMain);

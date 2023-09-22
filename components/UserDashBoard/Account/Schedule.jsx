import React, { useState, useEffect } from "react";
import Toggle from "../../Toggle";
import { connect } from "react-redux";
import {
	updateUserScheduleSetting,
	getUserScheduleSetting,
} from "../../../store/actions/singleUser";
import { objMatch } from "../../../utils/utility";
import { PulseLoader } from "react-spinners";

const Schedule = (props) => {
	const [schedule, setSchedule] = useState({
		scheduleGrid: "0",
		allowView: false,
		allowBook: false,
		autoUpdate: false,
	});
	const [change, setChange] = useState(false);
	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setSchedule({
			...schedule,
			[name]: value,
		});
	};

	useEffect(() => {
		const f = async () => {
			if (!props.userScheduleSetting) {
				try {
					const data = await props.getUserScheduleSetting();
					setSchedule({
						...schedule,
						...data.userScheduleSetting?.userScheduleSetting,
					});
					// console.log(data);
				} catch (e) {
					setSchedule({ ...schedule });
				}
			}
		};
		if (props.userScheduleSetting) {
			setChange(false);
			setSchedule({
				...schedule,
				...props.userScheduleSetting?.userScheduleSetting,
			});
		} else f();
	}, [props.userScheduleSetting]);

	useEffect(() => {
		if (schedule && props.userScheduleSetting) {
			setChange(
				!objMatch(schedule, props.userScheduleSetting?.userScheduleSetting)
			);
		}
		// console.log(change);
	}, [schedule]);

	return (
		<React.Fragment>
			<div className="pb-8 flex flex-col">
				<div className="flex justify-between">
					<span className="text-[#5B5B5B] text-[32px] font-[700]">
						Schedule
					</span>
				</div>
				<div className="bg-white py-2 flex flex-col w-full rounded-lg shadow-md mt-5 pb-8">
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Allow others to view your schedule
						</span>
						<Toggle
							checked={schedule.allowView}
							setChecked={(checked) => {
								onChangeValue({
									target: { name: "allowView", value: checked },
								});
							}}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Allow others to book an appointment
						</span>
						<Toggle
							checked={schedule.allowBook}
							setChecked={(checked) => {
								onChangeValue({
									target: { name: "allowBook", value: checked },
								});
							}}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Auto Update with your upcoming appointments
						</span>
						<Toggle
							checked={schedule.autoUpdate}
							setChecked={(checked) => {
								onChangeValue({
									target: { name: "autoUpdate", value: checked },
								});
							}}
						/>
					</div>
					<div className="w-full flex justify-between items-center py-5 px-8 border-b-[2px] border-gray-300">
						<p className="text-[16px] text-[#5B5B5B]">
							Schedule grid
							<span className="text-rose-600">*</span>
						</p>
						<div className="flex items-center text-center">
							<input
								type="number"
								required
								placeholder="1"
								name=""
								value={schedule.scheduleGrid}
								onChange={(e) => {
									setSchedule({ ...schedule, scheduleGrid: e.target.value });
								}}
								className="outline-none rounded-l-[8px] border-2 border-gray-400 py-2 px-2 w-[100px] h-[40px]"
							/>
							<div className="h-[40px] w-[77px] bg-[#19525A] text-center text-[16px] text-white rounded-r-md flex items-center justify-center">
								Minutes
							</div>
						</div>
					</div>
				</div>
			</div>
			{change && (
				<div className="fixed bottom-0 inset-x-2 ml-10 pl-5 h-12 w-[93%] bg-white rounded-lg shadow-lg p-2 items-center flex justify-between">
					<span className="">Do you want to save changes?</span>
					<div>
						<button
							type="submit"
							onClick={() => {
								setChange(false);
								if (props.userScheduleSetting) {
									setSchedule({
										...props.userScheduleSetting?.userScheduleSetting,
									});
								}
							}}
							className="w-[86px] mr-5 h-[36px] px-2 py-1 rounded-lg border-2 text-gray-600"
						>
							<span>Cancel</span>
						</button>
						<button
							type="submit"
							onClick={() => {
								props.updateUserScheduleSetting(schedule);
							}}
							className="w-[86px] h-[36px] px-2 py-1 rounded-lg border-2 text-white bg-teal-700"
						>
							{props.loading ? (
								<PulseLoader color="#ffffff" size={12} />
							) : (
								<span>Save</span>
							)}
						</button>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		userScheduleSetting: state.singleUser?.userScheduleSetting,
		loading: state.singleUser?.loading,
	};
};

export default connect(mapStateToProps, {
	updateUserScheduleSetting,
	getUserScheduleSetting,
})(Schedule);

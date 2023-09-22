import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import {
	getScheduleSettings,
	onCancelAction,
	scheduleSettingsUpdate,
} from "../../../store/actions/schedulesettings";
import Dropdown from "../../Dropdown";
import Toggle from "../../Toggle";
import CreateScheduleModal from "./CreateScheduleModal";
import debounce from "lodash.debounce";

const Schedule = (props) => {
	const [scheduleSettings, setScheduleSettiings] = useState({
		officHourStartAt: "Select",
		officeHourEndAt: "Select",
		scheduleGrid: false,
		doubleBooking: false,
		outsideShiftBooking: false,
		changeShift: false,
		allowWaitlist: false,
		waitlistNotification: false,
		allowAutomaticNotification: false,
		waitlistAccess: "Select Option",
		reqDateChoice: false,
		reqDataNotification: false,
		timeAndDateRange: "",
	});

	useEffect(() => {
		props.getScheduleSettings(props.business._id);
	}, []);

	useEffect(() => {
		if (props.scheduleSettings) {
			setScheduleSettiings({
				...scheduleSettings,
				...props.scheduleSettings,
			});
		}
	}, [props.scheduleSettings]);


	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setScheduleSettiings({
			...scheduleSettings,
			[name]: value,
		});

		// @ts-ignore
		debounceOnchange({ [name]: value, business: props.business._id }, scheduleSettings._id);
	};

	const debounceOnchange = useCallback(debounce(props.scheduleSettingsUpdate, 1000), []);


	return (
		<>
			<div className="w-full flex flex-col pb-10">
				{/* div 1 */}
				<span className="text-[#5B5B5B] text-[32px] font-[700]">
					Setting Up Schedule
				</span>
				<div className="bg-white w-full mt-2">
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">Office Hour</span>
						<div className="flex items-center">
							<Dropdown
								width={"95px"}
								items={["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM"]}
								selected={scheduleSettings.officHourStartAt}
								onSelected={(selected) => {
									onChangeValue({
										target: { name: "officHourStartAt", value: selected },
									});
								}}
							/>
							<span className="text-[16px] text-[#5B5B5B] mx-3">to</span>
							<Dropdown
								width={"95px"}
								items={["4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM"]}
								selected={scheduleSettings.officeHourEndAt}
								onSelected={(selected) => {
									onChangeValue({
										target: { name: "officeHourEndAt", value: selected },
									});
								}}
							/>
						</div>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">Schedule grid</span>
						<Toggle
							checked={scheduleSettings.scheduleGrid}
							setChecked={(checked) =>
								onChangeValue({
									target: { name: "scheduleGrid", value: checked },
								})
							}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Allow Double Booking
						</span>
						<Toggle
							checked={scheduleSettings.doubleBooking}
							setChecked={(checked) =>
								onChangeValue({
									target: { name: "doubleBooking", value: checked },
								})
							}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Prevent practitioner booking outside shifts
						</span>
						<Toggle
							checked={scheduleSettings.outsideShiftBooking}
							setChecked={(checked) =>
								onChangeValue({
									target: { name: "outsideShiftBooking", value: checked },
								})
							}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Allow your practitioner to change their shifts
						</span>
						<Toggle
							checked={scheduleSettings.changeShift}
							setChecked={(checked) =>
								onChangeValue({
									target: { name: "changeShift", value: checked },
								})
							}
						/>
					</div>
				</div>

				{/* div 2 */}
				<div className="flex justify-between items-center mt-5">
					<span className="text-[#5B5B5B] text-[32px] font-[600]">Shifts</span>
					<CreateScheduleModal />
				</div>
				<div className="bg-white p-2 mt-2">
					<div className="flex justify-between items-center border-[1px] border-[#19525A] p-3 rounded-[8px]">
						<div className="flex flex-col">
							<span className="text-[20px] text-[#5B5B5B]">
								Shift Name : Shift 1
							</span>
							<span className="text-[#5B5B5B]">
								Available for 4 Practitioner and 2 branches
							</span>
							<span className="text-[#5B5B5B]">
								20 August, 2022 - 20 January, 2023
							</span>
							<div className="flex justify-between mt-2">
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									S
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									M
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									T
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									W
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									T
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									F
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									S
								</span>
							</div>
						</div>
						<div className="flex justify-between">
							<button className="h-[34px] w-[83px] text-[14px] text-white bg-[#19525A] rounded-[8px] mr-4">
								Edit
							</button>
							<button className="h-[34px] w-[83px] text-[14px] text-white bg-[#19525A] rounded-[8px] mr-4">
								Request
							</button>
							<button className="h-[34px] w-[83px] text-[14px] text-white bg-[#19525A] rounded-[8px] mr-4">
								Remove
							</button>
						</div>
					</div>
					<div className="flex justify-between items-center border-[1px] border-[#19525A] p-3 rounded-[8px] mt-3">
						<div className="flex flex-col">
							<span className="text-[20px] text-[#5B5B5B]">
								Shift Name : Shift 2
							</span>
							<span className="text-[#5B5B5B]">
								Available for 4 Practitioner and 2 branches
							</span>
							<span className="text-[#5B5B5B]">
								20 August, 2022 - 20 January, 2023
							</span>
							<div className="flex justify-between mt-2">
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									S
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									M
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									T
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									W
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									T
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									F
								</span>
								<span className="h-6 w-6 rounded-full text-center border-[.5px] border-[#19525A]">
									S
								</span>
							</div>
						</div>
						<div className="flex justify-between">
							<button className="h-[34px] w-[83px] text-[14px] text-white bg-[#19525A] rounded-[8px] mr-4">
								Edit
							</button>
							<button className="h-[34px] w-[83px] text-[14px] text-white bg-[#19525A] rounded-[8px] mr-4">
								Request
							</button>
							<button className="h-[34px] w-[83px] text-[14px] text-white bg-[#19525A] rounded-[8px] mr-4">
								Remove
							</button>
						</div>
					</div>
				</div>

				{/* div 3 */}
				<span className="text-[#5B5B5B] text-[32px] font-[600] mt-5">
					Wait List
				</span>
				<div className="bg-white flex flex-col mt-2 shadow-lg">
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Allow customers waitlist requests
						</span>
						<Toggle
							checked={scheduleSettings.allowWaitlist}
							setChecked={(checked) =>
								onChangeValue({
									target: { name: "allowWaitlist", value: checked },
								})
							}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Enable waitlist notification
						</span>
						<Toggle
							checked={scheduleSettings.waitlistNotification}
							setChecked={(checked) =>
								onChangeValue({
									target: { name: "waitlistNotification", value: checked },
								})
							}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Allow autometic notification of waitlist to the customers
						</span>
						<Toggle
							checked={scheduleSettings.allowAutomaticNotification}
							setChecked={(checked) =>
								onChangeValue({
									target: {
										name: "allowAutomaticNotification",
										value: checked,
									},
								})
							}
						/>
					</div>

					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Waitlist client get exclusive access to new opening for
						</span>
						<Dropdown
							width={"240px"}
							items={[
								"Anyone can book",
								"After staff Release",
								"Staff choice",
								"6 Hours",
								"12 Hours",
								"24 Hours",
								"48 Hours",
							]}
							selected={scheduleSettings.waitlistAccess}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "waitlistAccess", value: selected },
								});
							}}
						/>
					</div>
				</div>

				{/* div 4 */}
				<span className="text-[#5B5B5B] text-[32px] font-[600] mt-5">
					Request a date
				</span>
				<div className="bg-white p-2 flex flex-col shadow-lg mt-5">
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Allow customers to request their own date choice
						</span>
						<Toggle
							checked={scheduleSettings.reqDateChoice}
							setChecked={(checked) =>
								onChangeValue({
									target: { name: "reqDateChoice", value: checked },
								})
							}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Enable request date notification
						</span>
						<Toggle
							checked={scheduleSettings.reqDataNotification}
							setChecked={(checked) =>
								onChangeValue({
									target: { name: "reqDataNotification", value: checked },
								})
							}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4">
						<span className="text-[16px] text-[#5B5B5B]">
							The time and date range for the request
						</span>
						<div className="flex justify-between">
							<label className="mr-5 text-[16px] text-[#01261C]">
								<input
									type="checkbox"
									checked={scheduleSettings.timeAndDateRange == "Browser default"}
									onChange={(checked) => {
										if (checked) {
											if (checked) {
												onChangeValue({
													target: {
														name: "timeAndDateRange",
														value: "Browser default",
													},
												});
											}
										}
									}}
								/>{" "}
								Browser default
							</label>
							<label className="mr-5 text-[16px] text-[#01261C]">
								<input
									type="checkbox"
									className="mr-2"
									checked={scheduleSettings.timeAndDateRange == "Customized"}
									onChange={(checked) => {
										if (checked) {
											onChangeValue({
												target: {
													name: "timeAndDateRange",
													value: "Customized",
												},
											});
										}
									}}
								/>
								Customized
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		scheduleSettings: state?.scheduleSettings?.info?.scheduleSetting,
		loading: state?.schedule?.loading,
		business: state.business?.info?.business,
	};
};
export default connect(mapStateToProps, {
	getScheduleSettings,
	scheduleSettingsUpdate,
	onCancelAction,
})(Schedule);

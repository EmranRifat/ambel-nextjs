import React from "react";
import { MdClear } from "react-icons/md";

const ViewReminderModal = (props) => {
	// console.log(props);
	return (
		<React.Fragment>
			<div className="w-[440px] z-50 bg-white my-[10%] py-2 shadow m-auto rounded-md">
				<div className="w-full flex flex-col items-center bg-white rounded-md">
					<div className="w-full flex justify-end px-3 text-[25px] cursor-pointer text-[#5B5B5B]">
						<MdClear onClick={() => props.setView(false)} />
					</div>
					<div className="w-full flex justify-center items-center border-b-[1px] border-gray-300 text-[#19525A] text-[20px] font-bold p-2">
						Before appointment
					</div>
					<div className="w-full flex flex-col border-b-[1px] border-gray-300 py-3 px-4">
						<span className="text-[#5B5B5B] text-[16px]">
							Name of the Reminder
						</span>
						<span className="text-[#5B5B5B] text-[14px]">
							{props.viewReminder.name}
						</span>
					</div>
					<div className="w-full flex flex-col border-b-[1px] border-gray-300 py-3 px-4">
						<span className="text-[#5B5B5B] text-[16px]">Reminder system</span>
						<span className="text-[#5B5B5B] text-[14px]">
							{props.viewReminder.reminderSystem}
						</span>
					</div>
					<div className="w-full flex flex-col border-b-[1px] border-gray-300 py-3 px-4">
						<span className="text-[#5B5B5B] text-[16px]">Reminder time</span>
						<span className="text-[#5B5B5B] text-[14px]">
							Before {props.viewReminder.reminderTime} mins
						</span>
					</div>
					<div className="w-full flex flex-col border-b-[1px] border-gray-300 py-3 px-4">
						<span className="text-[#5B5B5B] text-[16px]">Reminder On</span>
						<span className="text-[#5B5B5B] text-[14px]">
							{props.viewReminder.reminderOn}
						</span>
					</div>
					<div className="w-full flex flex-col border-b-[1px] border-gray-300 py-3 px-4">
						<span className="text-[#5B5B5B] text-[16px]">Status</span>
						<span className="text-[#5B5B5B] text-[14px]">
							{props.viewReminder.status}
						</span>
					</div>
					<div className="w-full flex justify-end items-end px-3 pt-10 pb-5">
						<button
							onClick={() => props.setView(false)}
							className="h-[32px] w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
						>
							Cancel
						</button>
						<button className="h-[32px] w-[80px] text-[16px]  bg-[#FF0000] rounded-[8px] text-white">
							Remove
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ViewReminderModal;

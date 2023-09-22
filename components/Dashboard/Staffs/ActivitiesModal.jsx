import React from "react";
import Dropdown from "../../Dropdown";
import { BiDotsVerticalRounded } from "react-icons/bi";

const activities = [
	{
		id: 1,
		date: "27 jan",
		time: "11:22 am",
		tite: "Make a conversation with ",
		withUser: "Delwar Hossain",
		details: "How are you?",
	},
	{
		id: 1,
		date: "28 jan",
		time: "12:55 am",
		tite: "Take a appointment with",
		withUser: "Rahat Mia",
		details: "Please share me the time.",
	},
	{
		id: 1,
		date: "27 jan",
		time: "11:22 am",
		tite: "Make a conversation with ",
		withUser: "Delwar Hossain",
		details: "How are you?",
	},
	{
		id: 1,
		date: "28 jan",
		time: "12:55 am",
		tite: "Take a appointment with",
		withUser: "Rahat Mia",
		details: "Please share me the time.",
	},
	{
		id: 1,
		date: "27 jan",
		time: "11:22 am",
		tite: "Make a conversation with ",
		withUser: "Delwar Hossain",
		details: "How are you?",
	},
	{
		id: 1,
		date: "28 jan",
		time: "12:55 am",
		tite: "Take a appointment with",
		withUser: "Rahat Mia",
		details: "Please share me the time.",
	},
	{
		id: 1,
		date: "27 jan",
		time: "11:22 am",
		tite: "Make a conversation with ",
		withUser: "Delwar Hossain",
		details: "How are you?",
	},
	{
		id: 1,
		date: "28 jan",
		time: "12:55 am",
		tite: "Take a appointment with",
		withUser: "Rahat Mia",
		details: "Please share me the time.",
	},
	{
		id: 1,
		date: "27 jan",
		time: "11:22 am",
		tite: "Make a conversation with ",
		withUser: "Delwar Hossain",
		details: "How are you?",
	},
	{
		id: 1,
		date: "28 jan",
		time: "12:55 am",
		tite: "Take a appointment with",
		withUser: "Rahat Mia",
		details: "Please share me the time.",
	},
];
const ActivitiesModal = (props) => {
	return (
		<>
			<div className="max-w-[720px] lg:min-w-[720px] absolute top-10 left-[30%] flex flex-col items-center bg-white rounded-md">
				<div className="w-full flex justify-between bg-[#F0F3FC] shadow-sm p-3 rounded-md">
					<div className="flex justify-between gap-3">
						<Dropdown
							items={["All Branches", "Sylhet", "Dhaka"]}
							selected={"All Branches"}
							onSelected={(item) => {
								// console.log(item);
							}}
							width={"136px"}
						/>
						<Dropdown
							items={["All Roles", "Patient", "Practitioner", "Staff"]}
							selected={"All Roles"}
							onSelected={(item) => {
								// console.log(item);
							}}
							width={"136px"}
						/>
					</div>
					<div className="flex justify-between items-center">
						<BiDotsVerticalRounded className="text-3xl text-[#8F8A8A]" />
					</div>
				</div>

				<div className="w-full flex justify-start flex-col p-4">
					{activities.map((activity, i) => (
						<div key={i} className="w-full px-5 mt-2 flex flex-col items-start">
							<div className="flex justify-center">
								<div className="flex flex-col">
									<h3 className="text-[14px] text-[#5B5B5B]">
										{activity.date}
									</h3>
									<h3 className="text-[14px] text-[#5B5B5B]">
										{activity.time}
									</h3>
								</div>
								<div className="flex flex-col ml-5 items-start">
									<h3 className="text-[14px] text-[#5B5B5B]">
										{activity.tite}
										<span className="text-[#0093E5]"> {activity.withUser}</span>
									</h3>
									<h3 className="text-[12px] text-[#5B5B5B]">
										{activity.details}
									</h3>
								</div>
							</div>
							<div className="h-[40px] w-[2px] bg-[#5B5B5B] mt-1"></div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ActivitiesModal;

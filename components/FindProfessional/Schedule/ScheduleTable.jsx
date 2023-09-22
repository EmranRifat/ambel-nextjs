import Image from "next/image";
import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import DetailWaitlList from "./DetailWaitlList";
import Drawer from "./Drawer";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import styles from "../dashboard.module.css";
const dates = [
	{
		id: 1,
		date: "30 Sep Fri",
		name: "Tazul Islam",
	},
	{
		id: 2,
		date: "30 Sep Fri",
		name: "Tazul Islam",
	},
	{
		id: 3,
		date: "30 Sep Fri",
		name: "Tazul Islam",
	},
	{
		id: 4,
		date: "30 Sep Fri",
		name: "Tazul Islam",
	},
	{
		id: 5,
		date: "30 Sep Fri",
		name: "Tazul Islam",
	},
	{
		id: 6,
		date: "30 Sep Fri",
		name: "Tazul Islam",
	},
	{
		id: 7,
		date: "30 Sep Fri",
		name: "Tazul Islam",
	},
	{
		id: 7,
		date: "30 Sep Fri",
		name: "Tazul Islam",
	},
	{
		id: 7,
		date: "30 Sep Fri",
		name: "Tazul Islam",
	},
];

const rows = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
	42, 43, 44, 45, 46, 47, 48,
];
const times = [
	{
		id: 1,
		time: "8:00 am",
	},
	{
		id: 2,
		time: "9:00 am",
	},
	{
		id: 3,
		time: "10:00 am",
	},
	{
		id: 4,
		time: "11:00 am",
	},
	{
		id: 5,
		time: "12:00 pm",
	},
	{
		id: 6,
		time: "1:00 pm",
	},
	{
		id: 7,
		time: "2:00 pm",
	},
	{
		id: 8,
		time: "3:00 pm",
	},
	{
		id: 9,
		time: "4:00 pm",
	},
	{
		id: 10,
		time: "5:00 pm",
	},
	{
		id: 11,
		time: "6:00 pm",
	},
	{
		id: 12,
		time: "7:00 pm",
	},
	{
		id: 13,
		time: "8:00 pm",
	},
];
const ScheduleTable = () => {
	const [waitListForBook, setWaitListForBook] = useState(false);
	const [fullRow, setFullRow] = useState(null);
	// console.log(fullRow);
	return (
		<React.Fragment>
			<Drawer isOpen={waitListForBook} setIsOpen={setWaitListForBook}>
				<DetailWaitlList setWaitListForBook={setWaitListForBook} />
			</Drawer>

			<div className="w-full flex flex-col mt-5 pb-3">
				<div className={`w-full ${styles.scrollbar} overflow-x-scroll flex`}>
					<div className="w-6 flex flex-col items-start justify-between mt-16">
						{times.map((sTime) => (
							<span key={sTime.id} className="text-[#5B5B5B] text-[12px] mt-3">
								{sTime.time}
							</span>
						))}
					</div>
					<table className="w-full border-separate border-spacing-x-3  border-slate-500 ">
						<thead className="mb-4">
							<tr>
								{dates.map((dat) => (
									<th
										key={dat.id}
										scope="col"
										className={`border-2 text-center bg-[#D9D9D9] text-[#5B5B5B] text-[14px] p-2 rounded-md shadow-md ${
											dat.id === fullRow ? "min-w-[1000px]" : "min-w-[145px]"
										}`}
									>
										<div className="flex justify-between items-center">
											<span>{dat.date}</span>
										</div>
										<div className="flex justify-between items-center mt-2">
											<span>{dat.name}</span>

											{fullRow === dat.id ? (
												<AiOutlineFullscreenExit
													onClick={() => setFullRow(null)}
													className="text-xl text-[#19525A] cursor-pointer"
												/>
											) : (
												<Image
													onClick={() => setFullRow(dat.id)}
													src={"/schdot.png"}
													height={14}
													width={14}
													alt="none"
													className="cursor-pointer"
												/>
											)}
										</div>
									</th>
								))}
							</tr>
						</thead>
						<div className="h-[13px]"></div>
						<tbody>
							{rows.map((row) => (
								<tr key={row}>
									<td
										scope="col"
										className="bg-[#E3EAE3] border-[.01px] border-[#5b5b5b] border-opacity-20 text-center h-7 min-w-[145px]"
									></td>
									<td
										scope="col"
										className="bg-[#E3EAE3] border-[.01px]  border-[#5b5b5b] border-opacity-20 text-center h-7 min-w-[145px]"
									></td>
									<td
										scope="col"
										className="bg-[#E3EAE3] border-[.01px] border-[#5b5b5b] border-opacity-20 text-center h-7 min-w-[145px]"
									></td>
									<td
										scope="col"
										className="bg-[#E3EAE3] border-[.01px] border-[#5b5b5b] border-opacity-20 text-center h-7 min-w-[145px]"
									></td>
									<td
										scope="col"
										className="bg-[#E3EAE3] border-[.01px] border-[#5b5b5b] border-opacity-20 text-center h-7 min-w-[145px]"
									></td>
									<td
										scope="col"
										className="bg-[#E3EAE3] border-[.01px] border-[#5b5b5b] border-opacity-20 text-center h-7 min-w-[145px]"
									></td>
									<td
										scope="col"
										className="bg-[#E3EAE3] border-[.01px] border-[#5b5b5b] border-opacity-20 text-center h-7 min-w-[145px]"
									></td>
									<td
										scope="col"
										className="bg-[#E3EAE3] border-[.01px] border-[#5b5b5b] border-opacity-20 text-center h-7 min-w-[145px]"
									></td>
									<td
										scope="col"
										className="bg-[#E3EAE3] border-[.01px] border-[#5b5b5b] border-opacity-20 text-center h-7 min-w-[145px]"
									></td>
								</tr>
							))}
						</tbody>
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

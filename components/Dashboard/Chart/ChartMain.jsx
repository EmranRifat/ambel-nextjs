import Image from "next/image";
import React, { useState } from "react";
import {
	BsChevronDown,
	BsThreeDotsVertical,
	BsPinFill,
	BsStar,
	BsChevronUp,
	BsPin,
	BsDot,
} from "react-icons/bs";
import Dropdown from "../../Dropdown";
import FilterAllBranch from "../../FilterAllBranch";
import CreateChart from "./CreateChart";

const ele = [1, 2, 3, 4, 5];
const ChartMain = () => {
	const [hide, setHide] = useState(false);
	const [create, setCreate] = useState(false);
	return (
		<React.Fragment>
			<div className="w-full flex justify-between items-center mt-2">
				<span className="text-[32px] font-bold text-[#5B5B5B]">Chart</span>
				<button
					onClick={() => setCreate(!create)}
					className="h-[40px] w-[172px] rounded-md bg-[#19525A] text-[20px] text-white"
				>
					Add New Chart
				</button>
			</div>
			<div className="w-full bg-white flex flex-col mt-3 shadow-md rounded-md">
				{/* topbar */}
				<div className="w-full flex flex-col bg-[#F0F3FC] shadow-md ">
					{/* 1st part */}
					<div className="w-full flex justify-between p-4">
						<div className="bg-white h-[32px] w-[358px] flex justify-between items-center p-2 border-[1px] border-[#42424280] rounded-[50px] shadow-sm">
							<input
								type="text"
								placeholder="Search chart"
								className="outline-none border-none"
							/>
							<Image src="/search.png" height={12} width={12} alt="search" />
						</div>
						<div className="flex justify-between items-center w-[300px]">
							<div className="">
								<FilterAllBranch />
							</div>

							{hide ? (
								<BsChevronUp
									onClick={() => setHide(!hide)}
									className="text-xl text-[#5B5B5B] cursor-pointer"
								/>
							) : (
								<BsChevronDown
									onClick={() => setHide(!hide)}
									className="text-xl text-[#5B5B5B] cursor-pointer"
								/>
							)}

							<BsThreeDotsVertical className="text-xl text-[#5B5B5B] cursor-pointer" />
						</div>
					</div>

					{/* hide part */}
					{hide && (
						<div className="w-full flex items-center justify-between border-t-[.2px] border-gray-300">
							<div className="flex items-center justify-between p-2 w-[150px]">
								<BsStar className="text-xl text-[#FF7A00]" />
								<div className="bg-[#C35E00] rounded-full text-white h-[24px] w-[24px] flex items-center justify-center">
									1
								</div>
								<BsPinFill className="text-xl" />
								<div className="bg-[#C35E00] rounded-full text-white h-[24px] w-[24px] flex items-center justify-center">
									1
								</div>
							</div>

							<div className="w-full flex justify-start items-center gap-5 ml-10 py-3">
								<Dropdown
									items={["Patient", "Practitioner", "Staff"]}
									selected={"All Department"}
									onSelected={(item) => {
										// console.log(item);
									}}
									width={"136px"}
								/>
								<Dropdown
									items={["Patient", "Practitioner", "Staff"]}
									selected={"All Stuff memeber"}
									onSelected={(item) => {
										// console.log(item);
									}}
									width={"150px"}
								/>
								<Dropdown
									items={["7 days", "15 days", "1 month"]}
									selected={"All Time"}
									onSelected={(item) => {
										// console.log(item);
									}}
									width={"136px"}
								/>{" "}
								<input
									type="date"
									className="outline-none px-1 rounded-md border-[1px] border-[#19525A80] shadow-sm"
								/>
								<input
									type="date"
									className="outline-none px-1 rounded-md border-[1px] border-[#19525A80] shadow-sm"
								/>
							</div>
						</div>
					)}
				</div>

				{/* chart elements.. */}

				<div className="w-full flex flex-col">
					{create && <CreateChart setCreate={setCreate} />}
					{/* every elememnts */}
					{ele.map((el) => (
						<div key={el} className="w-full flex flex-col mt-4 shadow-md">
							{/* top */}
							<div className="w-full flex justify-between bg-[#F3920066] rounded-t-md p-1">
								<div className="flex px-5">
									<p className="text-[20px] text-[#090909] font-bold">
										Md. Tazul Islam
										<span className="text-[14px] font-[400] ml-10">
											January 10, 2023
										</span>
									</p>
								</div>
								<div>
									<div className="flex items-center mt-1">
										<BsPin className="text-xl text-[#19525A] cursor-pointer mr-3" />
										<BsStar className="text-xl text-[#FF0000] cursor-pointer mr-3" />
										<BsThreeDotsVertical className="text-xl text-[#5B5B5B] cursor-pointer mr-3" />
									</div>
								</div>
							</div>
							{/* bottom */}
							<div className="w-full flex flex-col px-5 py-5">
								<h3 className="text-[16px] text-[#090909] font-bold">
									Chart Name
								</h3>
								<p className="text-[14px] text-[#090909]">
									Charting details and description. Charting details and
									description.Charting details and description Charting details
									and description .Charting details and description Charting
									details and description Charting details and description
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</React.Fragment>
	);
};

export default ChartMain;

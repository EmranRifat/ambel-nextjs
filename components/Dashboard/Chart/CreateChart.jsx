// @ts-nocheck
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
	BsGrid3X2,
} from "react-icons/bs";
import Dropdown from "../../Dropdown";
import Modal from "../../Modal";
import AddItemModal from "./AddItemModal";
import ChartAttachment from "./ChartAttachment";
import ChartBodyChart from "./ChartBodyChart";
import ChartChecklist from "./ChartChecklist";
import ChartDropDown from "./ChartDropDown";
import ChartHeading from "./ChartHeading";
import ChartInformation from "./ChartInformation";
import ChartNote from "./ChartNote";
import ChartOpticalMeasurement from "./ChartOpticalMeasurement";
import ChartRange from "./ChartRange";
import ChartSketch from "./ChartSketch";
import ChartSmartOptions from "./ChartSmartOptions";
import ChartTable from "./ChartTable";
import ChartText from "./ChartText";
import ChartVitals from "./ChartVitals";

const CreateChart = (props) => {
	const [itemOpen, setItemOpen] = useState(false);
	// const [showItem, setShowItem] = useState("text");
	const [chartItem, setChartItem] = useState({
		chartTitle: "",
		chartDescription: "",
		entries: [], //{title: String, value: String, type: String, data: Object},
	});

	return (
		<React.Fragment>
			{itemOpen && (
				<Modal onClick={setItemOpen} closeOnOutsideClick={true}>
					<AddItemModal
						setItemOpen={setItemOpen}
						setChartItem={setChartItem}
						chartItem={chartItem}
					/>
				</Modal>
			)}
			<div className="w-full flex flex-col">
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
				{/* item section */}
				<div className="w-full flex flex-col px-5">
					<div className="w-full flex flex-col mt-3 py-2">
						<h3 className="text-[16px]">Chart Name</h3>
						<input
							type="text"
							placeholder="Enter chart name"
							className="h-[24px] w-[973px] px-5 outline-none border-[.5px] border-[#19525A80] rounded-sm"
						/>
					</div>
					<div className="w-full flex flex-col mt-2 py-2">
						<h3 className="text-[16px]">Chart Description</h3>
						<textarea
							placeholder="Write down the description"
							className="h-[88px] w-[973px] p-2 outline-none border-[.5px] border-[#19525A80] rounded-sm"
						/>
					</div>
				</div>

				<div className="p-5 w-full flex flex-col">
					{chartItem?.entries?.map((entry, idx) => {
						switch (entry.type) {
							case "dropdown":
								return (
									<ChartDropDown
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx}
									/>
								);

							case "text":
								return (
									<ChartText
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx}
									/>
								);

							case "heading":
								return (
									<ChartHeading
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx}
									/>
								);
							case "info":
								return (
									<ChartInformation
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx}
									/>
								);
							case "note":
								return (
									<ChartNote
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx}
									/>
								);
							case "optical_measurement":
								return (
									<ChartOpticalMeasurement
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx} />
								)
							case "smart_options":
								return (
									<ChartSmartOptions
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx} />
								)
							case "vitals":
								return (
									<ChartVitals
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx} />
								)
							case "range":
								return (
									<ChartRange
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx} />
								)
							case "checkbox":
								return (
									<ChartChecklist
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx} />
								)
							case "attachment":
								return (
									<ChartAttachment
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx} />
								)
							case "sketch":
								return (
									<ChartSketch
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx} />
								)
							case "table":
								return (
									<ChartTable
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx} />
								)
							case "bodychart":
								return (
									<ChartBodyChart
										setChartItem={setChartItem}
										chartItem={chartItem}
										index={idx} />
								)
							default:
								return <></>;
						}
					})}
				</div>



				{/* bottom start */}
				<div className="w-full flex justify-between items-center bg-[#F3920066] rounded-t-md p-1 mt-3 px-5">
					<button
						onClick={() => setItemOpen(!itemOpen)}
						className="flex justify-between px-2 rounded-md shadow-sm items-center h-[28px] w-[128px] bg-white"
					>
						<div className="h-[28px] border-r-[1px] flex items-center justify-start">
							<BsGrid3X2 className="text-xl mr-1" />
						</div>
						Add item
						<Image src="/chevdown.png" height={10} width={10} alt="chevdown" />
					</button>
					<div className="w-[70%]">
						<div className="w-full flex items-center justify-end gap-7 mt-1">
							<input
								type="text"
								placeholder="Enter customer name"
								className="w-[160px] h-[28px] text-[14px] bg-white rounded-sm px-2  outline-none"
							/>
							<Image
								src="/usertick.png"
								height={24}
								width={22}
								alt="usertick"
							/>
							<Dropdown
								items={["Dept 1", "Dept 2", "Dept 3"]}
								selected={"All Department"}
								onSelected={(item) => console.log(item)}
								width={142}
							/>
							<button
								onClick={() => props.setCreate(false)}
								className="h-[30px] w-[68px] rounded-md bg-white text-[#5B5B5B]"
							>
								Cancel
							</button>
							<button className="h-[30px] w-[68px] rounded-md bg-[#19525A] text-white">
								Publish
							</button>
						</div>
					</div>
				</div>
				{/* bottom end*/}
			</div>
		</React.Fragment>
	);
};

export default CreateChart;

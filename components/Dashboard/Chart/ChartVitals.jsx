import Image from "next/image";
import React, { useState } from "react";
import { BsThreeDotsVertical, BsPlus } from "react-icons/bs";

const ChartVitals = ({ setChartItem, chartItem, index }) => {
	const [sizeofArr, setSizeOfArr] = useState(1);
	const vitals = [];
	for (var i = 0; i < sizeofArr; i++) {
		vitals[i] = i + 1;
	}
	return (
		<React.Fragment>
			<div className="p-5 w-full flex flex-col">
				<div className="w-full flex justify-between items-center mb-3">
					<span className="text-[16px]">Vitals</span>
					<Image
						src="/circlecross.png"
						height={20}
						width={20}
						alt="crosscircle"
						className="cursor-pointer"
						onClick={() => {
							setChartItem((prevState) => {
								const newEntries = chartItem.entries.filter(
									(item, idx) => index != idx
								);
								return {
									...chartItem,
									entries: newEntries,
								};
							});
						}}
					/>
				</div>

				{/* optical measurement deails.... */}
				<div className="w-[973px] h-[260px] flex flex-col items-center border-[#19525A80] border-[.2px] rounded-md">
					{/* settings of optical measurements.... */}
					<div className="w-[948px] px-2  rounded-md h-[24px] bg-[#458296] flex justify-between items-center mt-4">
						<span className="text-white text-[14px] font-bold">
							Settings of vital
						</span>
						<div className="flex items-center">
							<BsPlus
								onClick={() => setSizeOfArr((prevSize) => prevSize + 1)}
								className="text-2xl text-white cursor-pointer mr-2"
							/>
							<BsThreeDotsVertical className="text-xl text-white cursor-pointer" />
						</div>
					</div>
					<div className="w-[948px] flex justify-start gap-3 px-2 mt-2">
						<div className="w-[600px] flex justify-start text-[16px] font-bold">
							Name
						</div>
						<div className="w-[130px] flex justify-start text-[16px] font-bold">
							Value
						</div>
						<div className="w-[130px] flex justify-start text-[16px] font-bold">
							Unit
						</div>
					</div>
					<div className="w-[948px] flex flex-col items-start mt-2">
						{/* remaining elements... */}
						{vitals.map((vital) => (
							<div
								key={vital}
								className="w-[948px] flex justify-start gap-3 px-2 mt-2"
							>
								<input
									type="text"
									className="w-[600px] h-[24px] outline-none border-[.2px] border-[#19525A80] rounded-sm"
								/>
								<input
									type="text"
									className="w-[130px] h-[24px] outline-none border-[.2px] border-[#19525A80] rounded-sm"
								/>
								<input
									type="text"
									className="w-[130px] h-[24px] outline-none border-[.2px] border-[#19525A80] rounded-sm px-2"
								/>
								{vital == vitals[sizeofArr - 1] && (
									<Image
										src="/circlecross.png"
										height={20}
										width={20}
										alt="crosscircle"
										className="cursor-pointer"
										onClick={() => setSizeOfArr((prevSize) => prevSize - 1)}
									/>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ChartVitals;

import React from "react";
import { BiCheck } from "react-icons/bi";

const Top = (props) => {
	return (
		<React.Fragment>
			<div className="w-full flex justify-between px-7">
				<div className="flex flex-col">
					<div className="flex items-center">
						<div
							className={`h-[35px] w-[35px] ${
								props.currenPage > 1
									? "bg-[#19525A] text-white"
									: "bg-[#D9D9D9]"
							} flex items-center justify-center rounded-full`}
						>
							{props.currenPage > 1 ? <BiCheck size={25} /> : 1}
						</div>
						<div className="w-[116px] h-[2px] bg-[#5B5B5B]"></div>
					</div>
					<span className="text-[#5B5B5B] text-[12px]">Basic Info</span>
				</div>
				<div className="flex flex-col">
					<div className="flex items-center">
						<div
							className={`h-[35px] w-[35px] ${
								props.currenPage > 2
									? "bg-[#19525A] text-white"
									: "bg-[#D9D9D9]"
							} flex items-center justify-center rounded-full`}
						>
							{props.currenPage > 2 ? <BiCheck size={25} /> : 2}
						</div>
						<div className="w-[116px] h-[2px] bg-[#5B5B5B]"></div>
					</div>
					<span className="text-[#5B5B5B] text-[12px]">Organization Info</span>
				</div>
				<div className="flex flex-col">
					<div className="flex items-center">
						<div className="h-[35px] w-[35px] bg-[#D9D9D9] flex items-center justify-center rounded-full">
							3
						</div>
					</div>
					<span className="text-[#5B5B5B] text-[12px]">Finish</span>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Top;

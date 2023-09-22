import { forwardRef } from "react";
import Image from "next/image";

const CustomDateRange = () => {
	const customrange = ({ value, onClick }, ref) => {
		return (
			<div className="flex items-center ml-8">
				<span className="text-[rgb(91,91,91)] text-[20px] font-[500] mr-3">
					{value}
				</span>
				<div ref={ref} onClick={onClick} className="cursor-pointer">
					<Image src="/calendar.png" height={20} width={20} alt="calendar" />
				</div>
			</div>
		);
	};
	customrange.displayName = "customrange";
	return forwardRef(customrange);
};
CustomDateRange.displayName = "CustomDateRange";

export default CustomDateRange;

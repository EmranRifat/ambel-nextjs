import React from "react";

const Input = (props) => {
	return (
		<div className="flex justify-between items-center px-4 h-[60px] border-b-[1px] border-gray-300">
			<span className="text-[16px] text-[#5B5B5B]">{props.label}</span>
			<input
				type="text"
				name={props.name}
				onChange={props.onChangeUserData}
				value={props.value}
				required
				placeholder={props.label}
				className={`${
					props.value ? "bg-[#E8F0FE]" : ""
				} text-[14px] w-[350px] h-[40px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400`}
			/>
		</div>
	);
};

export default Input;

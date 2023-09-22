import React, { useState } from "react";

const Input = (props) => {
	return (
		<>
			<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
				<span className="text-[16px] text-[#5B5B5B]">
					{props.label}
					<b className="text-rose-600">*</b>
				</span>
				<input
					type="text"
					name={props.name}
					onChange={props.onChangeValue}
					value={props.value}
					required
					placeholder={props.label}
					className={` ${
						props.value ? "bg-[#E8F0FE]" : ""
					} w-[240px] h-[40px] outline-none rounded-[8px] border-2 py-2 px-4`}
				/>
			</div>
		</>
	);
};

export default Input;

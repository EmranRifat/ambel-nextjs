import React, { useEffect } from "react";
import InputGroup from "../AccountForm/InputGroup";

const Input = (props) => {
	// useEffect(() => {
	//   console.log(props.fillError[props.name], props.name);
	// }, [props.fillError]);

	return (
		<div
			className={`w-full flex flex-col ${
				props.className ? props.className : "mt-4"
			}`}
		>
			{props.title && (
				<span className="text-[#5B5B5B] text-[14px] mb-2">
					{props.title}
					{props.star && <b className="text-rose-600"> *</b>}
				</span>
			)}
			<InputGroup
				type={props.type}
				name={props.name}
				error={props.error}
				placeholder={props.placeholder}
				value={props.value}
				disabled={props.disabled}
				autoComplete="off"
				onChange={props.onChange}
				className={`rounded-lg h-10 ${
					props.disabled ? "cursor-not-allowed" : ""
				}}`}
				required={props.required}
			/>
			{/* {props.fillError[props.name] ? (
        <small>Fill in the {props.name}</small>
      ) : (
        <></>
      )} */}
		</div>
	);
};

export default Input;

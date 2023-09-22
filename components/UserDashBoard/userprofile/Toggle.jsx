const Toggle = ({ checked, setChecked }) => {
	return (
		<div
			className={`h-[32px] rounded-[16px] flex items-center justify-between border-2 ${
				checked
					? "none bg-[#A0D9B4]  p-2"
					: "flex-row-reverse  p-1 bg-[#E7E7E7;]"
			}  rounded-full cursor-pointer`}
			onClick={() => setChecked(!checked)}
		>
			<div className={`${checked ? "" : "m-1"} text-[14px]`}>
				{checked ? "Private" : "Public"}
			</div>
			{/* Switch */}
			<div
				className={`bg-[#195947] h-[22px] w-[22px] rounded-full shadow-md transform duration-300 ease-in-out" +
            ${checked ? "translate-x-1" : null}
          `}
			></div>
		</div>
	);
};

export default Toggle;

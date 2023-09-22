import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const SuggestionItem = ({ suggestion }) => {
	const [showDropdown, setShowDropdown] = useState(suggestion.id===1);
	return (
		<div className={`ml-2 mb-2 rounded-md bg-white shadow-md`}>
			<div
				onClick={() => setShowDropdown(!showDropdown)}
				className={`flex justify-between rounded-t-md ${
					showDropdown
						? `text-white ${suggestion.bgColor}  `
						: `bg-white rounded-md border-l-8 ${suggestion.borderColor}`
				} items-center p-2 text-center cursor-pointer `}
			>
				<span>{suggestion.title}</span>
				{showDropdown ? (
					<BiChevronUp className="text-2xl ml-3 text-white" />
				) : (
					<BiChevronDown className="text-2xl ml-3 text-black" />
				)}
			</div>
			{showDropdown && (
				<div className="p-2 text-sm">{suggestion.description}</div>
			)}
		</div>
	);
};

export default SuggestionItem;

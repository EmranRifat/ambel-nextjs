import { Dropdown } from "antd";
import React from "react";
import { BiDownArrowAlt } from "react-icons/bi";
import SuggestionItem from "./SuggestionItem";

const Suggestions = () => {
	const suggestions = [
		{
			id: 1,
			title: "Update your business Email",
			bgColor: "bg-sky-500",
			borderColor: "border-sky-500",
			description:
				"You don't have a business email yet. Please update your business email to communicate with your customers.",
		},
		{
			id: 2,
			title: "Add Some Treatments",
			bgColor: "bg-orange-500",
			borderColor: "border-orange-500",
			description: "You don't have any treatments yet. Please add some treatments to your business.",
		},
		{
			id: 3,
			title: "Add Staff Members",
			bgColor: "bg-teal-500",
			borderColor: "border-teal-500",
			description: "You don't have any staff members yet. Please add some staff members to your business.",
		},
	];

	return (
		<React.Fragment>
			<div className="h-[80vh] w-[40vw] hidden lg:block">
				{suggestions.map((suggestion) => (
					<SuggestionItem key={suggestion.id} suggestion={suggestion} />
				))}
			</div>
		</React.Fragment>
	);
};

export default Suggestions;

import React from "react";
import Link from "next/link";

export default function StepperControl({
	handleClick,
	currentStep,
	steps,
	userType,
}) {
	const handleDirectionClick = (event, direction) => {
		event.preventDefault();
		handleClick(direction);
	};

	return (
		<div className="flex">
			<div className="w-[50%]">
				{currentStep !== 3 && (
					<Link href="/business-dashboard">
						<a>
							<button
								className="cursor-pointer rounded  py-2 px-4 text-sm uppercase transition  bg-orange-500 hover:bg-orange-700 text-white
        "
							>
								Do it later
							</button>
						</a>
					</Link>
				)}
			</div>
			<div className="w-full flex justify-end">
				{userType !== "User or Member" && userType !== "User/Member" && (
					<React.Fragment>
						{currentStep !== 1 && (
							<button
								type="submit"
								onClick={(e) => handleDirectionClick(e, "back")}
								className={`cursor-pointer rounded border border-gray-300 bg-white py-2 px-4 text-sm uppercase transition duration-200 ease-in-out hover:bg-gray-200 hover:border-gray-300 
        `}
							>
								Back
							</button>
						)}
						<button
							type="submit"
							onClick={(e) =>
								handleDirectionClick(
									e,
									currentStep == steps.length - 1 ? "done" : "next"
								)
							}
							className={`cursor-pointer rounded border border-indigo-600  py-2 px-4 text-sm uppercase transition duration-200 ease-in-out ml-3 bg-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 text-white
        `}
						>
							{currentStep === steps.length - 1 ? "Done" : "Next"}
						</button>
					</React.Fragment>
				)}
				{(userType === "User or Member" || userType === "User/Member") && (
					<button
						type="submit"
						onClick={(e) => handleDirectionClick(e, "done")}
						className={`cursor-pointer rounded  py-2 px-4 text-sm uppercase transition  ml-3 bg-indigo-600 hover:bg-indigo-700 text-white
        `}
					>
						Done
					</button>
				)}
			</div>
		</div>
	);
}

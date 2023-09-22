import React, { useState, useEffect, useRef } from "react";
import { BiCheck, BiCheckCircle } from "react-icons/bi";

const Stepper = ({ steps, currentStep }) => {
	const [newStep, setNewStep] = useState([]);
	const stepsRef = useRef();

	const updateStep = (stepNumber, steps) => {
		const newSteps = [...steps];

		let count = 0;
		while (count < newSteps.length) {
			//current step
			if (count === stepNumber) {
				newSteps[count] = {
					...newSteps[count],
					highlighted: true,
					selected: true,
					completed: false,
				};
				count++;
			}

			//step completed
			else if (count < stepNumber) {
				newSteps[count] = {
					...newSteps[count],
					highlighted: false,
					selected: true,
					completed: true,
				};
				count++;
			}
			//step pending
			else {
				newSteps[count] = {
					...newSteps[count],
					highlighted: false,
					selected: false,
					completed: false,
				};
				count++;
			}
		}

		return newSteps;
	};

	useEffect(() => {
		const stepsState = steps.map((step, index) =>
			Object.assign(
				{},
				{
					description: step,
					completed: false,
					highlighted: index === 0 ? true : false,
					selected: index === 0 ? true : false,
				}
			)
		);

		stepsRef.current = stepsState;
		const current = updateStep(currentStep - 1, stepsRef.current);
		setNewStep(current);
	}, [steps, currentStep]);

	const stepsDisplay = newStep.map((step, index) => {
		return (
			<div
				key={index}
				className={
					index !== newStep.length - 1
						? "w-full flex items-center"
						: "flex items-center"
				}
			>
				<div className="relative flex flex-col items-center text-teal-600">
					<div
						className={`rounded-full transition duration-500 ease-in-out h-9 w-9 flex items-center justify-center py-3  ${
							step.completed ? "bg-[#19525A] text-white " : "bg-[#D9D9D9]"
						}`}
					>
						{step.completed ? (
							<BiCheckCircle size={22} />
						) : (
							<span
								className={`${
									step.selected ? "text-[#19525A]" : "text-gray-600"
								}`}
							>
								{index + 1}
							</span>
						)}
					</div>
					<div
						className={`absolute top-0  text-center mt-11 w-32 text-xs font-medium ${
							step.highlighted ? "text-gray-900" : "text-gray-400"
						}`}
					>
						{step.description}
					</div>
				</div>
				<div
					className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
						step.completed ? "border-[#19525A]" : "border-gray-300"
					}  `}
				></div>
			</div>
		);
	});

	return (
		<div className="mx-auto px-4 pb-8 w-full flex justify-between items-center">
			{stepsDisplay}
		</div>
	);
};
export default Stepper;

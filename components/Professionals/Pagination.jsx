import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Pagination = ({ paginate, totalProf, profPerPage, selected }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalProf / profPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<>
			<nav className="w-full flex justify-end">
				<ul className="inline-flex -space-x-px mt-5">
					<li>
						<div
							className={`flex items-center ${
								selected > 1 ? "cursor-pointer text-[#19525A]" : "text-gray-300"
							}`}
							onClick={() => {
								if (selected > 1) {
									paginate(selected - 1);
								}
							}}
						>
							<BiChevronLeft size={24} />
							Previous
						</div>
					</li>
					{pageNumbers.map((number) => (
						<li key={number}>
							<a
								onClick={() => paginate(number)}
								href="#"
								className={`py-4 px-3 leading-tight ${
									number == selected
										? "text-[#19525A] underline font-bold"
										: "text-gray-500"
								} bg-white`}
							>
								{number}
							</a>
						</li>
					))}
					<li>
						<div
							className={`flex items-center ${
								selected < pageNumbers.length
									? "cursor-pointer text-[#19525A]"
									: "text-gray-300"
							}`}
							onClick={() => {
								if (selected < pageNumbers.length) {
									paginate(selected + 1);
								}
							}}
						>
							Next
							<BiChevronRight size={24} />
						</div>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Pagination;

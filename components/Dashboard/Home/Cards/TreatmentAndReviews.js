import React from "react";
import profile from "./images/profile.png";
import photo1 from "./images/photo-1.avif";
import mijanur from "./images/mijanur.jpg";
import Image from "next/image";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const TreatmentAndReviews = () => {
	const [showDetails, setShowDetails] = React.useState(true);
	const [treatmentList, setTreatmentList] = React.useState([
		{
			id: 0,
			treatmentName: "Bonnie Green",
			numberOfSale: "23",
			value: "222",
		},
		{
			id: 1,
			treatmentName: "Bonnie Green",
			numberOfSale: "23",
			value: "222",
		},
		{
			id: 2,
			treatmentName: "Bonnie Green",
			numberOfSale: "23",
			value: "222",
		},
		{
			id: 3,
			treatmentName: "Bonnie Green",
			numberOfSale: "23",
			value: "222",
		},
		{
			id: 4,
			treatmentName: "Bonnie Green",
			numberOfSale: "23",
			value: "222",
		},
		{
			id: 5,
			treatmentName: "Bonnie Green",
			numberOfSale: "23",
			value: "222",
		},
	]);
	const [reviewList, setReviewList] = React.useState([
		{
			id: 6,
			userInfo: {
				name: "Bonnie Green",
				image: profile,
				review: "Duis deserunt anim id officia",
			},
			rating: {
				value: "1",
				color: "purple-600",
			},
			date: "2020-06-01",
		},
		{
			id: 7,
			userInfo: {
				name: "Bonnie Green",
				image: photo1,
				review: "Lorem ipsum dolor sit amet",
			},
			rating: {
				value: "1.5",
				color: "purple-600",
			},
			date: "2020-06-01",
		},
		{
			id: 8,
			userInfo: {
				name: "Bonnie Green",
				image: mijanur,
				review: "Lorem ipsum dolor sit amet",
			},
			rating: {
				value: "3.5",
				color: "purple-600",
			},
			date: "2020-06-01",
		},
		{
			id: 9,
			userInfo: {
				name: "Bonnie Green",
				image: mijanur,
				review: "Lorem ipsum dolor sit amet",
			},
			rating: {
				value: "3",
				color: "purple-600",
			},
			date: "2020-06-01",
		},
		{
			id: 10,
			userInfo: {
				name: "Bonnie Green",
				image: photo1,
				review: "Lorem ipsum dolor sit amet",
			},
			rating: {
				value: "5",
				color: "purple-600",
			},
			date: "2020-06-01",
		},
	]);

	const ratted = (rating) => {
		const ratings = [];

		for (let i = 0; i < parseInt(rating); i++) {
			ratings.push(<BsStarFill key={i} className="mr-1" />);
		}

		if (parseFloat(rating) % 1 !== 0) {
			ratings.push(<BsStarHalf key={0} className="mr-1" />);
		}
		return ratings;
	};

	const notRatted = (rating) => {
		const ratings = [];
		const len =
			parseFloat(rating) % 1 !== 0 ? parseInt(rating) + 1 : parseInt(rating);

		for (let i = 0; i < 5 - len; i++) {
			ratings.push(<BsStar key={i} className="mr-1" />);
		}
		return ratings;
	};

	return (
		<div className="flex lg:flex-row flex-col lg:space-x-6 mt-5">
			<div
				className={`bg-white ${showDetails ? "" : "h-[60px]"
					} lg:w-2/5 shadow-md rounded-lg  mb-4 p-4`}
			>
				<div className="mb-5 flex justify-between items-center">
					<div>
						<h6 className="text-lg text-gray-900">Top Treatment</h6>
					</div>
					<div
						className="cursor-pointer"
						onClick={() => setShowDetails(!showDetails)}
					>
						<svg
							className="w-4 h-4 mr-2 text-gray-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					</div>
				</div>
				{showDetails && (
					<div>
						<div className="overflow-x-auto">
							<table className="w-full text-sm text-left">
								<thead className="text-gray-600 bg-gray-50">
									<tr>
										<th scope="col" className="px-6 py-3">
											No.
										</th>
										<th scope="col" className="px-6 py-3">
											Name of Treatment
										</th>
										<th scope="col" className="px-6 py-3">
											Number of Sale
										</th>
										<th scope="col" className="px-6 py-3">
											Value
										</th>
									</tr>
								</thead>
								<tbody>
									{treatmentList.map((treatment, index) => {
										return (
											<tr
												className={`bg-white border-b hover:bg-gray-50`}
												key={treatment.id}
											>
												<td
													scope="row"
													className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
												>
													{index + 1}.
												</td>
												<td
													scope="row"
													className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
												>
													{treatment.treatmentName}
												</td>
												<td
													scope="row"
													className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
												>
													{treatment.numberOfSale}
												</td>
												<td
													scope="row"
													className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
												>
													${treatment.value}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div className="mt-5 mb-2 text-sm flex w-full items-center justify-center">
							<button className="py-2 px-5 text-gray-500 border border-gray-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition rounded-full">
								Show all
							</button>
						</div>
					</div>
				)}
			</div>
			<div className="bg-white lg:w-3/5 shadow-md rounded-lg mb-4 p-4">
				<div className="mb-5 flex justify-between items-center">
					<div>
						<h6 className="text-lg text-gray-900">
							Patients Review
							<span className="font-normal text-gray-400 mx-2">(4.9/40)</span>
						</h6>
					</div>
					<div>
						<svg
							className="w-4 h-4 mr-2 text-gray-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead className="text-gray-600 bg-gray-50">
							<tr>
								<th scope="col" className="px-6 py-3">
									Name
								</th>
								<th scope="col" className="px-6 py-3">
									Date
								</th>
								<th scope="col" className="px-6 py-3">
									Rate
								</th>
							</tr>
						</thead>
						<tbody>
							{reviewList.map((review, index) => {
								return (
									<tr
										className={`bg-white border-b hover:bg-gray-50`}
										key={review.id}
									>
										<td
											scope="row"
											className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
										>
											<div className="flex items-center h-full">
												<Image
													src={review.userInfo.image}
													alt="patient"
													height={40}
													width={40}
													className="object-cover rounded"
												/>
												<div className="ml-3 truncate">
													<p className="text-md font-normal text-gray-700">
														{review.userInfo.name}
													</p>
													<small className="text-xs text-gray-500 ">
														{review.userInfo.review}
													</small>
												</div>
											</div>
										</td>
										<td
											scope="row"
											className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
										>
											{review.date}
										</td>
										<td
											scope="row"
											className=" px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
										>
											<p className="inline-flex">
												{ratted(review.rating.value)}
												{notRatted(review.rating.value)}
											</p>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="mt-5 mb-2 text-sm flex w-full items-center justify-center">
					<button className="py-2 px-5 text-gray-500 border border-gray-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition rounded-full">
						Show all
					</button>
				</div>
			</div>
		</div>
	);
};

export default TreatmentAndReviews;

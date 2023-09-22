import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ShopInventory = () => {
	const [showDetails, setShowDetails] = React.useState(true);
	const chartFollowing = {
		series: [
			{
				name: "Total",
				data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
			},
			{
				name: "Following",
				data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
			},
		],
		options: {
			chart: {
				type: "bar",
				toolbar: {
					show: false,
				},
				parentHeightOffset: 0,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "80%",
					endingShape: "rounded",
					barHeight: "100%",
				},
			},
			dataLabels: {
				enabled: false,
			},
			legend: {
				show: false,
			},
			colors: ["#FFB1C1", "#9AD0F5"],
			xaxis: {
				categories: [
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
				],
			},
		},
	};

	const inventory = {
		series: [44, 55, 41, 17, 15],
		options: {
			chart: {
				type: "donut",
				toolbar: {
					show: false,
				},
				parentHeightOffset: 0,
			},
			plotOptions: {
				pie: {
					startAngle: -90,
					endAngle: 270,
					donut: {
						size: "45%",
					},
				},
			},
			colors: ["#fcba03", "#f52a3e", "#FFCA58", "#3333d6", "#807455"],
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
				width: 0,
			},
			fill: {
				type: "gradient",
			},
			legend: {
				show: false,
			},
		},
	};

	return (
		<React.Fragment>
			<div className="flex lg:flex-row flex-col lg:space-x-6 mt-5">
				<div
					className={`w-full bg-white ${
						showDetails ? "" : "h-[60px]"
					} lg:w-2/4 shadow-md rounded-lg mb-5 lg:mb-0`}
				>
					<div className="p-4 border-b-gray-200 border-b flex justify-between items-center">
						<div>
							<h6 className="text-lg text-gray-900">Chart</h6>
						</div>
						<div
							className="cursor-pointer"
							onClick={() => setShowDetails(!showDetails)}
						>
							<svg
								className="w-4 h-4 mr-3 text-gray-500"
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
						<div className="flex md:content-between items-center flex-col lg:flex-row my-5 mr-0 sm:mr-2">
							<div className="w-full flex flex-col items-center">
								<div className="flex flex-row flex-wrap mb-3">
									<div className="flex items-center mb-1 mr-3">
										<div className={`w-4 h-4 rounded mr-2 bg-[#FFB1C1]`}></div>
										<p className="text-gray-500 text-sm">Total - 30</p>
									</div>
									<div className="flex items-center mb-1 mr-3">
										<div className={`w-4 h-4 rounded mr-2 bg-[#9AD0F5]`}></div>
										<p className="text-gray-500 text-sm">Following - 10</p>
									</div>
								</div>
								<Chart
									options={chartFollowing.options}
									series={chartFollowing.series}
									type={chartFollowing.options.chart.type}
									height={240}
									width={"100%"}
								/>
							</div>
						</div>
					)}
				</div>
				<div className="w-full bg-white lg:w-2/4 shadow-md rounded-lg">
					<div className="p-4 border-b-gray-200 border-b flex justify-between items-center">
						<div>
							<h6 className="text-lg text-gray-900">Shop Inventory</h6>
						</div>
						<div>
							<svg
								className="w-4 h-4 mr-3 text-gray-500"
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
					<div className="flex items-center  flex-col sm:flex-row content-center sm:mt-0">
						<div className="ml-5 lg:ml-10 mb-4 sm:mb-0 w-[95%] lg:w-2/5">
							<p className=" text-gray-600 py-3">Total Product - 200</p>
							<div className="flex lg:flex-col flex-row flex-wrap mb-3">
								<div className="flex items-center mb-1 mr-3">
									<div className={`w-4 h-4 rounded mr-2 bg-[#fcba03]`}></div>
									<p className="text-gray-500 text-sm">
										Total sales (20)- $1000
									</p>
								</div>
								<div className="flex items-center mb-1 mr-3">
									<div className={`w-4 h-4 rounded mr-2 bg-[#f52a3e]`}></div>
									<p className="text-gray-500 text-sm">Cancel (02) - $30</p>
								</div>
								<div className="w-[95%] lg:w-full my-2 border-b-gray-200 border-b "></div>
								<div className="flex items-center mb-1 mr-3">
									<div className={`w-4 h-4 rounded mr-2 bg-[#FFCA58]`}></div>
									<p className="text-gray-500 text-sm">Inactive - 150</p>
								</div>
								<div className="flex items-center mb-1 mr-3">
									<div className={`w-4 h-4 rounded mr-2 bg-[#3333d6]`}></div>
									<p className="text-gray-500 text-sm">Global - 150</p>
								</div>
								<div className="flex items-center mb-1 mr-3">
									<div className={`w-4 h-4 rounded mr-2 bg-[#807455]`}></div>
									<p className="text-gray-500 text-sm">Archived - 35</p>
								</div>
							</div>
						</div>
						<div className="w-full sm:w-3/5 py-3">
							<Chart
								options={inventory.options}
								series={inventory.series}
								type={inventory.options.chart.type}
								height={280}
								width={"100%"}
							/>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ShopInventory;

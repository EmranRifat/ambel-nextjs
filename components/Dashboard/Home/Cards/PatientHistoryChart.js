// @ts-nocheck
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PatentHistory = () => {
	const totalPatients = {
		series: [
			{
				name: "Patients",
				data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 34, 44, 99],
			},
		],
		options: {
			chart: {
				type: "line",
				zoom: {
					enabled: false,
				},
				toolbar: {
					show: false,
				},
				parentHeightOffset: 0,
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
				width: 3,
				colors: ["#CB0C9F"],
			},
			markers: {
				size: 3,
				colors: ["#A6CEE3"],
			},
			grid: {
				show: true,
				xaxis: {
					lines: {
						show: true,
					},
				},
				yaxis: {
					lines: {
						show: true,
					},
				},
			},
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				],
			},
		},
		info: {
			title: "Total Patients",
			value: "256",
			legend: [
				{
					color: "bg-[#CB0C9F]",
					text: "Patients",
				},
			],
		},
	};

	const totalVisits = {
		series: [
			{
				name: "Visits",
				data: [31, 40, 28, 51, 42, 109, 100, 23, 43, 54, 65, 76],
			},
		],
		options: {
			chart: {
				type: "area",
				toolbar: {
					show: false,
				},
				parentHeightOffset: 0,
			},
			colors: ["#FF9364"],
			dataLabels: {
				enabled: false,
			},
			yaxis: {
				show: false,
			},
			stroke: {
				curve: "smooth",
				width: 2,
				lineCap: "butt",
				colors: ["#9BC83B"],
			},
			markers: {
				size: 0,
				colors: ["#ea580c"],
			},
			grid: {
				show: false,
			},
			xaxis: {
				type: "text",
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				],
			},
		},
		info: {
			title: "Total Visit",
			value: "1010",
			legend: [
				{
					color: "bg-[#9BC83B]",
					text: "Patients",
				},
			],
		},
	};

	const totalSales = {
		series: [
			{
				name: "Treatments",
				data: [3111, 40, 28, 501, 42, 109, 4000],
			},
			{
				name: "Product",
				data: [110, 32, 3000, 32, 34, 525, 41],
			},
		],
		options: {
			chart: {
				type: "area",
				toolbar: {
					show: false,
				},
				parentHeightOffset: 0,
			},
			colors: ["#CB0C9F", "#545566"],
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
				colors: ["#CB0C9F", "#545566"],
				width: 2,
			},
			markers: {
				size: 0,
			},
			xaxis: {
				type: "text",
				categories: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			},
			legend: {
				show: false,
			},
			grid: {
				show: true,
				strokeDashArray: 5,
			},
			yaxis: {
				lines: {
					show: true,
				},
			},
		},
		info: {
			title: "Total Sales",
			value: "$" + "5020",
			legend: [
				{
					color: "bg-[#CB0C9F]",
					text: "Treatments",
				},
				{
					color: "bg-[#545566]",
					text: "Products",
				},
			],
		},
	};

	const performance = {
		series: [
			{
				name: "Performance",
				data: [41, 22, 10, 28, 16, 21, 13, 30, 34, 12, 45, 59],
			},
		],
		options: {
			chart: {
				type: "bar",
				events: {
					click: function (chart, w, e) {
						// console.log(chart, w, e)
					},
				},
				parentHeightOffset: 0,
				toolbar: {
					show: false,
				},
				dataLabels: {
					enabled: false,
				},
			},
			grid: {
				show: false,
			},
			colors: ["#97d4e8"],
			plotOptions: {
				bar: {
					columnWidth: "65%",
					distributed: true,
					horizontal: false,
					endingShape: "rounded",
				},
			},
			dataLabels: {
				enabled: false,
			},
			legend: {
				show: false,
			},
			xaxis: {
				type: "text",
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				],
			},
			yaxis: {
				labels: {
					formatter: function (value) {
						return value + "%";
					},
				},
			},
			labels: {
				style: {
					fontSize: "12px",
				},
			},
		},
		info: {
			title: "Performance",
			value: "",
			legend: [
				{
					color: "bg-[#97d4e8]",
					text: "Performance",
				},
			],
		},
	};

	const renderChart = (chart) => {
		return (
			<div className="h-96 w-full lg:w-72 2xl:w-[24%] md:w-[48%] mb-4 bg-white rounded-lg shadow">
				<div className="sm:mr-2">
					<div className="px-4 py-3">
						<h6 className="text-lg text-gray-900">{chart.info.title}</h6>
						{chart.info.value && (
							<p className="text-gray-600">{chart.info.value}</p>
						)}
					</div>
					<Chart
						options={chart.options}
						series={chart.series}
						type={chart.options.chart.type}
						height={chart.info.value ? 260 : 285}
						width={"100%"}
					/>
					<div className="px-4 flex items-center">
						{chart.info.legend.map((item, index) => {
							return (
								<div className="flex items-center mr-3" key={index}>
									<div
										className={`w-4 h-4 rounded-full mr-2 ${item.color}`}
									></div>
									<p className="text-gray-600 text-sm">{item.text}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	};

	return (
		<React.Fragment>
			<div className="flex flex-wrap items-center flex-1 justify-between">
				{renderChart(totalPatients)}
				{renderChart(totalVisits)}
				{renderChart(totalSales)}
				{renderChart(performance)}
			</div>
		</React.Fragment>
	);
};

export default PatentHistory;

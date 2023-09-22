import React from "react";
import dynamic from "next/dynamic";
const MapView = dynamic(import("../../Map/MapView"), { ssr: false });

const ViewBranchModal = (props) => {
	return (
		<div className="w-[530px] relative mx-auto h-[670px] mt-[20px] py-6 px-5 z-100 lg:min-w-[536px] flex flex-col items-center bg-white rounded-md">
			<div className="absolute top-5 right-5">
				<span
					onClick={() => props.setOpenViewModal(false)}
					className="text-xl text-[#5B5B5B] cursor-pointer"
				>
					✖
				</span>
			</div>
			<div className="w-full mt-3">
				<div className="flex flex-col">
					<span className="text-[22px]">{props.info?.name} </span>
					<span>{props.info?.address}</span>
					<span>{`${props.info?.city} ${props.info?.zipCode}`}</span>
				</div>
				<div className="w-full my-3">
					<span className="text-[16px] text-[#5B5B5B]">Map</span>
					<MapView
						mapCoordinate={props.info?.mapCoordinate}
						canSelectLocation={false}
						zoom={10}
						controlSize={30}
						width={"490px"}
						height={"350px"}
					/>
				</div>
				<div>
					Online Booking:{" "}
					{props.info?.onlineBooking ? (
						<span className="text-[#07BD03]">Enabled</span>
					) : (
						<span className="text-rose-500">Disabled</span>
					)}
				</div>
				<div>
					Status:{" "}
					{props.info?.status === "Active" ? (
						<span className="text-[#07BD03]">Active</span>
					) : (
						<span className="text-rose-500">Inactive</span>
					)}
				</div>
			</div>
			<div className="w-full flex justify-end">
				<button
					onClick={() => {}}
					className="h-[36px] text-[16px] px-4 py-2 text-white bg-[#f80505] rounded-[8px] mr-4"
				>
					Delete Branch
				</button>
			</div>
		</div>
	);
};

export default ViewBranchModal;

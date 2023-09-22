import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import {
	getAllCountriesName,
	getTimeZone,
} from "../../../utils/int_phone_code";
import { PulseLoader } from "react-spinners";
import {
	onCancelAction,
	updateBusinessInfo,
	createBusinessBranch,
	getBusinessInfo,
} from "../../../store/actions/business";
import axios from "../../../utils/axios";
import Dropdown from "../../Dropdown";
import Toggle from "../../Toggle";
import CreateBranchModal from "./Branches/CreateBranchModal";
import cookie from "js-cookie";
import debounce from "lodash.debounce";

import Modal from "../../../components/Modal";
import dynamic from "next/dynamic";

const MapView = dynamic(import("../Map/MapView"), { ssr: false });
import ViewBranchModal from "./Branches/ViewBranchModal";
import { getBranches } from "../../../StatelessAPI/branchApiCalls";

const BusinessInfo = (props) => {
	const [isChanged, setIsChanged] = React.useState(false);
	const [businessData, setBusinessData] = React.useState({
		name: "",
		legalName: "",
		description: "",
		location: "Choose Your Location",
		phone: "",
		shop: false,
		deleteAfter: "Choose Time",
		secureMode: false,
		email: "",
		lang: "Choose Your Language",
		timeZone: "Choose Your Time Zone",
		website: "",
	});
	// const [branchInfo, setBranchInfo] = useState({
	//   name: "",
	//   address: "",
	//   city: "Dhaka",
	//   zipCode: "",
	//   mapCoordinate: {
	//     longitude: 0,
	//     lattitude: 0,
	//   },
	//   status: "inactive",
	//   onlineBooking: false,
	// });

	const [changes, setChanges] = React.useState([]);
	const [branches, setBranches] = useState([]);
	const [updateBranch, setUpdateBranch] = useState({});
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openViewModal, setOpenViewModal] = useState(false);
	const [viewBranch, setViewBranch] = useState({});
	const [isCreateMode, setIsCreateMode] = useState(true);

	useEffect(() => {
		if (!props.info?.business) props.getBusinessInfo();
	}, []);

	useEffect(() => {
		if (props.info?.business) {
			setBusinessData({ ...businessData, ...props.info?.business });
			setChanges([]);
		}
	}, [props.info]);

	const _getBranches = async () => {
		setBranches([]);
		const fetchBranches = await getBranches(props.info?.business?._id);
		setBranches((prevState) => [...prevState, ...fetchBranches]);
	};

	useEffect(() => {
		_getBranches();
	}, []);
	const updateBusinessInfo = (data) => {
		props.updateBusinessInfo(data, props.info?.business?._id);
	};
	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setBusinessData({
			...businessData,
			[name]: value,
		});
		debounceOnchange({ [name]: value });
	};
	const debounceOnchange = useCallback(debounce(updateBusinessInfo, 1000), []);

	return (
		<>
			<div className="pb-8 flex flex-col">
				<div className="flex justify-between">
					<span className="text-[#5B5B5B] text-[32px] font-[700]">
						Organization Info
					</span>
				</div>
				<div className="bg-white py-2 flex flex-col w-full rounded-lg shadow-md mt-5">
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Full Name<b className="text-rose-600">*</b>
						</span>
						<input
							type="text"
							name="name"
							onChange={onChangeValue}
							value={businessData["name"]}
							required
							placeholder="Circle Studio"
							className={`${
								businessData["name"] ? "bg-[#E8F0FE]" : ""
							} text-[14px] w-[240px] h-[40px] outline-none rounded-[8px] py-2 px-4`}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Legal Name<b className="text-rose-600">*</b>
						</span>
						<input
							type="text"
							required
							name="legalName"
							onChange={onChangeValue}
							value={businessData["legalName"]}
							placeholder="Circle Studio"
							className={`${
								businessData["legalName"] ? "bg-[#E8F0FE]" : ""
							} text-[14px] w-[240px] h-[40px] outline-none rounded-[8px] py-2 px-4`}
						/>
					</div>
					<div className="flex flex-col px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Description<b className="text-rose-600">*</b>
						</span>
						<textarea
							name="description"
							value={businessData["description"]}
							onChange={onChangeValue}
							id=""
							cols={30}
							rows={3}
							required
							className={`${
								businessData["description"] ? "bg-[#E8F0FE]" : ""
							} text-[14px] outline-none rounded-[8px] mt-2 py-2 px-4`}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">Website</span>
						<input
							type="text"
							name="website"
							value={businessData["website"]}
							onChange={onChangeValue}
							placeholder="https://www.ambel.com"
							className={`${
								businessData["website"] ? "bg-[#E8F0FE]" : ""
							} text-[14px] w-[240px] h-[40px] outline-none rounded-[8px] py-2 px-4`}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Location<b className="text-rose-600">*</b>
						</span>
						<Dropdown
							width={"240px"}
							items={getAllCountriesName()}
							selected={businessData.location}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "location", value: selected },
								});
							}}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Language<b className="text-rose-600">*</b>
						</span>
						<Dropdown
							width={"240px"}
							items={["English", "Bengali"]}
							selected={businessData.lang}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "lang", value: selected },
								});
							}}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Time zone<b className="text-rose-600">*</b>
						</span>
						<Dropdown
							width={"240px"}
							items={getTimeZone(businessData.location)}
							selected={businessData.timeZone}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "timeZone", value: selected },
								});
							}}
						/>
					</div>

					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Phone number<b className="text-rose-600">*</b>
						</span>
						<input
							type="text"
							name="phone"
							value={businessData["phone"]}
							onChange={onChangeValue}
							placeholder="Organization Phone Number"
							className={`${
								businessData["phone"] ? "bg-[#E8F0FE]" : ""
							} text-[14px] w-[240px] h-[40px] outline-none rounded-[8px] py-2 px-4`}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							How do you refer your Customers ?
						</span>
						<input
							type="text"
							name="customerAlias"
							value={businessData["customerAlias"]}
							onChange={onChangeValue}
							placeholder="Ex: Client, Patients"
							className={`${
								businessData["customerAlias"] ? "bg-[#E8F0FE]" : ""
							} text-[14px] w-[240px] h-[40px] outline-none rounded-[8px] py-2 px-4`}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							How do you refer your Services ?
						</span>
						<input
							type="text"
							name="serviceAlias"
							value={businessData["serviceAlias"]}
							onChange={onChangeValue}
							placeholder="Ex: Treatment, Therapy"
							className={`${
								businessData["serviceAlias"] ? "bg-[#E8F0FE]" : ""
							} text-[14px] w-[240px] h-[40px] outline-none rounded-[8px] py-2 px-4`}
						/>
					</div>

					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Does your buisness have any shop?
						</span>
						<Toggle
							checked={businessData.shop}
							setChecked={(checked) => {
								onChangeValue({
									target: { name: "shop", value: checked },
								});
							}}
						/>
					</div>

					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Do you allow secure mode?{" "}
						</span>
						<Toggle
							checked={businessData.secureMode}
							setChecked={(checked) =>
								onChangeValue({
									target: { name: "secureMode", value: checked },
								})
							}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Delete automatically after view the secure files?
						</span>
						<Dropdown
							width={"240px"}
							items={["Instantly", "After 1 day", "After 2 days"]}
							selected={businessData.deleteAfter}
							onSelected={(selected) => {
								onChangeValue({
									target: { name: "deleteAfter", value: selected },
								});
							}}
						/>
					</div>
				</div>

				{/* 2nd div */}
				<div className="my-4 flex flex-col">
					<div className="flex justify-between mt-3">
						<span className="text-[#5B5B5B] text-[32px] font-[700]">
							Branches of your Buisness
						</span>
						<button
							className="text-[16px] mt-3 px-6 py-2 bg-[#19525A] h-[36px] w-[162] text-white rounded-[10px]"
							type="button"
							onClick={() => {
								setViewBranch({});
								setOpenCreateModal(true);
							}}
						>
							Add new branch
						</button>
						{openCreateModal && (
							<Modal onClick={setOpenCreateModal} closeOnOutsideClick={false}>
								<CreateBranchModal
									setOpenCreateModal={setOpenCreateModal}
									getBranches={_getBranches}
									createMode={isCreateMode}
									info={viewBranch}
								/>
							</Modal>
						)}
						{/* <CreateBranchModal setBranches={setBranches} /> */}
					</div>
					{branches.map((e) => {
						return (
							<div
								key={e._id}
								className="w-full flex justify-between items-center bg-white rounded-[8px] p-4 mt-5 shadow-md"
							>
								<div className="inline-flex items-center">
									<div className="m-2 rounded-md overflow-hidden">
										<MapView
											mapCoordinate={e.mapCoordinate}
											canSelectLocation={false}
											width={"100px"}
											height={"100px"}
										/>
									</div>
									<div className="flex flex-col">
										<span className="text-[22px]">{e.name} </span>
										<span>{e.address}</span>
										<span>{`${e.city} ${e.zipCode}`}</span>
										<p>
											Status: <span className="text-[#07BD03]">{e.status}</span>
										</p>
										{openViewModal && (
											<Modal
												onClick={setOpenViewModal}
												closeOnOutsideClick={true}
											>
												<ViewBranchModal
													info={viewBranch}
													setOpenViewModal={setOpenViewModal}
												/>
											</Modal>
										)}
									</div>
								</div>
								<div className="flex">
									<button
										onClick={() => {
											setViewBranch(e);
											setOpenViewModal(true);
										}}
										className="h-[36px] w-[80px] text-[16px] px-4 py-2 text-white bg-[#19525A] rounded-[8px] mr-4"
									>
										View
									</button>

									<button
										onClick={() => {
											setViewBranch(e);
											setIsCreateMode(false);
											setOpenCreateModal(true);
										}}
										className="h-[36px] w-[80px] text-[16px] px-4 py-2 text-white bg-[#19525A] rounded-[8px]"
									>
										Edit
									</button>
								</div>
							</div>
						);
					})}
				</div>
				{/* {isChanged && (
          <div className="fixed bottom-0 inset-x-2 ml-10 pl-5 h-12 w-[93%] bg-white rounded-lg shadow-lg p-2 items-center flex justify-between">
            <span className="">Do you want to save changes?</span>
            <div>
              <button
                type="submit"
                onClick={() => {
                  setIsChanged(false);
                  props.onCancelAction();
                  setBusinessData({ ...businessData, ...props.info?.business });
                }}
                className="w-[86px] mr-5 h-[36px] px-2 py-1 rounded-lg text-gray-600"
              >
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                onClick={() => {
                  props.updateBusinessInfo(
                    businessData,
                    props.info?.business ? props.info.business._id : null
                  );
                }}
                className="w-[86px] h-[36px] px-2 py-1 rounded-lg text-white bg-teal-700"
              >
                {props.loading ? (
                  <PulseLoader color="#ffffff" size={12} />
                ) : (
                  <span>Save</span>
                )}
              </button>
            </div>
          </div> */
				/* )} */}
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		info: state?.business?.info,
		loading: state?.business?.loading,
		// branchLoading:state?.busin
	};
};
export default connect(mapStateToProps, {
	updateBusinessInfo,
	onCancelAction,
	createBusinessBranch,
	getBusinessInfo,
})(BusinessInfo);

/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { BiSearch, BiPlus, BiDownArrow } from "react-icons/bi";
import patientsDetails from "./PatientsDetails";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import FilterAllBranch from "../../FilterAllBranch";
import FilterAllCustomers from "../../FilterAllCustomers";
import Modal from "../../Modal";
import CustomerModal from "./CustomerModal";
import AddNewCustomerModal from "./AddNewCustomerModal";
import { getBusinessInfo } from "../../../store/actions/business";
import { connect } from "react-redux";
import { getCustomers } from "../../../StatelessAPI/customerApiCalls";
import moment from "moment";
import m1 from './Images/m1.svg'
import m2 from './Images/m2.svg'
import m3 from './Images/m3.svg'
import { SlPrinter } from "react-icons/sl";
import { setMaxIdleHTTPParsers } from "http";
import { MdPlayArrow } from "react-icons/md";
import setting from './Images/settt.svg';

const patienthead = [
	"Name",
	"Status",
	"Upcomming",
	"Total booking",
	"Spending",
	"Due Balance",
	"History",
	"Settings",
];

const CustomersTable = (props) => {
	const [showmodal, setShowModal] = useState(false);
	const handleOnClose = () => setShowModal(false);
	const [openCreatModal, setOpenCreatModal] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [prev, setPrev] = useState([]);
	const _getCustomers = async () => {
		setCustomers([]);
		const fetchStaffs = await getCustomers(props.info?.business?._id);
		setCustomers([...fetchStaffs]);
		setPrev([...fetchStaffs]);
	};
	const [customerDrop, setCustomerDrop] = useState(false);
	const [settingsDrop, setSettingsDrop] = useState(false);
	const [id, setId] = useState(-1);

	const handleSearch = (e) => {
		let val = e.target.value;
		if (val.length > 0 && customers.length > 0) {
			setCustomers(
				customers.filter((c) =>
					c.name.toLowerCase().includes(val.toLowerCase())
				)
			);
		} else {
			setCustomers(prev);
		}
	};

	useEffect(() => {
		if (!props.info?.business) props.getBusinessInfo();
		_getCustomers();
	}, [props.info?.business]);

	return (
		<>
			<div className="w-100 text-white flex mt-3 ">
				<button
					onClick={() => setOpenCreatModal(true)}
					className="flex ml-auto bg-[#19525A] items-center h-10 text-center border-2 justify-center rounded-xl p-1 px-3 overflow-clip hover:ring-1"
				>
					<BiPlus className="text-xl font-bold" />
					<span className="">Invite New</span>
				</button>
			</div>
			{openCreatModal && (
				<Modal onClick={openCreatModal} closeOnOutsideClick={setOpenCreatModal}>
					<AddNewCustomerModal
						setOpenNewCustomerModal={setOpenCreatModal}
						getCustomers={_getCustomers}
						organizationId={props.info?.business?._id}
					/>
				</Modal>
			)}
			<div className="w-full bg-[#FFFFFF] mt-3 rounded-[8px] flex justify-between">
				<div className="w-[100%] shadow-lg">
					{/* seachbar and invite new patients.. */}
					<div className="w-full hidden md:flex justify-between  bg-[#E7F5FF] p-3 border-[0.5px] border-[#19525A80] rounded-[8px]">
						<div className="flex w-full">
							<div className="w-2/4 flex m-0">
								<div className="px-3 my-auto">
									<FilterAllCustomers />
								</div>
								<div className="my-auto">
									<FilterAllBranch />
								</div>
							</div>
							<div className="flex w-2/4 justify-end ">
								<div className="h-10 bg-white w-96 flex items-center my-auto justify-between border px-2 border-gray-200 rounded-3xl mr-5 hover:ring-1">
									<input
										type="text"
										placeholder="Search name..."
										className="outline-none p-1 border-0 hover:border-0 bg-white"
										onChange={handleSearch}
									/>

									<BiSearch className="text-xl font-bold" />
								</div>

								<BsThreeDotsVertical
									onClick={() => {
										setCustomerDrop((event) => {
											return !event;
										});
									}}
									className="text-2xl my-auto mr-[10px]"
								/>
								<div className="relative">
									{customerDrop === true && (
										<div
											id="dropdownDots"
											className="z-10  absolute -right-[40px] top-6 rounded-[4px] w-[140px] h-[140px]"
										>
											<div className="flex w-full ml-[73px]">
												<div
													className="w-0 h-0 
                      border-l-[5px] border-l-transparent
                      border-b-[10px] border-b-white
                      border-r-[5px] border-r-transparent shadow-left shadow-right"
												>
												</div>
											</div>
											<div className=" bg-white shadow rounded-[4px]">
												<button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"> <SlPrinter className="text-[14px] text-black my-auto" /> <p className="text-[14px] my-auto text-[#5b5b5b] ml-[6px]">Print</p></button>
												<button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"><p className="my-auto"> <Image src={m1} alt="this is an icon" className=" my-auto w-[14px] h-[12.5px]" /></p> <p className="text-[14px] text-[#5b5b5b] my-auto ml-[6px]">Export As PDF</p></button>
												<button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"><p className="my-auto"> <Image src={m3} alt="this is an icon" className=" my-auto w-[14px] h-[12.5px]" /></p><p className="text-[14px]  text-[#5b5b5b] my-auto ml-[6px]">Export As CSV</p></button>
												<button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"> <p className="my-auto"> <Image src={m2} alt="this is an icon" className=" my-auto w-[14px] h-[12.5px]" /></p> <p className="text-[14px]  text-[#5b5b5b] my-auto ml-[6px]">Export As XLS</p></button>

											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					{/* patients table... */}
					<div className="relative overflow-x-scroll mt-4  px-3 rounded-[8x]">
						<table className="w-full text-sm text-left ">
							<thead className="text-xs text-gray-700 border-b-[0.5px] mb-1 border-[#5b5b5b73]">
								<tr className="">
									{patienthead.map((theadName) => (
										<th

											className="px-3 py-2 my-auto w-[120px] first:w-[250px] text-left first:text-left  text-[16px] font-medium text-[#5b5b5b] "
										>
											<div className="flex">
												<p className="my-auto">{theadName}</p>
												{(theadName === "Status" || theadName === "Upcomming" || theadName === "Total booking" || theadName === "Spending") && (
													<div className="ml-1 mt-[2px] my-auto ">
														<MdPlayArrow className="my-0  w-[12px] h-[9px] rotate-[270deg]" />
														<BiDownArrow className="-mt-[2px] w-[11px] h-[6px] my-0 ml-[0.5px]" />
													</div>
												)}
											</div>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{customers.length > 0 &&
									customers.map((customerDeatails, index) => (
										<tr key={customerDeatails.id} className={`bg-white border-b-[0.5px] border-[#5b5b5b73] ${(index + 1 === customerDeatails.length) && 'border-b-0'}`}>
											<td className="flex p-3 text-left">
												{
													<div
														className="flex"
														onClick={() => setShowModal(true)}
													>
														<div className="flex">
															{customerDeatails?.user?.photo ? (
																<Image
																	src={customerDeatails?.user?.photo}
																	alt="patient"
																	height={40}
																	width={40}
																	className="object-cover rounded-full"
																/>
															) : (
																<div className="flex h-10 w-10 font-bold rounded-full justify-center items-center text-[18px] bg-[#5b5b5b] text-white">
																	{customerDeatails.name[0].toUpperCase()}
																</div>
															)}
														</div>
														<div className="my-auto text-left mx-3 text-[#5b5b5b]">
															<h4 className="text-[16px]">{customerDeatails.name}</h4>
															<small className="text-[10px]">
																{customerDeatails.status === "pending"
																	? "Invited on "
																	: "Joined on "}
																{moment(
																	customerDeatails.joinDate,
																	moment.ISO_8601
																).format("D MMM, YYYY")}
															</small>
														</div>
													</div>
												}
											</td>
											<td className="text-[#5b5b5b] text-left p-3 text-[14px]" >
												{customerDeatails.status === "pending"
													? "Pending"
													: "Joined"}
											</td>
											<td className="text-[#5b5b5b] text-left w-[120px] text-[14px] py-3 px-10">
												{customerDeatails.upcomming ?? "0"}
											</td>
											<td className="text-[#5b5b5b] text-[14px] w-[150px] text-left px-10 py-3">
												<Link href="/">
													<a>{customerDeatails.totalbooking ?? "0"}</a>
												</Link>
											</td>
											<td className="text-[#5b5b5b] text-[14px]  w-[120px] text-left px-6 py-3">
												{customerDeatails.spending ?? "$0.00"}
											</td>
											<td className="px-6 py-3 text-[#5b5b5b] text-[14px] w-[120px] text-left">
												{customerDeatails.duebanalance ?? "$0.00"}
											</td>
											<td className="px-6 py-3 text-[#0089C9] w-[80px] text-[14px] text-left">
												View
											</td>
											<td className="px-6 py-3 w-[100px]">
												<Image
													src={setting}
													alt="this is an icon"
													height={"25px"}
													onClick={() => {
														setId(index);
														setSettingsDrop((event) => {
															return !event;
														});
													}}
													className="text-2xl my-auto mx-3 text-[#1A535B]"
												/>
												<div className="relative">
													{(settingsDrop === true && id === index) && (
														<div
															id="dropdownDots"
															className="z-10  absolute -right-[0px] -top-2 rounded-[4px] w-[180px] h-[150px]"
														>
															<div className="flex w-full ml-[103px]">
																<div
																	className="w-0 h-0 
                      border-l-[5px] border-l-transparent
                      border-b-[12px] border-b-white
                      border-r-[5px] border-r-transparent shadow-right shadow-left "
																>
																</div>
															</div>
															<div className=" bg-white shadow rounded-[4px] w-[180px]">
																<button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"> <p className="text-[14px] my-auto text-[#5b5b5b] ml-[6px]">Send Message</p></button>
																<button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"><p className="text-[14px] text-[#5b5b5b] my-auto ml-[6px]">Send Mail</p></button>
																<button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"><p className="text-[14px]  text-[#5b5b5b] my-auto ml-[6px]">Create Due Invoice</p></button>
																<button className="px-3 py-2 flex hover:bg-gray-200 text-[#5b5b5b] w-full text-left"><p className="text-[14px]  text-[#5b5b5b] my-auto ml-[6px]">Remove</p></button>

															</div>
														</div>
													)}
												</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
						{customers.length === 0 && (
							<h1 className="text-center w-full text-xl p-2 text-gray-400 font-bold">
								No Customers Found
							</h1>
						)}
					</div>
					<CustomerModal
						visible={showmodal}
						onClose={handleOnClose}
					></CustomerModal>
				</div>
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
	getBusinessInfo,
})(CustomersTable);

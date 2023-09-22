import React, { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { connect } from "react-redux";
import { getDepartments } from "../../../store/actions/department";
import DepartmentModal from "./DepartmentModal";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import { getBranches } from "../../../StatelessAPI/branchApiCalls";
import Cookies from "js-cookie";
import axios from "../../../utils/axios";
import deleteIcon from '../../../assets/Delete 1.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Department = (props) => {
	const [departments, setDepartments] = React.useState([]);
	const [practitioner, setPractitioner] = React.useState([]);
	const [showModal, setShowModal] = useState(false);
	const [edit, setEdit] = useState(false);
	const [editDepartment, setEditDepartMent] = useState(null);
	const [selectedDept, setSelectedDept] = useState(null);
	const [branches, setBranches] = useState([]);
	const [confirmationModal, setShowConfirmationModel] = useState(false);
	useEffect(() => {
		props.getDepartments();
	}, []);

	useEffect(() => {

		if (props.departments) {
			setDepartments(props.departments?.data?.doc || []);
			setPractitioner(props.departments?.practitioners || []);
			setBranches(props.departments?.branches || []);
		}

	}, [props]);
	const toastShow = (err, str) => {
		toast[err](str, {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}

	const deleteHandler = async () => {
		try {
			const response = await axios.delete(`/department/${selectedDept}`, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
			});
			// console.log(response.data);
			if (response.data.status == "success") {
				props.getDepartments();
				setShowConfirmationModel(false);
				toastShow('success', 'Department delete successfully')
			} else {
				//something went wrong
				toastShow('error', 'something went wrong')
			}
		} catch (err) {
			toastShow('error', err?.response?.data.message)
		}
	};

	const editHandler = (e) => {
		const departmentId = e.target.parentNode.parentNode.getAttribute("data-id");

		setEditDepartMent(
			departments.filter((item) => item._id == departmentId)[0]
		);
		setEdit(true);
		setShowModal(true);
	};
	// console.log(departments);
	return (
		<>
			<div>
				<div className="flex justify-between mt-3">
					<span className="text-[#5B5B5B] text-[32px] font-[700]">
						Department
					</span>
					<button
						className="text-[18px] px-6 py-2 bg-[#19525A] text-white rounded-[10px]"
						type="button"
						onClick={() => setShowModal(true)}
					>
						New Department
					</button>
					{showModal && (
						<DepartmentModal
							practioners={practitioner}
							setShowModal={setShowModal}
							branches={branches}
							edit={edit}
							setEdit={setEdit}
							department={editDepartment}
						/>
					)}
					{confirmationModal && (
						<ConfirmationModal
							title={"Delete Department"}
							message={"Are you sure you want to delete this department ?"}
							onConfirm={() => {
								deleteHandler();
							}}
							onCancel={() => {
								setShowConfirmationModel(false);
							}}
							setShowModal={setShowConfirmationModel}
						/>
					)}
				</div>
				{/* 1st div */}
				{departments?.length == 0 ? (
					<div className="mr-5 h-[50vh] ml-2 flex justify-center items-center text-center text-3xl font-bold text-gray-500">
						No Department found
					</div>
				) : (
					<div className="w-full bg-white mt-5 shadow-lg rounded-[8px]">
						<div className="p-4  border-b-[2px] border-gray-400">
							<p className="text-[16px] text-[#5B5B5B]">
								Department is a distinct part of your organization where similar
								services or activities are arranged together. You can easily set
								up your online booking page using the departments as well as
								control and manage by using different practitioners and staff
								members.
							</p>
						</div>
						{departments?.map((department, idx) => {
							return (
								<div
									className="flex flex-row p-[20px] border-b-[1px] border-[#7676764D]"
									key={idx}
									data-id={department._id}
								>
									<div className="mx-[20px] w-[180px] h-[120px] flex items-center justify-start">
										{department.coverOrIcon ? (
											<Image
												src={department.coverOrIcon}
												alt="departmentCoverIcon"
												width={180}
												height={120}
											/>
										) : (
											<div className="flex items-center justify-center w-[100px] h-[100px] rounded-full bg-[#C4DBCC] 
                       text-[#000] text-center align-middle">
												<p>{department.name[0]}</p>
											</div>
										)}
									</div>
									<div className="grow mt-[3px]">
										<p className="text-[#195947] text-[20px] leading-[30px] font-[400]">
											{department.name}
										</p>
										<p className="text-[#5B5B5B] text-[16px] leading-[24px] font-[400]">
											{department.practitioners?.length ?? 0} practitioner
										</p>
										<p className="text-[#5B5B5B] text-[16px] leading-[24px] font-[400]">
											Online Booking :{" "}
											{department.allowOnlineBooking ? (
												<span className="text-[#19525A]">Enable</span>
											) : (
												<span className="text-[#f43f5e]">Disable</span>
											)}
										</p>
										<p className="text-[#5B5B5B] text-[16px] leading-[24px] font-[400]">
											Status:{" "}
											{department.status == "Active" ? (
												<span className="text-[#19525A]">Active</span>
											) : (
												<span className="text-[#f43f5e]">Inactive</span>
											)}
										</p>
									</div>
									<div className="flex flex-row justify-center items-center">
										<button
											className="inline w-[100px] h-[36px] text-center bg-[#19525A] text-[#fff] text-[16px] leading-[24px] rounded-[8px] mr-[20px]"
											onClick={editHandler}
										>
											Edit
										</button>
										<button
											className="h-[36px]  text-rose-600"
											onClick={() => {
												setSelectedDept(department._id)
												setShowConfirmationModel(true);
											}}
										>
											<Image
												src={deleteIcon}
												width='22'
												height='28'
												alt="deleteImg"
											/>
										</button>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
			<ToastContainer />
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		departments: state?.department?.info,
		loading: state?.department?.loading,
	};
};
export default connect(mapStateToProps, {
	getDepartments,
})(Department);


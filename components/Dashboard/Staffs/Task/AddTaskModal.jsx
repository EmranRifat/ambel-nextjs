import React, { useEffect, useState } from "react";
import { bytesToSize } from "../../../../utils/utility";
import { uploadAFile } from "../../../../utils/fileUpload";
import { AiOutlineCheckCircle } from "react-icons/ai";
import DropDownWithId from "../../../Dropdown/DropDownId";
import { connect } from "react-redux";
import cookie from "js-cookie";

import {
	getTask,
	onCancelAction,
	taskUpdate,
} from "../../../../store/actions/task";
import axios from "../../../../utils/axios";
import MultiSelectDropdown from "../../../Dropdown/MultiSelectDropdown";
import { getEmployees } from "../../../../StatelessAPI/staffApiCall";

const AddTaskModal = (props) => {
	const [takeInput, setTakeInput] = useState("");
	const [allEmployee, setallEmploye] = useState([]);
	const [checkTask, setCheckTask] = useState(false);
	const [checkDes, setCheckDes] = useState(false);
	const [message, setMessage] = useState("");
	const [percentage, setPercentage] = useState(0);
	const [uploadingCover, setUploadingCover] = useState(false);
	const [uploadingPhoto, setUploadingPhoto] = useState(false);
	const [taskData, setTaskData] = React.useState({
		name: "",
		description: "",
		cover: "",
		status: "processing",
		privacy: [],
		dueDate: "",
		taskList: "",
		tasks: [
			// {
			//   text: "",
			//   completed: false,
			//   files: [],
			// },
		],
	});

	const onFileUploadOnStorage = async (event, folder) => {
		if (event.target.files.length > 0) {
			if (parseInt(bytesToSize(event.target.files[0].size)) > 2)
				return alert("Max file size limit error.");

			try {
				if (folder === "cover") {
					setUploadingCover(true);
				} else {
					setUploadingPhoto(true);
				}
				uploadAFile({
					fileName: "image",
					folder: `${taskData?.name}/${folder}`,
					file: event.target.files[0],
					onProgress: (progress) => setPercentage(progress),
					onSetDownloadUrl: (url) => {
						// console.log(url);
						onChangeValue({
							target: {
								name: "cover",
								value: url,
							},
						});
						setPercentage(0);
						if (folder === "coverPhoto") {
							setUploadingCover(false);
						} else {
							setUploadingPhoto(false);
						}
					},
				});
			} catch (error) {
				// console.log(error);
				setMessage(error.response.data.message);
			}
		}
	};

	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setTaskData({
			...taskData,
			[name]: value,
		});
	};

	const allEmployess = async () => {
		const res = await getEmployees(props.business._id);
		// console.log(res);
		setallEmploye(res);
	};
	useEffect(() => {
		getHasRoleStaff();
		allEmployess();
		// props.getTask();
	}, []);

	const getHasRoleStaff = async () => {
		const res = await axios.get("staff/hasrolestaff", {
			withCredentials: true,
			headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
		});
		if (res.data.status === "success") {
			// console.log(res.data.data);
			setTaskData({
				...taskData,
				privacy: res.data.data,
			});
		} else {
			// console.log("error");
		}
	};



	const privacyEmployee = allEmployee.length > 0 && allEmployee.map((emp) => emp !== null && ({
		id: emp._id,
		name: emp.fullName,
	}));

	const addNewTask = () => {
		if (!taskData.name) {
			setCheckTask(true);
			return;
		}
		if (!taskData.description) {
			setCheckDes(true);
			return;
		}
		props
			.taskUpdate(taskData, props.task ? props.task?._id : null)
			.then((res) => {
				// console.log(res);
				props.getTask();
				props.setOpenTaskModal(false);
			});
	};

	return (
		<>
			<div className="max-w-[440px] lg:min-w-[440px] absolute top-10 left-[35%] flex flex-col items-center bg-white py-2 rounded-md">
				<div className="w-full flex justify-end items-start">
					<span
						onClick={() => props.setOpenTaskModal(false)}
						className="text-2xl text-[#5B5B5B] cursor-pointer mr-3"
					>
						✖
					</span>
				</div>
				{/* all fields... */}
				<div className="w-full flex border-b-[1px] border-[#76767680] justify-center text-[#19525A] text-[20px] pb-3">
					<span>Add New Task</span>
				</div>
				<div className="w-full flex flex-col justify-center items-center p-3">
					<div className="flex flex-col">
						<span className="text-[16px] text-[#5B5B5B]">Task Name</span>
						<input
							type="text"
							name="name"
							onChange={(e) =>
								setTaskData({ ...taskData, name: e.target.value })
							}
							className={`w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] ${checkTask ? "border-rose-600" : "border-[#19525A80]"
								} mt-1 rounded-md shadow-lg`}
						/>
					</div>
					<div className="flex flex-col mt-4">
						<span className="text-[16px] text-[#5B5B5B]">Description</span>
						<textarea
							name="description"
							onChange={(e) =>
								setTaskData({ ...taskData, description: e.target.value })
							}
							className={`w-[410px] h-[86px] text-[16px] px-2 outline-none border-[1px] ${checkDes ? "border-rose-600" : "border-[#19525A80]"
								} mt-1 rounded-md shadow-lg`}
						/>
					</div>
					<div className="flex justify-around items-center mt-5 px-3">
						<div className="flex flex-col ">
							<span className="text-[#5B5B5B] text-[16px]">Add cover</span>
							<label className="w-[182px] shadow-md h-[40px] text-[20px] mt-1 border-[1px] border-[#19525A80] px-1 py-2 flex flex-col items-center bg-white rounded-lg cursor-pointer hover:bg-gray-400 hover:text-white">
								<span className="text-[15px] text-[#5B5B5BB2]">
									Upload cover image
								</span>
								<input
									id={"coverPhoto"}
									type="file"
									name={"coverPhoto"}
									accept=".png,.jpg,.jpeg"
									onChange={(event) => onFileUploadOnStorage(event, "cover")}
									className="hidden"
								/>
							</label>
						</div>
						<div className="w-full flex flex-col p-5">
							<p className="text-[16px] text-[#5B5B5B]">Privacy</p>
							<MultiSelectDropdown
								items={privacyEmployee}
								selectedList={taskData.privacy}
								itemName="Privacy"
								onSelectedItem={(selected) => {
									if (!taskData.privacy.includes(selected)) {
										let newValue = taskData.privacy;
										newValue.push(selected);
										onChangeValue({
											target: {
												name: "privacy",
												value: newValue,
											},
										});
									} else {
										let newValue = taskData.privacy;
										newValue.splice(newValue.indexOf(selected), 1);
										onChangeValue({
											target: {
												name: "privacy",
												value: newValue,
											},
										});
									}
								}}
								width={"182px"}
							/>
						</div>
					</div>
					<div className="w-full flex justify-around mt-5">
						<div className="flex flex-col items-start">
							<span className="text-[#5B5B5B] text-[16px] ml-3">Status</span>
							<DropDownWithId
								items={[
									{ name: "In processing", id: "processing" },
									{ name: "In revision", id: "revision" },
									{ name: "Completed", id: "completed" },
								]}
								selected={taskData.status}
								onSelected={(selected) => {
									onChangeValue({
										target: {
											name: "status",
											value: selected,
										},
									});
								}}
								width={"182px"}
							/>
						</div>
						<div className="flex flex-col items-start">
							<span className="text-[#5B5B5B] text-[16px] ml-3">Due Date</span>
							<input
								onChange={(e) =>
									setTaskData({ ...taskData, dueDate: e.target.value })
								}
								type="date"
								className="w-[182px] h-[40px] px-2 text-[#5B5B5BB2] outline-none border-[.5px] border-[#19525A80] rounded-md shadow-sm"
							/>
						</div>
					</div>
					<div className="w-full flex flex-col items-start px-5 mt-3">
						{taskData.tasks.length > 0 &&
							taskData.tasks.map((task, index) => (
								<div
									key={index}
									className="flex justify-start items-center gap-2"
								>
									<AiOutlineCheckCircle className="text-[#5B5B5BB2]" />
									<span className="">{task.text}</span>
								</div>
							))}
					</div>
					<div className="h-[90px] w-[410px] flex flex-col  mt-5 px-3 py-1 border-[.5px] rounded-md">
						<div className="w-[410px] flex items-center justify-start gap-2 p-2">
							<AiOutlineCheckCircle className="text-[#5B5B5BB2]" />
							<input
								value={takeInput}
								onChange={(e) => setTakeInput(e.target.value)}
								onKeyDown={(event) => {
									if (event.key == "Enter") {
										setTaskData((prevState) => {
											const newObj = {
												// @ts-ignore
												text: event.target.value,
												completed: false,
												files: [],
											};
											const newArray = prevState.tasks;
											newArray.push(newObj);
											setTakeInput("");
											return { ...prevState, tasks: newArray };
										});
									}
								}}
								type="text"
								placeholder="write a task"
								className="outline-none text-[14px] w-[380px]"
							/>
						</div>
					</div>
					<div className="w-full flex justify-end items-end px-3 mt-16">
						<button
							onClick={() => {
								props.onCancelAction();
								props.setOpenTaskModal(false);
							}}
							className="h-[32px] w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
						>
							Cancel
						</button>
						<button
							onClick={addNewTask}
							className="h-[32px] w-[80px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state?.task?.loading,
		task: state?.task,
		business: state?.business?.info?.business,
	};
};
export default connect(mapStateToProps, {
	taskUpdate,
	onCancelAction,
	getTask,
})(AddTaskModal);

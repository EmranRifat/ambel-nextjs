import { useState, useRef, useEffect, Fragment } from "react";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import { bytesToSize } from "../../utils/utility";
import Account from "./components/steps/Account";
import About from "./components/steps/About";
import FinishUp from "./components/steps/FinishUp";
import axios from "../../utils/axios";
import { RiArrowDropDownLine } from "react-icons/ri";
import { connect } from "react-redux";
import { upadateBusiness } from "../../store/actions/business";
import { uploadAFile } from "../../utils/fileUpload";

function Profile(props) {
	const [currentStep, setCurrentStep] = useState(1);
	const [open, setOpen] = useState(false);
	const [type, setUserType] = useState("User or Member");
	const taskDeadlineRef = useRef();
	const [userData, setUserData] = useState({
		"User or Member": {
			userName: "",
			address: "",
			country: "",
			city: "",
			zipCode: "",
			phoneNumber: "",
			gender: "",
			userRole: "user",
			photo: "",
		},
		Practitioner: {
			professionType: "",
			businessEmail: "",
			businessPhoneNumber: "",
			availability: "",
			fieldOfStudy: "",
			institute: "",
			areaOfPractice: "",
			licenseNumber: "",
			degree: [
				{
					id: 0,
					name: "",
					institute: "",
					passingYear: "",
				},
			],
			certifications: [],
			logo: "",
			banner: "",
		},
		Organization: {
			name: "",
			description: "",
			location: "",
			phone: "",
			email: "",
			website: "",
			businessType: "",
			practiceType: "",
			ownerRole: "",
			logo: "",
			banner: "",
		},
	});

	useEffect(() => {
		if (props.info?.user?.userType) setUserType(props.info?.user?.userType);
		if (props.info?.business) {
			setUserData({
				...userData,
				[types[0]]: {
					...userData[types[0]],
					...props.info.user,
				},
				[types[2]]: {
					...userData[types[2]],

					// ...props.info.user,
					...props.info.business,
				},
			});
		}
	}, [props.info]);

	// console.log(props.info?.user);
	// console.log(userData)

	const [message, setMessage] = useState("");
	const [percentage, setPercentage] = useState(0);
	const [temp, setTemp] = useState("");

	const onClickSelect = (type) => {
		if (type === "User or Member" || type === "User/Member") setCurrentStep(1);
		setOpen(false);
		setUserType(type);
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, false);

		return () => {
			document.removeEventListener("click", handleClickOutside, false);
		};
	});

	const handleClickOutside = (event) => {
		if (
			taskDeadlineRef.current &&
			// @ts-ignore
			!taskDeadlineRef.current.contains(event.target)
		) {
			setOpen(false);
		}
	};

	const onChangeUserData = (event, type) => {
		const { name, value } = event;
		setUserData({ ...userData, [type]: { ...userData[type], [name]: value } });
	};

	// const onFileChange = async (event, category, type) => {
	// 	const data = { ...userData[type] };
	// 	if (parseInt(bytesToSize(event.target.files[0].size)) > 2)
	// 		return alert("Max file size limit error.");

	// 	try {
	// 		const response = await onFileUpload(
	// 			data,
	// 			[event.target.files[0]],
	// 			category
	// 		);
	// 		data[category] = response.data.files[0];
	// 		setUserData({ ...userData, [type]: data });
	// 		setPercentage(0);
	// 	} catch (error) {
	// 		setMessage(error.response.data.message);
	// 	}
	// };

	// console.log(userData["User or Member"].photo);

	const onFileUploadOnStorage = async (event, folder, type) => {
		if (parseInt(bytesToSize(event.target.files[0].size)) > 2)
			return alert("Max file size limit error.");

		try {
			uploadAFile({
				fileName: "image",
				folder: `${userData["User or Member"].userName}/${folder}`,
				file: event.target.files[0],
				onProgress: (progress) => setPercentage(progress),
				onSetDownloadUrl: (url) => {
					// console.log(url);
					onChangeUserData(
						{
							name: event.target.name,
							value: url,
						},
						type
					);
					setPercentage(0);
				},
			});
		} catch (error) {
			// console.log(error);
			setMessage(error.response.data.message);
		}
	};

	const getFilesObject = (fileObject, existingFile) => {
		const files = new FormData();
		for (let i = 0; i < fileObject.length; i++) {
			files.append("files", fileObject[i]);
		}
		files.append("existing", existingFile);

		return files;
	};

	const onFileUpload = async (data, file, category) => {
		const url = "/file-upload/user-files";

		return await axios.post(
			url,
			getFilesObject(file, data ? data[category] : ""),
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: (progressEvent) => {
					const { loaded, total } = progressEvent;
					setPercentage(
						parseInt(Math.round((loaded * 100) / total).toString())
					);
					setTemp(category);
				},
			}
		);
	};

	const onCertificateFileChange = async (event) => {
		const files = [];
		const data = { ...userData["Practitioner"] };

		for (let i = 0; i < event.target.files.length; i++) {
			if (parseInt(bytesToSize(event.target.files[0].size)) > 20)
				return alert("Max file size limit error.");
			files.push(event.target.files[i]);
		}

		try {
			const response = await onFileUpload("", files, "");

			const uploadedFiles = [];
			response.data.files.map((file) =>
				uploadedFiles.push({
					name: file.split("-")[1],
					url: file,
				})
			);

			data.certifications = [...uploadedFiles, ...data.certifications];
			setUserData({ ...userData, ["Practitioner"]: data });
			setPercentage(0);
			setMessage(response.data.message);
			currentSetTimeout();
			goToTop();
		} catch (error) {
			setMessage(error.response.data.message);
			goToTop();
		}
	};

	const removeCertificate = async (fileUrl) => {
		const data = { ...userData["Practitioner"] };

		data.certifications = data.certifications.filter(
			(certificate) => certificate.url !== fileUrl
		);

		try {
			const url = "/file-upload/remove-files";
			const response = await axios.post(
				url,
				{ filePath: fileUrl },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setUserData({ ...userData, ["Practitioner"]: data });
			setMessage(response.data.message);
			currentSetTimeout();
			goToTop();
		} catch (error) {
			setMessage(error.response.data.message);
			goToTop();
		}
	};

	const addNewDegree = () => {
		const professionalist = { ...userData.Practitioner };
		professionalist["degree"].push({
			id: professionalist.degree.length + 1,
			name: "",
			institute: "",
			passingYear: "",
		});
		setUserData({ ...userData, Practitioner: professionalist });
	};

	const handleDegreeChange = (event, i) => {
		const professionalist = { ...userData.Practitioner };
		professionalist["degree"][i][event.target.name] = event.target.value;
		setUserData({ ...userData, Practitioner: professionalist });
	};

	const removeDegree = (id) => {
		const professionalist = { ...userData.Practitioner };
		professionalist["degree"] = professionalist["degree"].filter(
			(degree) => degree.id !== id
		);
		setUserData({ ...userData, Practitioner: professionalist });
	};

	const steps = ["About", "Acount Info", "Finish up"];
	const types = ["User or Member", "Practitioner", "Organization"];

	const displayStep = (step) => {
		switch (step) {
			case 1:
				return (
					<About
						onChangeUserData={(event) =>
							onChangeUserData(event, "User or Member")
						}
						userData={userData["User or Member"]}
						onFileChange={(event, category) =>
							onFileUploadOnStorage(event, category, "User or Member")
						}
						percentage={percentage}
						temp={temp}
					/>
				);
			case 2:
				return (
					<Account
						userType={type}
						onChangeUserData={(event) => onChangeUserData(event, type)}
						userData={userData[type]}
						onFileChange={(event, category) =>
							onFileUploadOnStorage(event, category, type)
						}
						onCertificateFileChange={onCertificateFileChange}
						removeCertificate={removeCertificate}
						addNewDegree={addNewDegree}
						removeDegree={removeDegree}
						handleDegreeChange={handleDegreeChange}
						percentage={percentage}
						temp={temp}
					/>
				);
			case 3:
				return (
					<FinishUp
						uploadForm={() => {
							goToTop();
							props.upadateBusiness(
								type,
								userData,
								props.info?.business ? props.info.business._id : null
							);
						}}
						loading={props.loading}
					/>
				);
			default:
		}
	};

	const handleClick = (direction) => {
		let newStep = currentStep;
		// console.log(direction);

		if (
			(type === "User or Member" || type === "User/Member") &&
			currentStep === 1
		) {
			newStep = 3;
		} else {
			if (direction === "done" || direction === "next") {
				newStep++;
			} else {
				newStep--;
			}
		}

		const { userName } = userData["User or Member"];
		const { professionType, businessEmail, businessPhoneNumber } =
			userData.Practitioner;
		const {
			name,
			description,
			address,
			phone,
			email,
			practiceType,
			ownerRole,
		} = userData.Organization;

		let temp = true;

		if ((!userName || userName.length < 6) && currentStep === 1) {
			setMessage("Please fill up all fields correctly.");
			temp = false;
		} else if (currentStep === 2 && direction === "done") {
			if (
				type === "Organization" &&
				(!name ||
					!description ||
					!location ||
					!phone ||
					!email ||
					!practiceType ||
					!ownerRole)
			) {
				setMessage("Please fill up all fields correctly.");
				temp = false;
				return;
			}
			if (
				(!professionType || !businessEmail || !businessPhoneNumber) &&
				type === "Practitioner"
			) {
				// console.log(professionType, businessEmail, businessPhoneNumber);
				setMessage("Please fill up all fields correctly.");
				temp = false;
				return;
			}
		}
		currentSetTimeout();
		if (temp) newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
	};

	const currentSetTimeout = () => {
		setTimeout(() => {
			setMessage("");
		}, 5000);
	};

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="mx-auto w-full sm:w-2/3">
			<div className="horizontal container mt-10">
				<div className="text-center py-4 px-2">
					<h2 className="text-3xl font-medium">Build Your Profile</h2>
					<p className="text-gray-400 text-xl">
						This information let us know more about you
					</p>
				</div>
				{type !== "User or Member" && type !== "User/Member" && (
					<Stepper steps={steps} currentStep={currentStep} />
				)}

				<div className="relative my-5 p-10 bg-white border-2 border-gray-300 rounded-md mt-12">
					{message && (
						<div className="shadow bottom-5 right-[40%] p-3 bg-gray-100 text-indigo-600 rounded-md">
							{message}
						</div>
					)}
					{currentStep !== 3 && (
						<Fragment>
							<h2 className="text-gray-600 text-xl text-center">
								Please select your account type.
							</h2>

							<div className="my-3 flex justify-center relative">
								<button
									onClick={(_) => setOpen(!open)}
									className="text-gray-500 bg-blue-700 focus:ring-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded border border-gray-400 text-sm px-5 py-2 text-center inline-flex items-center"
									type="button"
								>
									{type}
									<RiArrowDropDownLine className="ml-2 w-6 h-6" />
								</button>
								{open && (
									<div className="absolute z-50 bg-white divide-y mt-10 w-40 divide-gray-100 rounded shadow">
										<ul className="py-1 text-sm text-gray-700">
											{types.map((type, i) => {
												return (
													<li key={i} onClick={(_) => onClickSelect(type)}>
														<a
															href="#"
															className="block px-4 py-2 hover:bg-gray-100"
														>
															{type}
														</a>
													</li>
												);
											})}
										</ul>
									</div>
								)}
							</div>
						</Fragment>
					)}
					<form>
						{displayStep(currentStep)}
						{currentStep !== steps.length && (
							<StepperControl
								handleClick={handleClick}
								currentStep={currentStep}
								steps={steps}
								userType={type}
							/>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		info: state.business?.info,
		loading: state.business.loading,
	};
};

export default connect(mapStateToProps, { upadateBusiness })(Profile);

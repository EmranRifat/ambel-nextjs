import Image from "next/image";
import { title } from "process";
import React, { useRef, useState } from "react";
import { getAllCountries } from "../../../utils/int_phone_code";
import Dropdown from "../../Dropdown";
import { PulseLoader } from "react-spinners";
import { AiFillFileAdd } from "react-icons/ai";
import practitioner from "../../../store/reducers/practitioner";
import { State } from "country-state-city";
import { connect } from "react-redux";
import cookie from "js-cookie";
import axios from "../../../utils/axios";
import { uploadAFile } from "../../../utils/fileUpload";
import { async } from "@firebase/util";
import { getPractitionerInfo } from "../../../store/actions/practitioner";

const PractitionerLeftSide = ({ practitioner, getPractitionerInfo }) => {
	// console.log(practitioner.practitioner);
	const [isEducationDivOpen, setIsEducationDivOpen] = useState(false);
	const [isCertificatesDivOpen, setIsCertificatesDivOpen] = useState(false);
	const [isLoadingEducation, setIsLoadingEducation] = useState(false);
	const [isLoadingCertificates, setIsLoadingCertificates] = useState(false);
	const [errorEducation, setErrorEducation] = useState("");
	const [errorCertificate, setErrorCertificate] = useState("");
	const [editEducationMode, setEditEducationMode] = useState(false);
	const [editCertificateMode, setEditCertificateMode] = useState(false);
	const [fileUrl, setFileUrl] = useState("");
	const [fileName, setFileName] = useState("");
	const scrollToCertificate = useRef(null);
	const scrollToEducation = useRef(null);
	const [education, setEducation] = useState({
		_id: "",
		country: "Country of School/College/University",
		institute: "",
		title: "Title",
		subject: "",
		passingYear: "Year of graduation",
	});
	const [certificate, setCertificate] = useState({
		_id: "",
		name: "",
		from: "",
		receivingYear: "Receiving year",
		file: null,
	});
	const getLast100years = () => {
		let currentYear = new Date();
		// @ts-ignore
		currentYear = currentYear.getFullYear();
		let last100year = Array.from({ length: 101 }, (_, i) => i + 1).map(
			(item, index) => {
				// @ts-ignore
				return (currentYear - index).toString();
			}
		);
		// console.log(last100year);
		return last100year;
	};

	const educationSaveHandler = async () => {
		setIsLoadingEducation(true);
		if (
			education.country == "Country of School/College/University" ||
			!education.institute ||
			education.passingYear == "Year of graduation" ||
			!education.subject ||
			education.title == "Title"
		) {
			setErrorEducation("Please Fill all fields");
			setIsLoadingEducation(false);
			return;
		}
		try {
			// console.log(practitioner._id);
			let response;
			if (!editEducationMode) {
				response = await axios.put(
					`/practitioner/${practitioner.practitioner._id}`,
					{
						$push: {
							educations: {
								country: education.country,
								institute: education.institute,
								title: education.title,
								subject: education.subject,
								passingYear: education.passingYear,
							},
						},
					},
					{
						headers: {
							Authorization: `Bearer ${cookie.get("jwt")}`,
							"content-type": "application/json",
						},
					}
				);
			} else {
				const reqBody = {
					query: {
						_id: practitioner.practitioner._id,
						"educations._id": education._id,
					},
					update: {
						$set: {
							"educations.$": {
								country: education.country,
								institute: education.institute,
								title: education.title,
								subject: education.subject,
								passingYear: education.passingYear,
							},
						},
					},
				};
				// console.log(education, reqBody);
				response = await axios.post("/practitioner/updatebyquery", reqBody, {
					headers: {
						Authorization: `Bearer ${cookie.get("jwt")}`,
						"content-type": "application/json",
					},
				});
				console.log(response);
			}

			// console.log(response.data);
			if (response.data.status == "success") {
				setIsEducationDivOpen(false);
				setEducation({
					_id: "",
					country: "Country of School/College/University",
					institute: "",
					title: "Title",
					subject: "",
					passingYear: "Year of graduation",
				});
				setErrorEducation("");
				setEditEducationMode(false);
				getPractitionerInfo();
			} else {
				setErrorEducation("Something Went Wrong. Try Later");
			}
		} catch (err) {
			// console.log(err);
			setErrorEducation("Something Went Wrong. Try Later");
		}
		setIsLoadingEducation(false);
	};

	const certificatesSaveHandler = async () => {
		if (
			!certificate.file ||
			!certificate.from ||
			!certificate.name ||
			certificate.receivingYear == "Receiving year"
		) {
			setErrorCertificate("Please fill all fields");
			return;
		}
		setIsLoadingCertificates(true);
		const selectedFile = certificate.file;
		const fileName = selectedFile.name;
		if (!editCertificateMode) {
			try {
				uploadAFile({
					fileName: `${fileName}`,
					folder: "practitionerCertificates",
					file: selectedFile,
					uploadAsString: false,
					onProgress: (progress) => { },
					onSetDownloadUrl: (url) => {
						// console.log(url);
						setFileUrl(url);
						// console.log(
						//   decodeURI(url.split("/")[7].split("?alt=")[0]).split(
						//     "practitionerCertificates%2F"
						//   )[1]
						// );
						setFileName(
							decodeURI(url.split("/")[7].split("?alt=")[0]).split(
								"practitionerCertificates%2F"
							)[1]
						);
					},
				});
				// console.log("file uploaded");
			} catch (error) {
				// console.log(error);
				// setMessage(error.response.data.message);
				setErrorCertificate("File uploading problem. Try again or later");
				setIsLoadingCertificates(false);
				return;
			}

			try {
				const response = await axios.put(
					`/practitioner/${practitioner?.practitioner._id}`,
					{
						$push: {
							certificatesOrAwards: {
								name: certificate.name,
								from: certificate.from,
								receivingYear: certificate.receivingYear,
								file: fileUrl,
							},
						},
					},
					{
						headers: {
							Authorization: `Bearer ${cookie.get("jwt")}`,
							"content-type": "application/json",
						},
					}
				);
				if (response.data.status == "success") {
					setIsCertificatesDivOpen(false);
					setErrorCertificate("");
					setCertificate({
						_id: "",
						name: "",
						from: "",
						receivingYear: "Receiving year",
						file: null,
					});
					getPractitionerInfo();
				} else {
					setErrorCertificate("Something Went Wrong. Try Later");
				}
			} catch (err) {
				// console.log(err);
				// setMessage(error.response.data.message);
				setErrorCertificate("Something went wrong. Try again");
			}
		} else {
			try {
				uploadAFile({
					fileName: `${fileName}`,
					folder: "practitionerCertificates",
					file: selectedFile,
					uploadAsString: false,
					onProgress: (progress) => { },
					onSetDownloadUrl: (url) => {
						// console.log(url);
						setFileUrl(url);
						setFileName(
							decodeURI(url.split("/")[7].split("?alt=")[0]).split(
								"practitionerCertificates%2F"
							)[1]
						);
					},
				});
				// console.log("file uploaded");
			} catch (error) {
				// console.log(error);
				// setMessage(error.response.data.message);
				setErrorCertificate("File uploading problem. Try again or later");
				setIsLoadingCertificates(false);
				return;
			}
			try {
				const reqBody = {
					query: {
						_id: practitioner.practitioner._id,
						"certificatesOrAwards._id": certificate._id,
					},
					update: {
						$set: {
							"certificatesOrAwards.$": {
								name: certificate.name,
								from: certificate.from,
								receivingYear: certificate.receivingYear,
								file: fileUrl,
							},
						},
					},
				};

				const response = await axios.post(
					`/practitioner/updatebyquery`,
					reqBody,
					{
						headers: {
							Authorization: `Bearer ${cookie.get("jwt")}`,
							"content-type": "application/json",
						},
					}
				);
				if (response.data.status == "success") {
					setIsCertificatesDivOpen(false);
					setErrorCertificate("");
					setCertificate({
						_id: "",
						name: "",
						from: "",
						receivingYear: "Receiving year",
						file: null,
					});
					setEditCertificateMode(false);
					getPractitionerInfo();
				} else {
					setErrorCertificate("Something Went Wrong. Try Later");
				}
			} catch (err) {
				// console.log(err);
				// setMessage(error.response.data.message);
				setErrorCertificate("Something went wrong. Try again");
			}
		}

		setIsLoadingCertificates(false);
	};

	const deleteEducationHandler = async (event) => {
		const itemId =
			event.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
				"data-id"
			);
		try {
			const response = await axios.put(
				`/practitioner/${practitioner.practitioner._id}`,
				{
					$pull: {
						educations: {
							_id: itemId,
						},
					},
				},
				{
					headers: {
						Authorization: `Bearer ${cookie.get("jwt")}`,
						"content-type": "application/json",
					},
				}
			);
			if (response.data.status == "success") {
				getPractitionerInfo();
			} else {
				// console.log("failed to delete education item");
			}
		} catch (err) {
			// console.log(err);
		}
	};

	const deleteCertificateHandler = async (event) => {
		const itemId =
			event.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
				"data-id"
			);
		try {
			const response = await axios.put(
				`/practitioner/${practitioner.practitioner._id}`,
				{
					$pull: {
						certificatesOrAwards: {
							_id: itemId,
						},
					},
				},
				{
					headers: {
						Authorization: `Bearer ${cookie.get("jwt")}`,
						"content-type": "application/json",
					},
				}
			);
			if (response.data.status == "success") {
				getPractitionerInfo();
			} else {
				// console.log("failed to delete education item");
			}
		} catch (err) {
			// console.log(err);
		}
	};

	const editEducationHandler = (event) => {
		const itemId =
			event.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
				"data-id"
			);
		scrollToEducation?.current?.focus();
		setIsEducationDivOpen(true);
		setEditEducationMode(true);
		// console.log(
		//   practitioner.practitioner.educations.filter(
		//     (item) => item._id == itemId
		//   )[0]
		// );

		setEducation({
			...practitioner.practitioner.educations.filter(
				(item) => item._id == itemId
			)[0],
		});
	};

	const editCertificateHandler = (event) => {
		const itemId =
			event.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
				"data-id"
			);
		scrollToCertificate?.current?.focus();
		setIsCertificatesDivOpen(true);
		setEditCertificateMode(true);

		setFileName(
			decodeURI(
				practitioner.practitioner.certificatesOrAwards
					.filter((item) => item._id == itemId)[0]
					?.file?.split("/")[7]
					.split("?alt=")[0]
			).split("practitionerCertificates%2F")[1]
		);
		setCertificate({
			...practitioner.practitioner.certificatesOrAwards.filter(
				(item) => item._id == itemId
			)[0],
		});
	};

	return (
		<React.Fragment>
			<div className="flex flex-col">
				<div className="w-[400px] flex flex-col border-2 border-gray-300 rounded-md shadow-md">
					<div className="w-full border-b-2 border-gray-300 flex  justify-between  p-2  px-5">
						<span className="text-[#5B5B5B] text-[20px] font-[500]">
							Education
						</span>
						{editEducationMode ? (
							<button className="text-[#0372BA] text-[16px]">Edit</button>
						) : (
							<button
								className="text-[#0372BA] text-[16px]"
								onClick={() => {
									if (isEducationDivOpen) return;
									setIsEducationDivOpen(true);
									setIsLoadingEducation(false);
								}}
							>
								Add New
							</button>
						)}
					</div>

					<div className="w-full flex flex-col items-center justify-center">
						{isEducationDivOpen && (
							<div className="w-full flex flex-col items-center justify-center  mt-4">
								<Dropdown
									width={"367px"}
									items={getAllCountries().map((item) => item.name)}
									selected={education.country}
									onSelected={(selected) => {
										// onChangeValue({
										//   target: { name: "lang", value: selected },
										// });
										setErrorEducation("");
										setEducation((prevState) => {
											return {
												...prevState,
												country: selected,
											};
										});
									}}
								/>

								<input
									type="text"
									// name={props.name}
									ref={scrollToEducation}
									onChange={(e) => {
										setEducation((prevState) => {
											return {
												...prevState,
												institute: e.target.value,
											};
										});
										setErrorEducation("");
									}}
									value={education.institute}
									required
									placeholder="School/College/University Name"
									className="text-[14px] w-[367px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400 mt-4"
								/>

								<div className="w-full flex justify-between items-center px-3 mt-4">
									<Dropdown
										width={"131px"}
										items={["B.Sc", "M.Sc", "M.Phill", "PhD"]}
										selected={education.title}
										onSelected={(selected) => {
											// onChangeValue({
											//   target: { name: "lang", value: selected },
											// });
											setEducation((prevState) => {
												return {
													...prevState,
													title: selected,
												};
											});
											setErrorEducation("");
										}}
									/>

									<input
										type="text"
										// name={props.name}
										onChange={(e) => {
											setEducation((prevState) => {
												return {
													...prevState,
													subject: e.target.value,
												};
											});
											setErrorEducation("");
										}}
										value={education.subject}
										required
										placeholder="Subject"
										className="text-[14px] w-[226px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400"
									/>
								</div>
								<div className="w-full flex justify-center mt-4">
									<Dropdown
										width={"367px"}
										items={getLast100years()}
										selected={education.passingYear}
										onSelected={(selected) => {
											// onChangeValue({
											//   target: { name: "lang", value: selected },
											// });
											setEducation((prevState) => {
												return {
													...prevState,
													passingYear: selected,
												};
											});
											setErrorEducation("");
										}}
									/>
								</div>
								{errorEducation && (
									<div className="w-full text-center py-2 px-3 mx-auto text-[#f86462]">
										<span>{errorEducation}</span>
									</div>
								)}

								<div className="w-full flex justify-end items-center mt-4 border-b-2 border-gray-300 pb-3">
									<button
										className="w-[88px] h-[36px] border-[1px] border-[#19525A] rounded-md mr-3"
										onClick={() => {
											setIsEducationDivOpen(false);
											setEducation({
												_id: "",
												country: "Country of School/College/University",
												institute: "",
												title: "Title",
												subject: "",
												passingYear: "Year of graduation",
											});

											setErrorEducation("");
											setEditEducationMode(false);
										}}
									>
										Cancel
									</button>
									<button
										className="w-[88px] h-[36px] text-white bg-[#19525A] rounded-md mr-3"
										onClick={educationSaveHandler}
									>
										{isLoadingEducation ? (
											<PulseLoader color="#fff" size={12} />
										) : (
											<span>Save</span>
										)}
									</button>
								</div>
							</div>
						)}

						{practitioner?.practitioner?.educations?.map((item, index) => (
							<div
								className="w-full flex flex-col items-center p-2"
								key={index}
								data-id={item._id}
							>
								<div className="w-full flex justify-start py-2">
									<span>
										{item.title} - {item.subject}
									</span>
									<div className="hover:opacity-100 opacity-0 flex w-[40px] justify-between items-center ml-3">
										<Image
											src="/img/edit.png"
											height={16}
											width={16}
											alt="alt"
											onClick={editEducationHandler}
										/>
										<Image
											src="/img/delete.png"
											height={16}
											width={16}
											alt="alt"
											onClick={deleteEducationHandler}
										/>
									</div>
								</div>
								<div className="w-full">
									<p className="text-[#5B5B5B] text-[14px] text-left">
										{item.institute}, {item.country}, {item.passingYear}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="w-[400px] flex flex-col border-2 border-gray-300 rounded-md shadow-md mt-10">
					<div className="w-full border-b-2 border-gray-300 flex  justify-between  p-2  px-5">
						<span className="text-[#5B5B5B] text-[20px] font-[500]">
							Certificates or Awards
						</span>
						{editCertificateMode ? (
							<button className="text-[#0372BA] text-[16px]">Edit</button>
						) : (
							<button
								className="text-[#0372BA] text-[16px]"
								onClick={() => {
									if (isCertificatesDivOpen) return;
									setIsCertificatesDivOpen(true);
									setIsLoadingCertificates(false);
								}}
							>
								Add New
							</button>
						)}
					</div>

					<div className="w-full flex flex-col justify-center items-center">
						{isCertificatesDivOpen && (
							<div className="w-full flex flex-col items-center justify-center">
								<input
									type="text"
									// name={props.name}

									ref={scrollToCertificate}
									onChange={(event) => {
										setCertificate((prevState) => {
											return {
												...prevState,
												name: event.target.value,
											};
										});
										setErrorCertificate("");
									}}
									value={certificate.name}
									required
									placeholder="Name of the Certificate or Award"
									className="text-[14px] w-[367px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400 mt-4"
								/>

								<input
									type="text"
									// name={props.name}
									// onChange={onChangeValue}
									onChange={(event) => {
										setCertificate((prevState) => {
											return {
												...prevState,
												from: event.target.value,
											};
										});
										setErrorCertificate("");
									}}
									value={certificate.from}
									required
									placeholder="Certified from"
									className="text-[14px] w-[367px] h-[36px] outline-none rounded-[8px] border-2 border-gray-300 py-2 px-4 focus:ring-1 focus:ring-gray-400 mt-4"
								/>
								<div className="w-full flex justify-center mt-4">
									<Dropdown
										width={"367px"}
										items={getLast100years()}
										selected={certificate.receivingYear}
										onSelected={(selected) => {
											// onChangeValue({
											//   target: { name: "lang", value: selected },
											// });
											setCertificate((prevState) => {
												return {
													...prevState,
													receivingYear: selected,
												};
											});
											setErrorCertificate("");
										}}
									/>
								</div>
								<div className="w-full mt-4">
									<label>
										<div className="w-[367px] bg-[#e8f0fe] rounded-[8px] py-2 px-4 mx-auto">
											<AiFillFileAdd className="inline mr-[15px] text-[18px] relative -top-[3px]" />
											<span className="text-[16px]">
												{certificate.file ? fileName : "Upload Certicate Image"}
											</span>
										</div>
										<input
											type="file"
											className="hidden"
											onChange={(event) => {
												setCertificate((prevState) => {
													// console.log(event.target.files[0]);
													return {
														...prevState,
														file: event.target.files[0],
													};
												});
												setFileName(event.target.files[0].name);
												setErrorCertificate("");
											}}
										/>
									</label>
								</div>
								{errorCertificate && (
									<div className="w-full text-center py-2 px-3 mx-auto text-[#f86462]">
										<span>{errorCertificate}</span>
									</div>
								)}
								<div className="w-full flex justify-end items-center mt-4 border-b-2 border-gray-300 pb-3">
									<button
										className="w-[88px] h-[36px] border-[1px] border-[#19525A] rounded-md mr-3"
										onClick={() => {
											setIsCertificatesDivOpen(false);
											setEditCertificateMode(false);
											setCertificate({
												_id: "",
												name: "",
												from: "",
												receivingYear: "Receiving year",
												file: null,
											});
											setErrorCertificate("");
										}}
									>
										Cancel
									</button>

									<button
										className="w-[88px] h-[36px] text-white bg-[#19525A] rounded-md mr-3"
										onClick={certificatesSaveHandler}
									>
										{isLoadingCertificates ? (
											<PulseLoader color="#fff" size={12} />
										) : (
											<span>Save</span>
										)}
									</button>
								</div>
							</div>
						)}
						{practitioner?.practitioner?.certificatesOrAwards?.map(
							(item, index) => (
								<div
									className="w-full flex flex-col items-center p-2"
									key={index}
									data-id={item._id}
								>
									<div className="w-full flex justify-start py-2">
										<span>{item.name} </span>

										<div className="hover:opacity-100 opacity-0 flex w-[40px] justify-between items-center ml-3">
											<Image
												src="/img/edit.png"
												height={16}
												width={16}
												className=""
												alt="alt"
												onClick={editCertificateHandler}
											/>
											<Image
												src="/img/delete.png"
												height={16}
												width={16}
												alt="alt"
												onClick={deleteCertificateHandler}
											/>
										</div>
									</div>
									<div className="w-full">
										<p className="text-[#5B5B5B] text-[14px] text-left">
											{item.from} {item.receivingYear}
										</p>
									</div>
								</div>
							)
						)}
					</div>
				</div>

				{/* end */}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		practitioner: state.practitioner.info,
	};
};

export default connect(mapStateToProps, { getPractitionerInfo })(
	PractitionerLeftSide
);

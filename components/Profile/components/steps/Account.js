import { InputField, SelectOption, InputAreaField } from "../InputField";
import { FaTimes } from "react-icons/fa";
import React from "react";
import { FileUpload } from "../FileUpload";
import { PulseLoader } from "react-spinners";

export default function Account({
	userType,
	userData,
	onChangeUserData,
	onFileChange,
	onCertificateFileChange,
	temp,
	addNewDegree,
	removeDegree,
	removeCertificate,
	handleDegreeChange,
	percentage,
}) {
	const handleChange = (event) => {
		const { name, value } = event.target;
		onChangeUserData({ name, value });
	};

	return (
		<React.Fragment>
			{(userType === "Professionalist" || userType === "Practitioner") && (
				<div className="flex flex-col justify-around lg:flex-row my-8 w-full">
					<div className="lg:w-2/4 w-full">
						<div className="flex">
							<FileUpload
								label="Organization Logo"
								category="logo"
								onFileChange={onFileChange}
								file={userData["logo"]}
								percentage={percentage}
								temp={temp}
							/>
						</div>
						<div className="flex mt-4">
							<FileUpload
								label="Select Banner"
								category="banner"
								onFileChange={onFileChange}
								file={userData["banner"]}
								percentage={percentage}
								temp={temp}
							/>
						</div>
					</div>
					<div className="w-full flex flex-col justify-center lg:w-2/4 px-2 sm:px-5 lg:px-0">
						<small className="text-indigo-600 py-2 mt-5 lg:mt-0 lg:py-0">
							All star(*) fields are required
						</small>
						<SelectOption
							handleChange={handleChange}
							userData={userData}
							name="professionType"
							required
							values={["Doctor", "Lawyer", "Therapist"]}
							placeholder="Select Type of practitioner *"
						/>

						<InputField
							handleChange={handleChange}
							userData={userData}
							name="businessEmail"
							type="email"
							placeholder="Business email *"
							required
						/>
						<InputField
							handleChange={handleChange}
							userData={userData}
							name="businessPhoneNumber"
							type="number"
							onKeyPress={(event) => {
								if (!/[0-9]/.test(event.key)) {
									event.preventDefault();
								}
							}}
							required
							placeholder="Organization phone number *"
						/>
						<InputField
							handleChange={handleChange}
							userData={userData}
							name="availability"
							type="number"
							onKeyPress={(event) => {
								if (!/[0-9]/.test(event.key)) {
									event.preventDefault();
								}
							}}
							placeholder="Availability(In days)"
						/>
						<InputField
							handleChange={handleChange}
							userData={userData}
							type="text"
							name="fieldOfStudy"
							placeholder="Subject/Filed of study"
						/>
						<div className="border px-3 py-2 border-gray-300 rounded">
							<label className="text-gray-500 font-medium text-sm">
								Degree info *
							</label>
							{userData.degree.map((degree, i) => {
								return (
									<div key={i} className="flex items-center">
										<div className="gap-2 grid grid-cols-3 items-center w-[90%]">
											<div>
												<InputField
													handleChange={(event) => handleDegreeChange(event, i)}
													type="text"
													name="name"
													userData={degree}
													placeholder="Name"
													required
												/>
											</div>
											<div>
												<InputField
													handleChange={(event) => handleDegreeChange(event, i)}
													userData={degree}
													type="text"
													name="institute"
													placeholder="Institute"
													required
												/>
											</div>
											<div>
												<InputField
													handleChange={(event) => handleDegreeChange(event, i)}
													userData={degree}
													type="number"
													onKeyPress={(event) => {
														if (!/[0-9]/.test(event.key)) {
															event.preventDefault();
														}
													}}
													required
													name="passingYear"
													placeholder="Passing year"
												/>
											</div>
										</div>
										<div className="ml-2 w-[10%]">
											{i !== 0 && (
												<button
													onClick={(_) => removeDegree(degree.id)}
													className="bg-orange-700 hover:bg-orange-600 text-white text-xl cursor-pointer p-2 rounded"
												>
													<FaTimes />
												</button>
											)}
										</div>
									</div>
								);
							})}
							<div>
								<button
									className="bg-orange-500 text-white text-sm font-medium rounded p-2 my-2 transform hover:bg-orange-600"
									onClick={addNewDegree}
								>
									Add another
								</button>
							</div>
						</div>
						<div className="border px-3 py-3 border-gray-300 rounded mt-2">
							<label className="text-gray-500 font-medium text-sm">
								Certificates
							</label>
							<div className="my-2">
								<div className="flex flex-wrap mb-2">
									{userData.certifications.map((certificate, i) => {
										return (
											<div
												key={i}
												className="bg-gray-100 relative text-sm  rounded text-gray-500 mr-3 p-2 mb-2"
											>
												{certificate.name.substr(0, 25)}
												{certificate.name.length > 25 && "..."}
												<FaTimes
													className="absolute -top-2 -right-2 bg-sky-300 hover:bg-sky-500 text-white text-xl cursor-pointer p-1 rounded-full"
													onClick={(_) => removeCertificate(certificate.url)}
												/>
											</div>
										);
									})}
								</div>
								{percentage > 0 && (
									<div className="py-2">
										<PulseLoader size={10} color="#96aae6" />
									</div>
								)}
								<label
									htmlFor="certificates"
									className="bg-sky-400 text-white text-sm font-medium rounded p-2 transform hover:bg-sky-500 cursor-pointer"
								>
									<input
										multiple
										id="certificates"
										type="file"
										accept=".pdf,.doc"
										onChange={onCertificateFileChange}
										className="hidden"
									/>
									Select
								</label>
							</div>
						</div>
						<InputField
							handleChange={handleChange}
							userData={userData}
							type="text"
							name="institute"
							placeholder="Institution"
						/>
						<SelectOption
							handleChange={handleChange}
							userData={userData}
							name="areaOfPractice"
							values={["Only my state", "Others state", "International"]}
							placeholder="Select Area of practitioner"
						/>
						<InputField
							handleChange={handleChange}
							userData={userData}
							name="licenseNumber"
							type="text"
							placeholder="Practitioner license number"
						/>
					</div>
				</div>
			)}
			{(userType === "Business" || userType === "Organization") && (
				<div className="flex flex-col justify-around lg:flex-row my-8 w-full">
					<div className="lg:w-2/4 w-full">
						<div className="flex">
							<FileUpload
								label="Organization Logo"
								category="logo"
								onFileChange={onFileChange}
								file={userData["logo"]}
								percentage={percentage}
								temp={temp}
							/>
						</div>
						<div className="flex mt-4">
							<FileUpload
								label="Select Banner"
								category="banner"
								onFileChange={onFileChange}
								file={userData["banner"]}
								percentage={percentage}
								temp={temp}
							/>
						</div>
					</div>
					<div className="w-full flex flex-col justify-center lg:w-2/4 px-2 sm:px-5 lg:px-0">
						<small className="text-indigo-600 py-2 mt-5 lg:mt-0 lg:py-0">
							All star(*) fields are required
						</small>

						<InputField
							handleChange={handleChange}
							userData={userData}
							name="name"
							type="text"
							placeholder="Organization name *"
							required
						/>

						<InputField
							handleChange={handleChange}
							userData={userData}
							name="email"
							type="email"
							// pattern='/^[a-z0-9]+@[a-z]+\.[a-z]+$/'
							placeholder="Business email *"
							required
						/>

						<InputAreaField
							handleChange={handleChange}
							userData={userData}
							name="description"
							placeholder="Description *"
							required
							rows={3}
						/>

						<InputField
							handleChange={handleChange}
							userData={userData}
							name="businessType"
							type="text"
							placeholder="Organization type"
						/>

						{/* <InputField handleChange={handleChange} userData={userData} name='address' type='text' placeholder='Address *' required /> */}

						<InputField
							handleChange={handleChange}
							userData={userData}
							name="phone"
							type="text"
							required
							placeholder="Organization phone number *"
							onKeyPress={(event) => {
								if (!/[0-9]/.test(event.key)) {
									event.preventDefault();
								}
							}}
						/>

						<InputField
							handleChange={handleChange}
							userData={userData}
							name="website"
							type="text"
							placeholder="Website"
						/>

						<InputField
							handleChange={handleChange}
							userData={userData}
							name="location"
							type="text"
							placeholder="Organization address"
						/>

						<SelectOption
							handleChange={handleChange}
							required
							userData={userData}
							name="practiceType"
							values={["Solo practitioner", "Multiple practitioner"]}
							placeholder="Select Practitioner category *"
						/>

						<SelectOption
							handleChange={handleChange}
							userData={userData}
							required
							name="ownerRole"
							values={["Practitioner", "Administration", "Both"]}
							placeholder="Select Your Role *"
						/>
					</div>
				</div>
			)}
		</React.Fragment>
	);
}

// import "../../../styles/custom.css";
import React, { useEffect, useState, useRef } from "react";
import {
	HexColorPicker,
} from "react-colorful";
import { connect } from "react-redux";
import {
	onCancelAction,
	updateBusinessInfo,
	getBusinessInfo,
} from "../../../store/actions/business";
import BrandingFileItem from "./BrandingFileItem";
const Branding = (props) => {
	const [openPrimary, setOpenPrimary] = useState(false);
	const [openSecondary, setOpenSecondary] = useState(false);
	const [counter, setCounter] = useState(0);

	const [businessData, setBusinessData] = React.useState({
		logo: "",
		banner: "",
		userName: "",
		emailHeader: "",
		emailSignature: "",
		invoiceHeader: "",
		intakeFormHeader: "",
		prescriptionHeader: "",
		primaryColor: "#aabbcc",
		secondaryColor: "#420d0d",
	});
	const primaryColorPickerRef = useRef(null);
	const secondaryColorPickerRef = useRef(null);
	// const secondaryColorPickerRef = useRef(null);
	// const [changes, setChanges] = React.useState([]);

	useEffect(() => {
		document.addEventListener("click", (event) => {
			if (primaryColorPickerRef.current && event.target) {
				if (primaryColorPickerRef.current.contains(event.target) == false) {
					setOpenPrimary(false);
				}
			}
			if (secondaryColorPickerRef.current && event.target) {
				if (secondaryColorPickerRef.current.contains(event.target) == false) {
					setOpenSecondary(false);
				}
			}
		});
	}, []);

	useEffect(() => {
		if (!props.info?.business) {
			props.getBusinessInfo();
		} else {
			setBusinessData({
				...businessData,
				...props.info.business,
				primaryColor: props.info?.business.primaryColor,
				secondaryColor: props.info?.business.secondaryColor
			});
		}
	}, [props.info?.business]);

	const updateToServer = (obj) => {
		props.updateBusinessInfo(
			obj,
			props.info?.business ? props.info.business._id : null
		);
	};

	const onChangeValue = (event) => {
		let { name, value } = event.target;
		updateToServer({
			[name]: value,
		});
		setBusinessData({
			...businessData,
			[name]: value,
		});
	};
	useEffect(() => {
		if (!openSecondary || !openPrimary) {
			setCounter(counter + 1);
			if (counter > 0) {
				updateToServer({
					primaryColor: businessData.primaryColor,
					secondaryColor: businessData.secondaryColor,
				});
			}
		}
	}, [openPrimary, openSecondary]);

	return (
		<>
			<div className="flex flex-col">
				<div className="flex justify-between">
					<span className="text-[#5B5B5B] text-[32px] font-[700]">
						Branding info of your organization
					</span>
				</div>
				<div className="bg-white py-2 flex flex-col w-full rounded-md shadow-md mt-5">
					<BrandingFileItem
						businessData={businessData}
						onChangeValue={onChangeValue}
						name={"logo"}
						folder={`${props.info?.user?.userName ?? "global"}/logo`}
						title={"Logo"}
						tooltip={'Max 90X90 px and not more then 2 MB. Format : Transparent JPG, JPEG, PNG, SVG'}
					/>
					<div className="border-[1px] w-full border-gray-300"></div>

					<BrandingFileItem
						businessData={businessData}
						onChangeValue={onChangeValue}
						name={"banner"}
						folder={`${props.info?.user?.userName ?? "global"}/banner`}
						title={"Banner"}
						tooltip="Max 1440X550 px and not more then 3 MB. Format:  JPG, JPEG, PNG, SVG, GIF "
					/>
					<div className="border-[1px] w-full border-gray-300"></div>

					<BrandingFileItem
						businessData={businessData}
						onChangeValue={onChangeValue}
						name={"emailHeader"}
						folder={`${props.info?.user?.userName ?? "global"}/emailHeader`}
						title={"Email Header"}
						tooltip='Max 700X200 px and not more then 1 MB. Format:  JPG, JPEG, PNG, SVG, GIF '
					/>
					<div className="border-[1px] w-full border-gray-300"></div>

					<BrandingFileItem
						businessData={businessData}
						onChangeValue={onChangeValue}
						name={"emailSignature"}
						folder={`${props.info?.user?.userName ?? "global"}/emailSignature`}
						title={"Signature"}
						tooltip="Max 120X80 px and not more then 100 KB. Format: Transparent JPG, JPEG, PNG, SVG "
					/>
					<div className="border-[1px] w-full border-gray-300"></div>

					<BrandingFileItem
						businessData={businessData}
						onChangeValue={onChangeValue}
						name={"invoiceHeader"}
						folder={`${props.info?.user?.userName ?? "global"}/invoiceHeader`}
						title={"Invoice Header"}
						tooltip="Max 560X130 px and not more then 2 MB. Format: JPG, JPEG, PNG, SVG, GIF "
					/>
					<div className="border-[1px] w-full border-gray-300"></div>

					<BrandingFileItem
						businessData={businessData}
						onChangeValue={onChangeValue}
						name={"intakeFormHeader"}
						folder={`${props.info?.user?.userName ?? "global"
							}/intakeFormHeader`}
						title={"Intake Form Header"}
						tooltip="Max 560X130 px and not more then 2 MB. Format: JPG, JPEG, PNG, SVG, GIF "
					/>
					<div className="border-[1px] w-full border-gray-300"></div>
					<BrandingFileItem
						businessData={businessData}
						onChangeValue={onChangeValue}
						name={"prescriptionHeader"}
						folder={`${props.info?.user?.userName ?? "global"
							}/prescriptionHeader`}
						title={"Chart and Prescription Header"}
						tooltip="Max 560X130 px and not more then 2 MB. Format: JPG, JPEG, PNG, SVG, GIF "
					/>

					<div className="border-[1px] w-full border-gray-300"></div>
					<div className="flex justify-between items-center px-8 py-5">
						<span className="text-[16px] text-[#5B5B5B]">Color</span>
						<div className="flex">
							<div className="mr-10 text-center" >
								<div className="text-[14px] mb-2">Primary Color</div>
								<div
									onClick={(event) => {
										event.stopPropagation()
										event.preventDefault()
										setOpenPrimary((prevstate) => {
											const newState = true;
											return newState;
										});
									}}
									style={{
										backgroundColor: `${businessData.primaryColor}`
									}}
									className={`h-[50px] w-[50px] rounded-[8px] m-auto relative`}
								>
									{openPrimary && (
										<div className="relative">
											<div className="absolute z-20 mr-10 -left-[80px] bottom-[calc(100%+30px)]">
												<div className="colorpicker" ref={primaryColorPickerRef}>
													<HexColorPicker
														color={businessData.primaryColor}
														onChange={(color) => {

															setBusinessData((prevstate) => {
																prevstate["primaryColor"] = color;
																return { ...prevstate };
															})
														}}
													/>
												</div>
											</div>
										</div>
									)}
								</div>
								<div className="flex items-center w-[130px] h-[25px] border-[#19525A] border-2 m-3 p-0 rounded-md">
									<div className="text-[8px] p-1.5 h-full w-[30px] rounded-l-sm text-white bg-[#19525A]">
										Hex
									</div>
									<input
										type="text"
										name="primaryColor"
										value={(businessData.primaryColor)}
										onChange={e => setBusinessData({ ...businessData, primaryColor: e.target.value })}
										className="h-full w-full text-[10px] p-1.5 outline-none"
									/>
									<div className="text-[8px] h-full p-1.5 w-20 border-l-2 border-[#19525A]">
										{`${100}%`}
									</div>
								</div>

							</div>
							<div className="text-center">
								<div className="text-[14px] mb-2">Secondary Color</div>
								<div
									onClick={(event) => {
										event.stopPropagation()
										event.preventDefault()
										setOpenSecondary((prevstate) => {

											const newState = true;
											return newState;
										});
									}}
									style={{
										backgroundColor: `${businessData.secondaryColor}`,

									}}
									className="h-[50px] w-[50px] rounded-[8px] m-auto relative"
								>{openSecondary && (
									<div className="relative">
										<div className="absolute z-20 mr-10 -left-[80px] bottom-[calc(100%+30px)] ">
											<div className={`colorpicker bg-[${businessData.secondaryColor}]`} ref={secondaryColorPickerRef}>
												<HexColorPicker
													color={businessData.secondaryColor}
													onChange={(color) => {
														console.log(color)
														console.log(businessData.secondaryColor)

														setBusinessData((prevstate) => {
															prevstate["secondaryColor"] = color;
															return { ...prevstate };
														})
													}}
												/>
											</div>
										</div>
									</div>
								)}
								</div>
								<div className="flex items-center w-[130px] h-[25px] border-[#19525A] border-2 m-3 p-0 rounded-md">
									<div className="text-[8px] p-1.5 h-full w-[30px] rounded-l-sm text-white bg-[#19525A]">
										Hex
									</div>
									<input
										type="text"
										name="secondaryColor"
										value={(businessData.secondaryColor)}
										onChange={e => setBusinessData({ ...businessData, secondaryColor: e.target.value })}
										className="h-full w-full text-[10px] p-1.5 outline-none "
									/>
									<div className="text-[8px] h-full p-1.5 w-20 border-l-2 border-[#19525A]">
										{`100%`}
									</div>
								</div>

							</div>
						</div>
					</div>

				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		info: state?.business?.info,
		loading: state?.business?.loading,
	};
};
export default connect(mapStateToProps, {
	updateBusinessInfo,
	onCancelAction,
	getBusinessInfo,
})(Branding);

import React, { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JoditEditor = dynamic(() => import("jodit-react"), {
	ssr: false,
});

import {
	getEmailFormat,
	onCancelAction,
	updateEmailFormat,
	sendEmail
} from "../../../store/actions/emailFormat";
import Dropdown from "../../Dropdown";
import Image from "next/image";
import { emailSelect } from "../../../utils/emailFormatSelect";
import Modal from "../../Modal";
import DropdownWithId from "../../Dropdown/DropDownId";
import { useRouter } from "next/router";

const EmailFormat = (props) => {
	// console.log(props);
	const [isChanged, setIsChanged] = React.useState(false);
	const [changes, setChanges] = React.useState([]);
	const [emailFormats, setEmailFormats] = useState([]);
	const [selectedFormat, setSelectedFormat] = useState({
		business: "",
		name: "",
		subject: "",
		body: "",
	});
	const [selectedEmailValue, setSelectedEmailValue] = useState("all")
	const [selectedEmailSuccess, setSelectedEmailSuccess] = useState(false)
	const [selectedTitle, setSelectedTitle] = useState("Select Email Format");
	const [emailSendSuccess, setEmailSendSuccess] = useState('')
	const [emailError, setEmailError] = useState('')
	const [emailConfirmation, setEmailConfirmation] = useState(false)
	const [saveEmail, setSaveEmail] = useState(true)
	const router = useRouter()
	const { staffEmail, name } = router?.query || {}


	useEffect(() => {
		props.getEmailFormat();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [saveEmail,]);

	useEffect(() => {
		if (emailSendSuccess) {
			toast.success(emailSendSuccess, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setEmailSendSuccess('')
		}
		if (emailError) {
			toast.error(emailError, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setEmailError('')
		}
	}, [emailSendSuccess, emailError])

	useEffect(() => {
		if (props.emailFormats) {
			setEmailFormats(props.emailFormats);
			setSelectedFormat({
				...selectedFormat,
				business: props.business?.business?._id,
			});
		}
	}, [props.emailFormats]);

	useEffect(() => {
		if (changes.length > 0) {
			setIsChanged(true);
		} else {
			setIsChanged(false);
		}
	}, [changes]);

	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setSelectedFormat({
			...selectedFormat,
			[name]: value,
		});
		const selectedEmail = emailFormats.find(
			(item) => item.name === selectedTitle
		);

		if (selectedEmail) {
			if (selectedEmail[name] !== value) {
				changes.push(name);
				setChanges([...changes]);
			} else {
				changes.pop();
				setChanges([...changes]);
			}
		} else {
			if (value) {
				changes.push(name);
				setChanges([...changes]);
			} else {
				changes.pop();
				setChanges([...changes]);
			}
		}
	};

	const onSubmitEmailFormat = () => {
		const selectedEmail = emailFormats.find(
			(item) => item.name === selectedTitle
		);
		props.updateEmailFormat({ emailFormat: selectedFormat, formatId: selectedEmail?._id, setSaveEmail, saveEmail });
	};

	const config = useMemo(() => ({
		minHeight: 500,
		maxHeight: 600,
		readOnly: false, // all options from https://xdsoft.net/jodit/doc/,
		placeholder: "Start typings...",
		toolbar: {
			buttons: ['source', 'undo', 'redo'],
		},
	}), []);

	const sendEMailToUser = () => {
		props.sendEmail({ selectedEmailValue, setSelectedEmailSuccess, selectedFormat, props, setEmailSendSuccess, setEmailError, setEmailConfirmation, name, staffEmail })
	}

	return (
		<>

			{/* receipt modal  */}
			{emailConfirmation && (
				<Modal
					onClick={setEmailConfirmation}
					closeOnOutsideClick={true}
					disableBlur={true}
				>
					<div className="relative w-[600px] max-h-[300px] mt-24 text-[#5B5B5B] bg-[#FFFFFF] border-opacity-50 border-[#19525A] border-[0.5px] rounded-[8px]">
						<div className="absolute top-2 right-2 ">
							<span
								onClick={() => setEmailConfirmation(false)}
								className="text-[24px] text-gray-600 cursor-pointer "
							>
								✖
							</span>
						</div>

						<div className="p-2 pl-2 border-b bg-[#E6F2EA] rounded-t-[8px]">
							<h3 className="text-[24px] text-[#424242]">Confirmation</h3>
						</div>
						<div className="flex justify-center items-center flex-col h-full">

							<div className='flex flex-col text-[20px] px-[20px] mt-[12px] text-center text-[#424242]'>
								<p className="leading-7">Are you sure you want to send Email <br />
									to {
										!(name && staffEmail) ?
											<span className="text-[#03ACF2] capitalize">{selectedEmailValue == 'all' ? "All Members" : selectedEmailValue.replace(/_/g, ' ')}</span> : <span className="text-[#03ACF2] capitalize">{name}</span>
									} in your Organization?</p>
							</div>
							<div className="flex justify-end mt-[50px] gap-3 w-full pb-3">
								<button
									disabled={selectedEmailSuccess}
									onClick={sendEMailToUser}
									className="h-[36px] w-[100px] text-[14px] flex justify-center items-center text-white bg-[#19525A] rounded-[8px]">
									{
										selectedEmailSuccess ? "Sending..." : "Send"
									}
								</button>
								<button
									onClick={() => setEmailConfirmation(true)}
									className="h-[36px] w-[100px] text-[14px] flex justify-center items-center text-[#424242] bg-[#fff] border-[#424242] rounded-[8px] border-[0.5px] border-opacity-50 mr-6">
									Cancel
								</button>
							</div>
						</div>
					</div>
				</Modal>
			)}
			<div className="w-full pb-10">
				<div className="flex justify-between">
					<span className="text-[#5B5B5B] text-[32px] font-[700]">
						Set Up Emails formate for your customer
					</span>
				</div>
				<div className="w-full px-3 py-5 bg-white rounded-md shadow-md mt-5">
					<Dropdown
						items={emailFormats.map((item) => item.name) ?? []}
						selected={selectedTitle}
						width={"549px"}
						onSelected={(selected) => {
							setSelectedTitle(selected);
							setSelectedFormat(
								emailFormats.find((item) => item.name === selected)
							);
						}}
					/>
				</div>

				{/* eamil format */}

				<div className="bg-white px-0 py-5 flex mt-5 rounded-md ">
					{/* left side */}
					<div className="flex flex-col w-full pl-5">
						<span className="text-[16px] text-[#5B5B5B]">Format name</span>
						<input
							type="text"
							value={selectedFormat?.name}
							name="name"
							onChange={onChangeValue}
							className="rounded-[8px] p-2 mt-2 border-[0.5px] border-[#19525A] border-opacity-50 outline-none"
						/>
						<span className="text-[16px] text-[#5B5B5B] mt-5">Subject</span>
						<input
							type="text"
							value={selectedFormat?.subject}
							name="subject"
							onChange={onChangeValue}
							className="rounded-[8px] p-2 mt-2 border-[0.5px] border-[#19525A] border-opacity-50 outline-none"
						/>
						<span className="text-[16px] text-[#5B5B5B] mt-5 mb-[8px]" >Body Text</span>
						{typeof window !== "undefined" && (
							// @ts-ignore
							<JoditEditor
								value={selectedFormat.body || ""}
								config={config}

								onChange={(newContent) =>
									onChangeValue({
										target: { name: "body", value: newContent },
									})
								}
							/>
						)}

					</div>

					{/* right side */}
					<div className=" w-full ml-5 pr-5">
						<div className="flex items-center">
							<span className="text-[16px] text-[#5B5B5B]">Live Preview</span>
							<AiOutlineEye className="text-2xl ml-3 text-[#5B5B5B]" />
						</div>
						<div className="w-full rounded-[8px] h-[96%] p-3 mt-2 border-[0.5px] border-[#19525A] border-opacity-50">
							<div className="flex flex-col">
								<div className="text-[16px] text-[#5B5B5B] py-2">
									<b>Subject:</b> {selectedFormat?.subject}
								</div>
								{props.info?.business?.emailHeader && (
									<Image
										src={props.info?.business?.emailHeader}
										height={120}
										width={200}
										quality={80}
										objectFit="fill"
										alt=''
									/>
								)}
								<div
									className="pt-2"
									dangerouslySetInnerHTML={{ __html: selectedFormat?.body }}
								/>
								<div className="pt-3">
									{props.info?.business?.emailSignature && (
										<Image
											src={props.info?.business?.emailSignature}
											height={60}
											width={160}
											quality={80}
											objectFit="fill"
											alt=""
										/>
									)}
								</div>
								<div>
									{props.info?.business?.name && props.info?.business?.name}
								</div>
								<div>
									{props.info?.business?.location &&
										props.info?.business?.location}
									{", "}
									{props.info?.user?.city && props.info?.user?.city}
								</div>
								<div>
									{props.info?.user?.country && props.info?.user?.country}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full bg-white flex px-8 py-5 shadow-md pr-5">
					{isChanged && (
						<div className="flex w-full justify-end px-10">
							<button
								onClick={() => {
									props.onCancelAction();
									const format = emailFormats.find(
										(item) => item.name === selectedTitle
									);
									if (format) {
										setSelectedFormat(format);
									} else {
										setSelectedFormat({
											business: props.business?.business?._id,
											name: "",
											subject: "",
											body: "",
										});
									}
									setIsChanged(false);
								}}
								className="h-[40px] w-[118px] text-[16px] text-black px-4 py-1 border-2 rounded-[8px] mr-4"
							>
								Cancel
							</button>
							<button
								className="h-[40px] w-[118px] text-[16px] px-4 py-1 text-white bg-[#19525A] rounded-[8px]"
								onClick={(event) => {
									if (emailFormats.length > 50) {
										toast.error('You can save only 50 email format, Please remove your previous format', {
											position: "bottom-left",
											autoClose: 3000,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: undefined,
											theme: "light",
										});
									} else {
										onSubmitEmailFormat();
									}
								}}
							>
								{props.loading ? (
									<PulseLoader color="#ffffff" size={12} />
								) : (
									<span>Save</span>
								)}
							</button>
						</div>
					)}
					<div className="w-full flex justify-end items-center gap-2 ">

						{

							!(name && staffEmail) ? <DropdownWithId
								items={emailSelect}
								selected={selectedEmailValue}
								onSelected={(selected) => {
									setSelectedEmailValue(selected)
									onChangeValue({
										target: {
											name: "payment",
											value: selected,
										},
									});
								}}
								width={"180px"}
								height={"40px"}
								bg={true}
							/> :

								<div className="w-[180px] h-[40px] bg-[#19525A] flex justify-center items-center text-white text-[16px] rounded-[8px]">
									{
										name
									}
								</div>
						}


						<button
							onClick={() => setEmailConfirmation(true)}
							className="h-[40px] w-[118px] text-[16px]  px-4 text-white bg-[#19525A] rounded-[8px]">
							Send
						</button>
					</div>
					<ToastContainer />
				</div>
			</div>
		</>
	);
};


const mapStateToProps = (state) => {
	return {
		emailFormats: state?.emailFormat?.info?.formats,
		info: state?.business?.info,
		loading: state?.emailFormat?.loading,
	};
};

export default connect(mapStateToProps, {
	getEmailFormat,
	updateEmailFormat,
	onCancelAction,
	sendEmail
})(EmailFormat);

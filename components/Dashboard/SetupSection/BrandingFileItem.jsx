import { Progress } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { uploadAFile } from "../../../utils/fileUpload";
import { bytesToSize } from "../../../utils/utility";
import Modal from "../../Modal";
import { Tooltip } from "../../Tooltip/Tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BrandingFileItem = ({
	businessData,
	onChangeValue,
	name,
	folder,
	title,
	tooltip
}) => {
	const [percentage, setPercentage] = useState(0);
	const [fileName, setFileName] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [logoName, setLogoName] = useState('')

	const isValidFileUploaded = (file) => {
		const validExtensions = ['png', 'jpeg', 'jpg', 'webp']
		const fileExtension = file.type.split('/')[1]
		return validExtensions.includes(fileExtension)
	}

	const showError = (value) => {
		toast.error(value, {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}


	const onFileUpload = async (event, folder) => {

		if (!isValidFileUploaded(event.target.files[0])) {
			return showError("Only jpg/jpeg/png and webp files are allowed!");
		}
		if (parseInt(bytesToSize(event.target.files[0].size)) > 5)
			return showError("Max file size limit is 3 MB");

		setFileName(event.target.files[0]?.name)

		try {
			// @ts-ignore
			uploadAFile({
				fileName: "image",
				folder,
				file: event.target.files[0],
				onProgress: (progress) => setPercentage(progress),
				onSetDownloadUrl: (url) => {
					console.log('url', url)
					onChangeValue({
						target: {
							name: event.target.name,
							value: url,
						},
					})
				}
			});
		} catch (error) {

		}
	};

	useEffect(() => {
		switch (name) {
			case 'logo':
				setLogoName(businessData?.logo?.split('/') ? businessData?.logo?.split('/') : '')
				break;
			case 'banner':
				setLogoName(businessData?.banner?.split('/') ? businessData?.banner?.split('/') : '')
				break;
			case 'emailHeader':
				setLogoName(businessData?.emailHeader?.split('/') ? businessData?.emailHeader?.split('/') : '')
				break;
			case 'emailSignature':
				setLogoName(businessData?.emailSignature?.split('/') ? businessData?.emailSignature?.split('/') : '')
				console.log('logoName', logoName)
				break;
			case 'invoiceHeader':
				setLogoName(businessData?.invoiceHeader?.split('/') ? businessData?.invoiceHeader?.split('/') : '')
				break;
			case 'intakeFormHeader':
				setLogoName(businessData?.intakeFormHeader?.split('/') ? businessData?.intakeFormHeader?.split('/') : '')
				break;
			case 'prescriptionHeader':
				setLogoName(businessData?.prescriptionHeader?.split('/') ? businessData?.prescriptionHeader?.split('/') : '')
				break;

			default:
				setLogoName('')
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [businessData?.banner, businessData?.emailHeader, businessData?.emailSignature, businessData?.intakeFormHeader, businessData?.invoiceHeader, businessData?.logo, businessData?.prescriptionHeader, name,])


	return (
		<>


			{showModal && (
				<Modal
					onClick={setShowModal}
					closeOnOutsideClick={true}
					disableBlur={true}
				>
					<div className="w-[700px] h-[400px] ">
						<Image
							src={businessData[name]}
							alt="img"
							style={{ borderRadius: "4px", }}
							width={700}
							height={400}
							objectFit="contain"
							className="rounded-md"
						/>
					</div>
				</Modal>
			)
			}
			<div className="flex justify-between items-center px-8 h-[90px]">

				<span className="text-[16px] text-[#5B5B5B] flex gap-1">{title} <span className="text-rose-600 flex ">*
					<Tooltip
						position="right"
						content={tooltip}
						top={true}
					>
						<RiErrorWarningLine className="text-[16px] text-[#1A535B] -mt-[7px] -ml-[4px]" />
					</Tooltip></span></span>
				<div className="flex items-center justify-center bg-grey-lighter gap-4">
					{businessData[name] !== "" && (
						<div className="  rounded-md">
							{percentage > 0 && percentage < 100 ? (
								<div className="w-full h-full">
									<Progress
										type="circle"
										percent={Math.round(percentage)}
										width={40}
									/>
								</div>
							) : (
								<div className="cursor-pointer w-[100px] h-[62px] flex justify-center items-center border-[0.5px] border-[#19525A] rounded-[2px] p-1" onClick={() => setShowModal(true)}>
									<Image
										src={businessData[name]}
										alt="img"
										width={100}
										height={56}
										objectFit="cover"
										className="x]"
									/>
								</div>
							)}
						</div>
					)}
					<label className="w-52 text-[20px] border-[1px] border-gray-400 px-3 py-2 flex flex-col items-center bg-white rounded-lg cursor-pointer hover:bg-gray-400 hover:text-white">
						<span className="text-[15px] text-base leading-normal">
							{fileName ? <span
								className="flex items-center gap-2"
							> {fileName}</span> : <span>{logoName != '' ? logoName[logoName?.length - 1] : 'Choose Your File'} </span>}

						</span>
						<input
							type="file"
							className="hidden"
							name={name}
							onChange={(event) => {
								onFileUpload(event, folder);
							}}
						/>
					</label>
				</div>
			</div>
			<ToastContainer />
		</>
	);
};
export default BrandingFileItem;

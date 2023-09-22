import Image from "next/image";
import React, { useState } from "react";
import { uploadAFile } from "../../../utils/fileUpload";
import Modal from "../../Modal";
import CaptureImage from "./CaptureImage";

const rules = [
	{
		id: 1,
		title: "Take a selfie of yourself with a natural expression",
		icon: "/img/tick.png",
	},
	{
		id: 2,
		title: "Make sure your whole face is visible, centre and clear enough",
		icon: "/img/tick.png",
	},

	{
		id: 3,
		title: "Do not crop your ID or screenshot of your ID",
		icon: "/img/cross.png",
	},
	{
		id: 4,
		title:
			"Do not hide or alter parts of your face (No hatsbeauty images/filters/ headgear)",
		icon: "/img/cross.png",
	},
];
const imagesPos = [
	{
		id: 1,
		title: "Natural expression and centered face",
	},
	{
		id: 2,
		title: "Right side of the face",
	},
	{
		id: 3,
		title: "Left side of the face",
	},
	{
		id: 4,
		title: "Close eyes",
	},
	{
		id: 5,
		title: "Open mouth",
	},
	{
		id: 6,
		title: "Smile face",
	},
];

const IdentityVerify3 = ({ setVerification }) => {
	const [openCamera, setOpenCamera] = useState(false);
	const [activeDiv, setActiveDiv] = useState(null);
	const [imgUrl, setImgUrl] = useState([]);
	const onFileUpload = async (event, folder, asString = false) => {
		// if (parseInt(bytesToSize(event.target.files[0].size)) > 5) {
		// 	setUploadingFile(false);
		// 	return alert("Max file size limit error.");
		// }
		// setUploadingFile(true);

		const selectedFile = event.target.files[0];
		const fileName = asString
			? "capchuredImage" + new Date().getTime()
			: selectedFile.name;
		const fileExtension = asString ? "png" : selectedFile.name.split(".").pop();
		const fileType = asString ? "image/png" : selectedFile.type;

		try {
			uploadAFile({
				fileName: `${fileName}.${fileExtension}`,
				folder,
				file: selectedFile,
				uploadAsString: asString,
				onProgress: (progress) => {},
				onSetDownloadUrl: (url) => {
					// console.log(url);
					// setUploadingFile(false);
				},
			});
		} catch (error) {
			// console.log(error);
			// setMessage(error.response.data.message);
		}
	};
	return (
		<React.Fragment>
			{openCamera && (
				<Modal onClick={setOpenCamera} closeOnOutsideClick={true}>
					<CaptureImage
						setOpenCamera={setOpenCamera}
						activeDiv={activeDiv}
						setImgUrl={setImgUrl}
						setVerification={setVerification}
					/>
				</Modal>
			)}
			<div className="w-full flex justify-center items-center px-5 border-b-2 border-gray-300">
				<span className="text-[#5B5B5B] text-[32px]">
					Identity Verification
				</span>
			</div>

			<div className="w-full flex justify-around mt-5 px-8">
				<div className="w-[10%]flex flex-col">
					<span className="text-[#5B5B5B] text-[16px]">
						Take a selfie photo
					</span>
					<Image src="/img/idphoto.png" height={145} width={144} alt="alt" />
				</div>
				<div className="w-[90%] flex flex-col">
					{rules.map((rule) => (
						<div key={rule.id} className="flex justify-start items-start mt-4">
							<div>
								<Image src={rule.icon} height={12} width={15} alt="alt" />
							</div>
							<p className="text-[#5B5B5B] text-[14px] ml-2">{rule.title}</p>
						</div>
					))}
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4 mt-4 px-5">
				{imagesPos.map((imgpos) => (
					<label
						key={imgpos.id}
						className="w-[180px] h-[120px] text-[20px] px-3 py-2 flex flex-col items-center bg-[#EFEFEF] rounded-lg cursor-pointer"
					>
						<div
							onClick={() => {
								setActiveDiv(imgpos.id);
								setOpenCamera(true);
							}}
						>
							{imgUrl[imgpos.id - 1] ? (
								<div
									className="flex flex-col items-center"
									onClick={() => {
										setActiveDiv(imgpos.id);
										setOpenCamera(true);
									}}
								>
									<Image
										src={imgUrl[imgpos.id - 1]}
										height={120}
										width={180}
										alt="alt"
									/>
								</div>
							) : (
								<>
									<div className="flex flex-col items-center mt-5">
										<div>
											<Image
												src="/img/camera.png"
												height={28}
												width={34}
												alt="alt"
											/>
										</div>
										<span className="text-[14px] text-[#5B5B5B] text-base leading-normal">
											{imgpos.title}
										</span>
									</div>
								</>
							)}
						</div>
						{/* <input type="file" className="hidden" /> */}
					</label>
				))}
			</div>
		</React.Fragment>
	);
};

export default IdentityVerify3;

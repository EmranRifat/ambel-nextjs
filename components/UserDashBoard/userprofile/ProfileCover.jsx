import Image from "next/image";
import React, { useState } from "react";
import { BiCamera } from "react-icons/bi";
import PulseLoader from "react-spinners/PulseLoader";
import { uploadAFile } from "../../../utils/fileUpload";
import { bytesToSize } from "../../../utils/utility";
import Toggle from "./Toggle";

const ProfileCover = (props) => {
	const [message, setMessage] = useState("");
	const [percentage, setPercentage] = useState(0);
	const [uploadingCover, setUploadingCover] = useState(false);
	const [uploadingPhoto, setUploadingPhoto] = useState(false);

	const onFileUploadOnStorage = async (event, folder) => {
		if (event.target.files.length > 0) {
			if (parseInt(bytesToSize(event.target.files[0].size)) > 2)
				return alert("Max file size limit error.");

			try {
				if (folder === "coverPhoto") {
					setUploadingCover(true);
				} else {
					setUploadingPhoto(true);
				}
				uploadAFile({
					// @ts-ignore
					user: props.userData?._id,
					// @ts-ignore
					type: folder,
					fileName: "image",
					folder: `${props.userData?.userName}/${folder}`,
					file: event.target.files[0],
					onProgress: (progress) => setPercentage(progress),
					onSetDownloadUrl: (url) => {
						// console.log(url);
						props.onChangeUserData({
							target: {
								name: event.target.name,
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


	return (
		<React.Fragment>
			<div className="w-full flex flex-col items-center -mb-12">
				<div className="w-full h-full rounded-t-lg relative">
					<label
						htmlFor={"coverPhoto"}
						className={`absolute ${uploadingCover ? "" : "cursor-pointer"
							} top-2 text-gray-400 right-2 z-10 bg-black bg-opacity-30 p-3 rounded-full`}
					>
						{uploadingCover ? (
							// <div className="h-5 w-5 flex justify-center">
							// 	<p className="font-bold text-sm text-white">{percentage}%</p>
							// </div>
							<div className="animate-spin rounded-full h-15 w-15 border-gray-900">
								<BiCamera size={20} />
							</div>
						) : (
							<BiCamera size={20} />

						)}
						<input
							id={"coverPhoto"}
							type="file"
							disabled={uploadingCover}
							name={"coverPhoto"}
							accept=".png,.jpg,.jpeg"
							onChange={(event) => onFileUploadOnStorage(event, "coverPhoto")}
							className="hidden"
						/>
					</label>
					{props.userData?.coverPhoto ? (
						<Image
							src={props.userData?.coverPhoto}
							placeholder="empty"
							height="310px"
							width="1350px"
							alt="cover"
							className="object-cover h-full w-full rounded-t-lg"
						/>
					) : (
						<div className="h-[299px] w-full bg-emerald-600 rounded-t-lg"></div>
					)}
				</div>
				<div className="flex items-center w-full px-16 justify-between relative bottom-24">
					<div className="flex">
						<div className="w-[200px] h-[200px] relative rounded-full border-2 border-white">
							<Image
								src={
									!props.userData?.photo || props.userData?.photo === ""
										? "/default.jpg"
										: props.userData?.photo
								}
								placeholder={"empty"}
								height={200}
								width={200}
								alt="profile image"
								className="rounded-full object-cover"
							/>
							<label
								htmlFor={"photo"}
								className={`absolute ${uploadingCover ? "" : "cursor-pointer"
									} bottom-3 right-3 text-gray-600 z-10 bg-black bg-opacity-30 p-2 rounded-full`}
							>
								{uploadingPhoto ? (
									// <div className="h-5 w-5 flex justify-center">
									// 	<p className="font-bold text-sm text-white">
									// 		{percentage}%
									// 	</p>
									// </div>
									<div className="animate-spin rounded-full h-15 w-15 border-gray-900">
										<BiCamera size={18} />
									</div>
								) : (
									<BiCamera size={18} />
								)}
								<input
									id={"photo"}
									type="file"
									disabled={uploadingPhoto}
									name={"photo"}
									accept=".png,.jpg,.jpeg"
									onChange={(event) => onFileUploadOnStorage(event, "photo")}
									className="hidden"
								/>
							</label>
						</div>
						<div className="flex items-center mt-16 mx-2">
							<div className="flex flex-col justify-start">
								<div className="flex items-center justify-start">
									<span className="text-[#5B5B5B] text-[32px] font-[500] mr-[9px]">
										{props.userData?.fullName}
									</span>
									<Image
										src="/profiletick.png"
										height={24}
										width={24}
										alt="profiletick"
									/>
								</div>
								<span className="text-[#5B5B5B] text-[16px]">
									{props.userData?.ocupation}
								</span>
							</div>
						</div>
					</div>
					<div className="mt-20">
						<Toggle
							checked={props.userData?.isPrivate}
							setChecked={(checked) => {
								props.onChangeUserData({
									target: { name: "isPrivate", value: checked },
								});
							}}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProfileCover;

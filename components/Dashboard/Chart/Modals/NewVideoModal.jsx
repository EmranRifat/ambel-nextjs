/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { MdFileUpload } from "react-icons/md";
import Dropdown from "../../../Dropdown";
import DropDownWithId from "../../../Dropdown/DropDownId";
import { bytesToSize } from "../../../../utils/utility";
import { uploadAFile } from "../../../../utils/fileUpload";
import { connect } from "react-redux";
import { getBusinessInfo } from "../../../../store/actions/business";
import { videosUpdate, getVideos } from "../../../../store/actions/videos";
import { getPlayList } from "../../../../store/actions/playlist";

const NewVideoModal = ({
	videosData,
	setVideosData,
	uploadVideoActive,
	setUploadVideoActive,
	getVideos,
	videosUpdate,
	getBusinessInfo,
	info,
	videos,
	playList,
	edit,
	setEdit,
	editablevideo,
}) => {
	const [message, setMessage] = useState("");
	const [percentage, setPercentage] = useState(0);
	const [uploadingCover, setUploadingCover] = useState(false);
	const [uploadingPhoto, setUploadingPhoto] = useState(false);
	const [uploading, setUploading] = useState(false);


	const onFileUploadOnStorage = async (event, folder) => {
		if (event.target.files.length > 0) {
			// if (parseInt(bytesToSize(event.target.files[0].size)) > 2)
			//   return alert("Max file size limit error.");

			try {
				if (folder === "cover") {
					setUploadingCover(true);
				}
				else if (folder === 'thumnil') setUploadingPhoto(true);
				else {

					setUploading(true);
				}
				// @ts-ignore
				uploadAFile({
					fileName: Math.floor(Date.now() / 1000).toString(),
					folder: `${videosData?.name}/${folder}`,
					file: event.target.files[0],
					onProgress: (progress) => setPercentage(progress),
					onSetDownloadUrl: (url) => {
						console.log(url);
						onChangeValue({
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
							setUploading(false);
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
		setVideosData({
			...videosData,
			[name]: value,
		});
	};

	const uploadVideos = () => {

		videosUpdate(videosData, editablevideo ? editablevideo?._id : null).then(
			() => {
				getVideos(info.business._id);
				setUploadVideoActive(false);
				setEdit(false);
				setVideosData({
					business: "",
					name: "",
					description: "",
					thumnil: "",
					video: "",
					privacy: "",
					playList: "default",
				})
			}
		);
	};

	useEffect(() => {
		if (edit) {
			setVideosData(editablevideo)
		}
	}, [])
	useEffect(() => {
		setVideosData((prevState) => {
			const businessId = info?.business?._id;
			return { ...prevState, business: businessId };
		});
	}, []);

	useEffect(() => {
		getVideos(info.business._id);
		getPlayList(info.business._id);
	}, []);

	const allPlayList = playList?.playlist?.data.map((list) => ({
		id: list._id,
		name: list.name,
	}));

	return (
		<>
			<div
				id="RefundedModal"
				className="flex inset-0 fixed tz-40 bg-[#000]/40  backdrop-blur-lg overflow-y-scroll justify-center py-4 items-center"
			>
				<div>
					<div className="flex">
						<button className="btn-light text-light ml-auto -mr-5 pb-2">
							<RxCross1
								onClick={() => {
									setEdit(false);
									setUploadVideoActive(!uploadVideoActive);
									setVideosData({
										business: "",
										name: "",
										description: "",
										thumnil: "",
										video: "",
										privacy: "",
										playList: "default",
									});
								}}
								className="text-white text-lg "
							/>
						</button>
					</div>

					<div className="bg-white  rounded-[8px] w-[700px] ">
						<h1 className="text-center pt-5 text-[#19525A] text-[32px] font-medium">
							{edit ? "Edit Video" : "Upload a New Video"}
						</h1>
						{edit && <label className={`${uploading ? "w-[250px]" : "w-[200px]"} h-[36px] text-[20px] border-[1px] border-gray-400 px-3 py-2 flex flex-col items-center bg-[#19525A] rounded-lg cursor-pointer float-right mr-2 mb-1`}>


							<span className="text-[15px] text-white leading-normal text-center">
								{uploading ? "Uploading video! Please wait.." : "Upload New Video"}
							</span>
							<input
								type="file"
								className="hidden"
								name="video"
								onChange={(event) => onFileUploadOnStorage(event, "videso")}
							/>
						</label>}
						{edit ?
							<video
								controls
								autoPlay
								className="h-[340px] w-full"
								src={videosData?.video}
							></video>
							:
							<label className="m-4 flex flex-col items-center border-2 border-dashed border-[#1A535B] rounded-md p-[45px]">
								<p className="p-[40px] mb-4 bg-[#d9d9d9] rounded-full ">
									<MdFileUpload className="text-3xl  text-gray-700" />
								</p>
								<span className="flex justify-center items-center rounded-md text-[15px] h-[32px] w-[132px] bg-[#D9D9D9B2] text-[#5B5B5B] leading-normal">
									Select files
								</span>
								<input
									type="file"
									className="hidden"
									name="video"
									onChange={(event) => onFileUploadOnStorage(event, "videso")}
								/>
							</label>
						}

						{/* info */}
						<div className="flex justify-between p-4 border-t-2 border-b-2 border-gray-300">
							<p className="my-auto text-[#5b5b5b]">
								Name<span className="text-rose-500">*</span>
							</p>
							<div className="rounded-md border-2  border-[#1A535B] ">
								<input
									type="text"
									name="name"
									value={videosData.name}
									onChange={onChangeValue}
									placeholder="Video Title"
									className="border-0 px-4 py-1 rounded-md w-[300px]"
								/>
							</div>
						</div>

						<div className="flex justify-between p-4  border-b-2 border-gray-300">
							<p className="text-[#5b5b5b]">Description</p>
							<div className="rounded-md border-2  border-[#1A535B] ">
								<textarea
									name="description"
									value={videosData.description}
									onChange={onChangeValue}
									className="border-0 px-4 py-1 mt-0 rounded-md w-[300px] h-[100px] outline-none"
								/>
							</div>
						</div>

						<div className="flex justify-between p-4  border-b-2 border-gray-300">
							<p className="my-auto text-[#5b5b5b]">
								Add Cover or Thumbnail
								<span className="text-gray-400">
									(16:9 in ratio and less the 2 MB)
								</span>
							</p>
							<label className={`${uploadingPhoto ? "w-[200px]" : "w-[124px]"} h-[36px] text-[20px] border-[1px] border-gray-400 px-3 py-2 flex flex-col items-center bg-[#19525A] rounded-lg cursor-pointer`}>
								<span className="text-[15px] text-white leading-normal">
									{uploadingPhoto ? "Uploading thumnil! wait..." : "Upload"}
								</span>
								<input
									type="file"
									className="hidden"
									name="thumnil"
									onChange={(event) => onFileUploadOnStorage(event, "thumnil")}
								/>
							</label>
						</div>

						<div className="flex justify-between p-4 border-b-2 border-gray-300">
							<p className="my-auto text-[#5b5b5b]">Add to Playlist</p>
							<div className="rounded-lg border-2  border-[#19525A]">
								<DropDownWithId
									items={[...allPlayList, { id: "default", name: "default" }]}
									selected={videosData.playList}
									onSelected={(selected) => {
										onChangeValue({
											target: {
												name: "playList",
												value: selected,
											},
										});
									}}
									width={"182px"}
								/>
							</div>
						</div>

						<div className="flex justify-between p-4 ">
							<p className="my-auto text-[#5b5b5b]">Privacy</p>
							<div className="rounded-lg border-2  border-[#19525A]">
								<DropDownWithId
									items={[
										{ name: "Public", id: "public" },
										{ name: "Only me", id: "only_me" },
									]}
									selected={videosData.privacy}
									onSelected={(selected) => {
										onChangeValue({
											target: {
												name: "privacy",
												value: selected,
											},
										});
									}}
									width={"182px"}
								/>
							</div>
						</div>

						<div className="flex justify-end p-4 border-t-2 border-gray-300">
							<button
								onClick={() => {
									setEdit(false);
									setUploadVideoActive(!uploadVideoActive);
									setVideosData({
										business: "",
										name: "",
										description: "",
										thumnil: "",
										video: "",
										privacy: "",
										playList: "default",
									});
								}
								}
								className="px-7 rounded-lg mr-5 border-2 border-[#19525A] py-1"
							>
								Cancel
							</button>
							<button
								onClick={uploadVideos}
								className="px-7 py-1 rounded-lg text-white bg-[#19525A]"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		info: state?.business?.info,
		loading: state?.business?.loading,
		videos: state?.videos?.videos,
		playList: state?.playlist,
	};
};
export default connect(mapStateToProps, {
	getBusinessInfo,
	videosUpdate,
	getVideos,
	getPlayList,
})(NewVideoModal);

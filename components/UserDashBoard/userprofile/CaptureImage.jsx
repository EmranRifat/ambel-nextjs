import React, { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 400,
	height: 400,
	facingMode: "user",
};

function base64ToFile(base64Data, tempFileName) {
	var byteCharacters = Buffer.from(base64Data, "base64");
	// var byteNumbers = new Array(byteCharacters.length);
	// for (var i = 0; i < byteCharacters.length; i++) {
	// 	byteNumbers[i] = byteCharacters.charCodeAt(i);
	// }
	// 	var byteArray = new Uint8Array(byteCharacters);

	var blob = new Blob([byteCharacters], { type: "image/jpeg" });
	// 	file.name = tempFileName;
	// 	return file;
	// }
	var file = new File([blob], tempFileName, { type: "image/jpeg" });
	return file;
}

const CaptureImage = (props) => {
	const [picture, setPicture] = useState("");
	const [isCameraOpened, setIsCameraOpened] = useState(false);
	const webcamRef = React.useRef(null);
	const capture = React.useCallback(() => {
		const pictureSrc = webcamRef.current.getScreenshot();
		// console.log(base64ToFile(pictureSrc, "image"));
		setPicture(pictureSrc);
	}, []);

	return (
		<div className="w-[520px] h-[580px] p-2 relative mx-auto mt-[20px] z-100 flex flex-col items-center bg-white rounded-md">
			<div className="absolute -top-5 -right-7">
				<span
					onClick={() => {
						webcamRef.current;
						props.setOpenCamera(false);
					}}
					className="text-xl text-[#f0f0f0] cursor-pointer"
				>
					✖
				</span>
			</div>
			<div className="overflow-hidden">
				{picture == "" ? (
					<Webcam
						audio={false}
						height={480}
						ref={webcamRef}
						onUserMedia={() => {
							setIsCameraOpened(true);
						}}
						width={520}
						className="object-cover overflow-hidden rounded-lg"
						screenshotFormat="image/png"
						videoConstraints={videoConstraints}
					/>
				) : (
					<img src={picture} />
				)}
			</div>
			{isCameraOpened && (
				<div className="w-full flex gap-4 items-center justify-end h-10 mt-4">
					{picture != "" ? (
						<div
							onClick={(e) => {
								e.preventDefault();
								setIsCameraOpened(false);
								setPicture("");
							}}
							className="bg-gray-400 text-white px-4 py-1 rounded-md cursor-pointer"
						>
							Retake
						</div>
					) : (
						<div
							onClick={(e) => {
								e.preventDefault();
								capture();
							}}
							className="bg-sky-400 text-white px-4 py-1 rounded-md cursor-pointer"
						>
							Capture
						</div>
					)}
					{picture && (
						<div
							onClick={(e) => {
								e.preventDefault();
								props.setImgUrl((prevState) => {
									const newArr = [...prevState];
									newArr[props.activeDiv - 1] = picture;
									return newArr;
								});

								props.setVerification((prevState) => {
									const newObj = { ...prevState };
									if (props.activeDiv == 1) {
										newObj.naturalFaceImg = base64ToFile(
											picture,
											"naturalFaceImg"
										);
									} else if (props.activeDiv == 2) {
										newObj.rsFaceImg = base64ToFile(picture, "rsFaceImg");
									} else if (props.activeDiv == 3) {
										newObj.lsFaceImg = base64ToFile(picture, "lsFaceImg");
									} else if (props.activeDiv == 4) {
										newObj.closeEyesImg = base64ToFile(picture, "closeEyesImg");
									} else if (props.activeDiv == 5) {
										newObj.openMouthImg = base64ToFile(picture, "openMouthImg");
									} else if (props.activeDiv == 6) {
										newObj.smileFaceImg = base64ToFile(picture, "smileFaceImg");
									}

									return newObj;
								});
								props.setOpenCamera(false);
							}}
							className="bg-emerald-500 text-white px-4 py-1 rounded-md cursor-pointer"
						>
							Save
						</div>
					)}
				</div>
			)}
		</div>
	);
};
export default CaptureImage;

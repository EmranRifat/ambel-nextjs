import React from "react";
import { audio, video, document } from "../../public/file_types";

const docs = ["csv", "xlsx", "xls", "pdf", "doc", , "document", "zip"];
const videos = ["mp4", "mov", "mkv"];
const audios = ["mp3", "wav", "aac"];
const images = ["jpg", "png", "jpeg", "gif"];
// 78F2AE

export const File = ({ file, local }) => {
	const fileType = file.type;
	const url = local ? URL.createObjectURL(file) : file.url;

	if (images.includes(fileType))
		return (
			<img
				title={file.name}
				onClick={(_) => window.open(url, "_blank")}
				src={url}
				alt="Image_photo"
			/>
		);

	if (videos.includes(fileType))
		return (
			<img
				onClick={(_) => window.open(url, "_blank")}
				title={file.name}
				src={`${video}`}
				alt="Video"
			/>
		);

	if (audios.includes(fileType))
		return (
			<img
				onClick={(_) => window.open(url, "_blank")}
				title={file.name}
				src={`${audio}`}
				alt="Audio"
			/>
		);

	if (docs.includes(fileType))
		return (
			<img
				onClick={(_) => window.open(url, "_blank")}
				title={file.name}
				src={`${document}`}
				alt="Documents"
			/>
		);
};

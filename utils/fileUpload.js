import { storage } from "./Firebase";
import {
	getDownloadURL,
	ref,
	uploadBytesResumable,
	uploadString,
} from "firebase/storage";
import { uploadObject } from "./upload_to_do";
import axios from 'axios';
import { toast } from 'react-toastify';

export const uploadAFile = async ({
	user = null,
	type,
	fileName,
	folder,
	file,
	onProgress,
	onSetDownloadUrl,
	uploadAsString = true,
}) => {
	try {
		const storageRef = ref(storage, `${folder}/${fileName}`);
		if (uploadAsString) {
			// uploadString(storageRef, file, "data_url").then((snapshot) => {
			// 	// console.log("Uploaded a data_url string!");
			// 	getDownloadURL(snapshot.ref).then((downloadURL) => {
			// 		onSetDownloadUrl(downloadURL);
			// 	});
			// });
			// const data = await uploadObject({
			// 	Bucket: "ambel-media",
			// 	Key: folder + "/" + file.name,
			// 	Body: file,
			// 	ACL: "public-read",

			// })

			var formData = new FormData();
			formData.append("upload", file);

			const data = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/file-upload/upload?folder=${folder}&user=${user}&type=${type}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			if (data && data.data) {
				onProgress(0);
				// onSetDownloadUrl(data.data[0].location);
				onSetDownloadUrl(`https://ambel-media.nyc3.digitaloceanspaces.com/${folder.replaceAll(' ', '%20')}/${file.name.replaceAll(' ', '%20')}`)

			}
			else {
				toast.error("Can not upload image! Please try again", {
					position: "top-right",
					autoClose: 2000,
				})
			}
		} else {
			const uploadTask = uploadBytesResumable(storageRef, file);
			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					onProgress(progress);
					switch (snapshot.state) {
						case "paused":
							// console.log("Upload is paused");
							break;
						case "running":
							// console.log("Upload is running");
							break;
					}
				},
				(error) => {
					// console.log(error);
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case "storage/unauthorized":
							// User doesn't have permission to access the object
							break;
						case "storage/canceled":
							// User canceled the upload
							break;

						// ...

						case "storage/unknown":
							// Unknown error occurred, inspect error.serverResponse
							break;
					}
				},
				() => {
					// Upload completed successfully, now we can get the download URL
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						if (downloadURL) {
							onProgress(0);
							onSetDownloadUrl(downloadURL);
						}
					});
				}
			);
		}
	} catch (err) {
		// console.log(err);
		return err;
	}
};

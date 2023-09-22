import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { PulseLoader } from "react-spinners";
import dateformatter from "date-and-time";
import googleD from "./Google_Drive_img.jpg";
import dropbox from "./drpbox_img.png";
import vector from "./Vector.png";
import axios from "../../../utils/axios";
import Toggle from "../../Toggle";
import Dropdown from "../../Dropdown";

import { useEffect } from "react";
import cookie from "js-cookie";
const BackupAndStorage = () => {
	const [isChanged, setIsChanged] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [toggle, setToggle] = useState(false); //for frontend
	const [allowBackup, setAllowBackup] = useState(false); //for server
	const [selectedStorage, setSelectedStorage] = useState(
		"Select a cloud stroage"
	);
	const [backupIntervalUI, setBackupIntervalUI] = useState("Instant Backup");
	const [backupInterval, setBackupInterval] = useState("Instant Backup");
	const [gLimit, setgLimit] = useState(0);
	const [dbxLimit, setdbxLimit] = useState(0);
	const [gUsage, setgUsage] = useState(0);
	const [dbxUsage, setdbxUsage] = useState(0);
	const [gConnection, setgConnection] = useState(false);
	const [dbxConnection, setdbxConnection] = useState(false);
	const [changedField, setChangedField] = useState([false, false]); //[allowbackup,backupinterval]
	const [gTime, setGtime] = useState({ first: "", last: "" });
	const [dbxTime, setDbxtime] = useState({ first: "", last: "" });

	const router = useRouter();
	const handleGoogleBackUpNow = async () => {
		try {
			const result = await axios.get("/storage/gdrive", {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
		} catch (err) {
			// console.log(err);
		}
	};
	const handleDropboxBackUpNow = async () => {
		try {
			const result = await axios.get("/storage/dbx", {
				withCredentials: true,
				headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
			});
		} catch (err) {
			// console.log(err);
		}
	};
	const handleGoogleConnect = async () => {
		if (!gConnection) {
			router.push(
				"https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&include_granted_scopes=true&response_type=code&client_id=259408877186-vc0ur9bl075t2b1vpnl58la977dej1kr.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fambel-web.vercel.app%2Fgoogleauth"
			);
		}
	};
	const handleDbxConnect = async () => {
		if (!dbxConnection) {
			router.push(
				"https://dropbox.com/oauth2/authorize?response_type=code&client_id=xo433lyukh42ok0&redirect_uri=https://ambel-web.vercel.app/dropboxauth&token_access_type=offline"
			);
		}
	};
	const handleDbxDisconnect = async () => {
		try {
			const response = await axios.patch(
				"users/updateuser",
				{
					"storageBackup.dbx.connected": false,
				},
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				}
			);
			setdbxConnection(false);
			setdbxUsage(0);
			setdbxLimit(0);
		} catch (err) {
			// console.log(err);
		}
	};
	const handleGoogleDisconnect = async () => {
		try {
			const response = await axios.patch(
				"users/updateuser",
				{
					"storageBackup.google.connected": false,
				},
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				}
			);
			setgConnection(false);
			setgUsage(0);
			setgLimit(0);
		} catch (err) {
			// console.log(err);
		}
	};

	const handleStorageConnect = () => {
		if (selectedStorage == "Google Drive") {
			handleGoogleConnect();
		} else if (selectedStorage == "Dropbox") {
			handleDbxConnect();
		}
	};
	const handleSave = async () => {
		setIsLoading(true);
		try {
			const updateObj = {};
			if (changedField[0]) {
				updateObj["storageBackup.allowBackup"] = toggle;
			}
			if (toggle && changedField[1]) {
				updateObj["storageBackup.backupInterval"] = backupIntervalUI;
			}

			const response = await axios.patch(
				"users/updateuser",
				{
					...updateObj,
				},
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				}
			);
			// console.log(response);
			setIsLoading(false);
			setIsChanged(false);
			// console.log(response);
			setAllowBackup(response.data.data.user.storageBackup.allowBackup);
			setToggle(response.data.data.user.storageBackup.allowBackup);
			setBackupInterval(response.data.data.user.storageBackup.backupInterval);
			setBackupIntervalUI(response.data.data.user.storageBackup.backupInterval);
		} catch (err) {
			setIsLoading(false);
			setIsChanged(false);
			// console.log(err);
		}
	};
	useEffect(() => {
		const serverCall = async () => {
			try {
				const response = await axios.get("/storage/backupstorageview", {
					withCredentials: true,
					headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
				});
				// console.log(response);
				// console.log(response.data.data.dbx.lastBackup);

				if (response.data.status == "success") {
					let first = "";
					let last = "";
					if (response.data.data.google.firstBackup) {
						first = dateformatter.format(
							new Date(response.data.data.google.firstBackup),
							"YYYY/MM/DD HH:mm:ss"
						);
					}
					if (response.data.data.google.lastBackup) {
						last = dateformatter.format(
							new Date(response.data.data.google.lastBackup),
							"YYYY/MM/DD HH:mm:ss"
						);
					}

					setGtime({ first, last });
					first = "";
					last = "";
					if (response.data.data.dbx.firstBackup) {
						first = dateformatter.format(
							new Date(response.data.data.dbx.firstBackup),
							"YYYY/MM/DD HH:mm:ss"
						);
					}
					if (response.data.data.dbx.lastBackup) {
						last = dateformatter.format(
							new Date(response.data.data.dbx.lastBackup),
							"YYYY/MM/DD HH:mm:ss"
						);
					}

					setDbxtime({ first, last });
					setgConnection(response.data.data.google.connected);
					setdbxConnection(response.data.data.dbx.connected);
					setAllowBackup(response.data.data.allowBackup);
					setToggle(response.data.data.allowBackup);
					setBackupInterval(response.data.data.backupInterval);
					setBackupIntervalUI(response.data.data.backupInterval);
					if (response.data.data.google.connected) {
						setgLimit(response.data.data.google.limit);
						setgUsage(response.data.data.google.usage);
					}
					if (response.data.data.dbx.connected) {
						setdbxLimit(response.data.data.dbx.limit);
						setdbxUsage(response.data.data.dbx.usage);
					}
				}
			} catch (err) {
				// console.log(err);
			}
		};
		serverCall();
	}, []);
	return (
		<>
			<div className="w-full">
				<span className="text-[#5B5B5B] text-[32px] font-[700]">
					Backup & Storage
				</span>
				{/* 1st div */}
				<div className="bg-white py-2 flex flex-col w-full rounded-lg shadow-md mt-5">
					<div className="flex justify-between items-center px-8 py-6 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Allow to create a backup of your organization data
						</span>
						<Toggle
							checked={toggle}
							setChecked={(toggle) => {
								setToggle(toggle);
								const newArr = [...changedField];
								newArr[0] = !newArr[0];
								setChangedField(newArr);
								setIsChanged(newArr[0] || newArr[1]);
							}}
						/>
					</div>
					{allowBackup && toggle && (
						<>
							<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">Backup time</span>
								<Dropdown
									width={"240px"}
									items={[
										"Instant Backup",
										"After every 12 hours",
										"After every 1 day",
										"After every 1 week",
										"After every 2 weeks",
										"After every 1 Month",
										"After every 3 Months",
										"After every 1 Year",
									]}
									selected={backupIntervalUI}
									onSelected={(selectedItem) => {
										setBackupIntervalUI(selectedItem);
										if (backupInterval != selectedItem) {
											const newArr = [...changedField];
											newArr[1] = true;
											setChangedField(newArr);
											setIsChanged(newArr[0] || newArr[1]);
										} else {
											const newArr = [...changedField];
											newArr[1] = false;
											setChangedField(newArr);
											setIsChanged(newArr[0] || newArr[1]);
										}
									}}
								/>
							</div>
							{/* 2nd div */}
							<div className="w-full flex flex-col px-10 py-4 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">
									Connected Storages
								</span>
								<div className="w-full flex flex-col px-5">
									<div className="w-full flex justify-between items-center mt-4 pb-2 border-b-2 border-gray-300 py-3">
										<div className="text-[16px] m-auto text-[#5B5B5B]">
											Stroage Name
										</div>
										<div className="text-[16px] m-auto text-[#5B5B5B]">
											Backup Time
										</div>
										<div className="text-[16px] m-auto text-[#5B5B5B]">
											Capacity
										</div>
										<div className="text-[16px] m-auto text-[#5B5B5B]">
											Backup Now
										</div>
										<div className="text-[16px] m-auto text-[#5B5B5B]">
											Status
										</div>
									</div>
									{gConnection && (
										<div className="w-full flex justify-between items-center mt-4 pb-2 border-b-2 border-gray-300">
											<Image src={googleD} alt="img" width={150} height={50} />
											<div className="flex flex-col w-[120px]">
												<span className="text-[#5B5B5B] text-[14px]">
													Started Backup:
												</span>
												<span className="text-[#008BDA] text-[14px]">
													{gTime.first}
												</span>
												<span className="text-[#5B5B5B] text-[14px]">
													Last Backup:
												</span>
												<span className="text-[#008BDA] text-[14px]">
													{gTime.last}
												</span>
											</div>
											<span className="text-[14px] text-[#5B5B5B]">
												{gUsage} GB/{gLimit}GB
											</span>
											<Image
												src={vector}
												alt="img"
												onClick={handleGoogleBackUpNow}
											/>
											<button
												className="w-[152px] h-[36px] bg-[#19525A] rounded-md text-white"
												onClick={handleGoogleDisconnect}
											>
												Disconnect
											</button>
										</div>
									)}
									{dbxConnection && (
										<div className="w-full flex justify-between items-center mt-4 pb-2 ">
											<Image src={dropbox} alt="img" width={150} height={50} />
											<div className="flex flex-col w-[120px]">
												<span className="text-[#5B5B5B] text-[14px]">
													Started Backup:
												</span>
												<span className="text-[#008BDA] text-[14px]">
													{dbxTime.first}
												</span>
												<span className="text-[#5B5B5B] text-[14px]">
													Last Backup:
												</span>
												<span className="text-[#008BDA] text-[14px]">
													{dbxTime.last}
												</span>
											</div>
											<span className="text-[14px] text-[#5B5B5B]">
												{dbxUsage} GB/{dbxLimit} GB
											</span>
											<Image
												src={vector}
												alt="img"
												onClick={handleDropboxBackUpNow}
											/>
											<button
												className="w-[152px] h-[36px] bg-[#19525A] rounded-md text-white"
												onClick={handleDbxDisconnect}
											>
												Disconnect
											</button>
										</div>
									)}
								</div>
							</div>
							<div className="flex justify-between items-center px-8 py-5 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">
									Connect with new cloud storage
								</span>
								<div className="flex flex-col items-center">
									<Dropdown
										width={"240px"}
										items={[
											"Select a cloud stroage",
											"Google Drive",
											"Dropbox",
											"AWS",
										]}
										selected={selectedStorage}
										onSelected={(selectedItem) => {
											setSelectedStorage(selectedItem);
										}}
									/>

									{(selectedStorage == "Google Drive" && gConnection) ||
									(selectedStorage == "Dropbox" && dbxConnection) ? null : (
										<button
											className="w-[152px] h-[36px] bg-[#19525A] rounded-md text-white mt-5"
											onClick={handleStorageConnect}
										>
											Connect
										</button>
									)}
								</div>
							</div>
						</>
					)}
					{isChanged && (
						<div className="fixed bottom-0 inset-x-2 ml-10 pl-5 h-12 w-[93%] bg-white rounded-lg shadow-lg p-2 items-center flex justify-between">
							<span className="">Do you want to save changes?</span>
							<div>
								<button
									type="submit"
									onClick={() => {
										setIsChanged(false);
									}}
									className="w-[86px] mr-5 h-[36px] px-2 py-1 rounded-lg border-2 text-gray-600"
								>
									<span>Cancel</span>
								</button>
								<button
									type="submit"
									onClick={handleSave}
									className="w-[86px] h-[36px] px-2 py-1 rounded-lg border-2 text-white bg-teal-700"
								>
									{isLoading ? (
										<PulseLoader color="#ffffff" size={12} />
									) : (
										<span>Save</span>
									)}
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default BackupAndStorage;

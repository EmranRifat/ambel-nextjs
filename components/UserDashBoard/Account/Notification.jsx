import React, { useState } from "react";
import Dropdown from "../../Dropdown";
import Toggle from "../../Toggle";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import {
	getUserNotification,
	updateUserNotification,
	onCancelAction,
} from "../../../store/actions/usernotifications";
import { useEffect } from "react";

const notifydata = [
	{
		id: 1,
		title: "Send notification when appointment book ",
		name: "aptBook",
	},
	{
		id: 2,
		title: "Send notification when appointment cancelled  ",
		name: "aptCancel",
	},
	{
		id: 3,
		title: "Send notification when appointment change  ",
		name: "aptChange",
	},
	{
		id: 4,
		title: "Send notification when create invoice ",
		name: "createInvoice",
	},
	{
		id: 5,
		title: "Send notification when someone purchase a product  ",
		name: "purchaseProduct",
	},
	{
		id: 6,
		title: "Send notification when someone message",
		name: "someoneMessage",
	},
	{
		id: 7,
		title: "Send notification when someone message in group",
		name: "messageGroup",
	},
	{
		id: 8,
		title: "Send notification when someone message in support ",
		name: "messageSupport",
	},
	{
		id: 9,
		title: "Send notification when someone add  or join",
		name: "addJoin",
	},
	{
		id: 10,
		title: "Send notification when someone  make a payment",
		name: "makePayment",
	},
	{
		id: 11,
		title: "Send notification when withdraw Payment  ",
		name: "withdrawPayment",
	},
];

const marketingData = [
	{
		id: 1,
		title: "Important Updates of  AMBEL",
		name: "updateAmbel",
	},
	{
		id: 2,
		title: "Marketing Campaign",
		name: "marketingCamp",
	},
	{
		id: 3,
		title: "AMBEL Events",
		name: "ambelEvent",
	},
	{
		id: 4,
		title: "Offers and  Gifts",
		name: "offGift",
	},
	{
		id: 5,
		title: "Important suggestions",
		name: "importSugg",
	},
	{
		id: 6,
		title: "Community Updates",
		name: "commUpdate",
	},
];
const Notification = (props) => {
	const [changes, setChanges] = useState([]);
	const [isChanged, setIsChanged] = React.useState(false);
	const [thisNotificationCheckBox, setThisNotificationCheckBox] = useState([]);
	const [notifications, setNotifications] = useState({
		allowEmailNotification: false,
		enableDesktopNotification: false,
		playSound: false,
		notificationCheckBox: [],
	});

	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setNotifications({
			...notifications,
			[name]: value,
		});
		if (props.notificationSettings[name] !== value) {
			changes.push(name);
			setChanges([...changes]);
		} else {
			changes.pop();
			setChanges([...changes]);
		}
	};

	useEffect(() => {
		props.getUserNotification();
	}, []);

	useEffect(() => {
		setNotifications(props.notificationSettings);
		setThisNotificationCheckBox(
			props.notificationSettings?.notificationCheckBox
		);
	}, [props.notificationSettings]);

	useEffect(() => {
		if (changes.length > 0) {
			setIsChanged(true);
		} else {
			setIsChanged(false);
		}
	}, [changes]);
	return (
		<React.Fragment>
			<div className="flex flex-col mt-10 rounded-md shadow-md">
				<span className="text-[#5B5B5B] text-[32px] font-[700]">
					Notification
				</span>
				<div className="w-full bg-white rounded-md mt-5">
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[14px] text-[#5B5B5B] ">
							Allow email notification for all activities of your organization
						</span>

						<Toggle
							checked={notifications?.allowEmailNotification}
							setChecked={(checked) => {
								onChangeValue({
									target: { name: "allowEmailNotification", value: checked },
								});
							}}
						/>
					</div>
				</div>
				<div className="w-full bg-white rounded-md">
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[14px] text-[#5B5B5B]  ">
							Enable desktop notification
						</span>
						<Toggle
							checked={notifications?.enableDesktopNotification}
							setChecked={(checked) => {
								onChangeValue({
									target: { name: "enableDesktopNotification", value: checked },
								});
							}}
						/>
					</div>
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[14px] text-[#5B5B5B] ">Play sound</span>
						<Toggle
							checked={notifications?.playSound}
							setChecked={(checked) => {
								onChangeValue({
									target: { name: "playSound", value: checked },
								});
							}}
						/>
					</div>
					{notifydata.map((notify, i) => (
						<div
							key={notify.id}
							className={`flex ${
								notify.id === 6 ? "justify-between" : "justify-start"
							} items-center px-8 py-4`}
						>
							<div className="flex items-center">
								<input
									id="default-checkbox"
									type="checkbox"
									checked={thisNotificationCheckBox?.includes(notify.name)}
									value={notify.name}
									onChange={(e) => {
										let myArr = thisNotificationCheckBox;
										if (!myArr.includes(notify.name)) {
											myArr.push(notify.name);
										} else {
											myArr = myArr.filter((el) => el != notify.name);
										}

										setThisNotificationCheckBox(myArr);
										onChangeValue({
											target: { name: "notificationCheckBox", value: myArr },
										});
										// setNotifications({
										//   ...notifications,
										//   notificationCheckBox: myArr,
										// });
										// console.log(e);
										// checkExistOrNot(e.target.value);
									}}
									className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
								/>
								<span className="text-[14px] ml-3 text-[#5B5B5B] ">
									{notify.title}
								</span>
							</div>
							{notify.id === 6 && (
								<Dropdown
									width={"146px"}
									items={[
										"All time",
										"When offline",
										"When idle",
										"When Online",
										"Both online and Idle",
									]}
									selected={"When online"}
									onSelected={(selected) => {
										// onChangeValue({
										//   target: { name: "location", value: selected },
										// });
									}}
								/>
							)}
						</div>
					))}
					<div className="flex flex-col items-start px-8 py-4 border-t-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Marketing Promotion
						</span>

						{marketingData.map((notify) => (
							<div
								key={notify.id}
								className="flex justify-start items-center py-4"
							>
								<input
									id="default-checkbox"
									type="checkbox"
									checked={thisNotificationCheckBox?.includes(notify.name)}
									value={notify.name}
									onChange={(e) => {
										let myArr = thisNotificationCheckBox;
										if (!myArr.includes(notify.name)) {
											myArr.push(notify.name);
										} else {
											myArr = myArr.filter((el) => el != notify.name);
										}
										setThisNotificationCheckBox(myArr);
										onChangeValue({
											target: { name: "notificationCheckBox", value: myArr },
										});
										// setNotifications({
										//   ...notifications,
										//   notificationCheckBox: myArr,
										// });
										// console.log(e);
										// checkExistOrNot(e.target.value);
									}}
									className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
								/>
								<span className="text-[14px] ml-3 text-[#5B5B5B] ">
									{notify.title}
								</span>
							</div>
						))}
					</div>
				</div>
				{isChanged && (
					<div className="fixed bottom-0 inset-x-2 ml-10 pl-5 h-12 w-[93%] bg-white rounded-lg shadow-lg p-2 items-center flex justify-between">
						<span className="">Do you want to save changes?</span>
						<div>
							<button
								type="submit"
								onClick={() => {
									setIsChanged(false);
									props.onCancelAction();
									// props.getUserNotification();
									// setBusinessData({ ...businessData, ...props.info?.business });
								}}
								className="w-[86px] mr-5 h-[36px] px-2 py-1 rounded-lg border-2 text-gray-600"
							>
								<span>Cancel</span>
							</button>
							<button
								type="submit"
								onClick={() => {
									props
										.updateUserNotification(
											notifications,
											props.notificationSettings
												? props.notificationSettings._id
												: null
										)
										.then((res) => {
											// console.log(res);
											props.getUserNotification();
											setIsChanged(false);
										});
								}}
								className="w-[86px] h-[36px] px-2 py-1 rounded-lg border-2 text-white bg-teal-700"
							>
								{props.loading ? (
									<PulseLoader color="#ffffff" size={12} />
								) : (
									<span>Save</span>
								)}
							</button>
						</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		notificationSettings: state?.userNotification?.info?.notificationSettings,
		loading: state?.userNotification?.loading,
	};
};
export default connect(mapStateToProps, {
	getUserNotification,
	updateUserNotification,
	onCancelAction,
})(Notification);

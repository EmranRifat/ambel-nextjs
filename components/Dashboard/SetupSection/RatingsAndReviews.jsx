import React, { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import {
	getRatingSettings,
	onCancelAction,
	ratingSettingsUpdate,
} from "../../../store/actions/ratings";
import Dropdown from "../../Dropdown";
import Toggle from "../../Toggle";

const RatingsAndReviews = (props) => {
	// console.log(props.ratingsData);
	const [isChanged, setIsChanged] = React.useState(false);
	const [ratingsData, setRatingsData] = React.useState({
		enableRatings: false,
		enableFeedback: false,
		requestFeedback: "Select Option",
		practitionerSettings: "Select Option",
		serviceSettings: "Select Option",
		askForGoogleReview: false,
		manuallyPlaceId: false,
		alloAutomaticResponse: false,
		response: "",
	});

	const [changes, setChanges] = React.useState([]);

	useEffect(() => {
		props.getRatingSettings();
	}, []);

	useEffect(() => {
		if (props.ratingsData) {
			setRatingsData({ ...ratingsData, ...props.ratingsData });
			setChanges([]);
		}
	}, [props.ratingsData]);

	useEffect(() => {
		if (changes.length > 0) {
			setIsChanged(true);
		} else {
			setIsChanged(false);
		}
	}, [changes]);

	const onChangeValue = (event) => {
		const { name, value } = event.target;
		setRatingsData({
			...ratingsData,
			[name]: value,
		});
		if (props.ratingsData?.[name] !== value) {
			changes.push(name);
			setChanges([...changes]);
		} else {
			changes.pop();
			setChanges([...changes]);
		}
	};

	return (
		<>
			<div className="w-full">
				<span className="text-[#5B5B5B] text-[32px] font-[700] mt-3">
					Ratings & Review
				</span>
				<div className="bg-white flex flex-col mt-5 shadow-md rounded-md">
					<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
						<span className="text-[16px] text-[#5B5B5B]">
							Enable ratings & review
						</span>
						<Toggle
							checked={ratingsData.enableRatings}
							setChecked={(checked) => {
								onChangeValue({
									target: { name: "enableRatings", value: checked },
								});
							}}
						/>
					</div>
					{ratingsData.enableRatings && (
						<div>
							<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">
									Request feedback after first visit
								</span>

								<Toggle
									checked={ratingsData.enableFeedback}
									setChecked={(checked) => {
										onChangeValue({
											target: { name: "enableFeedback", value: checked },
										});
									}}
								/>
							</div>
							<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">
									Request feedback Periodically
								</span>
								<Dropdown
									width={"240px"}
									items={["Don’t send recurring email", "Send recurring email"]}
									selected={ratingsData.requestFeedback}
									onSelected={(selected) => {
										onChangeValue({
											target: { name: "requestFeedback", value: selected },
										});
									}}
								/>
							</div>
							<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">
									Practitioner settings
								</span>
								<Dropdown
									width={"240px"}
									items={["Md Tazul Islam", "Md Delwar Hossain"]}
									selected={ratingsData.practitionerSettings}
									onSelected={(selected) => {
										onChangeValue({
											target: { name: "practitionerSettings", value: selected },
										});
									}}
								/>
							</div>
							<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
								<span className="text-[16px] text-[#5B5B5B]">
									Service settings
								</span>
								<Dropdown
									width={"240px"}
									items={["Md Tazul Islam", "Md Delwar Hossain"]}
									selected={ratingsData.serviceSettings}
									onSelected={(selected) => {
										onChangeValue({
											target: { name: "serviceSettings", value: selected },
										});
									}}
								/>
							</div>
						</div>
					)}
				</div>

				<div className="w-full mt-8 pb-10 ">
					<span className="text-[#5B5B5B] text-[32px] font-[600] mt-3">
						Google review
					</span>
					<div className="bg-white flex flex-col mt-5 rounded-md shadow-md mb-2">
						<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
							<span className="text-[16px] text-[#5B5B5B]">
								Ask for a Google review
							</span>

							<Toggle
								checked={ratingsData.askForGoogleReview}
								setChecked={(checked) => {
									onChangeValue({
										target: { name: "askForGoogleReview", value: checked },
									});
								}}
							/>
						</div>

						{ratingsData.askForGoogleReview && (
							<div>
								<div className="flex flex-col px-8 py-4 border-b-[2px] border-gray-300">
									<div className="py-6">
										<span className="text-[16px] text-[#5B5B5B]">
											Place ID: The unique ID of your location from Google
										</span>
									</div>
									<div className="w-full flex justify-between py-6">
										<span className="text-[16px] text-[#5B5B5B]">
											Search your organization name here and we will find your
											google place ID
										</span>
										<div className="flex items-center">
											<input
												id="default-checkbox"
												type="checkbox"
												checked={ratingsData.manuallyPlaceId}
												onChange={(event) => {
													onChangeValue({
														target: {
															name: "manuallyPlaceId",
															value: event.target.checked,
														},
													});
												}}
												className="w-4 h-4 ml-3 rounded-lg text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
											/>
											<span className="ml-2 text-[16px] text-[#5B5B5B]">
												Manually enter place ID
											</span>
										</div>
									</div>

									<div className="w-full flex justify-between py-5">
										<div className="flex flex-col">
											<span className="text-[16px] text-[#5B5B5B]">
												Branch Name
											</span>
											<span className="mt-3 text-[16px] text-[#5B5B5B]">
												Mount Adora Hospital
											</span>
										</div>
										<div className="flex flex-col">
											<span className="text-[16px] text-[#5B5B5B]">
												Organization name and location
											</span>
											<input
												type="text"
												className="outline-none border-2 border-gray-300 mt-4 p-1 rounded-md"
											/>
										</div>

										<div className="flex flex-col">
											<span className="text-[16px] text-[#5B5B5B]">
												Place ID
											</span>
											<input
												type="text"
												className="outline-none border-2 border-gray-300 mt-4 p-1 rounded-md"
											/>
										</div>
										<div className="flex flex-col">
											<span className="text-[16px] text-[#5B5B5B]">
												Google Organization Page
											</span>
											<button className="w-[157px] h-[36px] text-[14px] bg-[#19525A] text-white rounded-md shadow-md mt-4">
												Preview
											</button>
										</div>
									</div>
								</div>

								<div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
									<span className="text-[16px] text-[#5B5B5B]">
										Allow Automatic Response
									</span>

									<Toggle
										checked={ratingsData.alloAutomaticResponse}
										setChecked={(checked) => {
											onChangeValue({
												target: {
													name: "alloAutomaticResponse",
													value: checked,
												},
											});
										}}
									/>
								</div>

								<div className="flex flex-col px-8 py-4">
									<span className="text-[16px] text-[#5B5B5B] py-3">
										Message In reponse to 5 Star
									</span>
									<textarea
										name="response"
										onChange={onChangeValue}
										cols={30}
										rows={5}
										className="outline-none border-2 border-gray-300 p-3 rounded-md"
									/>
								</div>
								<div className="px-8 mb-3">
									<button className="flex items-center mt-4">
										<AiOutlinePlusCircle className="text-xl bg-[#A0D9B4] rounded-full" />
										<span className="ml-1 text-[16px] text-[#5B5B5B]">
											Add response for another Star
										</span>
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
				{isChanged && (
					<div className="fixed bottom-0 inset-x-2 ml-10 pl-5 h-12 w-[93%] bg-white rounded-lg shadow-lg p-2 items-center flex justify-between">
						<span className="">Do you want to save changes?</span>
						<div>
							<button
								type="submit"
								onClick={() => {
									props.onCancelAction();
									setIsChanged(false);
									setRatingsData({
										...ratingsData,
										...props.ratingsData,
									});
								}}
								className="w-[86px] mr-5 h-[36px] px-2 py-1 rounded-lg border-2 text-gray-600"
							>
								<span>Cancel</span>
							</button>
							<button
								type="submit"
								onClick={() => {
									props.ratingSettingsUpdate(
										ratingsData,
										props.ratingsData ? props.ratingsData._id : null
									);
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
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		ratingsData: state?.ratings?.info?.ratingsSetting,
		loading: state?.ratings?.loading,
	};
};
export default connect(mapStateToProps, {
	getRatingSettings,
	ratingSettingsUpdate,
	onCancelAction,
})(RatingsAndReviews);

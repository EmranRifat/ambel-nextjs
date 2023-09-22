import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Connect from "../Account/Connect";

const cons = [
	{
		id: "google",
		icon: "/icons/googleImg.png",
	},
	{
		id: "facebook",
		icon: "/icons/facebookImg.png",
	},
	{
		id: "twitter",
		icon: "/icons/twitterImg.png",
	},
	// {
	//   id: 4,
	//   icon: "/icons/linkedIn.png",
	// },
];
const getTwitterOauthUrl = () => {
	const rootUrl = "https://twitter.com/i/oauth2/authorize";
	const options = {
		redirect_uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/link/twitter`, // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
		client_id: "NF9RdjdaS2JKbllOS3VLcHpia3A6MTpjaQ",
		state: "state",
		response_type: "code",
		code_challenge: "challenge",
		code_challenge_method: "plain",
		scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(
			" "
		),
	};
	const qs = new URLSearchParams(options).toString();
	return `${rootUrl}?${qs}`;
}

const BasicInfoLeftSide = (props) => {
	const [editing, setEditing] = React.useState(false);
	const router = useRouter();
	// console.log(props.userData);
	console.log(props.user)
	return (
		<React.Fragment>
			<div className="flex flex-col">
				{/* about me */}
				<div className="h-[480px] w-[400px] flex flex-col border-2 border-gray-300 rounded-md shadow-md">
					<div className="w-full border-b-2 border-gray-300 flex  justify-center p-2">
						<span className="text-[#5B5B5B] text-[20px] font-[500]">
							About Me
						</span>
					</div>
					{editing ? (
						<textarea
							name="aboutMe"
							onChange={props.onChangeUserData}
							value={props.userData?.aboutMe}
							cols={22}
							rows={3}
							required
							className="outline-none resize-none border-[0.4px] border-[#19525A] h-full rounded-[4px] m-2 py-2 px-4"
						/>
					) : (
						<p className="text-[#5B5B5B] text-[16px] p-4 h-full">
							{props.userData?.aboutMe}
						</p>
					)}
					<div
						className={`flex ${editing ? "justify-end" : "justify-center w-full"
							} items-center relative m-4`}
					>
						{editing && (
							<button
								onClick={() => {
									setEditing(false);
									props.onCancelAction();
								}}
								className="h-[36px] w-[90px] border-[1px] border-[#19525A] text-[16px] rounded-md"
							>
								Cancel
							</button>
						)}
						<button
							onClick={() => {
								if (!editing) {
									setEditing(true);
								} else {
									props.updateUserInfo({ aboutMe: props.userData?.aboutMe });
									setEditing(false);
								}
							}}
							className={`h-[36px] mx-2 ${editing ? "w-[90px]" : "w-[240px]"
								} text-white text-[16px] bg-[#19525A] rounded-md`}
						>
							{editing ? "Save" : "Edit About me"}
						</button>
					</div>
				</div>

				{/* connection */}
				<div className=" w-[400px] flex flex-col border-2 border-gray-300 rounded-md shadow-md mt-10">
					<div className="w-full border-b-2 border-gray-300 flex  justify-center p-2">
						<span className="text-[#5B5B5B] text-[20px] font-[500]">
							Linked account
						</span>
					</div>
					{cons.map((con) => (
						<div
							key={con.id}
							className="flex justify-between bg-white items-center px-8 py-2 border-b-[2px] border-gray-300"
						>
							<div>
								<Image
									src={`${con.icon}`}
									height={30}
									width={100}
									alt="image"
								/>
							</div>
							{props.userData?.linkedAccounts &&
								props.userData?.linkedAccounts[con.id] ? (
								<div className="w-[88px] h-[28px] text-white text-[12px] bg-[#c9c9c9]  rounded-md flex justify-center items-center">
									Connected
								</div>
							) : (
								<button
									className="w-[88px] h-[28px] text-white text-[12px] bg-[#19525A] rounded-md"
									onClick={() => {
										let url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/link/${con.id}?user=${props.user}`
										if (con.id == "twitter") {
											url = getTwitterOauthUrl()
										}
										router.push(url);
									}}
								>
									Connect
								</button>
							)}
						</div>
					))}
				</div>
			</div>
		</React.Fragment>
	);
};
const mapStateToProps = (state) => {
	return {
		user: state?.auth?.authUser?._id
	}
}
export default connect(mapStateToProps, {})(BasicInfoLeftSide);

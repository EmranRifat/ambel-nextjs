import { useState, useEffect } from "react";
import Video from "./Video";
import Image from "next/image";
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

export default function VideoCall(props) {
	const { setInCall, joinedUser, config, hostId, callerName } = props;
	const [users, setUsers] = useState([]);
	const [start, setStart] = useState(false);
	const client = createClient(config)();
	const { ready, tracks } = createMicrophoneAndCameraTracks()();

	useEffect(() => {
		let init = async (name) => {
			client.on("user-published", async (user, mediaType) => {
				await client.subscribe(user, mediaType);
				if (mediaType === "video") {
					setUsers((prevUsers) => {
						// @ts-ignore
						user.fullName = joinedUser.fullName;
						return [...prevUsers, user];
					});
				}
				if (mediaType === "audio") {
					user.audioTrack.play();
					setUsers((prevUsers) => {
						return prevUsers.map((User) => {
							if (User.uid === user.uid) {
								return { ...User, audio: user.hasAudio };
							}
							return User;
						});
					});
				}
			});

			client.on("user-unpublished", (user, mediaType) => {
				if (mediaType === "audio") {
					if (user.audioTrack) user.audioTrack.stop();
					setUsers((prevUsers) => {
						return prevUsers.map((User) => {
							if (User.uid === user.uid) {
								return { ...User, audio: !User.audio };
							}
							return User;
						});
					});
				}
				if (mediaType === "video") {
					setUsers((prevUsers) => {
						return prevUsers.filter((User) => User.uid !== user.uid);
					});
				}
			});

			client.on("user-left", (user) => {
				setUsers((prevUsers) => {
					return prevUsers.filter((User) => User.uid !== user.uid);
				});
			});

			try {
				await client.join(config.appId, name, config.token, joinedUser._id);
				if (tracks) {
					tracks[0].setEnabled(false);
					await client.publish([tracks[0], tracks[1]]);
				}
			} catch (error) {
				// console.log(error);
			}
			setStart(true);
		};

		if (ready && tracks) {
			try {
				init(config.channelName);
			} catch (error) {
				// console.log(error);
			}
		}
	}, [config.channelName, client, ready, tracks]);

	return (
		<div className="h-[100vh] relative bg-black">
			<div className="h-[5%] bg-[#5B5B5B] flex justify-center text-white items-center relative">
				<b className="mr-2">{callerName}</b>&#39;s Call
				<div className="absolute left-2 flex flex-col justify-center">
					<Image
						className=" cursor-pointer"
						src={"/ambelLogo.png"}
						width={120}
						height={50}
						quality={100}
						alt="logo"
						priority
					/>
				</div>
			</div>
			{start && tracks && (
				<Video
					tracks={tracks}
					users={users}
					setStart={setStart}
					setInCall={setInCall}
					meUser={joinedUser}
					hostId={hostId}
					client={client}
					callerName={callerName}
				/>
			)}
		</div>
	);
}

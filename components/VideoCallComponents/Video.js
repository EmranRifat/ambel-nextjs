import { AgoraVideoPlayer } from "agora-rtc-react";
import { useState, useEffect } from "react";
import Controls from "./Controls";

export default function Video(props) {
	const { users, tracks, setStart, setInCall, client, meUser, hostId } = props;
	const [gridSpacing, setGridSpacing] = useState(12);

	useEffect(() => {
		setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 6));
	}, [users, tracks]);

	return (
		<div
			style={{ height: "95%" }}
			className={`grid grid-flow-col ${
				users.length > 1 ? "grid-rows-2" : ""
			} gap-[10px] relative mx-auto px-[10px`}
		>
			<div className="relative">
				<p className="absolute z-20 left-2 px-1 py-1 bottom-2 text-white">
					{meUser.fullName} {hostId ? "Practitioner" : ""}
				</p>
				<AgoraVideoPlayer
					videoTrack={tracks[1]}
					config={{ mirror: false }}
					style={{
						height: "100%",
						borderRadius: "8px",
						overflow: "hidden",
						// margin: "0 5px",
					}}
				/>
			</div>
			{users.length > 0 &&
				users.map((user) => {
					if (user.videoTrack) {
						return (
							<div key={user.uid} className="relative">
								<p className="absolute z-20 left-2 px-1 py-1 bottom-2 text-white">
									{meUser.fullName} {hostId ? "Practitioner" : ""}
								</p>
								<AgoraVideoPlayer
									videoTrack={user.videoTrack}
									style={{
										height: "100%",
										borderRadius: "8px",
										overflow: "hidden",
										// margin: "0 5px",
									}}
								/>
							</div>
						);
					} else return null;
				})}
			{tracks && (
				<div className="absolute bottom-0 w-full flex justify-center">
					<Controls
						tracks={tracks}
						setStart={setStart}
						setInCall={setInCall}
						client={client}
					/>
				</div>
			)}
		</div>
	);
}

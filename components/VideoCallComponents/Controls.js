import { useState } from "react";
import {
	BiExit,
	BiMessage,
	BiMicrophone,
	BiMicrophoneOff,
	BiVideo,
	BiVideoOff,
} from "react-icons/bi";

export default function Controls(props) {
	const { tracks, setStart, setInCall, client } = props;
	const [trackState, setTrackState] = useState({ video: true, audio: false });

	const mute = async (type) => {
		if (type === "audio") {
			await tracks[0].setEnabled(!trackState.audio);
			setTrackState((ps) => {
				return { ...ps, audio: !ps.audio };
			});
		} else if (type === "video") {
			await tracks[1].setEnabled(!trackState.video);
			setTrackState((ps) => {
				return { ...ps, video: !ps.video };
			});
		}
	};

	const leaveChannel = async () => {
		await client.leave();
		client.removeAllListeners();
		tracks[0].close();
		tracks[1].close();
		setStart(false);
		setInCall(false);
	};

	return (
		<div className="bg-[#19525A] rounded-[8px] px-3 py-2">
			<div className="flex justify-center items-center gap-3">
				<div className="cursor-pointer" onClick={() => mute("audio")}>
					{trackState.audio ? (
						<BiMicrophone color="white" size={22} />
					) : (
						<BiMicrophoneOff color="white" size={22} />
					)}
				</div>
				<div className="p-1 cursor-pointer" onClick={() => mute("video")}>
					{trackState.video ? (
						<BiVideo color="white" size={22} />
					) : (
						<BiVideoOff color="white" size={22} />
					)}
				</div>
				<div className="cursor-pointer px-4">
					<p className="text-[16px] text-white font-medium">00:00:00</p>
				</div>
				<div className="cursor-pointer" onClick={() => leaveChannel()}>
					<BiExit color="white" size={22} />
				</div>
				<div className="cursor-pointer" onClick={() => {}}>
					<BiMessage color="white" size={22} />
				</div>
			</div>
		</div>
	);
}

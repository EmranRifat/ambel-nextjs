import React, { useEffect, useRef } from "react";

export const VideoPlayer = ({ user }) => {
	const ref = useRef();

	useEffect(() => {
		user.videoTrack.play(ref.current);
		// user.audioTrack.play();
	}, []);

	return (
		<div ref={ref} className="w-full h-full border-2 border-white relative">
			<div className="absolute z-10 right-0 bottom-0 p-1 bg-black bg-opacity-50 text-white">
				{user.uid}
			</div>
		</div>
	);
};

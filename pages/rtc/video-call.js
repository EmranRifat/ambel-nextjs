// @ts-nocheck
import dynamic from "next/dynamic";
// Use next/dynamic to import the videocall component without ssr as the Agora SDK uses the window object
// The Videocall component can use the Agora SDK like in any react app
const JoinCall = dynamic(
	import("../../components/VideoCallComponents/JoinCall"),
	{ ssr: false }
);

const VideoWindow = () => {
	return (
		<div className="mx-auto">
			<JoinCall />
		</div>
	);
};
export default VideoWindow;
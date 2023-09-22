import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";
import { connect } from "react-redux";
import { getUserInfo } from "../../store/actions/user";
import { useRouter } from "next/router";

function JoinCall(props) {
	const [inCall, setInCall] = useState(true);
	const [config, setConfig] = useState(null);
	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			if (router.query.token) {
				setConfig({
					mode: "rtc",
					codec: "vp8",
					appId: process.env.AGORA_APP_ID,
					token: router.query.token,
					channelName: router.query.channelName,
				});
			}
		}
	}, [router.isReady]);

	useEffect(() => {
		props.getUserInfo();
	}, []);

	return (
		<div className="h-[100vh]">
			{props.loading && !props.user ? (
				<div className="w-screen h-screen bg-gray-500 flex flex-col justify-center items-center">
					Loading...
				</div>
			) : inCall && config ? (
				<VideoCall
					setInCall={setInCall}
					joinedUser={props.user}
					config={config}
					hostId={router.query.hostId}
					callerName={router.query.callerName}
				/>
			) : (
				<div className="w-screen h-screen bg-black flex flex-col justify-center items-center gap-2">
					<Button
						variant="contained"
						color="primary"
						onClick={() => setInCall(true)}
					>
						Join Again
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => window.close()}
					>
						Close Window
					</Button>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user?.info?.user,
		loading: state?.user?.loading,
	};
};
export default connect(mapStateToProps, {
	getUserInfo,
})(JoinCall);

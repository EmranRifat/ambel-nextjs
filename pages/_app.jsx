import React, { useState, useEffect, createContext } from "react";
import { Provider } from "react-redux";
import store from "../store";
import "../styles/globals.css";
import socketIOClient from "socket.io-client";
import Modal from "../components/Modal";
import CallToast from "../components/CallToast";
import axios from "../utils/axios";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SocketContext = createContext(null);

const ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const MyApp = ({ Component, pageProps }) => {
	const [socket, setSocket] = useState(null);

	const getAgoraToken = async ({ channelName, userId }) => {
		const res = await axios.post(
			"/agora-token/generateAccessToken",
			{
				channelName: channelName,
				uid: userId,
				expireTime: 3600,
				role: "subscriber",
			},
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${cookie.get("jwt")}`,
				},
			}
		);
		return res.data.token;
	};

	const [currentCall, setCurrentCall] = useState(null);


	useEffect(() => {
		const socket = socketIOClient(ENDPOINT, {
			withCredentials: true,
			extraHeaders: {
				"my-custom-header": "any value",
			},
		});
		setSocket(socket);


		// socket?.on('get_all_active_user', data => {
		// 	console.log('allActiveUser', data)
		// 	// setAllActiveUsers(data)
		// })

		socket?.on("receive_call", async (data, callback) => {
			const token = cookie.get("jwt");
			const user = token ? jwtDecode(token) : null;
			if (user) {
				setCurrentCall({
					from: data.callerName,
					accept: async () => {
						const call_token = await getAgoraToken({
							channelName: data.roomId,
							// @ts-ignore
							userId: user._id,
						});
						window.open(
							`${window.location.origin}/rtc/video-call?channelName=${data.roomId}&token=${call_token}&callerName=${data.callerName}`,
							"Popup",
							"location,status,scrollbars,resizable,width=600, height=600"
						);
					},
					decline: () => { },
				});
			}
		});
		return () => {
			socket?.disconnect();
		};
	}, []);

	return (
		<Provider store={store}>
			<SocketContext.Provider value={{ socket, setSocket }}>
				<Component {...pageProps} />
				<ToastContainer />
				{currentCall && (
					<Modal onClick={setCurrentCall} closeOnOutsideClick={true}>
						<CallToast call={currentCall} setCurrentCall={setCurrentCall} />
					</Modal>
				)}
			</SocketContext.Provider>
		</Provider>
	);
};

export default MyApp;

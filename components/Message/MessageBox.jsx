import React, { useContext, useEffect, useRef, useState } from "react";
import MessageLeftSide from "./MessageLeftSide";
import MessageTopBar from "./MessageTopbar";
import MessageBottom from "./MessageBottom";
import { connect } from "react-redux";
import { MessageItems } from "./MessageBody";
import axios from "../../utils/axios";
import styles from "../setup.module.css";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import socketIOClient from "socket.io-client";
import { SocketContext } from "../../pages/_app";

const ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const MessageBox = (props) => {
	const [message, setMessage] = React.useState("");
	const [conversationList, setConversationList] = React.useState([]);
	const [messages, addMessage] = React.useState([]);
	const router = useRouter();
	const [selectedConversationId, setConversationId] = React.useState("");
	const [allActiveUsers, setAllActiveUsers] = useState([])
	const { socket, setSocket } = useContext(SocketContext);

	let conversation = conversationList.find(
		(item) => item._id == selectedConversationId
	);

	const onSendMessage = async (event) => {
		if (!event.defaultPrevented) event.preventDefault();

		if (
			conversation &&
			(message || event.target.file || event.target.message)
		) {

			const data = {
				sender: props.authUser,
				conversation: conversation,
				invoice: event.target.invoice,
				case: event.target.case,
				link: event.target.link,
				text:
					event.target.messageType === "text" ? message : event.target.message,
				createdAt: new Date(),
				files: [event.target.file],
				messageType: event.target.messageType ?? "text",
			};
			if (data?.case) {
				data.fullName = event.target.fullName
				data.created = event.target.created
				data.caseName = event.target.caseName
			}
			await socket?.emit("send_message", data);

			addNewMessage(data);
			setMessage("");
		}
	};


	useEffect(() => {
		socket?.emit('add_new_user', { userId: props.authUser?._id })
	}, [props.authUser?._id, socket])

	useEffect(() => {
		socket?.on('get_all_active_user', data => {
			console.log('allActiveUser', data)
			setAllActiveUsers(data)
		})
	}, [props.authUser?._id, socket])

	useEffect(() => {
		if (selectedConversationId) {
			socket?.emit('typing_message', { message, selectedConversationId })
		}
	}, [message, conversation, socket, selectedConversationId])
	React.useEffect(() => {
		if (!socket) {
			const socket = socketIOClient(ENDPOINT, {
				withCredentials: true,
				extraHeaders: {
					"my-custom-header": "any value",
				},
			});
			setSocket(socket);
			// console.log("Socket recreated");
		}
		socket?.on("connection", (socket) => {
			// console.log("Connected to " + socket?.id);
		});
		socket?.on("disconnect", (socket) => {
			// console.log("Disconnected " + socket?.id); // undefined
		});
	}, []);

	React.useEffect(() => {
		if (conversation) {
			socket?.emit("join_conversation", conversation?._id, (error) => {
				if (error) alert(error);
			});
		}
	}, [conversation]);

	const addNewMessage = (data) => {
		// console.log(data);
		setConversationList((list) => {
			list.map((item) => {
				if (item._id === data.conversation?._id) {
					item.lastMessage = {
						...item.lastMessage,
						text: data.text,
						files: data.files,
						createdAt: data.createdAt,
					};
				}
				return item;
			});
			return list;
		});
		addMessage((list) => [...list, data]);
	};

	const getConversations = async () => {
		try {
			const url = "/conversations/getAllConversation";
			const response = await axios.get(url, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${cookie.get("jwt")}`,
				},
			});
			setConversationList(response.data.data);
		} catch (error) {
			//console.log(error.response.data.message);
		}
	};

	// console.log(conversationList.length);

	const getMessages = async () => {
		try {
			const url = `/conversations/getAllMessages?conversation=${conversation?._id}`;
			const response = await axios.get(url, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${cookie.get("jwt")}`,
				},
			});
			addMessage(response.data.data);
		} catch (error) {
			//console.log(error.response.data.message);
		}
	};
	React.useEffect(() => {
		socket?.on("receive_message", (data, callback) => {
			if (data.sender?._id !== props.authUser?._id) {
				addNewMessage(data);
			}
		});
	}, [socket]);

	React.useEffect(() => {
		getConversations();
	}, []);

	React.useEffect(() => {
		if (conversation) {
			getMessages();
		}
	}, [conversation, selectedConversationId]);
	useEffect(() => {
		if (router.isReady) {
			const { conversationId } = router.query;
			if (conversationId && conversationList.length > 0) {
				// @ts-ignore
				setConversationId(conversationId);
			} else {
				setConversationId(conversationList[0]?._id);
			}
		}
	}, [conversationList]);

	// const scrollToBottom = () => {
	// 	container.current?.scrollTo({
	// 		top: container.current?.scrollHeight,
	// 		behavior: "smooth",
	// 	});
	// };

	const [goBack, setGoBack] = React.useState(true);

	return (
		<div className="w-full h-full flex justify-between">
			<div
				className={`${goBack ? "w-[94%]" : "w-0"
					}  mr-0 md:mr-5 md:w-[320px] lg:w-[380px] mt-2`}
			>
				<MessageLeftSide
					conversationList={conversationList}
					setConversationId={(conversation) => {
						setMessage("");
						setConversationId(conversation);
						setGoBack(false);
					}}
					selectedConversationId={selectedConversationId}
					myUser={props.authUser}
					allActiveUsers={allActiveUsers}
				/>
			</div>

			<div
				className={` ${!goBack ? "block" : "hidden"
					} h-[73vh] md:block w-full ${styles.scrollbar} pt-2`}
			>
				{conversationList?.length === 0 ? (
					<div className="mr-5 ml-2 flex justify-center items-center h-full text-center text-2xl lg:text-3xl font-medium text-gray-500">
						<h1>No message found...</h1>
					</div>
				) : (
					selectedConversationId && (
						<div className={`w-full rounded-lg shadow-lg bg-[#FFFFFF] `}>
							<MessageTopBar
								setGoBack={(_) => setGoBack(true)}
								socket={socket}
								roomId={conversation?._id}
								meUser={props.authUser}
								conversationInfo={conversationList.find(
									(item) => item._id === selectedConversationId
								)}
								allActiveUsers={allActiveUsers}
								selectedConversationId={selectedConversationId}
							/>
							<div className="mb-1">
								<div
									className={`h-[50vh] pb-2 ${styles.scrollbar} overflow-y-auto`}
								>
									<MessageItems
										messages={messages.filter(
											(itm) => itm.conversation._id === selectedConversationId
										)}
										meUser={props.authUser}
										getMessages={getMessages}
									/>
								</div>
								<MessageBottom
									onChangeMessage={(e) => setMessage(e.target.value)}
									onSendMessage={onSendMessage}
									message={message}
									myUser={props.authUser}
									conversation={conversation}
									conversationList={conversationList}
								/>
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	info: state.user?.info,
	authUser: state.auth?.authUser,
});

export default connect(mapStateToProps, null)(MessageBox);

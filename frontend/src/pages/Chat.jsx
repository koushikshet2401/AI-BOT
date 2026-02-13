import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import styles from "./Chat.module.css";
import ChatItem from "../components/chat/ChatItem";
import ChatLoading from "../components/chat/ChatLoading";
import SpinnerOverlay from "../components/shared/SpinnerOverlay";

import {
	deleteAllChats,
	getAllChats,
	postChatRequest,
} from "../../helpers/api-functions";

import sendIcon from "/logos/send-icon.png";
import noMsgBot from "/logos/no-msg2.png";
import upArrow from "/logos/up-arrow.png";

import { useAuth } from "../context/context";

const Chat = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	const [chatMessages, setChatMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingChats, setIsLoadingChats] = useState(true);
	const [deleteChatToggle, setDeleteChatToggle] = useState(false);

	const inputRef = useRef(null);
	const messageContainerRef = useRef(null);

	useEffect(() => {
		if (messageContainerRef.current) {
			messageContainerRef.current.scrollTop =
				messageContainerRef.current.scrollHeight;
		}
	}, [chatMessages]);

	useLayoutEffect(() => {
		const getChats = async () => {
			try {
				if (auth?.isLoggedIn && auth.user) {
					const data = await getAllChats();
					setChatMessages(data.chats);
				}
				setIsLoadingChats(false);
			} catch (err) {
				console.log(err);
				setIsLoadingChats(false);
			}
		};
		getChats();
	}, [auth]);

	useEffect(() => {
		if (!auth?.user) navigate("/login");
	}, [auth]);

	const sendMsgHandler = async () => {
		if (!inputRef.current) return;

		const content = inputRef.current.value;
		inputRef.current.value = "";

		setChatMessages((prev) => [...prev, { role: "user", content }]);

		setIsLoading(true);
		const chatData = await postChatRequest(content);
		setChatMessages(chatData.chats);
		setIsLoading(false);
	};

	const clearChatsHandler = async () => {
		try {
			toast.loading("Deleting Messages ...", { id: "delete-msgs" });
			const data = await deleteAllChats();
			setChatMessages(data.chats);
			setDeleteChatToggle(false);
			toast.success("Deleted Messages Successfully", { id: "delete-msgs" });
		} catch (error) {
			toast.error(error.message, { id: "delete-msgs" });
		}
	};

	const chats = chatMessages.map((chat, index) => (
		<ChatItem
			key={index}
			content={chat.content}
			role={chat.role}
		/>
	));

	return (
		<div className={styles.parent}>
			<div className={styles.chat} ref={messageContainerRef}>
				{isLoadingChats && <SpinnerOverlay />}
				{!isLoadingChats && (
					<>
						{chatMessages.length === 0 && (
							<div className={styles.no_msgs}>
								<h3>GROQ</h3>
								<motion.div className={styles.no_msg_logo}>
									<img src={noMsgBot} alt="no msg bot" />
								</motion.div>
								<p>Send your first message to start chatting</p>
							</div>
						)}
						{chats}
						{isLoading && <ChatLoading />}
					</>
				)}
			</div>

			<div className={styles.inputContainer}>
				<div className={styles.inputArea}>
					<textarea
						className={styles.textArea}
						ref={inputRef}
						maxLength={1500}
						placeholder="Enter your query here"
						disabled={isLoadingChats || isLoading}
					/>
					<button className={styles.icon} onClick={sendMsgHandler}>
						<img src={sendIcon} alt="send" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;

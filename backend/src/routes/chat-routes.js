import express from "express";
import { verifyToken } from "../utils/token-manager.js";
import {
	chatCompletionValidator,
	validate,
} from "../utils/validators.js";
import {
	deleteAllChats,
	generateChatCompletion,
	getAllChats,
} from "../controllers/chat-controllers.js";

const chatRoutes = express.Router();

// test route
chatRoutes.get("/", (req, res) => {
	res.send("hello from chatRoutes");
});

// protected routes
chatRoutes.post(
	"/new",
	validate(chatCompletionValidator),
	verifyToken,
	generateChatCompletion
);

chatRoutes.get(
	"/all-chats",
	verifyToken,
	getAllChats
);

chatRoutes.delete(
	"/delete-all-chats",
	verifyToken,
	deleteAllChats
);

export default chatRoutes;

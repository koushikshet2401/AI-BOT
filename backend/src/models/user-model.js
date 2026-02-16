import mongoose from "mongoose";
import chatSchema from "./chat-model.js";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	chats: [chatSchema],
});

export default mongoose.model("User", userSchema);

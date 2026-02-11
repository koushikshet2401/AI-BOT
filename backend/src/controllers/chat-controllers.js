import User from "../models/user-model.js";
import genAI from "../configs/gemini-config.js";

// Generate Chat Response
export const generateChatCompletion = async (req, res) => {
	try {
		const { message } = req.body;

		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			return res.status(401).json({
				message: "User not registered or token invalid",
			});
		}

		// Build conversation history
		const history = user.chats
			.map(chat => `${chat.role}: ${chat.content}`)
			.join("\n");

		const prompt = `
Previous conversation:
${history}

User: ${message}
Assistant:
`;

		// ✅ SAFE MODEL (very important)
const model = genAI.getGenerativeModel({
    model: "gemini-pro",
});



		const result = await model.generateContent(prompt);
		const aiResponse = result.response.text();

		// Save chats
		user.chats.push({ role: "user", content: message });
		user.chats.push({ role: "assistant", content: aiResponse });

		await user.save();

		return res.status(200).json({ chats: user.chats });

	} catch (error) {
		console.error("Gemini Error:", error);
		return res.status(500).json({ message: error.message });
	}
};


// Get All Chats
export const getAllChats = async (req, res) => {
	try {
		const user = await User.findById(res.locals.jwtData.id);

		if (!user) {
			return res.status(401).json({
				message: "User not found or token invalid",
			});
		}

		return res.status(200).json({
			message: "OK",
			chats: user.chats,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error.message });
	}
};


// Delete All Chats
export const deleteAllChats = async (req, res) => {
	try {
		const user = await User.findById(res.locals.jwtData.id);

		if (!user) {
			return res.status(401).json({
				message: "User not found or token invalid",
			});
		}

		user.chats = [];
		await user.save();

		return res.status(200).json({
			message: "OK",
			chats: user.chats,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error.message });
	}
};

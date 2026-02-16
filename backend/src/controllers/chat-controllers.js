import Enquiry from "../models/enquiry-model.js";
import User from "../models/user-model.js";
import { generateText } from "../services/ai/groq-service.js";


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

    // ✅ CALL GROQ
    const aiResponse = await generateText(message);

    // ✅ Save chat in user document (your existing logic)
    user.chats.push({ role: "user", content: message });
    user.chats.push({ role: "assistant", content: aiResponse });

    await user.save();

    // ⭐ SMART LOGIC → detect if AI is unsure
    const needsHuman =
      aiResponse.toLowerCase().includes("i don't know") ||
      aiResponse.toLowerCase().includes("contact support");

    // ✅ SAVE ENQUIRY (CRM FEATURE)
    await Enquiry.create({
      name: user.name,
      email: user.email,
      query: message,
      aiResponse: aiResponse,
      user: user._id,
      needsHuman: needsHuman,
    });

    return res.status(200).json({ chats: user.chats });

  } catch (error) {
    console.error("AI Error:", error);
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

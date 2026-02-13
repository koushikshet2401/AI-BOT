import Groq from "groq-sdk";

const groq = new Groq({
	apiKey: process.env.GROQ_API_KEY,
});

export const generateText = async (message) => {
	const chatCompletion = await groq.chat.completions.create({
		messages: [
			{
				role: "user",
				content: message,
			},
		],
		model: "llama-3.1-8b-instant",
	});

	return chatCompletion.choices[0].message.content;
};

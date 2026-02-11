import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    const models = await genAI.listModels();
    
    for (const model of models) {
        console.log(model.name);
    }
}

listModels();

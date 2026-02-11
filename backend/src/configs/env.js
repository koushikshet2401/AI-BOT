import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

console.log("ENV LOADED:", process.env.GEMINI_API_KEY);

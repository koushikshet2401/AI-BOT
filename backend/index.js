import "./src/configs/env.js";   // ✅ FIRST LINE

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./src/routes/user-routes.js";
import chatRoutes from "./src/routes/chat-routes.js";


const app = express();


/// MIDDLEWARES


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// ⚠️ IMPORTANT — must match .env
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(morgan("dev"));

////////////////////////
/// ROUTES
////////////////////////

// VERY IMPORTANT — match frontend URLs
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

console.log("KEY:", process.env.GEMINI_API_KEY);

////////////////////////
/// DATABASE + SERVER
////////////////////////

mongoose
  .connect(process.env.MONGO_URL).then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log(" Mongo Error:", err);
  });

import "./src/configs/env.js";

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./src/routes/user-routes.js";
import chatRoutes from "./src/routes/chat-routes.js";
import enquiryRoutes from "./src/routes/enquiry-routes.js";

const app = express();

console.log("COOKIE SECRET:", process.env.COOKIE_SECRET); // ✅ DEBUG

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* ✅ THIS IS REQUIRED FOR signed cookies */
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(morgan("dev"));

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/enquiry", enquiryRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });

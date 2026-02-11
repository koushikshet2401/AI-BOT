import express from "express";

import {
	getAllUsers,
	userSignUp,
	userLogin,
	verifyUserStatus,
	logoutUser,
} from "../controllers/user-controllers.js";

import {
	loginValidator,
	signUpValidator,
	validate,
} from "../utils/validators.js";

import { verifyToken } from "../utils/token-manager.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);

userRoutes.post(
	"/signup",
	validate(signUpValidator),
	userSignUp
);

userRoutes.post(
	"/login",
	validate(loginValidator),
	userLogin
);

userRoutes.get(
	"/auth-status",
	verifyToken,
	verifyUserStatus
);

userRoutes.get(
	"/logout",
	verifyToken,
	logoutUser
);

export default userRoutes;

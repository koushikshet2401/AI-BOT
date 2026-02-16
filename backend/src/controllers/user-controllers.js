import { hash, compare } from "bcryptjs";
import User from "../models/user-model.js";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";


// 🔹 GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      message: "OK",
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


// 🔹 SIGN UP
export const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = createToken(
      user._id.toString(),
      user.email,
      user.role,
      "7d"
    );

res.cookie(COOKIE_NAME, token, {
  path: "/",
  httpOnly: true,
  signed: true,
  sameSite: "lax",
  secure: false,
});


    return res.status(201).json({
      message: "OK",
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


// 🔹 LOGIN
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Incorrect password",
      });
    }

    res.clearCookie(COOKIE_NAME, { path: "/" });

    const token = createToken(
      user._id.toString(),
      user.email,
      user.role,
      "7d"
    );

res.cookie(COOKIE_NAME, token, {
  path: "/",
  httpOnly: true,
  signed: true,
  sameSite: "lax",
  secure: false,
});


    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


// 🔹 VERIFY USER (AUTO LOGIN ON REFRESH)
export const verifyUserStatus = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


// 🔹 LOGOUT
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie(COOKIE_NAME, { path: "/" });

    return res.status(200).json({
      message: "Logged out",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

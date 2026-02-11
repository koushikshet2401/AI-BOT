import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id, email, expiresIn) => {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET not defined in .env");
	}

	const payload = { id, email };

	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn,
	});

	return token;
};

export const verifyToken = (req, res, next) => {
	const token = req.signedCookies?.[COOKIE_NAME];

	if (!token || token.trim() === "") {
		return res.status(401).json({ message: "Token not received" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Token expired or invalid" });
		}

		// attach decoded data to request lifecycle
		res.locals.jwtData = decoded;
		return next();
	});
};

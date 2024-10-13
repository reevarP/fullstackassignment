/*
Author: Praveer
Date: 2024-10-14
This code is proprietary and may not be used or distributed without permission.
*/

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	const token = req.header("Authorization");

	// Check if token is provided
	if (!token) {
		return res.status(401).json({ message: "No token, authorization denied" });
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach user information to request object
		req.user = decoded.userId;
		next();
	} catch (error) {
		res.status(401).json({ message: "Token is not valid" });
	}
};

module.exports = authMiddleware;

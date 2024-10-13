/*
Author: Praveer
Date: 2024-10-14
This code is proprietary and may not be used or distributed without permission.
*/

const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middleware/authmiddleware");
const router = express.Router();

// Get user profile
router.get("/", authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.user).select("-password"); // Exclude password from the response
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

// Update user profile
router.put("/", authMiddleware, async (req, res) => {
	const { username, email, isTwoFactorEnabled } = req.body;
	try {
		const user = await User.findById(req.user);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Update user fields
		if (username) user.username = username;
		if (email) user.email = email;
		if (isTwoFactorEnabled !== undefined) user.isTwoFactorEnabled = isTwoFactorEnabled;

		await user.save();
		res.json({ message: "Profile updated successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;

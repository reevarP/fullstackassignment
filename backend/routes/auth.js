/*
Author: Praveer
Date: 2024-10-14
This code is proprietary and may not be used or distributed without permission.
*/

const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const authMiddleware = require("../middleware/authmiddleware");
const geoip = require("geoip-lite");
const useragent = require("useragent");
const rateLimit = require("express-rate-limit");
const { check, validationResult } = require("express-validator");

// Set up rate limiter: maximum of 5 requests per minute for login route
const loginLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute window
	max: 5, // Limit each IP to 5 requests per windowMs
	message: "Too many login attempts, please try again after a minute",
});

const generateOTP = () => {
	return crypto.randomInt(100000, 999999).toString();
};

// Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: process.env.MAILTRAP_USER,
		pass: process.env.MAILTRAP_PASS,
	},
});

const sendOTPEmail = async (email, otp) => {
	try {
		const mailOptions = {
			from: process.env.EMAIL_USER, // From address
			to: email, // To address
			subject: "Subject", // Subject of the email
			text: otp, // Text body of the email
		};

		const result = await transporter.sendMail(mailOptions);
		console.log("Email sent:", result);
	} catch (error) {
		console.log("Error sending OTP email:", error);
		throw new Error("Could not send OTP email");
	}
};

router.post(
	"/register",
	[
		// Validation rules
		check("email", "Please provide a valid email").isEmail(),
		check("password", "Password must be at least 8 characters").isLength({ min: 8 }),
		check("username", "Username is required").not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { username, email, password } = req.body;

		try {
			// This part is to check if the email is already registered in the system
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ message: "Email already registered" });
			}

			// Check if the username is already taken
			user = await User.findOne({ username });
			if (user) {
				return res.status(400).json({ message: "Username already taken" });
			}
			// If the email does not exist already, this part registers the eamil in the ssytem
			user = new User({ username, email, password });
			user.save();

			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

			res.status(201).json({ token });
		} catch (error) {
			res.status(500).json({ message: "Error creating new user", error });
		}
	}
);

// User Login
router.post(
	"/login",
	loginLimiter,
	[
		check("email").isEmail().withMessage("Invalid email").normalizeEmail(), // Validate and sanitize email
		check("password").not().isEmpty().withMessage("Password is required").trim().escape(), // Validate and sanitize password
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		let ip = req.ip;
		if (ip === "::1") {
			ip = "127.0.0.1";
		}
		const agent = useragent.parse(req.headers["user-agent"]);

		try {
			// Check if the user exists
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: "Email does not exist" });
			}

			// Check password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ message: "Incorrect password" });
			}

			// Check if 2FA is enabled
			if (user.isTwoFactorEnabled) {
				// Generate OTP
				const otp = generateOTP();

				// Temporarily store OTP in user object (for demo purposes; in production, use Redis or DB)
				user.otp = otp;
				await user.save();

				// Send OTP to user's email
				sendOTPEmail(user.email, otp);

				return res.status(200).json({ message: "OTP sent, please verify 2FA", userId: user._id });
			}

			// If 2FA is not enabled, generate JWT and log in
			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

			// Capture session details
			const geo = geoip.lookup(ip); // Get location info from IP
			console.log(geo);
			const newSession = {
				deviceType: agent.device.toString(),
				browser: agent.toAgent(),
				location: geo ? `${geo.city}, ${geo.country}` : "Unknown",
				loginTimestamp: new Date(),
			};

			// Add the session to the user's sessions array
			user.sessions.push(newSession);
			user.save();

			res.json({ token });
		} catch (error) {
			res.status(500).json({ message: "Server error" });
		}
	}
);

router.post("/verify-otp", async (req, res) => {
	const { userId, otp } = req.body;

	try {
		// Check if the user exists
		const user = await User.findById(userId);
		if (!user || user.otp !== otp) {
			return res.status(400).json({ message: "Invalid OTP" });
		}

		// Clear OTP after successful verification
		user.otp = null;
		user.save();

		// Generate JWT
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

router.get("/sessions", authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.user).select("sessions");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user.sessions);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

router.post("/logout-session", authMiddleware, async (req, res) => {
	const { sessionId } = req.body;

	try {
		const user = await User.findById(req.user);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Remove session by ID
		user.sessions = user.sessions.filter((session) => session._id.toString() !== sessionId);
		user.save();

		res.json({ message: "Session logged out successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;

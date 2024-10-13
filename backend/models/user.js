/*
Author: Praveer
Date: 2024-10-14
This code is proprietary and may not be used or distributed without permission.
*/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isTwoFactorEnabled: {
		type: Boolean,
		default: false,
	},
	sessions: [
		{
			deviceType: String,
			browser: String,
			location: String,
			loginTimestamp: Date,
		},
	],
	otp: {
		type: String,
		required: false,
	},
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

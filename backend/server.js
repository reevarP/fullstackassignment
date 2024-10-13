const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const xss = require("xss-clean");

dotenv.config();

const app = express();
app.use(express.json());
app.use(xss());
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("connected to db");
	})
	.catch((err) => {
		console.log("Failed to connect to db", err);
	});

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
app.use("/api/auth", authRoutes);
app.use("/api/user/profile", profileRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

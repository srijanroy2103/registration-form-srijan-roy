require("dotenv").config();
const mongoose = require("mongoose");

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.4nynwwh.mongodb.net/?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		console.log("MongoDB Connected...");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;

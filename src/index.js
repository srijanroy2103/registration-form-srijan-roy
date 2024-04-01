require("dotenv").config();
const express = require("express");
const connectDB = require("./db/db_conn");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/route");
const path = require("path");
const app = express();

app.use(express.static(__dirname + "/public"));
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use("/", userRoutes);

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(port, () => {
	console.log(`app is running on port ${port}`);
});

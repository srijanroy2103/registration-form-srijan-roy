const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/user");

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

//register route
router.post("/register", async (req, res) => {
	try {
		const email = req.body.email;
		let user_email = await User.findOne({ email });
		if (user_email) {
			return res
				.status(400)
				.sendFile(path.join(__dirname, "../public/already_registered.html"));
		}
		const password = req.body.password;
		const confirmpassword = req.body.confirmpassword;
		if (password === confirmpassword) {
			const newUser = new User({
				firstname: req.body.fname,
				lastname: req.body.lname,
				dob: req.body.dob,
				gender: req.body.gender,
				phone: req.body.phone,
				email: req.body.email,
				password: req.body.password,
				confirmpassword: req.body.confirmpassword,
			});
			await newUser.save();
			res.redirect("/success");
		} else if (password != confirmpassword) {
			res.send("password do not match");
			res.sendFile(path.join(__dirname, "../public/index.html"));
		}
	} catch (error) {
		res.status(400).send(error.message);
	}

	// newUser
	// 	.save()
	// 	.then((user) => res.status(201).send("user registered success"))
	// 	.catch((err) => res.status(400).send(err));
});

// Add a new GET route for the success page
router.get("/success", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/success.html"));
});

//login route
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			res
				.status(200)
				.sendFile(path.join(__dirname, "../public", "login_succ.html"));
		} else {
			res.status(401).json({ message: "INVALID CREDENTIALS" });
		}
	} catch (error) {
		res.status(400).json({ message: "server error" });
	}
});

module.exports = router;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const login = async (req, res) => {
	const { email, username, password } = req.body;
	try {
		const user = await User.findOne({
			$or: [{email}, {username}],
		});
		if (!user)
			return res
				.status(404)
				.send({ message: "Email/username or password incorrect" });

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid)
			return res
				.status(404)
				.send({ message: "Email/username or password incorrect" });

		const { password: hashedPassword, ...userInfo } = user.toJSON();
		const token = jwt.sign(userInfo, process.env.JWT_SECRET);

		res.send({
			token,
			user: userInfo,
		});
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).send({ message: "An error occurred during login." });
	}
};

const register = async (req, res) => {
	const new_user = req.body;

	if (
		new_user.first_name != null &&
		new_user.last_name != null &&
		new_user.username != null &&
		new_user.email != null &&
		new_user.password != null
	) {
		const { password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			...req.body,
			password: hashedPassword,
		});

		user.save();

		res.send(user);
	} else {
		res.send(
			"first_name, last_name, username, email and password are required"
		);
	}
};

const verify = (_, res) => {
	res.send("Verified");
};

module.exports = { login, register, verify };

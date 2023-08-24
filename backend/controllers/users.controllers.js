const User = require("../models/users.model");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
	const users = await User.find();
	res.send(users);
};

const followUser = async (req, res) => {
	console.log(req.body);
	try {
		const token = req.headers.authorization?.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user_id = decoded._id;
		const following_id = req.body.user_id;

		const user = await User.findByIdAndUpdate(
			user_id,
			{ $addToSet: { following: following_id } },
			{ new: true }
		);

		res.send(user);
	} catch (error) {
		console.error("Error following user:", error);
		res.status(500).send({
			message: "An error occurred while following user.",
		});
	}
};


module.exports = { getAllUsers, followUser, unfollowUser };

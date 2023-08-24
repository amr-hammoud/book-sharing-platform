const User = require("../models/users.model");
const { Book } = require("../models/books.model");
const jwt = require("jsonwebtoken");
const { getFormattedBook } = require("../models/books.model");

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

const unfollowUser = async (req, res) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user_id = decoded._id;
		const following_id = req.body.user_id;

		const user = await User.findByIdAndUpdate(
			user_id,
			{ $pull: { following: following_id } }, // Remove user ID from following array
			{ new: true }
		);

		res.send(user);
	} catch (error) {
		console.error("Error unfollowing user:", error);
		res.status(500).send({
			message: "An error occurred while unfollowing user.",
		});
	}
};

const getFollowingPosts = async (req, res) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user_id = decoded._id;
		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.pageSize) || 10;

		const user = await User.findById(user_id);
		const following_user_ids = user.following;

		const following_posts = await Book.find({
			user: { $in: following_user_ids },
		})
			.sort({ createdAt: -1 })
			.skip((page - 1) * pageSize)
			.limit(pageSize);
			
		const formatted_books_promises = following_posts.map(
			async (book) => await getFormattedBook(book)
		);

		Promise.all(formatted_books_promises)
			.then((formatted_books) => {
				console.log(formatted_books);
				res.send(formatted_books);
			})
			.catch((error) => {
				console.error("Error formatting books:", error);
				res.status(500).send({
					message: "An error occurred while formatting books.",
				});
			});

	} catch (error) {
		console.error("Error getting following posts:", error);
		res.status(500).send({
			message: "An error occurred while retrieving following posts.",
		});
	}
};

module.exports = { getAllUsers, followUser, unfollowUser, getFollowingPosts };

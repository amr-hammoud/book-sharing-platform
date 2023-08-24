const fs = require("fs");
const path = require("path");
const Book = require("../models/books.model");
const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const { log } = require("console");

const getAllBooks = async (req, res) => {
	const books = await Book.find();
	res.send(books);
};

const getBook = async (req, res) => {
	const book = await Book.findById(req.params.id);
	const user = await User.findById(book.user);
	const picture_path = path.join(
		__dirname,
		"../storage/book_pics",
		book.picture
	);
	const image_buffer = fs.readFileSync(picture_path);

	const base64_image =
		"data:image/" +
		book.picture.split(".")[1] +
		";base64," +
		image_buffer.toString("base64");

	const returned_book = {
		_id: book._id,
		name: book.name,
		author: book.author,
		review: book.review,
		user_full_name: user.first_name + " " + user.last_name,
		user_username: user.username,
		picture: base64_image,
	};
	res.send(returned_book);
};

const createBook = async (req, res) => {
	req_book = req.body;
	if (
		req_book.name != null &&
		req_book.author != null &&
		req_book.picture != null &&
		req_book.review != null
	) {
		const token = req.headers.authorization?.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		user_id = decoded._id;

		const book = new Book({
			...req.body,
			user: user_id,
		});
		const file_extension = req_book.picture
			.split(",")[0]
			.split("/")[1]
			.split(";")[0];
		const file_name = `${book._id}-${Date.now()}.${file_extension}`;
		const image_path = path.join(
			__dirname,
			"../storage/book_pics",
			file_name
		);
		const base64_data = req_book.picture.split(",")[1];
		fs.writeFileSync(image_path, base64_data, "base64");

		book.picture = file_name;

		book.save();

		const user = await User.findByIdAndUpdate(
			user_id,
			{ $addToSet: { books: book._id } },
			{ new: true }
		);

		res.send(book);
	} else {
		res.send("Name, Author, Picture and Review are required");
	}
};

const likeBook = async (req, res) => {
	const token = req.headers.authorization?.split(" ")[1];
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	user_id = decoded._id;

	const book = await Book.findById(req.body.book_id);
	if (!book.likes.includes(user_id)) {
		const updatedBook = await Book.findOneAndUpdate(
			{ _id: req.body.book_id },
			{ $addToSet: { likes: user_id } },
			{ new: true }
		);

		res.send(updatedBook);
	} else {
		res.status(400).send({ message: "You have already liked this book." });
	}
};

const unlikeBook = async (req, res) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user_id = decoded._id;

		const updatedBook = await Book.findOneAndUpdate(
			{ _id: req.body.book_id },
			{ $pull: { likes: user_id } },
			{ new: true }
		);

		res.send(updatedBook);
	} catch (error) {
		console.error("Error unliking the book:", error);
		res.status(500).send({
			message: "An error occurred while unliking the book.",
		});
	}
};

module.exports = { getAllBooks, getBook, createBook, likeBook, unlikeBook };

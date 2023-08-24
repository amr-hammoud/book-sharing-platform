const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("../models/users.model");

const booksSchema = new mongoose.Schema(
	{
		name: String,
		author: String,
		picture: String,
		review: String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

const getFormattedBook = async (book) => {
	const user = await User.findById(book.user).exec();
    const user_full_name = user.first_name + " " + user.last_name;
    const user_username = user.username;

    const picture_path = path.join(__dirname, "../storage/book_pics", book.picture);
    const image_buffer = fs.readFileSync(picture_path);
    const base64_image =
        "data:image/" + book.picture.split(".")[1] + ";base64," +
        image_buffer.toString("base64");

	const returned_book = {
		_id: book._id,
        name: book.name,
        author: book.author,
        review: book.review,
        user_full_name,
        user_username,
        picture: base64_image,
	}

    return returned_book;
};

const Book = mongoose.model("Book", booksSchema);
module.exports = {Book, getFormattedBook};

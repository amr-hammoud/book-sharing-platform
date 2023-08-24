const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    name: String,
    author: String,
    picture: String,
    review: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });


const Book = mongoose.model("Book", booksSchema);
module.exports = Book;
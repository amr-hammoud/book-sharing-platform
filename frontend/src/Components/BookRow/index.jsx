import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const BookRow = (book) => {
    console.log(book);
    const navigate = useNavigate()

	return (
		<div className="book-row" onClick={() => navigate(`/books/${book.book._id}`)}>
			<div className="book-name">- {book.book.name}</div>
			<div className="book-author">{book.book.author}</div>
			<div className="book-review">{book.book.review}</div>
		</div>
	);
};

export default BookRow;

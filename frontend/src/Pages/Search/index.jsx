import React, { useState } from "react";
import Navbar from "../../Components/Common/Navbar";
import Input from "../../Components/Base/Input";
import Button from "../../Components/Base/Button";
import "./style.css";
import { sendRequest } from "../../config/request";
import BookRow from "../../Components/BookRow";

const Search = () => {
	const [query, setQuery] = useState("");
	const [books, setBooks] = useState([]);

	const searchHandler = async () => {
		try {
			const response = await sendRequest({
				method: "POST",
				route: "/books/search",
				body: {query: query},
			});
			console.log(response);
			setBooks(response)
		} catch (error) {
			console.log(error);
		}
	};

	const handleQueryChange = (e) => {
		setQuery(e);
	};

	return (
		<div className="navbar-page light-bg">
			<Navbar items={["Books", "Create", "Search"]} selected={"Search"} />
			<div className="container white-bg create-book">
				<div className="flex center color-primary mt-20">
					<h1>Search Books</h1>
				</div>
				<div className="search-bar">
					<Input
						label={"Search by book name/author"}
						placeholder={"Search by book name/author"}
						onChange={(e) => handleQueryChange(e)}
					/>
					<div className="search-button">
						<Button
							color={"primary-bg"}
							textColor={"white-text"}
							text={"Search"}
							onClick={() => searchHandler()}
						/>
					</div>
				</div>
				<div className="books-list">
					{books.map((book, index) => {
						// console.log(book);
						return <BookRow key={index} book={book} />
					})}
				</div>
			</div>
		</div>
	);
};

export default Search;

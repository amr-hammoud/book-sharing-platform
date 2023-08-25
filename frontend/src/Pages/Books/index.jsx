import React, { useEffect, useState } from "react";
import "./style.css";
import Navbar from "../../Components/Common/Navbar";
import BookCard from "../../Components/BookCard";
import { sendRequest } from "../../config/request";
import InfiniteScroll from "react-infinite-scroll-component";

const Books = () => {
	const [books, setBooks] = useState({
		page: 1,
		list: [],
	});

	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const fetchBooks = async () => {
		if (isFetching) {
			return;
		}
		setIsFetching(true);

		try {
			setIsLoading(true);
			const body = { page: books.page };
			console.log("AA", body);
			const response = await sendRequest({
				method: "GET",
				route: "/users/followingPosts",
				body,
			});

			if (books.page > 1) {
				setBooks((prevBooks) => ({
					...prevBooks,
					list: [...prevBooks.list, ...response],
					page: prevBooks.page + 1,
				}));
			} else {
				setBooks((prevBooks) => ({
					...prevBooks,
					list: response,
					page: prevBooks.page + 1,
				}));
			}
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchBooks();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="navbar-page light-bg">
				<div className="container white-bg">
					<div className="flex center color-primary mt-20"></div>
					<div className="infinite-scroll-component">
						{books.list.map((book, index) => {
							return <BookCard key={index} book={book}/>;
						})}
					</div>
					{/* <InfiniteScroll
						dataLength={books.list.length}
						next={fetchBooks}
						hasMore={true}
					>
						{books.list.map((book, index) => {
							return <BookCard key={index} book={rebook/>;
						})}
					</InfiniteScroll> */}
					{isLoading && (
						<div className="flex center fullheight">
							<div className="spinner"></div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Books;

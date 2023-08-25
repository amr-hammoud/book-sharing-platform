import "./style.css";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsShareFill } from "react-icons/bs";
import { sendRequest } from "../../config/request";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar";
import Popup from "../../Components/Base/Popup";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { localStorageAction } from "../../config/localstorage";

const SingleBook = () => {
	const { id } = useParams();
	const location = useLocation();
	const [book, setRecipe] = useState({});

	const [like, setLiked] = useState({
		liked: false,
		likes_count: book.likes_count,
	});

	const getRecipe = async () => {
		try {
			const response = await sendRequest({
				method: "GET",
				route: `/books/${id}`,
			});

			setRecipe(response);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getRecipe();
	}, [id]);

	const [popup, setPopup] = useState({
		text: "",
		popupIsShown: false,
	});

	const handlePopup = (content) => {
		if (popup.popupIsShown) {
			setPopup({ ...popup, popupIsShown: false });
		} else {
			setPopup({ ...popup, popupIsShown: true, text: content });
		}
	};

	const handleLikeButton = async () => {
		setLiked(!like.liked);

		// let likeString;
		// if (like.liked) {
		// 	likeString = "unlike";
		// } else {
		// 	likeString = "like";
		// }
		// console.log(likeString);

		// const response = sendRequest({
		// 	method: "POST",
		// 	route: `/books/${likeString}/`,
		// 	body: {
		// 		book_id: book._id,
		// 	},
		// });
		// console.log(response);
		// setLiked({...like, likes_count: response.likes.length()})
	};

	// useEffect(() => {
	// 	const jwt = localStorageAction("token");
	// 	const user_id = jwtDecode(jwt)._id;


	// 	if (book?.likes?.includes(user_id)) {
	// 		setLiked({ ...like, liked: true });
	// 	}
	// }, [book]);

	const handleShareButton = () => {
		const link = "http://localhost:3000" + location.pathname;
		navigator.clipboard.writeText(link);
		handlePopup("Link Copied to Clipboard");
		setTimeout(() => setPopup({ ...popup, popupIsShown: false }), 1200);
	};

	return (
		<div>
			<Navbar />
			<Popup
				text={popup.text}
				popupIsShown={popup.popupIsShown}
				handlePopup={handlePopup}
			/>
			<div className="navbar-page light-bg">
				<div className="container white-bg flex">
					<div className="book-container">
						<div className="carousel-container">
							<img src={book.picture} alt="" />
						</div>
						<div className="hero-side">
							<div className="book-info">
								<h1 className="book-name">{book.name}</h1>
								<div className="flex spaceBetween">
									<div className="flex column g-5">
										<div className="book-author">
											{book.author}
										</div>
										<div className="book-username">
											By @{book.user_username}
										</div>
									</div>
									<div className="flex">
										<div className="book-actions">
											<div className="flex center g-5">
												<div className="book-likes-counter flex center">
													{like.likes_count}
												</div>
												<div
													className={`button book-like-button flex center ${
														like.liked && "active"
													}`}
													onClick={() =>
														handleLikeButton()
													}
												>
													<AiTwotoneHeart />
												</div>
											</div>
											<div
												className="button book-share-button flex center"
												onClick={() =>
													handleShareButton()
												}
											>
												<BsShareFill />
											</div>
										</div>
									</div>
								</div>
							</div>
							<hr className="book-divider" />
							<div className="book-review">
								<h2 className="review-title">Review</h2>
								{book?.review}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleBook;

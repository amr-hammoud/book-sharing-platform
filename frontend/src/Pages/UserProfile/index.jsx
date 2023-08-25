import "./style.css";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsShareFill } from "react-icons/bs";
import { sendRequest } from "../../config/request";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar";
import Popup from "../../Components/Base/Popup";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
	const { username } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [user, setUser] = useState({});


	const getUser = async () => {
		try {
			const response = await sendRequest({
				method: "GET",
				route: `/users/${username}`,
			});

			console.log(response);
			setUser(response);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getUser();
	}, [username]);

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

	const handleShareButton = () => {
		const link = "http://localhost:3000" + location.pathname;
		navigator.clipboard.writeText(link);
		handlePopup("Link Copied to Clipboard");
		setTimeout(() => setPopup({ ...popup, popupIsShown: false }), 1200);
	};

	console.log(user);

	return (
		<div>
			<Navbar items={["Books", "Create", "Search"]} />
			<Popup
				text={popup.text}
				popupIsShown={popup.popupIsShown}
				handlePopup={handlePopup}
			/>
			<div className="navbar-page light-bg">
				<div className="container white-bg flex">
					<div className="book-container">
						<div className="carousel-container">
							<img src={user.picture} alt="" />
						</div>
						<div className="hero-side">
							<div className="book-info">
								<h1 className="book-name">{user.first_name + ' ' + user.last_name}</h1>
								<div className="flex spaceBetween">
									<div className="flex column g-5">
										<div className="book-username">
											By <span className="username" onClick={() => navigate(`/users/${user.username}`)}>@{user.username}</span>
										</div>
									</div>
									<div className="flex">
										<div className="book-actions">
											<div
												className="button book-share-button flex center"
												onClick={() =>
													handleShareButton()
												}
											>
												Follow
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;

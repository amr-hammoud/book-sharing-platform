import "./style.css";
import { AiTwotoneHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const BookCard = (book) => {
	const navigate = useNavigate();

	const this_book = book.book

	const handelNavigation = () => {
		navigate(`/books/${this_book?._id}`);
	};
	return (
		<div className="book-card" onClick={() => handelNavigation()}>
			<div className="book-card-image">
				<img
					src={this_book?.picture}
					alt=""
				/>
				<div className="book-card-info"></div>
			</div>
			<div className="book-card-body">
				<h3 className="book-card-name">{this_book?.name}</h3>
				<div className="flex spaceBetween">
					<div className="book-card-cuisine">
						{this_book?.author}
					</div>
					<div className="book-card-likes">
						<span className="book-card-likes-counter">
							{this_book?.likes_count}
						</span>
						<AiTwotoneHeart />
					</div>
				</div>

				<div className="book-card-user">
					@{this_book?.user_username}
				</div>
			</div>
		</div>
	);
};

export default BookCard;

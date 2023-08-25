import React from "react";
import "./style.css";
import { MdClose } from "react-icons/md";

const Popup = ({ text, popupIsShown = false, handlePopup }) => {
	return (
		popupIsShown && (
			<div className="popup" onClick={() => handlePopup()}>
				<MdClose />
				{text}
			</div>
		)
	);
};

export default Popup;

import "./style.css";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ label, selected, onSelected }) => {
	const navigation = useNavigate();
	const clickHandler = () => {
		onSelected(label);
		navigation(`/${label?.toLowerCase().replace(" ", "-")}`);
	};

	return (
		<div
			className={selected ? `sidebar-item active` : `sidebar-item`}
			onClick={() => clickHandler()}
		>
			{label}
		</div>
	);
};

export default SidebarItem;

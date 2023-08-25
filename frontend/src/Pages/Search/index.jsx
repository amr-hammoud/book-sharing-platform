import React from "react";
import Navbar from "../../Components/Common/Navbar";
import Input from "../../Components/Base/Input";

const Search = () => {
	return (
		<div className="navbar-page light-bg">
			<Navbar items={["Books", "Create", "Search"]} selected={"Search"}  />
			<div className="container white-bg create-book">
				<div className="flex center color-primary mt-20">
					<h1>Search Books</h1>
				</div>
				<Input />
			</div>
		</div>
	);
};

export default Search;

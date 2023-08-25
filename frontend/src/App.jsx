import Auth from "./Pages/Auth";
import Books from "./Pages/Books";
import SingleBook from "./Pages/SingleBook";
import CreateRecipe from "./Pages/CreateRecipe";
import "./styles/App.css";
import "./styles/utilities.css";
import "./styles/colors.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./Pages/Search";

function App() {
  return (
		<BrowserRouter>
			<Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="/books" element={<Books />}/>
        <Route path="/books/:id?" element={<SingleBook />}/>
        <Route path="/create" element={<CreateRecipe />}/>
        <Route path="/search" element={<Search />}/>
      </Routes>
		</BrowserRouter>
	);
}

export default App;

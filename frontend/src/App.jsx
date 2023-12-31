import Auth from "./Pages/Auth";
import Books from "./Pages/Books";
import SingleBook from "./Pages/SingleBook";
import CreateBook from "./Pages/CreateBook";
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
        <Route path="/users/:username" element={<SingleBook />}/>
        <Route path="/create" element={<CreateBook />}/>
        <Route path="/search" element={<Search />}/>
      </Routes>
		</BrowserRouter>
	);
}

export default App;

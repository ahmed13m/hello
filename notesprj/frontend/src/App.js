import "./App.css";
import Header from "./components/header/Header";
import NotesListPage from "./pages/notesListPage/NotesListPage";
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import NotePage from "./pages/notePage/NotePage";

function App() {
	return (
		<div className="container dark">
			<div className="app">
				<Header />
				<HashRouter>
					<Routes>
						<Route path="/" element={<NotesListPage />} />
						<Route path="note/:id" element={<NotePage />} />
					</Routes>
				</HashRouter>
			</div>
		</div>
	);
}

export default App;

import React, { useState, useEffect } from "react";

import ListItem from "../../components/listItem/ListItem";
import AddButton from "../../components/addButton/AddButton";

const NotesListPage = () => {
	let [notes, setNotes] = useState([]);

	useEffect(() => {
		getNotes();
	}, []);

	let getNotes = async () => {
		let response = await fetch("/notesapp/notes/");
		let data = await response.json();
		setNotes(data);
	};

	return (
		<div className="notes">
			<div className="notes-header">
				<h2 className="notes-title">&#9782; Notes</h2>
				<p className="notes-count">{notes.length}</p>
			</div>
			<div className="notes-list">
				{notes.map((notes, index) => (
					<ListItem key={index} note={notes} />
				))}
			</div>
			<AddButton />
		</div>
	);
};

export default NotesListPage;

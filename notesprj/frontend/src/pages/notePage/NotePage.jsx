import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assests/arrow-left.svg";

const NotePage = () => {
	const history = useNavigate();
	let noteId = useParams();
	let [note, setNote] = useState(null);

	useEffect(() => {
		getNote();
	}, [noteId.id]);

	let getNote = async () => {
		if (noteId === "new") return;
		let response = await fetch(`/notesapp/notes/${noteId.id}`);
		let data = await response.json();
		setNote(data);
	};

	let createNote = async () => {
		fetch(`/notesapp/notes/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(note),
		});
	};

	let UpdateNote = async () => {
		fetch(`/notesapp/notes/${noteId.id}/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(note),
		});
	};

	let deleteNote = async () => {
		fetch(`/notesapp/notes/${noteId.id}/delete`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		history("/");
	};

	let handleSubmit = () => {
		if (noteId.id !== "new" && !note.body) {
			deleteNote();
		} else if (noteId.id !== "new") {
			UpdateNote();
		} else if (noteId.id === "new") {
			createNote();
		}
		history("/");
	};
	return (
		<div className="note">
			<div className="note-header">
				<h3>
					<ArrowLeft onClick={handleSubmit} />
				</h3>
				{noteId.id !== "new" ? (
					<button onClick={deleteNote}>Delete</button>
				) : (
					<button onClick={handleSubmit}>Done</button>
				)}
			</div>
			<textarea
				onChange={(e) => {
					setNote({ ...note, body: e.target.value });
				}}
				value={note?.body}
			></textarea>
		</div>
	);
};

export default NotePage;

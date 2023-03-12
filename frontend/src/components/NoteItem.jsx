import React from "react";
import { useSelector } from "react-redux";

const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.auth);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isAdmin ? "rgba(0,0,0,0.7)" : "#FFF",
        color: note.isAdmin ? "#FFF" : "#000",
      }}
    >
      <h4>
        Note from '
        {note.isAdmin ? <span>Admin</span> : <span>{user.name}</span>}'
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString("en-US", options)}
      </div>
    </div>
  );
};

export default NoteItem;

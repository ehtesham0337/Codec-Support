import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import Spinner from "../components/Spinner";
import { createNote, getNotes } from "../features/notes/noteSlice";
import {
  closeTicket,
  getTicket,
  getTickets,
} from "../features/tickets/ticketSlice";
import empty from "../assets/No data Found.gif";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function SingleTicket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [dispatch, isError, message, ticketId]);

  // Close Ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket closed");
    navigate("/tickets");
    dispatch(getTickets());
  };

  // Submit note
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  // open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header style={{ paddingBottom: "15px" }} className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticketId}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <div style={{ display: "flex" }}>
          <h3 style={{ paddingRight: "10px" }}>Date Submitted: </h3>
          <h3 style={{ color: "#4E4C57" }}>
            {new Date(ticket.createdAt).toLocaleString("en-US", options)}
          </h3>
        </div>
        <div style={{ display: "flex", paddingBottom: "10px" }}>
          <h3 style={{ paddingRight: "10px" }}>Product: </h3>
          <h3 style={{ color: "#4E4C57" }}>{ticket.product}</h3>
        </div>

        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>

        <hr />

        <h2 style={{ paddingTop: "20px" }}>
          Notes
          {ticket.status !== "closed" && (
            <button
              onClick={openModal}
              style={{ gap: "5px" }}
              className="btn-black"
            >
              <FaPlus /> Add Note
            </button>
          )}
        </h2>
      </header>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>

        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              cols="30"
              rows="5"
              className="form-control"
              placeholder="Enter text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn-black">Submit</button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} />;
      })}

      {/* <img
        alt="No data found"
        style={{ width: "50px", height: "50px" }}
        src={empty}
      /> */}
      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default SingleTicket;

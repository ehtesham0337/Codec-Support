import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { closeTicket, getTicket } from "../features/tickets/ticketSlice";

function SingleTicket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  }, [dispatch, isError, message, ticketId]);

  // Close Ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket closed");
    navigate("/tickets");
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
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
            {new Date(ticket.createdAt).toLocaleString("en-US")}
          </h3>
        </div>
        <div style={{ display: "flex" }}>
          <h3 style={{ paddingRight: "10px" }}>Product: </h3>
          <h3 style={{ color: "#4E4C57" }}>{ticket.product}</h3>
        </div>

        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default SingleTicket;

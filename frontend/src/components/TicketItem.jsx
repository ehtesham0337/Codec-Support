import React from "react";
import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("en-US", options)}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default TicketItem;

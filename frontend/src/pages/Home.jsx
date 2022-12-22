import React from "react";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="heading">
        <h1>Need help?</h1>
        <p>Choose from an option below</p>
      </section>

      <Link to="/new-ticket">
        <button className="btn btn-reverse btn-block">
          <FaQuestionCircle /> Create New Ticket
        </button>
      </Link>
      <Link to="/tickets">
        <button className="btn btn-block">
          <FaTicketAlt /> View My Ticket
        </button>
      </Link>
    </div>
  );
}

export default Home;

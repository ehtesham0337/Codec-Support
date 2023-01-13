const express = require("express");
const { getTickets, createTicket } = require("../controllers/ticketController");
const { protect } = require("../Middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);

module.exports = router;

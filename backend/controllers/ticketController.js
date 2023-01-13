const asyncHandler = require("express-async-handler");

const User = require("../models/userModels");
const Ticket = require("../models/ticketModel");

// @desc    Get user tickets
// @route   GET /api/getTickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "getTickets" });
});

// @desc    Create user ticket
// @route   POST /api/createTicket
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "createTicket" });
});

module.exports = { getTickets, createTicket };

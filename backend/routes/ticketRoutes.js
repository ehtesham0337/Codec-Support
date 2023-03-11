const express = require("express");
const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");
const { protect } = require("../Middleware/authMiddleware");

//Re-route into notes route
const noteRouter = require("./notesRoutes");
router.use("/:ticketId/notes", noteRouter);

const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;

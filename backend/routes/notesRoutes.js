const express = require("express");
const { getNotes, addNote } = require("../controllers/noteController");
const { protect } = require("../Middleware/authMiddleware");
const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getNotes).post(protect, addNote);

module.exports = router;

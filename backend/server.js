const path = require("path");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./Middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8080;

// Connect to database
connectDB();

const app = express();
app.use(cors());
app.options("http://codec-support.netlify.app", cors());
app.options("http://localhost:3000", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.options("/", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3001",
    "http://codec-support.netlify.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to CodecSupport API");
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// serve frontend
if (process.env.NODE_ENV === "production") {
  // set build folder
  app.use(express.static(path.join(__dirname, "../frontend/build"), { dotfiles: 'allow' }));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).send("Welcome to CodecSupport API");
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

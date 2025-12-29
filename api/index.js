require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const router = require("../routes.js"); // ✅ FIXED PATH

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to DishHub Backend API!");
});

// API routes
app.use("/api/v1/products", router);

// MongoDB connection
if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));
}

// Start server (LOCAL ONLY)
const PORT = process.env.PORT || 9065;
http.createServer(app).listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

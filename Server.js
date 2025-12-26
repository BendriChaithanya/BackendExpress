require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

// Default route for root '/'
app.get("/", (req, res) => {
  res.send("Welcome to DishHub Backend API!");
});

// API routes
app.use("/api/v1/products", router);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 9065;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

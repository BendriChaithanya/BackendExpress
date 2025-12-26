const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  des: String,
  img: String,
});

module.exports = productSchema; 
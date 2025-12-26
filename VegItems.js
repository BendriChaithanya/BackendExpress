const mongoose = require("mongoose");
const ProductSchema=require("./Schema");

const VegItem = mongoose.model("vetItem",ProductSchema);

module.exports = VegItem;
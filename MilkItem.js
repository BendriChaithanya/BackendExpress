const { default: mongoose } = require("mongoose");
 const ProductSchema = require("./schema"); 


const MilkItem = mongoose.model("MilkItem",ProductSchema);
module.exports = MilkItem;

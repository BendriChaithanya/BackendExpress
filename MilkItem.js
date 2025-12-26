const { default: mongoose } = require("mongoose");
 const ProductSchema = require("./Schema"); 


const MilkItem = mongoose.model("MilkItem",ProductSchema);
module.exports = MilkItem;
